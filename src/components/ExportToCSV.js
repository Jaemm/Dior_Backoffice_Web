import React from 'react';
import { Button, Grid } from '@material-ui/core';
import { CloudDownload } from '@material-ui/icons';
import { CSVLink } from 'react-csv';
import { useTranslation } from 'react-i18next';

const ExportToCSV = ({ data, headers }) => {
  const { t } = useTranslation();
  const checkedData = data ? data : [];
  return (
    <Grid item>
      <CSVLink data={checkedData} headers={headers} filename={'Export.csv'}>
        <Button
          color="primary"
          variant="contained"
          startIcon={<CloudDownload />}
        >
          {t('datatable.export')}
        </Button>
      </CSVLink>
    </Grid>
  );
};

export default ExportToCSV;
