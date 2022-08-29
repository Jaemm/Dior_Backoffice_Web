import {
  Box,
  Breadcrumbs,
  Divider,
  Grid,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@material-ui/core';
import { TableWrapper } from '../components/TableWrapper';

import { useRequest } from 'ahooks';
import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Link,
  Route,
  RouteComponentProps,
  useHistory,
  useParams,
} from 'react-router-dom';
import Viewer from 'react-viewer';
import { InferType } from 'yup';

import { useAPI } from '../api/API';
import { DataTable } from '../components/DataTable';
import { Layout } from '../components/Layout';
import { useAccessFlags } from '../data/AccessFlags';
import {
  numberSchema,
  objectSchema,
  stringSchema,
} from '../helpers/SchemaHelpers';
import { parseGender } from '../helpers/utils';

type AnalysisInformation = InferType<typeof analysisInformation>;
const analysisInformation = objectSchema({
  batch_id: stringSchema(),
  customer_id: stringSchema(),
  date: stringSchema(),
  devicetype_id: stringSchema(),
  humidity: stringSchema(),
  id: stringSchema(),
  image_url: stringSchema(),
  original_image: stringSchema(),
  analyzed_image: stringSchema(),
  measurement: stringSchema(),
  phone_model: stringSchema(),
  phone_os: stringSchema(),
  product_code: stringSchema(),
  score: stringSchema(),
  service_name: stringSchema(),
  temperature: stringSchema(),
  time: stringSchema(),
  uv_index: stringSchema(),
  version: stringSchema(),
  raw_value: stringSchema(),
  args: objectSchema({
    score: numberSchema(),
    raw: numberSchema(),
  }),
});

type MoistureInformation = {
  measurement: string;
  hydration_t_raw_value: string;
  hydration_t_score: string;
  hydration_u_raw_value: string;
  hydration_u_score: string;
};

type AnalysisHistoryDetails = InferType<typeof analysisHistoryDetailsSchema>;
const analysisHistoryDetailsSchema = objectSchema({
  id: stringSchema(),
  email: stringSchema(),
  name: stringSchema(),
  surname: stringSchema(),
  gender: stringSchema(),
  country: stringSchema(),
  age: stringSchema(),
  os: stringSchema(),
  language: stringSchema(),
  phone: stringSchema(),
  birth: stringSchema(),
  address: stringSchema(),
  note: stringSchema(),
  push_token: stringSchema(),
  app_id: stringSchema(),
  consultant_id: stringSchema(),
  ethnicity: stringSchema(),
  skin_color: stringSchema(),
  app_name: stringSchema(),
});

// function split(input: string, len: number) {
//   return input.match(
//     new RegExp(`.{1,${len}}(?=(.{${len}})+(?!.))|.{1,${len}}$`, 'g')
//   );
// }

export default function AnalysisDetailsPage() {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { has_access_to_analysis_information_row_value } = useAccessFlags();
  const params = useParams<{
    customer_id: string;
    analysis_id: string;
    batch_id: string;
  }>();
  const history = useHistory();
  const api = useAPI();
  const { t } = useTranslation();
  const analysisHistoryDetails = useRequest<AnalysisHistoryDetails>(() =>
    api.requestResource(`/api/partnerdb/customers/${params.customer_id}`)
  );

  const hydrationSebumResults = useRequest<any>(() =>
    api.requestResource(
      `/api/partnerdb/customers/${params.customer_id}/analysis_histories/${params.batch_id}/hydration_sebum`,
      {
        params: {
          analysis_type: params.analysis_id,
        },
      }
    )
  );
  // console.log('ANALYSIS HIstory', analysisHistoryDetails);
  let hydrationSebumData: any[] = [];
  hydrationSebumData = hydrationSebumResults?.data?.data
  // hydrationSebumResults?.data &&
  //   hydrationSebumResults?.data?.data?.map((data: any) => {
  //     if (params.analysis_id === 'dermobellaskin') {
  //       const hydration_t_raw = data.hydration_t_raw_value;
  //       const hydration_t_score = data.hydration_t_score;
  //       const hydration_u_raw = data.hydration_u_raw_value;
  //       const hydration_u_score = data.hydration_u_score;
  //       const hydrationData = {
  //         measurement: 'Hydration',
  //         t_raw: hydration_t_raw,
  //         t_score: hydration_t_score,
  //         u_raw: hydration_u_raw,
  //         u_score: hydration_u_score,
  //         url: '',
  //       };
  //       hydrationSebumData = [...hydrationSebumData, hydrationData];

  //       const sebum_t_raw = data.sebum_t_raw_value;
  //       const sebum_t_score = data.sebum_t_score;
  //       const sebum_u_raw = data.sebum_u_raw_value;
  //       const sebum_u_score = data.sebum_u_score;
  //       const sebum_u_url = data.sebum_u_url;
  //       const sebum_t_url = data.sebum_t_url;

  //       const sebumData = {
  //         measurement: 'Sebum',
  //         t_raw: sebum_t_raw,
  //         t_score: sebum_t_score,
  //         u_raw: sebum_u_raw,
  //         u_score: sebum_u_score,
  //         url: sebum_u_url ? sebum_u_url : sebum_t_url,
  //       };
  //       hydrationSebumData = [...hydrationSebumData, sebumData];
  //     }
  //     if (params.analysis_id === 'dermobellahair') {
  //       // const sebum_score = data.sebum_t_raw_value
  //       // const sebum_t_score = data.sebum_t_score
  //       // const sebum_u_raw = data.sebum_u_raw_value
  //       // const sebum_u_score = data.sebum_u_score
  //       // const sebumData = {
  //       //   measurement: 'sebum',
  //       //   t_raw: sebum_t_raw,
  //       //   t_score: sebum_t_score,
  //       //   u_raw: sebum_u_raw,
  //       //   u_score: sebum_u_score,
  //       //   url: ''
  //       // }
  //       // hydrationSebumData = [...hydrationSebumData, hydrationData]
  //     }
  //   });

  console.log(hydrationSebumData);
  // hydrationSebumData = hydrationSebumData.sort((a, b) => (a.measurement > b.measurement) ? 1 : -1)

  return (
    <Layout
      title={
        <Breadcrumbs aria-label="breadcrumb">
          <Link to="/beauty-consultants/">Beauty Consultants</Link>
          <Link to={`/customer-record/${params.customer_id}`}>{t('sidebar.analysis_history')}</Link>
          <Typography display="initial">
            {t('sidebar.analysis_details')}
          </Typography>
        </Breadcrumbs>
      }
    >
      <Route path="/customer-record/:customer_id/:analysis_id/:batch_id/:image_url">
        {({ match }: RouteComponentProps<{ image_url: string } | null>) => (
          <Viewer
            visible={!!match}
            onClose={() => {
              history.push(
                `/customer-record/${params.customer_id}/${params.analysis_id}/${params.batch_id}/`
              );
            }}
            onMaskClick={() => {
              history.push(
                `/customer-record/${params.customer_id}/${params.analysis_id}/${params.batch_id}/`
              );
            }}
            images={[
              {
                src: `//images.weserv.nl/?url=${decodeURIComponent(
                  match?.params?.image_url || ''
                )}`,
                alt: 'Analysis Image',
              },
            ]}
          />
        )}
      </Route>

      <Box paddingY={2}>
        <Grid container spacing={2}>
          <Grid item sm>
            <Typography>
              <b>{t('analysis_details.customer_id')}:</b>{' '}
              {analysisHistoryDetails.data?.id}
            </Typography>
            <Typography>
              <b>{t('analysis_details.customer_name')}:</b>{' '}
              {analysisHistoryDetails.data?.surname}{' '}
              {analysisHistoryDetails.data?.name}
            </Typography>
            <Typography>
              <b>{t('analysis_history.customer_information')}:</b>{' '}
              {analysisHistoryDetails.data?.email}
            </Typography>
          </Grid>
          <Grid item sm>
            <Typography>
              <b>{t('analysis_history.birth_date')}:</b>{' '}
              {analysisHistoryDetails.data?.birth}
            </Typography>
            <Typography>
              <b>{t('analysis_details.country')}:</b>{' '}
              {analysisHistoryDetails.data?.country}
            </Typography>
            <Typography>
              <b>{t('analysis_details.phone_number')}:</b>{' '}
              {analysisHistoryDetails.data?.phone}
            </Typography>
          </Grid>
          <Grid item sm>
            <Typography>
              <b>{t('analysis_details.skin_group')}:</b>{' '}
              {analysisHistoryDetails.data?.skin_color}
            </Typography>
            <Typography>
              <b>{t('analysis_details.ethnicity')}:</b>{' '}
              {analysisHistoryDetails.data?.ethnicity}
            </Typography>
            <Typography>
              <b>{t('analysis_details.gender')}:</b>{' '}
              {parseGender(analysisHistoryDetails.data?.gender)}
            </Typography>
          </Grid>
        </Grid>
      </Box>

      <Typography>
        <b>{t('analysis_details.measurement_details.title')}</b>
      </Typography>
      <Paper variant="outlined">
        <Box paddingX={2} paddingY={1}>
          <Grid container>
            <Grid item sm={3}>
              <Typography>
                <b>{t('analysis_details.measurement_details.device_id')}:</b>{' '}
                {/* {analysisHistoryDetails.data?.device_details.device_id} */}
              </Typography>
            </Grid>
            <Grid item sm={3}>
              <Typography>
                <b>{t('analysis_details.measurement_details.product_code')}:</b>{' '}
                {/* {analysisHistoryDetails.data?.device_details.product_code} */}
                {params.analysis_id}
              </Typography>
            </Grid>
            <Grid item sm={3}>
              <Typography>
                <b>{t('analysis_details.measurement_details.phone_model')}:</b>{' '}
                {/* {analysisHistoryDetails.data?.device_details.device_model} */}
              </Typography>
            </Grid>
            <Grid item sm={3}>
              <Typography>
                <b>{t('analysis_details.measurement_details.phone_os')}:</b>{' '}
                {/* {analysisHistoryDetails.data?.device_details.os_system_code} */}
              </Typography>
            </Grid>
          </Grid>
        </Box>
        <Divider />
        <Box paddingX={2} paddingY={1}>
          <Grid container>
            <Grid item sm={3}>
              <Typography>
                <b>{t('analysis_details.measurement_details.batch_id')}:</b>{' '}
                {params.batch_id}
              </Typography>
            </Grid>
            <Grid item sm={3}>
              <Typography>
                <b>{t('analysis_details.measurement_details.app_name')}:</b>{' '}
                {analysisHistoryDetails.data?.app_name}
              </Typography>
            </Grid>
            <Grid item>
              <Typography>
                <b>{t('analysis_details.measurement_details.date_time')}:</b>{' '}
                {/* {parseDateString(analysisHistoryDetails.data?.device_details.date || '')} /{' '} */}
                {/* {split(analysisHistoryDetails.data?.device_details.time || '', 2)?.join(':')} */}
              </Typography>
            </Grid>
          </Grid>
        </Box>

        <Divider />
        <Box paddingX={2} paddingY={1}>
          <Grid container>
            <Grid item sm={3}>
              <Typography>
                <b>{t('analysis_details.measurement_details.temperature')}:</b>{' '}
                {/* {analysisHistoryDetails.data?.customer_details.customer_temperature} */}
              </Typography>
            </Grid>
            <Grid item sm={3}>
              <Typography>
                <b>{t('analysis_details.measurement_details.humidity')}:</b>{' '}
                {/* {analysisHistoryDetails.data?.customer_details.customer_humidity} */}
              </Typography>
            </Grid>
            <Grid item>
              <Typography>
                <b>{t('analysis_details.measurement_details.uv_index')}:</b>{' '}
                {/* {analysisHistoryDetails.data?.customer_details.customer_uv_index} */}
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Paper>

      <Box marginBottom={1} marginTop={4}>
        <Typography>
          <b>Moisture Information</b>
        </Typography>
      </Box>

      <Grid item xs>
        <TableWrapper
          style={{
            maxHeight: '100%',
            overflowX: 'initial',
            position: 'relative',
          }}
          // isLoading={results.isValidating}
        >
          <Table size="small" aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell colSpan={12} size="medium">
                  Measurement
                </TableCell>
                <TableCell align="left" colSpan={12} size="medium">
                  Score
                </TableCell>
                <TableCell align="left" colSpan={12} size="medium">
                  Raw Score
                </TableCell>
                <TableCell align="left" colSpan={12} size="medium">
                  Image
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {hydrationSebumData && hydrationSebumData.map((row: any) => (
                <TableRow key={row.measurement}>
                  <TableCell
                    component="th"
                    scope="row"
                    colSpan={12}
                    size="medium"
                  >
                    {row.measurement}
                  </TableCell>
                  <TableCell align="left" colSpan={12} size="medium">
                    {row?.args?.score}
                  </TableCell>
                  <TableCell align="left" colSpan={12} size="medium">
                    {row?.args?.score}
                  </TableCell>
                  <TableCell align="left" colSpan={12} size="medium">
                    {row.original_image ? (
                      <Link
                        to={`/customer-record/${params.customer_id}/${
                          params.analysis_id
                        }/${params.batch_id}/${encodeURIComponent('https://' + row.original_image)}`}
                      >
                        {t(
                          'analysis_details.analysis_information.view_details'
                        )}
                      </Link>
                    ) : (
                      <Typography color="textSecondary">
                        {t('analysis_details.analysis_information.no_img')}
                      </Typography>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableWrapper>
      </Grid>

      <Box marginBottom={1} marginTop={2}>
        <Typography>
          <b>{t('analysis_details.analysis_information.title')}</b>
        </Typography>
      </Box>

      <DataTable<AnalysisInformation>
        dataIndex="id"
        disableCheckbox
        resource_url={`/api/partnerdb/customers/${params.customer_id}/analysis_histories/${params.batch_id}`}
        normalize={
          (data) =>
            data?.map((i, idx) => {
              const prevItemsLength = data.slice(0, idx).reduce((sum, curr) => {
                if (curr.measurement === i.measurement) {
                  return sum + 1;
                }
                return sum;
              }, 0);

              return {
                ...i,
                measurement: `${i.measurement} ${prevItemsLength + 1}`,
              };
            })
          // eslint-disable-next-line react/jsx-curly-newline
        }
        params={{
          analysis_type: params.analysis_id,
          batch_id: params.batch_id,
        }}
        columns={[
          {
            label: t('analysis_details.analysis_information.measurement'),
            key: 'measurement',
          },
          {
            label: t('analysis_details.analysis_information.score'),
            content: ({ args }) => Math.floor(Number(args.score)),
          },
          {
            label: t('analysis_details.analysis_information.raw_value'),
            content: ({ args }) => args.raw || '-',
            hide: !has_access_to_analysis_information_row_value,
          },
          {
            label: t('analysis_details.analysis_information.image'),
            content: ({ original_image, analyzed_image }) => {
              return original_image ? (
                <Link
                  to={`/customer-record/${params.customer_id}/${
                    params.analysis_id
                  }/${params.batch_id}/${encodeURIComponent(
                    'https://' + original_image
                  )}`}
                >
                  {t('analysis_details.analysis_information.view_details')}
                </Link>
              ) : analyzed_image ? (
                <Link
                  to={`/customer-record/${params.customer_id}/${
                    params.analysis_id
                  }/${params.batch_id}/${encodeURIComponent(
                    'https://' + analyzed_image
                  )}`}
                >
                  {t('analysis_details.analysis_information.view_details')}
                </Link>
              ) : (
                <Typography color="textSecondary">
                  {t('analysis_details.analysis_information.no_img')}
                </Typography>
              );
            },
          },
        ]}
        toolbar={{
          pagination: false,
        }}
      />
    </Layout>
  );
}
