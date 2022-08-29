import React, { useState } from 'react';
import { Box, Divider, Typography } from '@material-ui/core';
import { useRequest } from 'ahooks';
import { startOfMonth } from 'date-fns/esm';
import { useTranslation } from 'react-i18next';
import { Link, useParams } from 'react-router-dom';
import { InferType } from 'yup';
import { useAPI } from '../api/API';
import { DataTable } from '../components/DataTable';
import { Layout } from '../components/Layout';
import { formatNumber } from '../helpers/utils';
import {
  numberSchema,
  objectSchema,
  stringSchema,
} from '../helpers/SchemaHelpers';
import { CompanyInfo } from './BrandDetails';
import styled from 'styled-components';
import Arrow from '../assets/icons/arrow-right.svg';

import StatisticsReprotsLineChart from '../components/Statistics&ReprotsLineChart';
import StatisticsBarChart from '../components/StatistitcsBarChart';
import { useAppContext } from '../data/AppContext';

// type AnalysisHistoryDetails = InferType<typeof analysisHistoryDetailsSchema>
// const analysisHistoryDetailsSchema = objectSchema({
//   birth: stringSchema(),
//   country: stringSchema(),
//   email: stringSchema(),
//   ethnicity: stringSchema(),
//   gender: numberSchema(),
//   id: numberSchema(),
//   name: stringSchema(),
//   phone: stringSchema(),
//   skin_color: stringSchema(),
//   surname: stringSchema(),
// })

type Statistics = InferType<typeof statisticsSchema>;
const statisticsSchema = objectSchema({
  total_customers: numberSchema(),
  total_analysis: numberSchema(),
  total_registered_devices: numberSchema(),
  total_consultants: numberSchema(),
  total_stores: numberSchema(),
});

type StoreDetailsStatistics = InferType<typeof storeDetailsSchema>;
const storeDetailsSchema = objectSchema({
  month: stringSchema(),
  total_analysis: numberSchema(),
  total_consultants: numberSchema(),
  total_customers: numberSchema(),
  number_of_devices: numberSchema(),
  store_email: stringSchema(),
  store_id: numberSchema(),
  store_name: stringSchema(),
  store_phone: stringSchema(),
  total_new_analysis_this_month: numberSchema(),
  total_new_analysis_this_week: numberSchema(),
  total_new_customers_this_month: numberSchema(),
  total_new_customers_this_week: numberSchema(),
  week: objectSchema({
    from: stringSchema(),
    to: stringSchema(),
  }),
});

type AnalysisHistory = InferType<typeof analysisHistorySchema>;
const analysisHistorySchema = objectSchema({
  branch_name: stringSchema(),
  total_analysis: numberSchema(),
  total_consultants: numberSchema(),
  total_customers: numberSchema(),
  total_stores: numberSchema(),
  store_id: numberSchema(),
  store_name: stringSchema(),
  total_registered_devices: numberSchema(),
});

const today = new Date();
// eslint-disable-next-line @typescript-eslint/naming-convention
const start_of_month = startOfMonth(today);

export function StatisticsAndReports(props: any) {
  const { t } = useTranslation();
  const api = useAPI();

  const statistics = useRequest<any>(() =>
    api.requestResource('/api/dior/statistics/overall')
  );

  const { data: mostPopularProducts } = useRequest<{ data: any }>(() =>
    api.requestResource('/api/dior/statistics/most_popular_products')
  );

  console.log(mostPopularProducts)

  const { store_id } = useParams<{ store_id: string }>();
  const [dateRange1, setDateRange1] = useState<{ from: Date; to: Date }>({
    from: start_of_month,
    to: today,
  });

  // const storeDetailsStatistics = useRequest<StoreDetailsStatistics>(() =>
  //   api.requestResource(`/statistics/reports/${store_id}/store-details/`)
  // );

  // const totalCustomers = useHttpResource<{ number_of_customers: number }>(
  //   `/statistics/reports/${store_id}/store-details/total_customers/`,
  //   {
  //     from: format(dateRange1.from, 'yyyyMMdd'),
  //     to: format(dateRange1.to, 'yyyyMMdd'),
  //   },
  //   {
  //     pagination: false,
  //     shouldFetch: !!store_id,
  //   }
  // );

  // const totalAnalysis = useHttpResource<{ 'count(temp.batch_id)': number }>(
  //   `/statistics/reports/${store_id}/store-details/total_analysis/`,
  //   {
  //     from: format(dateRange2.from, 'yyyyMMdd'),
  //     to: format(dateRange2.to, 'yyyyMMdd'),
  //   },
  //   {
  //     pagination: false,
  //     shouldFetch: !!store_id,
  //   }
  // );

  const headers = [
    { label: 'Store id', key: 'store_id' },
    { label: 'Store name', key: 'store_name' },
    { label: 'Total analysis', key: 'total_analysis' },
    { label: 'Total consultants', key: 'total_consultants' },
    { label: 'Total customers', key: 'total_customers' },
    { label: 'Total registered devices', key: 'total_registered_devices' },
  ];

  return (
    <Layout title={t('statistics.title')}>
      <StyledBox className="scrollmenu">
        <div className="card">
          <span>
            <h3>{statistics.data?.total_clients}</h3>
            <p>Overall Clients (GLOBAL)</p>
          </span>
          <button type="button" onClick={event =>  window.location.href='/statistics/overall-clients'}>
            <img src={Arrow} alt="/" />
          </button>
        </div>
        <div className="card">
          <span>
            <h3>{statistics.data?.total_consultations}</h3>
            <p>Consultations (GLOBAL)</p>
          </span>
          <button type="button" onClick={event =>  window.location.href='/statistics/overall-consultations'}>
            <img src={Arrow} alt="/" />
          </button>
        </div>
        <div className="card">
          <span>
            <h3>{formatNumber(statistics.data?.total_consultations || 0)}</h3>
            <p>Generated QR Code (GLOBAL)</p>
          </span>
          <button type="button" onClick={event =>  window.location.href='/statistics/overall-consultations'}>
            <img src={Arrow} alt="/" />
          </button>
        </div>
        <div className="card">
          <span>
            <h3>{statistics.data?.total_consultations}</h3>
            <p>Overall Analysis (GLOBAL)</p>
          </span>
          <button type="button" onClick={event =>  window.location.href='/statistics/overall-consultations'}>
            <img src={Arrow} alt="/" />
          </button>
        </div>
        <div className="card">
          <span>
            <h3>{statistics.data?.consultation_time}</h3>
            <p>Consultation Time (Average)</p>
          </span>
          <button type="button">
            <img src={Arrow} alt="/" />
          </button>
        </div>
        <div className="card">
          <span>
            <h3>{statistics.data?.total_devices}</h3>
            <p>All Devices (GLOBAL)</p>
          </span>
          <button type="button">
            <img src={Arrow} alt="/" />
          </button>
        </div>
        <div className="card">
          <span>
            <h3>{statistics.data?.total_branches}</h3>
            <p>Number of stores (GLOBAL)</p>
          </span>
          <button type="button">
            <img src={Arrow} alt="/" />
          </button>
        </div>
      </StyledBox>

      <StyledBox>
        <div style={{ width: '35%' }}>
          <StatisticsBarChart />
        </div>
        <div style={{ width: '64%', marginLeft: '1%' }}>
          <StatisticsReprotsLineChart />
        </div>
      </StyledBox>

      <Typography>
        <b>Most Popular Products</b>
      </Typography>
      <Divider />
      <Box marginBottom={2} />
      <div className="scrollmenu" style={{display: 'flex'}}>
        {mostPopularProducts && mostPopularProducts.data && mostPopularProducts.data.map((e:any) => {
          return(
            <div className="image-box" style={{width: '200px', height: '200px', marginRight: '10px'}}>
              <img
                className="image"
                style={{width: 'initial'}}
                src={e.image_url}
                alt="product"
              />
            </div>
          )
        })}
      </div>

      {/* <DataTable<AnalysisHistory>
        dataIndex="store_id"
        headers={headers}
        resource_url="/api/partnerdb/statistics/brands"
        columns={[
          { label: t('brand_details.store'), key: 'store_name' },
          { label: t('brand_details.bm'), key: 'total_consultants' },
          { label: t('statistics.customers'), key: 'total_customers' },
          { label: t('analysis_history.analysis'), key: 'total_analysis' },
          {
            label: t('statistics.store_statistics'),
            content: ({ store_id }) => (
              <Link to={`/statistics/reports/${store_id}/store-details/`}>
                {t('analysis_history.view_details')}
              </Link>
            ),
          },
        ]}
        toolbar={{
          search: true,
          pagination: true,
          export: true,
        }}
      /> */}
    </Layout>
  );
}

const StyledBox = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin-bottom: 30px;

  .card {
    max-width: 300px;
    min-width: 250px;
    height: 112px;
    margin-right: 30px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
  }

  span {
    flex-grow: 1;
    padding: 0px 20px;
  }

  h3 {
    font-size: 55px;
    font-weight: 500;
    margin: 0;
    padding: 0px;
  }

  p {
    margin: 0;
    padding: 0px;
    font-size: 14px;
    font-weight: 300;
    color: #8d8d8d;
  }

  button {
    width: 25px;
    height: 100%;
    border-radius: 7px;
    border: none;
    outline: none;
    background-image: linear-gradient(to bottom, #373737, #bfbebe);
    color: #fff;
  }

  .table-chart-container {
    position: relative;
    width: 34%;
    border-radius: 8px;
    height: 450px;
    margin-right: 20px;
    box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2);
    padding: 14px;

    header {
      display: flex;
      justify-content: space-between;
      h4 {
        margin: 0;
        padding: 0;
        font-weight: 400;
        color: #707070;
      }
    }
  }
  .indicator {
    display: flex;
    align-items: center;
    .blue {
      height: 4px;
      background: rgb(66, 133, 244);
    }
    .red {
      height: 4px;
      background: rgb(219, 68, 55);
    }
    p {
      margin-right: 10px;
    }
    span {
      padding: 0px 7px;
      margin-right: 5px;
    }
    h4 {
      margin: 0;
      padding: 0;
      font-size: 17px;
      font-weight: 400;
    }

    p {
      margin-block: 8px;
    }
  }

  .line-chart-container {
    width: 64%;
    border-radius: 8px;
    height: 450px;
    box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2);
    position: relative;

    header {
      display: flex;
      justify-content: space-between;
      width: 100%;
      padding: 10px;

      .indicator {
        display: flex;
        align-items: center;
        .blue {
          height: 4px;
          background: rgb(66, 133, 244);
        }
        .red {
          height: 4px;
          background: rgb(219, 68, 55);
        }
        p {
          margin-right: 10px;
        }
        span {
          padding: 0px 7px;
          margin-right: 5px;
        }
      }
    }

    h4 {
      margin: 0;
      padding: 0;
      font-size: 17px;
      font-weight: 300;
      color: #999;
    }

    p {
      font-size: 13px;
      margin: 8px 0px;
    }

    .line-chart-select-box {
    }
    .form-control {
      width: 100%;
      margin-bottom: 12px;
    }
  }
`;
