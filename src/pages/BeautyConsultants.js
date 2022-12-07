import {
  Grid,
  Button,
  Modal,
  Box,
  TextField,
  MenuItem,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  IconButton,
} from '@material-ui/core';
import { useRequest } from 'ahooks';
import React, { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import { InferType } from 'yup';
import { Close } from '@material-ui/icons';
import { useAPI } from '../api/API';
import { Layout } from '../components/Layout';
// import { parseDateString } from '../helpers/dateHelpers';
import {
  numberSchema,
  objectSchema,
  stringSchema,
} from '../helpers/SchemaHelpers';
import { useAppContext } from '../data/AppContext';
import axios from 'axios';

import { DataTable } from '../components/DataTable';
import NewDataTable from '../components/NewDataTable';
import UploadForm from '../components/UploadForm';
export default function BrandDetailsPage() {
  const api = useAPI();
  const { t } = useTranslation();
  const branchesInfo = useRequest(() =>
    api.requestResource('/api/dior/company_branches?page=1&per=10000')
  );
  const { token } = useAppContext();
  const csvFile = useRef(null);

  const [openModal, setOpenModal] = useState(false);
  const [country, setCountry] = useState('');
  const [code, setCode] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [reloadNow, setReloadNow] = useState(false);
  const [selectedRowIds, setSelectedRowIds] = useState([]);
  const [selectedRow, setSelectedRow] = useState([]);

  const [bcCode, setBcCode] = useState('');
  const [modalType, setModalType] = useState('');
  const [dataInCSV, setDataInCSV] = useState('');
  const [exportLoading, setExportLoading] = useState(false);
  let { search } = useLocation();
  const query = new URLSearchParams(search);

  const headers = [
    { label: 'Name', key: 'name' },
    { label: 'ID', key: 'id' },
    { label: 'Address', key: 'adderess' },
    { label: 'Email', key: 'email' },
    { label: 'Phone Number', key: 'phone' },
  ];

  const onClickAddButton = () => {
    // alert('onClickAddButton')
    setModalType('add-form');
    setOpenModal(true);
  };

  const onClickUploadButton = () => {
    setModalType('upload-form');
    setOpenModal(true);
  };

  const deleteMultiplePos = () => {
    console.log(selectedRowIds);
    const bcData = {
      ids: selectedRowIds,
    };
    let message = 'Are you sure want to delete below BC ? \n\n';
    let rowInfo = selectedRow.map(
      (e) => `${e.country}-${e.pos_code}-${e.code}-${e.name}\n`
    );
    console.log(rowInfo.join(''));
    if (window.confirm(`${message}${rowInfo.join('')}`)) {
      axios({
        method: 'DELETE',
        url:
          'https://v2-app.chowis.com/api/dior/company_consultants/delete_multiple',
        data: bcData,
        headers: {
          'X-CHOWIS-CONSULTANT-TOKEN': token,
        },
      }).then((res) => {
        console.log(res);
        if (res.status === 200) {
          // reload
          setReloadNow(true);
          setOpenModal(false);
        }
      });
    }
  };

  const onClickExportButton = () => {
    setExportLoading(true);
    let url = `https://v2-app.chowis.com/api/dior/company_consultants/export?`;
    if (query.get('filter_by')) {
      url += `filter_by=${query.get('filter_by')}`;
    }
    if (query.get('filter_by_2')) {
      url += `&filter_by_2=${query.get('filter_by_2')}`;
    }
    if (query.get('search')) {
      url += `&search=${query.get('search')}`;
    }
    if (selectedRowIds) {
      url += `&ids=${selectedRowIds}`;
    }
    axios({
      method: 'GET',
      url: url,
      headers: {
        'X-CHOWIS-CONSULTANT-TOKEN': token,
      },
    }).then((res) => {
      console.log(res);
      if (res.status === 200) {
        setDataInCSV(res.data);
        if (csvFile && csvFile.current) {
          // @ts-ignore: Object is possibly 'null'.
          csvFile.current.click();
        }
      }
      setExportLoading(false);
    });
  };

  const countriesInfo = useRequest(() =>
    api.requestResource('api/dior/countries')
  );

  const countriesSelect = countriesInfo?.data?.data?.map((e) => ({
    key: e?.name,
    label: e?.name,
  }));

  console.log(countriesSelect);

  const toolbarButtons = (
    <Grid item>
      <Grid container spacing={2}>
        <Button
          variant="contained"
          color="primary"
          style={{ marginRight: '10px' }}
          onClick={() => {
            onClickAddButton();
          }}
        >
          Add
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            deleteMultiplePos();
          }}
          style={{ marginRight: '10px' }}
          color="primary"
        >
          Delete
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            onClickUploadButton();
          }}
          style={{ marginRight: '10px' }}
          color="primary"
        >
          Upload
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            onClickExportButton();
          }}
          disabled={exportLoading}
          color="primary"
        >
          {exportLoading ? 'Loading ...' : 'Export'}
        </Button>
        <a
          href={`data:text/csv;charset=utf-8,${escape(dataInCSV)}`}
          download="bc_list.csv"
          ref={csvFile}
          style={{ display: 'none' }}
        >
          download
        </a>
      </Grid>
    </Grid>
  );

  const saveBc = () => {
    const bcData = {
      country: country,
      consultant_branch_id: code,
      name: name,
      email: email,
      password: password,
      code: bcCode,
    };

    axios({
      method: 'POST',
      url: 'https://v2-app.chowis.com/api/dior/company_consultants',
      data: bcData,
      headers: {
        'X-CHOWIS-CONSULTANT-TOKEN': token,
      },
    }).then((res) => {
      console.log(res);
      if (res.status === 200) {
        // reload
        setReloadNow(true);
        setOpenModal(false);
      }
    });
  };

  const renderAddForm = () => {
    return (
      <Box className="modal-box" style={{ height: '620px' }}>
        <div className="modal-header">ADD NEW BC</div>
        <div
          style={{
            width: '100%',
            height: '100%',
            position: 'absolute',
          }}
        >
          <IconButton
            style={{
              top: '-2em',
              right: '-17em',
            }}
            onClick={() => {
              setOpenModal(false);
            }}
          >
            <Close />
          </IconButton>
        </div>
        <TextField
          label={'Country'}
          variant="outlined"
          size="small"
          select
          fullWidth
          value={country}
          style={{ marginTop: '20px' }}
          onChange={(e) => {
            setCountry(e.target.value);
          }}
          InputLabelProps={{ shrink: true }}
        >
          {countriesSelect?.map(({ label, key }) => (
            <MenuItem key={key} value={key}>
              {label}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          label={'POS Code'}
          variant="outlined"
          size="small"
          select
          fullWidth
          value={code}
          style={{ marginTop: '20px' }}
          onChange={(e) => {
            setCode(e.target.value);
          }}
          InputLabelProps={{ shrink: true }}
        >
          {branchesInfo &&
            branchesInfo?.data?.data &&
            branchesInfo?.data?.data.map((e) => (
              <MenuItem key={e.id} value={e.id}>
                {e.code}
              </MenuItem>
            ))}
        </TextField>
        <TextField
          label={'BC Code'}
          variant="outlined"
          size="small"
          fullWidth
          value={bcCode}
          style={{ marginTop: '20px' }}
          onChange={(e) => {
            setBcCode(e.target.value);
          }}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          label={'BC Name'}
          variant="outlined"
          size="small"
          fullWidth
          value={name}
          style={{ marginTop: '20px' }}
          onChange={(e) => {
            setName(e.target.value);
          }}
          InputLabelProps={{ shrink: true }}
        />
        <FormControl style={{ marginTop: '20px' }}>
          <FormLabel id="demo-radio-buttons-group-label">Is Active</FormLabel>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="female"
            name="radio-buttons-group"
            class="is-active-radio-div"
            row
          >
            <FormControlLabel value="0" control={<Radio />} label="Yes" />
            <FormControlLabel value="1" control={<Radio />} label="No" />
          </RadioGroup>
        </FormControl>

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button
            variant="contained"
            color="primary"
            style={{ marginRight: '10px', width: '192px' }}
            onClick={() => {
              setOpenModal(false);
            }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            style={{ marginRight: '10px', width: '192px' }}
            onClick={() => {
              saveBc();
            }}
          >
            Save
          </Button>
          <Button
            variant="contained"
            color="primary"
            style={{ width: '192px' }}
            onClick={() => {}}
          >
            Save & New
          </Button>
        </div>
      </Box>
    );
  };

  // const listOfBranches = branchesInfo && branchesInfo?.data?.data && branchesInfo?.data?.data.map(e => { "label": e.code, "key": e.id }) || [];

  console.log('branchesInfo', branchesInfo);
  const branchesSelect = branchesInfo?.data?.data.map((e) => ({
    key: e.id,
    name: e.name,
    label: e.code,
  }));
  console.log('branchesSelect', branchesSelect);

  const listSample = [
    {
      Country: '',
      'POS code': '',
      'BC code': '',
      'BC name': '',
      'BC email': '',
      'is Active': '',
    },
  ];

  return (
    <Layout title={t('sidebar.beauty_consultant')}>
      <Modal
        open={openModal}
        onClose={() => {
          setOpenModal(false);
        }}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <>
          {modalType === 'add-form' && renderAddForm()}
          {modalType === 'upload-form' && (
            <UploadForm
              token={token}
              onClose={() => setOpenModal(false)}
              saveUploadUrl="https://v2-app.chowis.com/api/dior/company_consultants/import"
              modelName="BC"
              isExcel={true}
              sample={listSample}
            />
          )}
        </>
      </Modal>
      <Grid container direction="column" spacing={2} wrap="nowrap">
        <Grid item xs>
          <DataTable
            dataIndex="id"
            resource_url="/api/dior/company_consultants"
            headers={headers}
            reloadNow={reloadNow}
            setReloadNow={setReloadNow}
            setSelectedRowIdsFromParent={setSelectedRowIds}
            setSelectedRowFromParent={setSelectedRow}
            columns={[
              { label: t('brand_details.country'), key: 'country' },
              { label: 'Pos Code', key: 'pos_code' },
              { label: 'BC Code', key: 'code' },
              { label: t('brand_details.name'), key: 'name' },
              { label: t('brand_details.email'), key: 'pos_email' },
              { label: t('brand_details.status'), key: 'status' },
              {
                label: 'Details',
                key: 'details',
                content: ({ id }) => (
                  <Link to={`/brand-details/${id}/`}>
                    {t('analysis_history.view_details')}
                  </Link>
                ),
              },
            ]}
            toolbar={{
              search: true,
              filter: false,
              pagination: true,
              export: true,
              filter_select: true,
              filter_select2: true,
            }}
            filter_label="Filter by Country"
            filter_label_2="Filter by POS"
            toolbarButtons={toolbarButtons}
            filters={[
              { label: 'France', key: 'france' },
              { label: 'Japan', key: 'japan' },
            ]}
            filters2={branchesSelect}
          />
        </Grid>
      </Grid>
    </Layout>
  );
}
