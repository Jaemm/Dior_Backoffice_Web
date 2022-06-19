import { Grid, Button, Modal, Box, TextField, MenuItem, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from '@material-ui/core';
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
export default function BrandDetailsPage() {
  const api = useAPI();
  const { t } = useTranslation();
  const branchesInfo = useRequest(() =>
    api.requestResource('/api/dior/company_branches')
  );
  const { token } = useAppContext();
  const csvFile = useRef(null) 

  const [openModal, setOpenModal] = useState(false)
  const [country, setCountry] = useState('')
  const [code, setCode] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [reloadNow, setReloadNow] = useState(false)
  const [selectedRowIds, setSelectedRowIds] = useState([]);
  const [bcCode, setBcCode] = useState('')
  const [modalType, setModalType] = useState('')
  const [dataInCSV, setDataInCSV] = useState('')
  const [exportLoading, setExportLoading] = useState(false)

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
    const bcData = {
      ids: selectedRowIds
    }
    if (window.confirm("Delete the item?")) {
      axios({
        method: 'DELETE',
        url: 'https://v2-app.chowis.com/api/dior/company_consultants/delete_multiple',
        data: bcData,
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

  const onClickExportButton = () => {
    setExportLoading(true)
    const url = 'https://v2-app.chowis.com/api/dior/company_consultants/export'
    axios({
      method: 'GET',
      url: url,
      headers: {
        'X-CHOWIS-CONSULTANT-TOKEN': token,
      },
    })
    .then((res) => {
      console.log(res)
      if(res.status === 200){
        setDataInCSV(res.data)
        if(csvFile && csvFile.current){
          // @ts-ignore: Object is possibly 'null'.
          csvFile.current.click()
        }
      }
      setExportLoading(false)
    })
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
            style={{marginRight: '10px'}}
            color="primary">
            Delete
            
          </Button>
          <Button
            variant="contained"
            onClick={()=> {onClickUploadButton()}}
            style={{marginRight: '10px'}}
            color="primary">
            Upload
          </Button>
          <Button
            variant="contained"
            onClick={()=> {onClickExportButton()}}
            disabled={exportLoading}
            color="primary">
            {exportLoading ? 'Loading ...' : 'Export'}
          </Button>
          <a
            href={`data:text/csv;charset=utf-8,${escape(dataInCSV)}`}
            download="bc_list.csv"
            ref={csvFile}
            style={{display: 'none'}}
          >
            download
          </a>
      </Grid>
    </Grid>

  const saveBc = () => {
    const bcData = {
      country: country,
      consultant_branch_id: code,
      name: name,
      email: email,
      password: password,
      code: bcCode
    }

    axios({
      method: 'POST',
      url: 'https://v2-app.chowis.com/api/dior/company_consultants',
      data: bcData,
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
      <Box className="modal-box" style={{height: '620px'}}>
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
          select
          fullWidth
          value={code}
          style={{marginTop: '20px'}}
          onChange={(e) => {
            setCode(e.target.value)
          }}
          InputLabelProps={{ shrink: true }}
        >
          {branchesInfo && branchesInfo?.data?.data && branchesInfo?.data?.data.map(e => 
            <MenuItem key={e.id} value={e.id}>
              {e.code}
            </MenuItem>
          )}
        </TextField>
        <TextField
          label={'BC Code'}
          variant="outlined"
          size="small"
          fullWidth
          value={bcCode}
          style={{marginTop: '20px'}}
          onChange={(e) => {
            setBcCode(e.target.value)
          }}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          label={'BC Name'}
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
          label={'BC Email'}
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
        <FormControl>
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

        <div style={{display: 'flex', justifyContent: 'space-between'}}>
          <Button
            variant="contained"
            color="primary"
            style={{marginRight: '10px', width: '192px'}}
            onClick={() => {saveBc()}}
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

  console.log('branchesInfo', branchesInfo)
  // const branchesSelect = branchesInfo.map((e) => return({id: e.id, name: e.name, code: e.code}))
  return (
    <Layout title={t('sidebar.beauty_consultant')}>
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
              saveUploadUrl='https://v2-app.chowis.com/api/dior/company_consultants/import'
              exampleFileUrl=''
              modelName='BC'
            />
          }
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
            columns={[
              { label: t('brand_details.country'), key: 'country' },
              { label: 'Pos Code', key: 'pos_code' },
              { label: 'BC Code', key: 'code' },
              { label: t('brand_details.name'), key: 'name' },
              { label: t('brand_details.email'), key: 'email' },
              { label: t('brand_details.status'), key: 'status' },
              { label: 'Details', key: 'details',
                content: ({ id }) => (
                  <Link to={`/brand-details/${id}/`}>
                    {t('analysis_history.view_details')}
                  </Link>
                ),
              }
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
