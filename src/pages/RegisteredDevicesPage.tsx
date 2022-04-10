import * as countries from 'i18n-iso-countries';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { InferType } from 'yup';

import { DataTable } from '../components/DataTable';
import { Layout } from '../components/Layout';
import { parseDateString } from '../helpers/dateHelpers';
import { objectSchema, stringSchema } from '../helpers/SchemaHelpers';

countries.registerLocale(require('i18n-iso-countries/langs/en.json'));

type DeviceDTO = InferType<typeof registeredDeviceSchema>;
const registeredDeviceSchema = objectSchema({
  country_code: stringSchema(),
  user_email: stringSchema(),
  user_id: stringSchema(),
  optic_number: stringSchema(),
  store_name: stringSchema(),
  branch_name: stringSchema(),
  devicetype_code: stringSchema(),
  devicetype_id: stringSchema(),
  created_at: stringSchema(),
});

export default function RegisteredDevicesPage() {
  const { t } = useTranslation();

  const headers = [
    { label: 'ID', key: 'id' },
    { label: 'App update date', key: 'app_update_date' },
    { label: 'App version', key: 'app_version' },
    { label: 'Cal', key: 'cal' },
    { label: 'Created at', key: 'created_at' },
    { label: 'Division', key: 'division' },
    { label: 'Docking number', key: 'docking_number' },
    { label: 'Optic number', key: 'optic_number' },
    { label: 'Refresh date', key: 'refresh_date' },
    { label: 'Serial number', key: 'serial_number' },
    { label: 'Use yn', key: 'use_yn' },
    { label: 'WB', key: 'wb' },
  ];
  return (
    <Layout title={t('registered_devices.title')}>
      <DataTable<DeviceDTO>
        dataIndex="optic_number"
        headers={headers}
        resource_url="/api/partnerdb/devices"
        columns={[
          { label: t('registered_devices.device_id'), key: 'optic_number' },
          {
            label: t('registered_devices.device_code'),
            key: 'devicetype_code',
          },
          {
            label: t('registered_devices.purchase_date'),
            key: 'created_at',
          },
          {
            label: t('registered_devices.country'),
            content: ({ country_code }) =>
              countries.getName(country_code, 'en'),
          },
          { label: t('registered_devices.store'), key: 'store_name' },
          // { label: 'User', content: ({ user_email, user_id }) => `${user_id} ${user_email}` },
        ]}
        toolbar={{
          search: true,
          filter_by_date: true,
          pagination: true,
          export: true,
        }}
      />
    </Layout>
  );
}
