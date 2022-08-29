import { Grid, Button, List, ListItem, ListItemAvatar, ListItemText, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from '@material-ui/core';
import { useRequest } from 'ahooks';
import React, {useState, useRef} from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useParams } from 'react-router-dom';
import { InferType } from 'yup';

import { useAPI } from '../api/API';
import { Layout } from '../components/Layout';
import StatisticsBarChart from '../components/StatistitcsBarChart';

// import { parseDateString } from '../helpers/dateHelpers';
import {
  numberSchema,
  objectSchema,
  stringSchema,
} from '../helpers/SchemaHelpers';
import { useAppContext } from '../data/AppContext';
import axios from 'axios';
import Arrow from '../assets/icons/arrow-right.svg';

import { DataTable } from '../components/DataTable';
import NewDataTable from '../components/NewDataTable';
import UploadForm from '../components/UploadForm';
export default function RegisteredDevicesPage() {
  const api = useAPI();
  const { t } = useTranslation();
  const { report_type } = useParams()
  const dataInfo = useRequest(() =>
    api.requestResource(`/api/dior/statistics/overall_details?type=${report_type}`)
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
  const [viewType, setViewType] = useState('table')
  const [dataInCSV, setDataInCSV] = useState('')
  const [exportLoading, setExportLoading] = useState(false)

  const headers = [
    { label: 'Name', key: 'name' },
    { label: 'ID', key: 'id' },
    { label: 'Address', key: 'adderess' },
    { label: 'Email', key: 'email' },
    { label: 'Phone Number', key: 'phone' },
  ];

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
          onClick={()=> {onClickExportButton()}}
          disabled={exportLoading}
          color="primary">
          {exportLoading ? 'Loading ...' : 'Export'}
        </Button>
        <a
          href={`data:text/csv;charset=utf-8,${escape(dataInCSV)}`}
          download="devices_list.csv"
          ref={csvFile}
          style={{display: 'none'}}
        >
          download
        </a>
      </Grid>
    </Grid>

  // console.log('branchesInfo', branchesInfo)

  return (
    <Layout title={'Statistic & Report'}>
      <div className="card-details-statistic" style={{justifyContent: 'space-between'}}>
        <span style={{marginTop: '10px'}}>
          <span style={{fontWeight: '400',fontSize: '38px'}}>

          {dataInfo?.data?.reduce((partialSum, a) => partialSum + a.total, 0)}
          </span>
          <p>{report_type} (GLOBAL)</p>
        </span>
        {/* <button type="button" className='button-details-statistic'>
          <img src={Arrow} alt="/" />
        </button> */}
        {viewType === 'table' && 
          <Button
            variant="contained"
            onClick={()=> {setViewType('graph')}}
            style={{marginRight: '10px'}}
            color="primary">
            View Graph
          </Button>
        }
        {viewType === 'graph' && 
          <Button
            variant="contained"
            onClick={()=> {setViewType('table')}}
            style={{marginRight: '10px'}}
            color="primary">
            View List
          </Button>
        }

      </div>
      {viewType === 'table' && 
        <>
        {dataInfo && dataInfo.data &&
          <div style={{width: '90%', marginTop: '30px'}}>
            <div style={{display: 'flex', justifyContent: 'space-between', padding: '10px'}}>
              <div>Overall</div>
              <div>{dataInfo.data.reduce((partialSum, a) => partialSum + a.total, 0)}</div>
            </div>
          </div>
        }
        {dataInfo && dataInfo.data && dataInfo.data.map((e) => {
          return(
            <div style={{width: '90%'}}>
              <div style={{display: 'flex', justifyContent: 'space-between', padding: '10px', backgroundColor: '#c4c4c4'}}>
                <div>{e.name}</div>
                <div>{e.total}</div>
              </div>
              {e.branches_info.map((f)=>{
                return(
                  <div style={{display: 'flex', justifyContent: 'space-between', padding: '10px'}}>
                    <div style={{marginLeft: '20px'}}>{f.name}</div>
                    <div>{f.total}</div>
                  </div>
                )
              })}
            </div>
          )
        })}
        </>
      }
      {viewType === 'graph' && 
        <div style={{ width: '100%' }}>
          <StatisticsBarChart />
        </div>
      }

    </Layout>
  );
}
