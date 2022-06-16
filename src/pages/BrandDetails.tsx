import { Grid, Button, Modal, Box, TextField, MenuItem } from '@material-ui/core';
import { useRequest } from 'ahooks';
import React, {useState, useRef} from 'react';
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
import { useAppContext } from '../data/AppContext';
import axios from 'axios';

import { DataTable } from '../components/DataTable';
import NewDataTable from '../components/NewDataTable';
import UploadForm from '../components/UploadForm';
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
  id: numberSchema(),
  name: stringSchema(),
  code: stringSchema(),
  email: stringSchema(),
  country: stringSchema(),
  password: stringSchema(),
  total_devices: numberSchema(),
  last_consultation_date: stringSchema(),
  created_at: stringSchema(),
});

export default function BrandDetailsPage() {
  const api = useAPI();
  const { t } = useTranslation();
  const { data: companyInfo } = useRequest<{ data: CompanyInfo }>(() =>
    api.requestResource('/api/partnerdb/companies/me')
  );
  const { token } = useAppContext();

  const [openModal, setOpenModal] = useState(false)
  const [modalType, setModalType] = useState('')
  const [country, setCountry] = useState('')
  const [code, setCode] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [reloadNow, setReloadNow] = useState(false)
  const [selectedRowIds, setSelectedRowIds] = useState([]);
  const headers = [
    { label: 'Name', key: 'name' },
    { label: 'ID', key: 'id' },
    { label: 'Address', key: 'adderess' },
    { label: 'Email', key: 'email' },
    { label: 'Phone Number', key: 'phone' },
  ];

  const onClickAddButton = () => {
    // alert('onClickAddButton')
    setModalType('add-form')
    setOpenModal(true)
  }

  const onClickUploadButton = () => {
    setModalType('upload-form')
    setOpenModal(true)
  }

  const deleteMultiplePos = () => {
    console.log(selectedRowIds)
    const posData = {
      ids: selectedRowIds
    }
    if (window.confirm("Delete the item?")) {
      axios({
        method: 'DELETE',
        url: 'https://v2-app.chowis.com/api/dior/company_branches/delete_multiple',
        data: posData,
        headers: {
          'X-CHOWIS-CONSULTANT-TOKEN': token,
        },
      })
      .then((res) => {
        console.log(res)
        if(res.status === 200){
          // reload
          setReloadNow(true)
          setOpenModal(false)
        }
      })
    }
  }

  const toolbarButtons =
    <Grid item>
      <Grid container spacing={2}>
          <Button
            variant="contained"
            color="primary"
            style={{marginRight: '10px'}}
            onClick={() => {onClickAddButton()}}
          >
            Add
          </Button>
          <Button
            variant="contained"
            onClick={()=> {deleteMultiplePos()}}
            color="primary"
            style={{marginRight: '10px'}}
          >
            Delete
            
          </Button>
          <Button
            variant="contained"
            onClick={()=> {onClickUploadButton()}}
            color="primary">
            Upload
          </Button>
      </Grid>
    </Grid>

  const savePos = () => {
    const posData = {
      country: country,
      code: code,
      name: name,
      email: email,
      password: password
    }

    axios({
      method: 'POST',
      url: 'https://v2-app.chowis.com/api/dior/company_branches',
      data: posData,
      headers: {
        'X-CHOWIS-CONSULTANT-TOKEN': token,
      },
    })
    .then((res) => {
      console.log(res)
      if(res.status === 200){
        // reload
        setReloadNow(true)
        setOpenModal(false)
      }
    })
  }

  const renderAddForm = () => {
    return(
      <Box className="modal-box">
        <div className="modal-header">ADD NEW POS</div>
        <TextField
          label={'Country'}
          variant="outlined"
          size="small"
          select
          fullWidth
          value={country}
          style={{marginTop: '20px'}}
          onChange={(e) => {
            setCountry(e.target.value)
          }}
          InputLabelProps={{ shrink: true }}
        >
          <MenuItem key={1} value={'FRANCE'}>
            FRANCE
          </MenuItem>
          <MenuItem key={1} value={'KOREA'}>
            KOREA
          </MenuItem>
        </TextField>
        <TextField
          label={'POS Code'}
          variant="outlined"
          size="small"
          fullWidth
          value={code}
          style={{marginTop: '20px'}}
          onChange={(e) => {
            setCode(e.target.value)
          }}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          label={'POS Name'}
          variant="outlined"
          size="small"
          fullWidth
          value={name}
          style={{marginTop: '20px'}}
          onChange={(e) => {
            setName(e.target.value)
          }}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          label={'POS Email'}
          variant="outlined"
          size="small"
          fullWidth
          value={email}
          style={{marginTop: '20px'}}
          onChange={(e) => {
            setEmail(e.target.value)
          }}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          label={'Password'}
          variant="outlined"
          size="small"
          fullWidth
          value={password}
          type="password"
          style={{marginTop: '20px', marginBottom: '20px'}}
          onChange={(e) => {
            setPassword(e.target.value)
          }}
          InputLabelProps={{ shrink: true }}
        />
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
          <Button
            variant="contained"
            color="primary"
            style={{marginRight: '10px', width: '192px'}}
            onClick={() => {savePos()}}
          >
            Save
          </Button>
          <Button
            variant="contained"
            color="primary"
            style={{width: '192px'}}
            onClick={() => {}}
          >
            Save & New
          </Button>
        </div>
      </Box>
    )
  }

  return (
    <Layout title={t('sidebar.brand_details')}>
      <Modal
        open={openModal}
        onClose={()=>{setOpenModal(false)}}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        style={{display:'flex',alignItems:'center',justifyContent:'center'}}
      >
        <>
          {modalType === 'add-form' && renderAddForm()}
          {modalType === 'upload-form' && 
            <UploadForm 
              token={token} 
              onClose={() => setOpenModal(false)}
              saveUploadUrl='https://v2-app.chowis.com/api/dior/company_branches/import'
              exampleFileUrl=''
              modelName='POS'
            />
          }
        </>
      </Modal>
      <Grid container direction="column" spacing={2} wrap="nowrap">
        <Grid item xs>
          <DataTable<BrandAndStore>
            dataIndex="id"
            resource_url="/api/dior/company_branches"
            headers={headers}
            reloadNow={reloadNow}
            setReloadNow={setReloadNow}
            setSelectedRowIdsFromParent={setSelectedRowIds}
            columns={[
              { label: t('brand_details.country'), key: 'country' },
              { label: t('brand_details.code'), key: 'code' },
              { label: t('brand_details.name'), key: 'name' },
              { label: t('brand_details.email'), key: 'email' },
              { label: t('brand_details.total_devices'), key: 'total_devices' },
              { label: t('brand_details.password'), key: 'password' },
              { label: t('brand_details.last_consultation_date'), key: 'last_consultation_date' },
              // {
              //   label: t('brand_details.status'),
              //   key: 'status',
              //   content: ({ status }) =>
              //     status
              //       ? t('brand_details.active')
              //       : t('brand_details.inactive'),
              // },
              // {
              //   label: t('brand_details.assigned_customers'),
              //   key: 'id',
              //   content: ({ id }) => (
              //     <Link to={`/brand-details/${id}/`}>
              //       {t('brand_details.view_customers')}
              //     </Link>
              //   ),
              // },
            ]}
            toolbar={{
              search: true,
              filter: true,
              pagination: true,
              export: true,
            }}
            toolbarButtons={toolbarButtons}
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
