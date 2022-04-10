import React, { useEffect, useState } from 'react';
import Paper from '@material-ui/core/Paper';
import {
  Chart,
  ArgumentAxis,
  ValueAxis,
  LineSeries,
  Title,
} from '@devexpress/dx-react-chart-material-ui';
import { withStyles } from '@material-ui/core/styles';
import { Animation } from '@devexpress/dx-react-chart';
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@material-ui/core';
import styled from 'styled-components';
import { DesktopDateRangePicker } from '@material-ui/pickers';
import { startOfMonth } from 'date-fns/esm';
import axios from 'axios';
import { useAppContext } from '../data/AppContext';

const format = () => (tick) => tick;

const demoStyles = {
  chart: {
    paddingRight: '20px',
  },
  title: {
    whiteSpace: 'pre',
  },
};

const ValueLabel = (props) => {
  const { text } = props;
  return <ValueAxis.Label {...props} text={`${text}`} />;
};

const titleStyles = {
  title: {
    whiteSpace: 'pre',
  },
};

const Demo = () => {
  const { token } = useAppContext();
  const today = new Date();
  const start_of_month = startOfMonth(today);
  const [dateRange2, setDateRange2] = useState({
    from: start_of_month,
    to: today,
  });
  const [representation, setRepresentation] = useState(null);
  const [fetchedData, setData] = useState();

  function convert(str) {
    var date = new Date(str),
      mnth = ('0' + (date.getMonth() + 1)).slice(-2),
      day = ('0' + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join('-');
  }
  const from = convert(start_of_month);
  const to = convert(today);

  const fetchCustomerAnalysisData = () => {
    axios
      .get(
        'https://v2-app.chowis.com/api/partnerdb/statistics/customers_analysis',
        {
          params: {
            from: from,
            to: to,
            type: 'weekly',
          },
          headers: {
            'X-CHOWIS-CONSULTANT-TOKEN': token,
            'Content-Type': 'application/JSON',
          },
        }
      )
      .then((res) => {
        // console.log('Fetch', res.data);
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchCustomerAnalysisData();
  }, []);
  const TitleText = withStyles(titleStyles)(({ classes, ...props }) => (
    <TabHeader>
      <Typography>Number of Customers and Analysis</Typography>
      <div className="date-picker">
        <FormControl
          variant="outlined"
          style={{ marginRight: 10, minWidth: 350 }}
          size="small"
        >
          <InputLabel id="demo-simple-select-outlined-label">
            Representation
          </InputLabel>
          <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            value={representation}
            onChange={() => setRepresentation()}
            label="Representation"
          >
            {/* <MenuItem value="per day">Per Day</MenuItem> */}
            <MenuItem value="per week">Per Week</MenuItem>
            {/* <MenuItem value="per month">Per Month</MenuItem> */}
          </Select>
        </FormControl>
        <DesktopDateRangePicker
          clearable
          value={[dateRange2.from, dateRange2.to]}
          onChange={([from, to]) => {
            if (from && to) {
              setDateRange2({ from, to });
            }
          }}
          renderInput={(startProps, endProps) => (
            <>
              <TextField
                size="small"
                // fullWidth
                {...startProps}
                helperText=""
                variant="outlined"
              />
              <TextField
                size="small"
                // fullWidth
                {...endProps}
                variant="outlined"
                helperText=""
              />
            </>
          )}
        />
      </div>
    </TabHeader>
  ));

  const { chart } = demoStyles;

  return (
    <>
      <Header>
        <Button
          variant="contained"
          style={{ background: '#303030', color: '#fff', marginRight: 20 }}
        >
          Fiilter Report
        </Button>
        <Button
          variant="contained"
          style={{ background: '#303030', color: '#fff' }}
        >
          Generate Report
        </Button>
      </Header>
      {fetchedData && (
        <Paper>
          <Chart data={fetchedData} className={chart}>
            <ArgumentAxis tickFormat={format} />
            <ValueAxis max={100} labelComponent={ValueLabel} />

            <LineSeries
              name="customer"
              valueField="customer"
              argumentField="date"
              color="#0BC45A"
            />
            <LineSeries
              name="analysis"
              valueField="analysis"
              argumentField="date"
              color="#E96464"
            />

            <Title
              text="Number of Customers and Analysis"
              textComponent={TitleText}
            />
            <Animation />
          </Chart>
          <Footer>
            <Button
              variant="contained"
              style={{ background: '#707070', color: '#fff' }}
            >
              April 2021 - May 2021
            </Button>
            <div className="legend-box">
              <Typography>Legend :</Typography>
              <Typography
                style={{
                  background: '#0BC45A',
                  color: '#fff',
                  padding: '5px 10px',
                  borderRadius: '5px',
                  marginLeft: '10px',
                }}
              >
                Customers
              </Typography>
              <Typography
                style={{
                  background: '#E96464',
                  color: '#fff',
                  padding: '5px 10px',
                  borderRadius: '5px',
                  marginLeft: '10px',
                }}
              >
                Analysis
              </Typography>
            </div>
          </Footer>
        </Paper>
      )}
    </>
  );
};

export default withStyles(demoStyles, { name: 'Demo' })(Demo);

const Header = styled.div`
  margin-top: -230px;
  margin-bottom: 200px;
`;

const TabHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 50px;
  .date-picker {
    display: flex;
    align-items: center;
  }
`;

const Footer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24px;
  .legend-box {
    display: flex;
    align-items: center;
  }
`;
