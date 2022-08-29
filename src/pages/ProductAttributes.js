import { Grid, Button, Modal, Box, TextField, MenuItem, IconButton, FormLabel, RadioGroup, FormControlLabel, Radio } from '@material-ui/core';
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
export default function RegisteredDevicesPage() {
  const api = useAPI();
  const { t } = useTranslation();
  // const branchesInfo = useRequest(() =>
  //   api.requestResource('/api/dior/company_branches')
  // );
  const countriesInfo = useRequest(() =>
    api.requestResource('api/dior/countries')
  );
  const { token } = useAppContext();
  const csvFile = useRef(null) 

  const [openModal, setOpenModal] = useState(false)
  const [value, setValue] = useState('')
  const [type, setType] = useState('')
  const [reloadNow, setReloadNow] = useState(false)
  const [selectedRowIds, setSelectedRowIds] = useState([]);
  const [selectedRow, setSelectedRow] = useState([]);
  const [modalType, setModalType] = useState('')
  const [dataInCSV, setDataInCSV] = useState('')
  const [exportLoading, setExportLoading] = useState(false)
  const [ecrm, setEcrm] = useState('')
  const [productRecommendation, setProductRecommendation] = useState('')
  const [translations, setTranslations] = useState([])

  const headers = [
    { label: 'Name', key: 'name' },
    { label: 'ID', key: 'id' },
    { label: 'Address', key: 'adderess' },
    { label: 'Email', key: 'email' },
    { label: 'Phone Number', key: 'phone' },
  ];

  const recommendationList = [
    'Recommendation Europe',
    'Recommendation Asia',
    'Recommendation Japan'
  ]

  const onClickExportButton = () => {
    setExportLoading(true)
    const url = 'https://v2-app.chowis.com/api/dior/product_attributes/export'
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
    setValue('')
    setType('')
    setTranslations([])
    setModalType('add-form')
    setOpenModal(true)
  }

  const deleteMultiplePos = () => {
    console.log(selectedRowIds)
    const bcData = {
      ids: selectedRowIds
    }
    let message = "Are you sure want to delete below Attributes ? \n\n"
    let rowInfo = selectedRow.map(e => `${e.typ}-${e.value}\n`)
    console.log(rowInfo.join(''))
    if (window.confirm(`${message}${rowInfo.join('')}`)) {
      axios({
        method: 'DELETE',
        url: 'https://v2-app.chowis.com/api/dior/product_attributes/delete_multiple',
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

  const onClickUploadButton = () => {
    setModalType('upload-form')
    setOpenModal(true)
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
          disabled={selectedRowIds.length > 0 ? false : true}
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
          download="countries_list.csv"
          ref={csvFile}
          style={{display: 'none'}}
        >
          download
        </a>
      </Grid>
    </Grid>

const saveProductAttribute = (close = true) => {
  const productAttributeData = {
    typ: type,
    value: value,
    product_translations: translations,
  }

  axios({
    method: 'POST',
    url: 'https://v2-app.chowis.com/api/dior/product_attributes',
    data: productAttributeData,
    headers: {
      'X-CHOWIS-CONSULTANT-TOKEN': token,
    },
  })
  .then((res) => {
    console.log(res)
    if(res.status === 200){
      // reload
      setReloadNow(true)
      if(close){
        setOpenModal(false)
      }
    }
  })
}
const countriesSelect = countriesInfo?.data?.data.map((e) => ({key: e.name, label: e.name}))

const setProductNameInLanguage = (language, value) => {
  //{"field_name": 'product_name', language: 'arabic', value: arabicProductName}
  const languageTranslation = translations.find(e => e.language === language)
  if(languageTranslation){
    const newData = translations.map(item => 
      item.language === language 
      ? {...item, value: value} 
      : item 
    )
    setTranslations(newData)
  }else{
    const newElement = {field_name: 'product_name', language: language, value: value}
    setTranslations(translations => [...translations, newElement]);
  }
}

const renderAddForm = () => {
  return(
    <Box className="modal-box" style={{height: '480px'}}>
      <div className="modal-header">Add New Market</div>
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
        label={'Attribute Type (Axis, Category, Collection)'}
        variant="outlined"
        size="small"
        fullWidth
        value={type}
        style={{marginTop: '20px'}}
        onChange={(e) => {
          setType(e.target.value)
        }}
        InputLabelProps={{ shrink: true }}
      />
      <TextField
        label={'Attribute Name'}
        variant="outlined"
        size="small"
        fullWidth
        value={value}
        style={{marginTop: '20px'}}
        onChange={(e) => {
          setValue(e.target.value)
        }}
        InputLabelProps={{ shrink: true }}
      />
      <div style={{
        height: '200px', 
        marginTop: '10px',
        overflow: 'auto',
        padding: '15px',
        border: '1px solid #5A5A5A',
        borderRadius: '10px'
      }}>
        <Grid container spacing={2}>
          {countriesSelect.map(e => 
            <>
              <Grid item xs={4} style={{textAlign:'center'}}>
                <p>{e.label} :</p>
              </Grid>
              <Grid item xs={8}>
                <TextField
                  label={'Product Name'}
                  variant="outlined"
                  size="small"
                  fullWidth
                  value={translations.find(f => f.language === e.label)?.value}
                  style={{marginTop: '20px'}}
                  onChange={(f) => {
                    setProductNameInLanguage(e.label, f.target.value)
                  }}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
            </>
          )}
        </Grid>
      </div>
      <div style={{display: 'flex', justifyContent: 'space-between', marginTop: '30px'}}>
        <Button
          variant="contained"
          color="primary"
          style={{marginRight: '10px', width: '192px'}}
          onClick={() => {setOpenModal(false)}}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          color="primary"
          style={{marginRight: '10px', width: '192px'}}
          onClick={() => {saveProductAttribute()}}
        >
          Save
        </Button>
        <Button
          variant="contained"
          color="primary"
          style={{width: '192px'}}
          onClick={() => {saveProductAttribute(false)}}
        >
          Save & New
        </Button>
      </div>
    </Box>
  )
}


  return (
    <Layout title={'Product Attributes'}>
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
              saveUploadUrl='https://v2-app.chowis.com/api/dior/product_attributes/import'
              exampleFileUrl=''
              modelName='Attributes'
            />
          }
        </>
        
      </Modal>
      <Grid container direction="column" spacing={2} wrap="nowrap">
        <Grid item xs>
          <DataTable
            dataIndex="id"
            resource_url="/api/dior/product_attributes"
            headers={headers}
            reloadNow={reloadNow}
            setReloadNow={setReloadNow}
            setSelectedRowIdsFromParent={setSelectedRowIds}
            setSelectedRowFromParent={setSelectedRow}
            columns={[
              { label: 'Attribute Type', key: 'typ' },
              { label: 'Attribute Name', key: 'value' },
            ]}
            toolbar={{
              search: true,
              filter: false,
              pagination: false,
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
