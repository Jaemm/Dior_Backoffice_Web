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
export default function RegisteredDevicesPage() {
  const api = useAPI();
  const { t } = useTranslation();
  const branchesInfo = useRequest(() =>
    api.requestResource('/api/dior/company_branches')
  );
  const { token } = useAppContext();
  const csvFile = useRef(null) 

  const [openModal, setOpenModal] = useState(false)

  const [name, setName] = useState('')
  const [surname, setSurname] = useState('')
  const [email, setEmail] = useState('')
  const [isAdmin, setIsAdmin] = useState(false)
  const [countries, setCountries] = useState([])
  const [password, setPassword] = useState('')

  const [reloadNow, setReloadNow] = useState(false)
  const [selectedRowIds, setSelectedRowIds] = useState([]);
  const [modalType, setModalType] = useState('')
  const [dataInCSV, setDataInCSV] = useState('')
  const [exportLoading, setExportLoading] = useState(false)
  const [ecrm, setEcrm] = useState('')
  const [productRecommendation, setProductRecommendation] = useState('')
  const headers = [
    { label: 'Name', key: 'name' },
    { label: 'ID', key: 'id' },
    { label: 'Address', key: 'adderess' },
    { label: 'Email', key: 'email' },
    { label: 'Phone Number', key: 'phone' },
  ];

  const onClickExportButton = () => {
    setExportLoading(true)
    const url = 'https://v2-app.chowis.com/api/dior/admins/export'
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

  const onClickAddButton = () => {
    // alert('onClickAddButton')
    setModalType('add-form')
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
        url: 'https://v2-app.chowis.com/api/dior/admins/delete_multiple',
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

const saveUser = () => {
  const userData = {
    name: name,
    surname: surname,
    email: email,
    is_admin: isAdmin,
    countries: countries,
    password: password
  }

  axios({
    method: 'POST',
    url: 'https://v2-app.chowis.com/api/dior/admins',
    data: userData,
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
    <Box className="modal-box" style={{height: '500px'}}>
      <div className="modal-header">Add New User</div>
      <TextField
        label={'FIrst Name'}
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
        label={'Last Name'}
        variant="outlined"
        size="small"
        fullWidth
        value={surname}
        style={{marginTop: '20px'}}
        onChange={(e) => {
          setSurname(e.target.value)
        }}
        InputLabelProps={{ shrink: true }}
      />
      <TextField
        label={'Email'}
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
        type="password"
        size="small"
        fullWidth
        value={password}
        style={{marginTop: '20px'}}
        onChange={(e) => {
          setPassword(e.target.value)
        }}
        InputLabelProps={{ shrink: true }}
      />

      <FormControl style={{marginTop: '20px'}}>
        <FormLabel id="demo-radio-buttons-group-label">Is Admin?</FormLabel>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue="female"
          name="radio-buttons-group"
          class="is-active-radio-div"
          value={isAdmin ? "0" : "1"}
          onChange={(e) => {
            setIsAdmin(e.target.value == "0")
          }}
          row
        >
          <FormControlLabel value="0" control={<Radio />} label="Yes" />
          <FormControlLabel value="1" control={<Radio />} label="No" />
        </RadioGroup>
      </FormControl>

      <div style={{display: 'flex', justifyContent: 'space-between', marginTop: '30px'}}>
        <Button
          variant="contained"
          color="primary"
          style={{marginRight: '10px', width: '192px'}}
          onClick={() => {saveUser()}}
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
    <Layout title={'User Management'}>
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
            resource_url="/api/dior/admins"
            headers={headers}
            reloadNow={reloadNow}
            setReloadNow={setReloadNow}
            setSelectedRowIdsFromParent={setSelectedRowIds}
            columns={[
              { label: 'First Name', key: 'name' },
              { label: 'Last Name', key: 'surname' },
              { label: 'Email', key: 'email' },
              { label: 'Countries', key: 'countries' },
              { label: 'is Admin', key: 'consultant_position_id',
                content: ({ consultant_position_id }) => (
                  consultant_position_id == 5 ? "Yes" : "No"
                ),
              }
            ]}
            toolbar={{
              search: true,
              filter: false,
              pagination: true,
              export: false,
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
                key: 'default_recommendation',
              },
              {
                label: t('brand_details.status'),
                key: 'url_and_port',
              },
            ]} 
          />
        </Grid>
      </Grid>
    </Layout>
  );
}
