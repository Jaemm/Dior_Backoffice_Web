import { Grid, Button, Modal, Box, TextField, MenuItem, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Item, FormGroup, Checkbox, List, ListItem, ListItemText,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@material-ui/core';
import { useRequest } from 'ahooks';
import React, {useState, useRef} from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { InferType } from 'yup';


import countries from 'country-list'
import { useAPI } from '../api/API';
import { Layout } from '../components/Layout';
import UploadFormProduct from '../components/UploadFormProduct'
import ExportFormProduct from  '../components/ExportFormProduct'

import {
  numberSchema,
  objectSchema,
  stringSchema,
} from '../helpers/SchemaHelpers';
import { useAppContext } from '../data/AppContext';
import axios from 'axios';
import ImageIcon from '@material-ui/icons/Image';
import FileUpload from '../components/FileUpload';


import { DataTable } from '../components/DataTable';
import NewDataTable from '../components/NewDataTable';
import { setISODay } from 'date-fns';


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
  const [variants, setVariants] = useState([])
  const [reloadNow, setReloadNow] = useState(false)
  const [selectedRowIds, setSelectedRowIds] = useState([]);
  const [selectedRow, setSelectedRow] = useState([]);
  const [bcCode, setBcCode] = useState('')
  const [link, setLink] = useState('')
  const [category, setCategory] = useState('')
  const [collection, setCollection] = useState('')
  const [axis, setAxis] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [id, setId] = useState(null)
  const [activeTab, setActiveTab] = useState('info')
  const [selectedCountries, setSelectedCountries] = useState([])
  const [arabicProductName, setArabicProductName] = useState('')
  const [frenchProductName, setFrenchProductName] = useState('')
  const [germanProductName, setGermanProductName] = useState('')
  const [hindiProductName, setHindiProductName] = useState('')
  const [japaneseProductName, setJapaneseProductName] = useState('')
  const [modalType, setModalType] = useState('')
  const [dataInCSV, setDataInCSV] = useState('')
  const [exportLoading, setExportLoading] = useState(false)
  const [variantId, setVariantId] = useState(false)

  const listCountries = countries.getNames()
  console.log(listCountries)
  const headers = [
    { label: 'Name', key: 'name' },
    { label: 'ID', key: 'id' },
    { label: 'Address', key: 'adderess' },
    { label: 'Email', key: 'email' },
    { label: 'Phone Number', key: 'phone' },
  ];

  const onClickAddButton = () => {
    setId(null)
    setCode(null)
    setName(null)
    setLink(null)
    setCategory(null)
    setAxis(null)
    setCollection(null)
    setImageUrl(null)
    setActiveTab('info')
    setModalType('add-form')
    setVariantId(null)
    setOpenModal(true)
  }

  const onClickAddNewVariantButton = (variantId) => {
    setId(null)
    setCode(null)
    setName(null)
    setLink(null)
    setCategory(null)
    setAxis(null)
    setCollection(null)
    setImageUrl(null)
    setActiveTab('info')
    setModalType('add-form')
    setVariantId(variantId)
    setOpenModal(true)
  }

  const onClickEditButton = (product) => {
    console.log(product)
    setId(product.id)
    setCode(product.code)
    setName(product.name)
    setLink(product.link)
    setCategory(product.category)
    setAxis(product.routine)
    setCollection(product.collection)
    setImageUrl(product.image_url)
    setVariants(product.product_variants)
    setVariantId(product.product_recommendation_id)
    setActiveTab('info')
    setModalType('edit-form')
    setOpenModal(true)
    if(product.countries){
      setSelectedCountries(product.countries)
    }
    if(product.product_translations){
      let arabic = product.product_translations.find(e=>e.field_name == 'product_name' && e.language == 'arabic')
      let french = product.product_translations.find(e=>e.field_name == 'product_name' && e.language == 'french')
      let german = product.product_translations.find(e=>e.field_name == 'product_name' && e.language == 'german')
      let hindi = product.product_translations.find(e=>e.field_name == 'product_name' && e.language == 'hindi')
      let japanese = product.product_translations.find(e=>e.field_name == 'product_name' && e.language == 'japanese')
      setArabicProductName(arabic?.value)
      setFrenchProductName(french?.value)
      setGermanProductName(german?.value)
      setHindiProductName(hindi?.value)
      setJapaneseProductName(japanese?.value)
    }
  }


  const deleteSingleProduct = (id) => {
    if (window.confirm("Delete the item?")) {
      axios({
        method: 'DELETE',
        url: `https://v2-app.chowis.com/api/pmx/product_recommendations/${id}`,
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

  const deleteMultiplePos = () => {
    console.log(selectedRowIds)
    const productData = {
      ids: selectedRowIds
    }
    let message = "Are you sure want to delete below BC ? \n\n"
    let rowInfo = selectedRow.map((e) => `${e.name}-${e.category}-${e.collection}\n`)
    console.log(rowInfo.join(''))
    if (window.confirm(`${message}${rowInfo.join('')}`)) {
      axios({
        method: 'DELETE',
        url: 'https://v2-app.chowis.com/api/pmx/product_recommendations/delete_multiple',
        data: productData,
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
            download="product_list.csv"
            ref={csvFile}
            style={{display: 'none'}}
          >
            download
          </a>
      </Grid>
    </Grid>

  const saveProduct = () => {
    const translations = [
      {field_name: 'product_name', language: 'arabic', value: arabicProductName},
      {field_name: 'product_name', language: 'french', value: frenchProductName},
      {field_name: 'product_name', language: 'german', value: germanProductName},
      {field_name: 'product_name', language: 'hindi', value: hindiProductName},
      {field_name: 'product_name', language: 'japanese', value: japaneseProductName},
    ]

    const productData = {
      code: code,
      name: name,
      link: link,
      category: category,
      collection: collection,
      routine: axis,
      image_url: imageUrl,
      countries: selectedCountries.filter(e => e !== 'All'),
      product_translations: translations,
      product_recommendation_id: variantId
    }
    let method, url
    if(id){
      method = 'PUT'
      url = `https://v2-app.chowis.com/api/pmx/product_recommendations/${id}`
    }else{
      method = 'POST'
      url = 'https://v2-app.chowis.com/api/pmx/product_recommendations'
    }

    axios({
      method: method,
      url: url,
      data: productData,
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

  const checked = (country) => {
    return selectedCountries.includes(country)
  }

  const handleChangeCheckbox = (country) => {
    if(country === 'All'){
      if(selectedCountries.includes('All')){
        setSelectedCountries([])
      }else{
        setSelectedCountries([...listCountries, 'All'])
      }
    }else{
      if(selectedCountries.includes(country)){
        setSelectedCountries(selectedCountries.filter(e => e !== country))
      }else{
        setSelectedCountries([...selectedCountries, country])
      }
    }
  }

  const onClickExportButton = () => {
    setExportLoading(true)
    const url = 'https://v2-app.chowis.com/api/dior/product_recommendations/export'
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

  const onClickUploadButton = () => {
    setModalType('upload-form')
    setOpenModal(true)
  }

  const renderAddForm = () => {
    return(
      <Box className="modal-box" style={{height: '620px', width: '600px'}}>
        {/* <div className="modal-header">{id ? 'EDIT' : 'ADD'} NEW POS</div> */}
        <div className="tab-container">
          <div className={activeTab == 'info' ? 'active-tab' : 'tab'} onClick={() => {setActiveTab('info')}}>Information</div>
          <div className={activeTab == 'country' ? 'active-tab' : 'tab'} onClick={() => {setActiveTab('country')}}>Countries</div>
          <div className={activeTab == 'translation' ? 'active-tab' : 'tab'} onClick={() => {setActiveTab('translation')}}>Translation</div>
          {modalType === 'edit-form' &&
            <div className={activeTab == 'variation' ? 'active-tab' : 'tab'} onClick={() => {setActiveTab('variation')}}>Variation</div>
          }
        </div>
        { activeTab == 'info' && (
          <>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                  <TextField
                    label={'Product Code'}
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
              </Grid>
              <Grid item xs={8}>
                  <TextField
                    label={'Product Name'}
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
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label={'Product Link'}
                  variant="outlined"
                  size="small"
                  fullWidth
                  value={link}
                  style={{marginTop: '20px'}}
                  onChange={(e) => {
                    setLink(e.target.value)
                  }}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label={'Category'}
                  variant="outlined"
                  size="small"
                  select
                  fullWidth
                  value={category}
                  style={{marginTop: '20px'}}
                  onChange={(e) => {
                    setCategory(e.target.value)
                  }}
                  InputLabelProps={{ shrink: true }}
                >
                  <MenuItem key={1} value={'Serums'}>
                    Serums
                  </MenuItem>
                  <MenuItem key={1} value={'Pre-serums'}>
                    Pre-serums
                  </MenuItem>
                  <MenuItem key={1} value={'Eye Care'}>
                    Eye Care
                  </MenuItem>
                  <MenuItem key={1} value={'Lotions'}>
                    Lotions
                  </MenuItem>
                  <MenuItem key={1} value={'Powders'}>
                    Powders
                  </MenuItem>
                  <MenuItem key={1} value={'UV Protection'}>
                    UV Protection
                  </MenuItem>
                    
                </TextField>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label={'Collection'}
                  variant="outlined"
                  size="small"
                  select
                  fullWidth
                  value={collection}
                  style={{marginTop: '20px'}}
                  onChange={(e) => {
                    setCollection(e.target.value)
                  }}
                  InputLabelProps={{ shrink: true }}
                >
                  <MenuItem key={1} value={'Dior Prestige	'}>
                    Dior Prestige	
                  </MenuItem>
                  <MenuItem key={1} value={'Capture Totale'}>
                    Capture Totale
                  </MenuItem>
                  <MenuItem key={1} value={'Dior Prestige Light-in-White'}>
                    Dior Prestige Light-in-White
                  </MenuItem>
                  <MenuItem key={1} value={'Forever'}>
                    Forever
                  </MenuItem>
                  <MenuItem key={1} value={'Dior Prestige'}>
                    Dior Prestige
                  </MenuItem>
                </TextField>
              </Grid>
            </Grid>

            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  label={'Axis'}
                  variant="outlined"
                  size="small"
                  select
                  fullWidth
                  value={axis}
                  style={{marginTop: '20px'}}
                  onChange={(e) => {
                    setAxis(e.target.value)
                  }}
                  InputLabelProps={{ shrink: true }}
                >
                  <MenuItem key={1} value={'Makeup'}>
                    Makeup
                  </MenuItem>
                  <MenuItem key={1} value={'Skincare'}>
                    Skincare
                  </MenuItem>
                </TextField>
                <Button
                  variant="contained"
                  color="primary"
                  style={{marginTop: '20px', width: '100%'}}
                  onClick={() => {saveProduct()}}
                >
                  Save
                </Button>
              </Grid>
              <Grid item xs={6}>
                <div className="image-container">
                    {imageUrl && (
                      <img
                        src={imageUrl}
                        alt="product"
                        className="image"
                      />
                    )}
                    <ImageIcon htmlColor="silver" />
                    <FileUpload setImageUrl={setImageUrl}/>
                  </div>
              </Grid>
            </Grid>
          </>
        )}

        { activeTab == 'country' && (
          <>
            <p>This product is available for below countries *</p>
            <div style={{
              height: '400px', 
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
                {listCountries.map(e => (
                  <Grid item xs={6}>
                      <FormControlLabel 
                        control={<Checkbox checked={checked(e)} onChange={()=>handleChangeCheckbox(e)}/>} 
                        label={e} 
                      />
                  </Grid>
                ))}
              </Grid>
            </div>
            <Button
              variant="contained"
              color="primary"
              style={{marginTop: '20px', width: '100%'}}
              onClick={() => {saveProduct()}}
            >
              Save
            </Button>
          </>
        )}


        { activeTab == 'translation' && (
          <>
            <p>Please input product name translations: </p>
            <div style={{
              height: '400px', 
              overflow: 'auto',
              padding: '15px',
              border: '1px solid #5A5A5A',
              borderRadius: '10px'
            }}>
              <Grid container spacing={2}>
                <Grid item xs={4} style={{textAlign:'center'}}>
                  <p>Arabic :</p>
                </Grid>
                <Grid item xs={8}>
                  <TextField
                    label={'Product Name'}
                    variant="outlined"
                    size="small"
                    fullWidth
                    value={arabicProductName}
                    style={{marginTop: '20px'}}
                    onChange={(e) => {
                      setArabicProductName(e.target.value)
                    }}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item xs={4} style={{textAlign:'center'}}>
                  <p>French :</p>
                </Grid>
                <Grid item xs={8}>
                  <TextField
                    label={'Product Name'}
                    variant="outlined"
                    size="small"
                    fullWidth
                    value={frenchProductName}
                    style={{marginTop: '20px'}}
                    onChange={(e) => {
                      setFrenchProductName(e.target.value)
                    }}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item xs={4} style={{textAlign:'center'}}>
                  <p>German :</p>
                </Grid>
                <Grid item xs={8}>
                  <TextField
                    label={'Product Name'}
                    variant="outlined"
                    size="small"
                    fullWidth
                    value={germanProductName}
                    style={{marginTop: '20px'}}
                    onChange={(e) => {
                      setGermanProductName(e.target.value)
                    }}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item xs={4} style={{textAlign:'center'}}>
                  <p>Hindi :</p>
                </Grid>
                <Grid item xs={8}>
                  <TextField
                    label={'Product Name'}
                    variant="outlined"
                    size="small"
                    fullWidth
                    value={hindiProductName}
                    style={{marginTop: '20px'}}
                    onChange={(e) => {
                      setHindiProductName(e.target.value)
                    }}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item xs={4} style={{textAlign:'center'}}>
                  <p>Japanese :</p>
                </Grid>
                <Grid item xs={8}>
                  <TextField
                    label={'Product Name'}
                    variant="outlined"
                    size="small"
                    fullWidth
                    value={japaneseProductName}
                    style={{marginTop: '20px'}}
                    onChange={(e) => {
                      setJapaneseProductName(e.target.value)
                    }}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
              </Grid>
            </div>
            <Button
                  variant="contained"
                  color="primary"
                  style={{marginTop: '20px', width: '100%'}}
                  onClick={() => {saveProduct()}}
                >
              Save
            </Button>
          </>
        )}

        { activeTab == 'variation' && (
          <div style={{overflow: 'auto', height: '500px'}}>
              <Button
                variant="contained"
                color="primary"
                style={{marginTop: '10px', float: 'right'}}
                onClick={() => {onClickAddNewVariantButton(id)}}
              >
                Add New Variant
              </Button>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Variant</TableCell>
                  <TableCell>Code</TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell>Collection</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {variants && variants.map((e) => {
                  return(
                    <TableRow>
                      <TableCell>{e.name}</TableCell>
                      <TableCell>{e.code}</TableCell>
                      <TableCell>{e.category}</TableCell>
                      <TableCell>{e.collection}</TableCell>
                      <TableCell>
                        <Button
                          variant="contained"
                          color="primary"
                          style={{marginRight: '10px'}}
                          onClick={() => {onClickEditButton(e)}}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="contained"
                          color="primary"
                          style={{marginRight: '10px'}}
                          onClick={() => {deleteSingleProduct(e.id)}}
                        >
                          Delete
                        </Button>
                        
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </div>
        )}


      </Box>

    )
  }


  // const branchesSelect = branchesInfo.map((e) => return({id: e.id, name: e.name, code: e.code}))
  return (
    <Layout title={'Product Catalog'}>
      <Modal
        open={openModal}
        onClose={()=>{setOpenModal(false)}}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        style={{display:'flex',alignItems:'center',justifyContent:'center'}}
      >
        <>
          {(modalType === 'add-form' || modalType === 'edit-form') && renderAddForm()}
          {modalType === 'upload-form' && 
            <UploadFormProduct
              token={token} 
              onClose={() => setOpenModal(false)}
              saveUploadUrl='https://v2-app.chowis.com/api/dior/product_recommendations/import'
              exampleFileUrl='https://portal-apptree-bucket.s3.ap-northeast-2.amazonaws.com/uploads/images/dior/import_company_branches/3b33bed2-1fc8-49be-ac58-db00000effc9-products.xlsx'
              modelName='Products'
            />
          }
          {(modalType === 'export-form') && <ExportFormProduct />}
        </>
      </Modal>
      <Grid container direction="column" spacing={2} wrap="nowrap">
        <Grid item xs>
          <DataTable
            dataIndex="id"
            resource_url="/api/pmx/product_recommendations"
            headers={headers}
            reloadNow={reloadNow}
            setReloadNow={setReloadNow}
            setSelectedRowIdsFromParent={setSelectedRowIds}
            setSelectedRowFromParent={setSelectedRow}
            columns={[
              {
                label: 'Product Image',
                key: 'image',
                content: ({ image_url }) =>
                <div className="image-box">
                {image_url ? (
                  <img
                    className="image"
                    src={image_url}
                    alt="product"
                  />
                ) : (
                  <p>No Image</p>
                )}
              </div>
              },
              { label: 'Product Name', key: 'name' },
              { label: 'Category', key: 'category' },
              { label: 'Collection', key: 'collection' },
              { label: 'Axis', key: 'routine' },
              { label: 'Link', key: 'link' },
              { label: 'Action', key: '',
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
              export: false,
            }}
            toolbarButtons={toolbarButtons}
          />
        </Grid>
      </Grid>
    </Layout>
  );
}
