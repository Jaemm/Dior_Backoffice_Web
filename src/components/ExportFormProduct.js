import React, {useState, useRef} from 'react';
import { Grid, Button, IconButton, Box, TextField, MenuItem } from '@material-ui/core';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import { useAppContext } from '../data/AppContext';
import { useRequest } from 'ahooks';
import { useAPI } from '../api/API';
import {
  Close
} from '@material-ui/icons';
const ExportFormProduct = (props) => {
  const api = useAPI();
  const {onClose} = props
  const [activeTab, setActiveTab] = useState('products')
  const [exportLoading, setExportLoading] = useState(false)
  const [dataInCSV, setDataInCSV] = useState('')
  const { token } = useAppContext();
  const csvFile = useRef(null) 
  const [country, setCountry] = useState('')
  const countriesInfo = useRequest(() =>
    api.requestResource('api/dior/countries')
  );
  const onClickExportButton = () => {
    setExportLoading(true)
    let url = `https://v2-app.chowis.com/api/dior/product_recommendations/export?`
    if(activeTab == 'countries'){url += `country=${country}`}
    if(activeTab == 'translations'){url += `country=${country}&typ=translations`}
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
  const countriesSelect = countriesInfo?.data?.data.map((e) => ({key: e.name, label: e.name}))

  return(
    <Box className="modal-box">
      <div className="tab-container">
          <div className={activeTab == 'products' ? 'active-tab' : 'tab'} onClick={() => {setActiveTab('products')}}>Products</div>
          <div className={activeTab == 'countries' ? 'active-tab' : 'tab'} onClick={() => {setActiveTab('countries')}}>Countries</div>
          <div className={activeTab == 'translations' ? 'active-tab' : 'tab'} onClick={() => {setActiveTab('translations')}}>Translations</div>
      </div>
      <div style={{
          height: '100%',
          position: 'absolute'
        }}>
        <IconButton
          style={{
            top: '-2em',
            right: '-17em'
          }}
          onClick={()=>{onClose()}}
        >
          <Close />
        </IconButton>
      </div>
      <a
        href={`data:text/csv;charset=utf-8,${escape(dataInCSV)}`}
        download="product_list.csv"
        ref={csvFile}
        style={{display: 'none'}}
      >
        download
      </a>
      { activeTab === 'products' && (
        <>
          <div className="modal-subheader" style={{marginTop: '40px'}}>Export Selected Product</div>
          <div style={{display: 'flex', justifyContent: 'center', marginTop: '10px'}}>
            <Button
              variant="contained"
              color="primary"
              style={{marginRight: '10px', borderRadius: '15px'}}
              onClick={() => onClickExportButton()}
              disabled={exportLoading}
              >
              {exportLoading ? 'Loading ...' : 'Export'}

            </Button>

          </div>
        </>
      )}
      { activeTab === 'countries' && (
        <>
        <TextField
          label={'Select country'}
          select
          variant="outlined"
          size="small"
          fullWidth
          style={{marginBottom: '20px', marginTop: '20px'}}
          value={country}
          onChange={(e) => {
            setCountry(e.target.value);
          }}
        >
          {countriesSelect.map(({ label, key }) => (
            <MenuItem key={key} value={key}>
              {label}
            </MenuItem>
          ))}
        </TextField>
        <div className="modal-subheader" style={{marginTop: '40px'}}>Export Selected Product</div>
          <div style={{display: 'flex', justifyContent: 'center', marginTop: '10px'}}>
            <Button
              variant="contained"
              color="primary"
              style={{marginRight: '10px', borderRadius: '15px'}}
              onClick={() => onClickExportButton()}
              disabled={exportLoading}
              >
              {exportLoading ? 'Loading ...' : 'Export'}

            </Button>
            {/* <a
              href={`data:text/csv;charset=utf-8,${escape(dataInCSV)}`}
              download="product_list.csv"
              ref={csvFile}
              style={{display: 'none'}}
            >
              download
            </a> */}
          </div>
        </>
      )}

      { activeTab === 'translations' && (
        <>
        <TextField
          label={'Select country'}
          select
          variant="outlined"
          size="small"
          fullWidth
          style={{marginBottom: '20px', marginTop: '20px'}}
          value={country}
          onChange={(e) => {
            setCountry(e.target.value);
          }}
        >
          {countriesSelect.map(({ label, key }) => (
            <MenuItem key={key} value={key}>
              {label}
            </MenuItem>
          ))}
        </TextField>
        <div className="modal-subheader" style={{marginTop: '40px'}}>Export Selected Product</div>
          <div style={{display: 'flex', justifyContent: 'center', marginTop: '10px'}}>
            <Button
              variant="contained"
              color="primary"
              style={{marginRight: '10px', borderRadius: '15px'}}
              onClick={() => onClickExportButton()}
              disabled={exportLoading}
              >
              {exportLoading ? 'Loading ...' : 'Export'}

            </Button>
            {/* <a
              href={`data:text/csv;charset=utf-8,${escape(dataInCSV)}`}
              download="product_list.csv"
              ref={csvFile}
              style={{display: 'none'}}
            >
              download
            </a> */}
          </div>
        </>
      )}
      
    </Box>

  )
}

export default ExportFormProduct