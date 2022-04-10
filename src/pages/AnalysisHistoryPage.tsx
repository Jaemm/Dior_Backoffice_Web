import { Box, Breadcrumbs, Divider, Grid, Typography } from '@material-ui/core';
import { useRequest } from 'ahooks';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useParams } from 'react-router-dom';
import { InferType } from 'yup';

import { useAPI } from '../api/API';
import { DataTable } from '../components/DataTable';
import { Layout } from '../components/Layout';
import { parseDateString } from '../helpers/dateHelpers';
import {
  numberSchema,
  objectSchema,
  stringSchema,
} from '../helpers/SchemaHelpers';
import { parseGender } from '../helpers/utils';

type AnalysisHistoryDetails = InferType<typeof analysisHistoryDetailsSchema>;
const analysisHistoryDetailsSchema = objectSchema({
  birth: stringSchema(),
  country: stringSchema(),
  email: stringSchema(),
  ethnicity: stringSchema(),
  gender: numberSchema(),
  id: numberSchema(),
  name: stringSchema(),
  phone: stringSchema(),
  skin_color: stringSchema(),
  surname: stringSchema(),
});

type AnalysisHistory = InferType<typeof analysisHistorySchema>;
const analysisHistorySchema = objectSchema({
  analysis_type: stringSchema(),
  batch_id: numberSchema(),
  created_time: stringSchema(),
  device_id: stringSchema(),
  service_name: stringSchema(),
});

export default function AnalysisHistoryPage() {
  const params = useParams<{ id: string }>();
  const api = useAPI();
  const { t } = useTranslation();
  const analysisHistoryDetails = useRequest<AnalysisHistoryDetails>(() =>
    api.requestResource(`/api/partnerdb/customers/${params.id}`)
  );

  return (
    <Layout
      title={
        <Breadcrumbs aria-label="breadcrumb">
          <Link to="/customer-record/">{t('sidebar.customer_record')}</Link>
          <Typography display="initial">
            {t('sidebar.analysis_history')}
          </Typography>
        </Breadcrumbs>
      }
    >
      <Box paddingY={2}>
        <Grid container spacing={2}>
          <Grid item sm>
            <Typography>
              <b>{t('analysis_history.customer_id')}:</b>{' '}
              {analysisHistoryDetails.data?.id}
            </Typography>
            <Typography>
              <b>{t('analysis_history.customer_name')}:</b>{' '}
              {analysisHistoryDetails.data?.name}{' '}
              {analysisHistoryDetails.data?.surname}
            </Typography>
            <Typography>
              <b>{t('analysis_history.customer_information')}:</b>{' '}
              {analysisHistoryDetails.data?.email}{' '}
            </Typography>
          </Grid>
          <Grid item sm>
            <Typography>
              <b>{t('analysis_history.birth_date')}:</b>{' '}
              {analysisHistoryDetails.data?.birth}
            </Typography>
            <Typography>
              <b>{t('analysis_history.country')}:</b>{' '}
              {analysisHistoryDetails.data?.country}
            </Typography>
            <Typography>
              <b>{t('analysis_history.phone_number')}:</b>
              {analysisHistoryDetails.data?.phone}
            </Typography>
          </Grid>
          <Grid item sm>
            <Typography>
              <b>{t('analysis_history.skin_group')}:</b>{' '}
              {analysisHistoryDetails.data?.skin_color}
            </Typography>
            <Typography>
              <b>{t('analysis_history.ethnicity')}:</b>{' '}
              {analysisHistoryDetails.data?.ethnicity}
            </Typography>
            <Typography>
              <b>{t('analysis_history.gender')}:</b>{' '}
              {parseGender(analysisHistoryDetails.data?.gender)}
            </Typography>
          </Grid>
        </Grid>
      </Box>

      <Typography>
        <b>{t('analysis_history.analysis')}</b>
      </Typography>
      <Divider />
      <Box marginBottom={2} />

      <DataTable<AnalysisHistory>
        dataIndex="device_id"
        resource_url={`/api/partnerdb/customers/${params.id}/analysis_histories`}
        params={{ filter_by: '-batch_id' }}
        columns={[
          // { label: t('analysis_history.batch_id'), key: 'batch_id' },
          { label: t('analysis_history.device_id'), key: 'device_id' },
          { label: t('analysis_history.service_name'), key: 'service_name' },
          {
            label: t('analysis_history.analysis_date'),
            content: ({ created_time }) => parseDateString(created_time),
            key: 'created_time',
          },
          {
            label: t('analysis_history.analysis_details'),
            content: ({ analysis_type, batch_id }) => (
              <Link
                to={`/customer-record/${params.id}/${analysis_type}/${batch_id}/`}
              >
                {t('analysis_history.view_details')}
              </Link>
            ),
          },
        ]}
        toolbar={{
          search: true,
          filter_by_date: true,
          filter: true,
          pagination: true,
          export: true,
        }}
        filters={[
          { label: t('brand_details.all'), key: 'all' },
          // {
          //   label: 'Batch id',
          //   key: 'batch_id',
          // },
          {
            label: 'device_id',
            key: 'device_id',
          },
          {
            label: 'service_name',
            key: 'service_name',
          },
          {
            label: 'created_time',
            key: 'created_time',
          },
        ]}
      />
    </Layout>
  );
}
