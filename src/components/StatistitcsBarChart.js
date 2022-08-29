import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import {
  Chart,
  ArgumentAxis,
  ValueAxis,
  BarSeries,
  Title,
} from '@devexpress/dx-react-chart-material-ui';

import { Stack, Animation } from '@devexpress/dx-react-chart';
import styled from 'styled-components';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from '@material-ui/core';
import { useAppContext } from '../data/AppContext';
import { startOfMonth } from 'date-fns/esm';
import axios from 'axios';

// export const data = [
//   {
//     store: 'Store 1',
//     gold: 36,
//     silver: 38,
//   },
//   {
//     store: 'Store 2',
//     gold: 51,
//     silver: 21,
//   },
//   {
//     store: 'Store 3',
//     gold: 23,
//     silver: 21,
//   },
//   {
//     store: 'Store 4',
//     gold: 19,
//     silver: 13,
//   },
// ];

const StatisticsBarChart = () => {
  const { token } = useAppContext();
  const today = new Date();
  const start_of_month = startOfMonth(today);
  const [data, setData] = React.useState();
  const [representation, setRepresentation] = React.useState(null);

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
        'https://v2-app.chowis.com/api/dior/statistics/overall_per_country',
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

  React.useEffect(() => {
    fetchCustomerAnalysisData();
  }, []);

  const BarChartHeader = () => {
    return (
      <TabHeader>
        <div className="subheader">
          <Typography style={{ fontSize: '16px' }}>
            Overall Performance
          </Typography>
          <Legend>
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
              <div
                style={{
                  background: '#494949',
                  width: '10px',
                  height: '10px',
                  borderRadius: '2px',
                  marginLeft: '10px'
                }}
            ></div>
            <Typography style={{ fontSize: '12px', marginLeft: 5 }}>
              QR Code Generated
            </Typography>
            </div>
          </Legend>
        </div>

      </TabHeader>
    );
  };

  return (
    <Paper elevation={3} style={{ width: '100%' }}>
      {data && (
        <Chart data={data}>
          <ArgumentAxis />
          <ValueAxis />

          <BarSeries
            name="customer"
            valueField="total_customers"
            argumentField="country"
            color="#309FC9"
          />
          <BarSeries
            name="consultations"
            valueField="total_consultations"
            argumentField="country"
            color="#FF896B"
          />
          <BarSeries
            name="qr_codes"
            valueField="total_qr_codes"
            argumentField="country"
            color="#494949"
          />
          <Animation />

          <Title text="Overall Performance (Per Country)" textComponent={BarChartHeader} />
          <Stack />
        </Chart>
      )}
    </Paper>
  );
};

export default StatisticsBarChart;

const TabHeader = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 20px;

  .subheader {
    display: flex;
    flex-direction: column;
  }
`;

const Legend = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0;
  .legend-box {
    display: flex;
    align-items: center;
  }
`;
