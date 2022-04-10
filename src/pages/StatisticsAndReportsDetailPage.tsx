import {
  Box,
  Breadcrumbs,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Table,
  TableCell,
  TableRow,
  TextField,
  Typography,
} from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import {
  DateRangeDelimiter,
  DesktopDateRangePicker,
} from '@material-ui/pickers';
import { useRequest } from 'ahooks';
import { format } from 'date-fns';
import { startOfMonth } from 'date-fns/esm';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useParams } from 'react-router-dom';
import { InferType } from 'yup';
import { useAPI, useHttpResource } from '../api/API';
import { Layout } from '../components/Layout';
import {
  numberSchema,
  objectSchema,
  stringSchema,
} from '../helpers/SchemaHelpers';
import ArrowBackIosRoundedIcon from '@material-ui/icons/ArrowBackIosRounded';
import styled from 'styled-components';
import Chart from 'react-google-charts';
import StatisticsReprotsLineChart from '../components/Statistics&ReprotsLineChart';

type StoreDetailsStatistics = InferType<typeof storeDetailsSchema>;
const storeDetailsSchema = objectSchema({
  month: stringSchema(),
  number_of_analyses: numberSchema(),
  number_of_counselors: numberSchema(),
  number_of_customers: numberSchema(),
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

function LoadingStoreDetails() {
  const { t } = useTranslation();

  return (
    <>
      <Table size="small">
        <TableRow>
          <TableCell>{t('statistics.store_id')}:</TableCell>
          <TableCell>
            <Skeleton />
          </TableCell>
          <TableCell>{t('statistics.total_bms_overall')}:</TableCell>
          <TableCell>
            <Skeleton />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>{t('statistics.store_name')}:</TableCell>
          <TableCell>
            <Skeleton />
          </TableCell>
          <TableCell>{t('statistics.total_customers')}:</TableCell>
          <TableCell>
            <Skeleton />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>{t('statistics.contact_information')}:</TableCell>
          <TableCell>
            <Skeleton />
          </TableCell>
          <TableCell>{t('statistics.total_analysis')}</TableCell>
          <TableCell>
            <Skeleton />
          </TableCell>
        </TableRow>
      </Table>
    </>
  );
}

const today = new Date();
// eslint-disable-next-line @typescript-eslint/naming-convention
const start_of_month = startOfMonth(today);

export default function StoreDetails() {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { store_id } = useParams<{ store_id: string }>();
  const [dateRange1, setDateRange1] = useState<{ from: Date; to: Date }>({
    from: start_of_month,
    to: today,
  });
  const [dateRange2, setDateRange2] = useState<{ from: Date; to: Date }>({
    from: start_of_month,
    to: today,
  });

  const api = useAPI();
  const { t } = useTranslation();
  const storeDetailsStatistics = useRequest<StoreDetailsStatistics>(() =>
    api.requestResource(`/api/partnerdb/statistics/store_details`)
  );

  const totalCustomers = useHttpResource<{ number_of_customers: number }>(
    `/api/partnerdb/statistics/total_customers`,
    {
      from: format(dateRange1.from, 'yyyyMMdd'),
      to: format(dateRange1.to, 'yyyyMMdd'),
    },
    {
      pagination: false,
      shouldFetch: !!store_id,
    }
  );

  const totalAnalysis = useHttpResource<{ 'count(temp.batch_id)': number }>(
    `/api/partnerdb/statistics/total_analysis`,
    {
      from: format(dateRange2.from, 'yyyyMMdd'),
      to: format(dateRange2.to, 'yyyyMMdd'),
    },
    {
      pagination: false,
      shouldFetch: !!store_id,
    }
  );

  return (
    <Layout
      title={
        <Breadcrumbs>
          <Typography>Statistics & Reports / Store Details</Typography>
        </Breadcrumbs>
      }
    >
      <Header>
        <Link to="/statistics" style={{ textDecoration: 'none' }}>
          <Button
            variant="contained"
            style={{ background: '#fff' }}
            startIcon={<ArrowBackIosRoundedIcon fontSize="small" />}
          >
            Previous Page
          </Button>
        </Link>
      </Header>

      <Box padding={3}>
        {storeDetailsStatistics.data ? (
          <>
            <Table size="small">
              <TableRow>
                <TableCell>{t('statistics.store_id')}:</TableCell>
                <TableCell>{storeDetailsStatistics.data.store_id}</TableCell>
                <TableCell>{t('statistics.total_bms_overall')}:</TableCell>
                <TableCell>
                  {storeDetailsStatistics.data.number_of_counselors}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>{t('statistics.store_name')}:</TableCell>
                <TableCell>{storeDetailsStatistics.data.store_name}</TableCell>
                <TableCell>{t('statistics.total_customers')}:</TableCell>
                <TableCell>
                  {storeDetailsStatistics.data.number_of_devices}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>{t('statistics.contact_information')}:</TableCell>
                <TableCell>
                  {storeDetailsStatistics.data.store_email}{' '}
                  {storeDetailsStatistics.data.store_phone}
                </TableCell>
                <TableCell>{t('statistics.total_analysis')}:</TableCell>
                <TableCell>
                  {storeDetailsStatistics.data.number_of_analyses}
                </TableCell>
              </TableRow>
            </Table>

            <Box marginBottom={2} />
            {/* <table
              cellPadding={6}
              width="100%"
              style={{
                border: '1px solid black',
                textAlign: 'center',
                lineHeight: '24px',
              }}
            >
              <tr>
                <td style={{ borderBottom: '1px solid black' }}>
                  {t('statistics.month')}: {storeDetailsStatistics.data.month}
                </td>
                <td style={{ borderBottom: '1px solid black' }}>
                  {t('statistics.week')}:{' '}
                  {parseDateString(storeDetailsStatistics.data.week.from)} -{' '}
                  {parseDateString(storeDetailsStatistics.data.week.to)}
                </td>
              </tr>
              <tr>
                <td>
                  <b>{t('statistics.total_customers')}</b>
                  <Divider />
                  {t('statistics.overall')}:{' '}
                  {storeDetailsStatistics.data.number_of_customers}
                  <Box marginTop={2}>
                    <b>{t('statistics.new_customers')}</b>
                    <Divider />
                    <div>
                      {t('statistics.this_week')}:{' '}
                      {
                        storeDetailsStatistics.data
                          .total_new_customers_this_week
                      }
                    </div>
                    <div>
                      {t('statistics.this_month')}:{' '}
                      {
                        storeDetailsStatistics.data
                          .total_new_customers_this_month
                      }
                    </div>
                  </Box>
                </td>
                <td>
                  <b>{t('statistics.total_analysis')}</b>
                  <Divider />
                  {t('statistics.overall')}:{' '}
                  {storeDetailsStatistics.data.number_of_analyses}
                  <Box marginTop={2}>
                    <b>{t('statistics.new_analysis')}</b>
                    <Divider />
                    <div>
                      {t('statistics.this_week')}:{' '}
                      {storeDetailsStatistics.data.total_new_analysis_this_week}
                    </div>
                    <div>
                      {t('statistics.this_month')}:{' '}
                      {
                        storeDetailsStatistics.data
                          .total_new_analysis_this_month
                      }
                    </div>
                  </Box>
                </td>
              </tr>
            </table> */}
          </>
        ) : (
          <LoadingStoreDetails />
        )}

        <Box marginBottom={2} />

        <StatisticsReprotsLineChart />
      </Box>
    </Layout>
  );
}

const Header = styled.header`
  margin-top: -145px;
  margin-bottom: 120px;
`;
