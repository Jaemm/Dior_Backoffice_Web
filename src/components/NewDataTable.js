import React from 'react';
import { Button, Grid } from '@material-ui/core';
import { CloudDownload } from '@material-ui/icons';
import { CSVLink } from 'react-csv';
import { useTranslation } from 'react-i18next';

const NewDataTable = () => {
  // const { t } = useTranslation();
  // const checkedData = data ? data : [];
  return (
    <div className="">
      <new-header>
        <span class="new-col">Country</span>
        <span class="new-col">POS Code</span>
        <span class="new-col">POS Name</span>
        <span class="new-col">POS Email</span>
        <span class="new-col">Active Devices</span>
        <span class="new-col">Password</span>
        <span class="new-col">Last Consultation Date</span>
      </new-header>
      <div class="new-row">
        <span class="new-col">country</span>
        <span class="new-col">POS_code</span>
        <span class="new-col">POS_name</span>
        <span class="new-col">POS_email</span>
        <span class="new-col">No. Of_devices</span>
        <span class="new-col">Password</span>
        <span class="new-col">MM-DD-YYYY</span>
      </div>
      <div class="new-row">
        <span class="new-col">country</span>
        <span class="new-col">POS_code</span>
        <span class="new-col">POS_name</span>
        <span class="new-col">POS_email</span>
        <span class="new-col">No. Of_devices</span>
        <span class="new-col">Password</span>
        <span class="new-col">MM-DD-YYYY</span>
      </div>
      <div class="new-row">
        <span class="new-col">country</span>
        <span class="new-col">POS_code</span>
        <span class="new-col">POS_name</span>
        <span class="new-col">POS_email</span>
        <span class="new-col">No. Of_devices</span>
        <span class="new-col">Password</span>
        <span class="new-col">MM-DD-YYYY</span>
      </div>
      <div class="new-row">
        <span class="new-col">country</span>
        <span class="new-col">POS_code</span>
        <span class="new-col">POS_name</span>
        <span class="new-col">POS_email</span>
        <span class="new-col">No. Of_devices</span>
        <span class="new-col">Password</span>
        <span class="new-col">MM-DD-YYYY</span>
      </div>
      <div class="new-row">
        <span class="new-col">country</span>
        <span class="new-col">POS_code</span>
        <span class="new-col">POS_name</span>
        <span class="new-col">POS_email</span>
        <span class="new-col">No. Of_devices</span>
        <span class="new-col">Password</span>
        <span class="new-col">MM-DD-YYYY</span>
      </div>
      <div class="new-row">
        <span class="new-col">country</span>
        <span class="new-col">POS_code</span>
        <span class="new-col">POS_name</span>
        <span class="new-col">POS_email</span>
        <span class="new-col">No. Of_devices</span>
        <span class="new-col">Password</span>
        <span class="new-col">MM-DD-YYYY</span>
      </div>
      <div class="new-row">
        <span class="new-col">country</span>
        <span class="new-col">POS_code</span>
        <span class="new-col">POS_name</span>
        <span class="new-col">POS_email</span>
        <span class="new-col">No. Of_devices</span>
        <span class="new-col">Password</span>
        <span class="new-col">MM-DD-YYYY</span>
      </div>
    </div>
  );
};

export default NewDataTable;
