import React, { useEffect, useState } from 'react';
import Paper from '@material-ui/core/Paper';
import {
  Chart,
  ArgumentAxis,
  ValueAxis,
  LineSeries,
  Title,
} from '@devexpress/dx-react-chart-material-ui';

import { Animation } from '@devexpress/dx-react-chart';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@material-ui/core';
import { curveCatmullRom, line } from 'd3-shape';
import styled from 'styled-components';
import { DesktopDateRangePicker } from '@material-ui/pickers';
import { startOfMonth } from 'date-fns/esm';
import { useAppContext } from '../data/AppContext';
import axios from 'axios';

const Line = (props) => (
  <LineSeries.Path
    {...props}
    path={line()
      .x(({ arg }) => arg)
      .y(({ val }) => val)
      .curve(curveCatmullRom)}
  />
);

const confidence = [
  {
    year: '04/12/2021',
    clients: 19,
    consultants: 32,
  },
  // {
  //   year: '05/12/2021',
  //   clients: 13,
  //   consultants: 33,
  // },
  // {
  //   year: '06/12/2021',
  //   clients: 14,
  //   consultants: 30,
  // },
  // {
  //   year: '07/12/2021',
  //   clients: 13,
  //   consultants: 34,
  // },
  // {
  //   year: '08/12/2021',
  //   clients: 15,
  //   consultants: 32,
  // },
  // {
  //   year: '09/12/2021',
  //   clients: 16,
  //   consultants: 48,
  // },
  // {
  //   year: '10/12/2021',
  //   clients: 12,
  //   consultants: 41,
  // },
  // {
  //   year: '11/12/2021',
  //   clients: 11,
  //   consultants: 45,
  // },
  // {
  //   year: '12/12/2021',
  //   clients: 10,
  //   consultants: 44,
  // },
  // {
  //   year: '13/12/2021',
  //   clients: 11,
  //   consultants: 43,
  // },
];
const format = () => (tick) => tick;

const StatisticsReprotsLineChart = () => {
  const { token } = useAppContext();
  const today = new Date();
  const start_of_month = startOfMonth(today);
  const [fetchedData, setData] = useState();
  // console.log('Hello', data);
  const [dateRange2, setDateRange2] = useState({
    from: start_of_month,
    to: today,
  });
  const [representation, setRepresentation] = useState(null);

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
        console.log('Fetch', res.data);
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // console.log("Repors page", fetchCustomerAnalysisData)

  useEffect(() => {
    fetchCustomerAnalysisData();
  }, []);
  const TitleText = () => (
    <TabHeader>
      <div className="subheader">
        <Typography variant="h5">Time Frame</Typography>
        <Footer>
          <div className="legend-box">
            <div
              style={{
                background: '#309FC9',
                width: '10px',
                height: '10px',
                borderRadius: '2px',
              }}
            ></div>
            <Typography
              style={{ fontSize: '12px', marginLeft: 5, marginRight: 10 }}
            >
              Clients
            </Typography>
            <div
              style={{
                background: '#FF896B',
                width: '10px',
                height: '10px',
                borderRadius: '2px',
              }}
            ></div>
            <Typography style={{ fontSize: '12px', marginLeft: 5 }}>
              Consultations
            </Typography>
          </div>
        </Footer>
      </div>
      <div className="date-picker">
        <FormControl
          variant="outlined"
          style={{ minWidth: 350, marginBottom: 10 }}
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
  );

  return (
    <>
      <Paper elevation={3} style={{ width: '100%' }}>
        {fetchedData && (
          <Chart data={fetchedData}>
            <ArgumentAxis tickFormat={format} />
            <ValueAxis max={100} />

            <LineSeries
              name="customer"
              valueField="customer"
              argumentField="date"
              color="#309FC9"
              seriesComponent={Line}
            />
            <LineSeries
              name="analysis"
              valueField="analysis"
              argumentField="date"
              color="#FF896B"
              seriesComponent={Line}
            />

            <Title
              text="Number of Customers and Analysis"
              textComponent={TitleText}
            />
            <Animation />
          </Chart>
        )}
      </Paper>
    </>
  );
};

export default StatisticsReprotsLineChart;

const TabHeader = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 20px;

  .subheader {
    display: flex;
    flex-direction: column;
  }
  .date-picker {
    display: flex;
    flex-direction: column;
  }
`;

const Footer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24px 0;
  .legend-box {
    display: flex;
    align-items: center;
  }
`;
