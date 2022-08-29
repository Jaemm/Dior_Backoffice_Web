import { Grid, Button, Modal, Box, TextField, Checkbox, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, IconButton } from '@material-ui/core';
import { useRequest } from 'ahooks';
import React, {useState, useRef} from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { InferType } from 'yup';
import {Close} from '@material-ui/icons'

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
import { setISODay } from 'date-fns';
export default function RegisteredDevicesPage() {
  const api = useAPI();
  const { t } = useTranslation();
  const branchesInfo = useRequest(() =>
    api.requestResource('/api/dior/company_branches')
  );
  const countriesInfo = useRequest(() =>
    api.requestResource('api/dior/countries')
  );
  const { token } = useAppContext();
  const csvFile = useRef(null) 

  const [openModal, setOpenModal] = useState(false)

  const [id, setId] = useState('')
  const [name, setName] = useState('')
  const [surname, setSurname] = useState('')
  const [email, setEmail] = useState('')
  const [isAdmin, setIsAdmin] = useState(false)
  const [countries, setCountries] = useState([])
  const [password, setPassword] = useState('')

  const [reloadNow, setReloadNow] = useState(false)
  const [selectedRowIds, setSelectedRowIds] = useState([]);
  const [selectedRow, setSelectedRow] = useState([]);
  const [modalType, setModalType] = useState('')
  const [dataInCSV, setDataInCSV] = useState('')
  const [exportLoading, setExportLoading] = useState(false)
  const [ecrm, setEcrm] = useState('')
  const [productRecommendation, setProductRecommendation] = useState('')
  const [selectedCountries, setSelectedCountries] = useState([])

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
    let message = "Are you sure want to delete below Users ? \n\n"
    let rowInfo = selectedRow.map(e => `${e.name}-${e.surname}-${e.email}\n`)
    console.log(rowInfo.join(''))
    if (window.confirm(`${message}${rowInfo.join('')}`)) {
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

  const checked = (country) => {
    return selectedCountries.includes(country)
  }

  const handleChangeCheckbox = (country) => {
    if(country === 'All'){
      if(selectedCountries.includes('All')){
        setSelectedCountries([])
      }else{
        const allCountries = countriesInfo?.data?.data.map(e => e.name)
        setSelectedCountries([...allCountries, 'All'])
      }
    }else{
      if(selectedCountries.includes(country)){
        setSelectedCountries(selectedCountries.filter(e => e !== country))
      }else{
        setSelectedCountries([...selectedCountries, country])
      }
    }
  }

  const countriesSelect = countriesInfo?.data?.data.map((e) => ({key: e.name, label: e.name}))



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
          download="user_list.csv"
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
    countries: selectedCountries,
    password: password
  }
  let method, url
  if(id){
    method = 'PUT'
    url = `https://v2-app.chowis.com/api/dior/admins/${id}`
  }else{
    method = 'POST'
    url = 'https://v2-app.chowis.com/api/dior/admins'
  }
  axios({
    method: method,
    url: url,
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

const onClickUploadButton = () => {
  setModalType('upload-form')
  setOpenModal(true)
}

const openEditUser = (props) => {
  setId(props.id)
  setModalType('add-form')
  setName(props.name)
  setSurname(props.surname)
  setEmail(props.email)
  setIsAdmin(props.isAdmin)
  setSelectedCountries(props.countries)
  setOpenModal(true)
}

const renderAddForm = () => {
  return(
    <Box className="modal-box" style={{height: '750px'}}>
      <div className="modal-header">Add New User</div>
      <div style={{
          position: 'absolute'
        }}>
          <IconButton
            style={{
              top: '-2em',
              right: '-17em'
            }}
            onClick={()=>{setOpenModal(false)}}
          >
            <Close />
          </IconButton>
        </div>
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
      {!isAdmin && 
        <>
          <p>Please select countries for the user *</p>
          <div style={{
            height: '200px', 
            overflow: 'auto',
            padding: '15px',
            border: '1px solid #5A5A5A',
            borderRadius: '10px'  
          }}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <FormControlLabel 
                  control={<Checkbox checked={checked('All')} onChange={()=>handleChangeCheckbox('All')}/>} 
                  label={'All'} 
                />
              </Grid>
              {countriesSelect.map(e => (
                <Grid item xs={6}>
                    <FormControlLabel 
                      control={<Checkbox checked={checked(e.label)} onChange={()=>handleChangeCheckbox(e.label)}/>} 
                      label={e.label} 
                    />
                </Grid>
              ))}
            </Grid>
          </div>
        </>
      }

      <div style={{display: 'flex', justifyContent: 'space-between', marginTop: '30px'}}>
        <Button
          variant="contained"
          color="primary"
          style={{marginRight: '10px', width: '192px'}}
          onClick={()=>{setOpenModal(false)}}
        >
          Cancel
        </Button>
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
              exampleFileUrl='https://chws-my.sharepoint.com/:x:/g/personal/fathi_chowis_com/EbDpng_TpMFFiPsCaUv2KgwBemaQ9bzazGXY62Ykl7wjRA?e=fBdjfN'
              modelName='User'
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
            setSelectedRowFromParent={setSelectedRow}
            columns={[
              { label: 'First Name', key: 'name' },
              { label: 'Last Name', key: 'surname' },
              { label: 'Email', key: 'email' },
              { label: 'Countries', key: 'countries',
                content: ({countries}) => (
                  countries.join(', ')
                )
              },
              { label: 'is Admin', key: 'consultant_position_id',
                content: ({ consultant_position_id }) => (
                  consultant_position_id == 5 ? "Yes" : "No"
                ),
              },
              { label: 'Countries', key: 'countries',
                content: (props) => (
                  <Button
                  variant="contained"
                  color="primary"
                  style={{marginRight: '10px', width: '192px'}}
                  onClick={() => {openEditUser(props)}}
                  >
                    Edit
                  </Button>
                )
              },
            ]}
            toolbar={{
              search: true,
              filter: false,
              pagination: true,
              export: false,
              filter_select: true,
            }}
            filter_label='Filter by Country'
            filters={countriesSelect}
            toolbarButtons={toolbarButtons}
          />
        </Grid>
      </Grid>
    </Layout>
  );
}
