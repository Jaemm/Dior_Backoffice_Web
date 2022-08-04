import { Grid, Button, Modal, Box, TextField, MenuItem, FormControl, IconButton, InputLabel, OutlinedInput, InputAdornment } from '@material-ui/core';
import { useRequest } from 'ahooks';
import React, {useState, useRef} from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import { InferType } from 'yup';
import {
  Visibility,
  VisibilityOff,
  Close
} from '@material-ui/icons';
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
  const csvFile = useRef(null) 

  const [openModal, setOpenModal] = useState(false)
  const [modalType, setModalType] = useState('')
  const [id, setId] = useState(null)
  const [country, setCountry] = useState('')
  const [code, setCode] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [reloadNow, setReloadNow] = useState(false)
  const [selectedRowIds, setSelectedRowIds] = useState([]);
  const [dataInCSV, setDataInCSV] = useState('')
  const [exportLoading, setExportLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showPasswordModal, setShowPasswordModal] = useState(false)
  const [selectedRow, setSelectedRow] = useState([]);
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
    setModalType('add-form')
    setOpenModal(true)
  }

  const onClickEditButton = (product: any) => {
    console.log(product)
    setId(product.id)
    setCountry(product.country)
    setCode(product.code)
    setName(product.name)
    setEmail(product.email)
    setPassword(product.password)
    setModalType('add-form')
    setOpenModal(true)
  }

  const onClickUploadButton = () => {
    setModalType('upload-form')
    setOpenModal(true)
  }

  const onClickExportButton = () => {
    setExportLoading(true)
    let url = `https://v2-app.chowis.com/api/dior/company_branches/export?`
    if(query.get('filter_by')){url += `filter_by=${query.get('filter_by')}`}
    if(query.get('search')){url += `&search=${query.get('search')}`}
    axios({
      method: 'GET',
      url: url,
      headers: {
        'X-CHOWIS-CONSULTANT-TOKEN': token,
      },
    })
    .then((res:any) => {
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

  const deleteMultiplePos = () => {
    console.log(selectedRowIds)
    const posData = {
      ids: selectedRowIds
    }
    let message = "Are you sure want to delete below POS ? \n\n"
    let rowInfo = selectedRow.map((e:any) => `${e.country}-${e.code}-${e.name}\n`)
    console.log(rowInfo.join(''))
    if (window.confirm(`${message}${rowInfo.join('')}`)) {
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

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword)
  };

  const handleClickShowPasswordModal = () => {
    setShowPasswordModal(!showPasswordModal)
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
            download="pos_list.csv"
            ref={csvFile}
            style={{display: 'none'}}
          >
            download
          </a>
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
    let url = 'https://v2-app.chowis.com/api/dior/company_branches'
    if(id){
      url = `https://v2-app.chowis.com/api/dior/company_branches/${id}`
      axios({
        method: 'PUT',
        url: url,
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
    }else{
      url = 'https://v2-app.chowis.com/api/dior/company_branches'
      axios({
        method: 'POST',
        url: url,
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

  const renderAddForm = () => {
    return(
      <Box className="modal-box">
        <div className="modal-header">ADD NEW POS</div>
        <div style={{
          width: '100%',
          height: '100%',
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
          <MenuItem key={1} value={'France'}>
            France
          </MenuItem>
          <MenuItem key={1} value={'Japan'}>
            Japan
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
       <FormControl variant="outlined" style={{marginTop: '20px', marginBottom: '20px', width: '100%'}}>
          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
          <OutlinedInput
            className='MuiOutlinedInput-sizeSmall'
            id="outlined-adornment-password"
            type={showPasswordModal ? 'text' : 'password'}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value)
            }}
            style={{height: '2.7rem'}}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPasswordModal}
                  // onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPasswordModal ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>
        {/* <TextField
          label={'Password'}
          variant="outlined"
          size="small"
          fullWidth
          value={password}
          // type={}
          style={{marginTop: '20px', marginBottom: '20px'}}
          onChange={(e) => {
            setPassword(e.target.value)
          }}
          InputLabelProps={{ shrink: true }}
        /> */}
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
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
            setSelectedRowFromParent={setSelectedRow}
            columns={[
              { label: t('brand_details.country'), key: 'country' },
              { label: t('brand_details.code'), key: 'code' },
              { label: t('brand_details.name'), key: 'name' },
              { label: t('brand_details.email'), key: 'email' },
              { label: t('brand_details.total_devices'), key: 'total_devices' },
              { label: t('brand_details.password'), key: 'password',
              content: (props) =>
                <div>
                  {showPassword ? props.password : '********'}
                  <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  // onMouseDown={handleMouseDownPassword}
                  edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </div>
              },
              { label: t('brand_details.last_consultation_date'), key: 'last_consultation_date' },
              { label: 'Action', key: 'id',
              content: (props) =>
                <div className="">
                  <Button
                    variant="contained"
                    color="primary"
                    style={{marginRight: '10px'}}
                    onClick={() => {onClickEditButton(props)}}
                  >
                    Edit
                  </Button>
                </div>
              }
            ]}
            toolbar={{
              search: true,
              filter: false,
              pagination: true,
              export: true,
              filter_select: true
            }}
            filter_label='Filter by Country'
            toolbarButtons={toolbarButtons}
            filters={[
              { label: 'France', key: 'france' },
              { label: 'Japan', key: 'japan' },
            ]} 
          />
        </Grid>
      </Grid>
    </Layout>
  );
}
