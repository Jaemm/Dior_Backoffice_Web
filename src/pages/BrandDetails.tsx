import { Grid } from '@material-ui/core';
import { useRequest } from 'ahooks';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { InferType } from 'yup';

import { useAPI } from '../api/API';
import { Layout } from '../components/Layout';
// import { parseDateString } from '../helpers/dateHelpers';
import {
  numberSchema,
  objectSchema,
  stringSchema,
} from '../helpers/SchemaHelpers';

import { DataTable } from '../components/DataTable';
import NewDataTable from '../components/NewDataTable';
export type CompanyInfo = InferType<typeof companyInfoSchema>;
const companyInfoSchema = objectSchema({
  address: stringSchema().nullable(),
  email: stringSchema().nullable(),
  name: stringSchema().nullable(),
  phone: stringSchema().nullable(),
  registration_date: stringSchema().nullable(),
});

type BrandAndStore = InferType<typeof brandAndStoreSchema>;
const brandAndStoreSchema = objectSchema({
  branch: stringSchema(),
  country: stringSchema(),
  id: numberSchema(),
  status: numberSchema(),
  name: stringSchema(),
  store: stringSchema(),
  email: stringSchema(),
  phone: stringSchema(),
});

export default function BrandDetailsPage() {
  const api = useAPI();
  const { t } = useTranslation();
  const { data: companyInfo } = useRequest<{ data: CompanyInfo }>(() =>
    api.requestResource('/api/partnerdb/companies/me')
  );

  const headers = [
    { label: 'Name', key: 'name' },
    { label: 'ID', key: 'id' },
    { label: 'Address', key: 'adderess' },
    { label: 'Email', key: 'email' },
    { label: 'Phone Number', key: 'phone' },
  ];

  return (
    <Layout title={t('sidebar.brand_details')}>
      <Grid container direction="column" spacing={2} wrap="nowrap">
        <Grid item xs>
          {/* <NewDataTable /> */}
          <DataTable<BrandAndStore>
            dataIndex="id"
            resource_url="/api/partnerdb/consultants"
            headers={headers}
            columns={[
              { label: t('brand_details.store'), key: 'store' },
              { label: t('brand_details.country'), key: 'country' },
              { label: t('brand_details.bm'), key: 'name' },
              { label: t('brand_details.email'), key: 'email' },
              { label: t('brand_details.phone'), key: 'phone' },
              {
                label: t('brand_details.status'),
                key: 'status',
                content: ({ status }) =>
                  status
                    ? t('brand_details.active')
                    : t('brand_details.inactive'),
              },
              {
                label: t('brand_details.assigned_customers'),
                key: 'id',
                content: ({ id }) => (
                  <Link to={`/brand-details/${id}/`}>
                    {t('brand_details.view_customers')}
                  </Link>
                ),
              },
            ]}
            toolbar={{
              search: true,
              filter: true,
              pagination: true,
              export: true,
            }}
            filters={[
              { label: t('brand_details.all'), key: '-id' },
              {
                label: t('brand_details.country'),
                key: 'country',
              },
              {
                label: t('brand_details.name'),
                key: 'name',
              },
              {
                label: t('brand_details.email'),
                key: 'email',
              },
              {
                label: t('brand_details.status'),
                key: 'status',
              },
            ]} 
          />
        </Grid>
      </Grid>
    </Layout>
  );
}
