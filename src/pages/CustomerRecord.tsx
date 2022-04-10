import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { DataTable } from '../components/DataTable';

import { Layout } from '../components/Layout';
import { Customers } from './AssignedCustomers';

function CustomerRecord() {
  const { t } = useTranslation();

  const headers = [
    { label: 'Name', key: 'name' },
    { label: 'ID', key: 'id' },
    { label: 'Address', key: 'adderess' },
    { label: 'Email', key: 'email' },
    { label: 'Phone Number', key: 'phone' },
    { label: 'Birth', key: 'birth' },
    { label: 'Age', key: 'age' },
    { label: 'OS', key: 'os' },
  ];
  return (
    <Layout title={t('customer_record.title')}>
      <DataTable<Customers>
        dataIndex="id"
        headers={headers}
        resource_url="/api/partnerdb/customers"
        columns={[
          { label: t('customer_record.last_name'), key: 'surname' },
          { label: t('customer_record.first_name'), key: 'name' },
          { label: t('customer_record.service_name'), key: 'app_name' },
          { label: t('customer_record.email'), key: 'email' },
          { label: t('customer_record.phone_number'), key: 'phone' },
          { label: t('customer_record.country'), key: 'country' },
          {
            label: t('analysis_history.title'),
            key: 'id',
            content: ({ id }) => (
              <Link to={`/customer-record/${id}/`}>
                {t('analysis_history.view_details')}
              </Link>
            ),
          },
        ]}
        toolbar={{
          search: true,
          // filter_by_date: true,
          filter: true,
          pagination: true,
          export: true,
        }}
        filters={[
          { label: t('brand_details.all'), key: 'all' },
          { label: t('customer_record.last_name'), key: 'surname' },
          { label: t('customer_record.first_name'), key: 'name' },
          { label: t('customer_record.service_name'), key: 'app_name' },
          { label: t('customer_record.email'), key: 'email' },
          { label: t('customer_record.phone_number'), key: 'phone' },
          { label: t('customer_record.country'), key: 'country' },
        ]}
      />
    </Layout>
  );
}

export default CustomerRecord;
