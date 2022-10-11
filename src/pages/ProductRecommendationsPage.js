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
  Item,
  FormGroup,
  Checkbox,
  List,
  ListItem,
  ListItemText,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  InputLabel,
  Select,
  Collapse,
  IconButton,
} from '@material-ui/core';
import { ReactSearchAutocomplete } from 'react-search-autocomplete';
import { TableWrapper } from '../components/TableWrapper';

import { useRequest } from 'ahooks';
import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { InferType } from 'yup';
import countries from 'country-list';
import axios from 'axios';
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

import { useAPI } from '../api/API';
import { Layout } from '../components/Layout';
import ExportFormProduct from '../components/ExportFormProduct';
import { useAppContext } from '../data/AppContext';

export default function ProductRecommendationsPage() {
  const [modalType, setModalType] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [productGroups, setProductGroups] = useState([]);
  const [products, setProducts] = useState([]);
  const [activeTab, setActiveTab] = useState('skincare');
  const [lotion, setLotion] = useState({});
  const [serum, setSerum] = useState({});
  const [cream, setCream] = useState({});
  const [eye, setEye] = useState({});
  const [uv, setUv] = useState({});
  const [makeup1, setMakeup1] = useState({});
  const [makeup2, setMakeup2] = useState({});
  const [makeup3, setMakeup3] = useState({});
  const [name, setName] = useState('');
  const [id, setId] = useState('');
  const { token } = useAppContext();
  const [open, setOpen] = useState(-1);

  useEffect(() => {
    fetchProductGroups();
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    await axios
      .get(
        'https://v2-app.chowis.com/api/pmx/product_recommendations?limit=1000&page=1',
        {
          headers: {
            'X-CHOWIS-CONSULTANT-TOKEN': token,
          },
        }
      )
      .then((res) => {
        console.log('res data', res.data);
        setProducts(res?.data?.data);
      })
      .catch((err) => {
        console.log('Presign Upload Error => ', err);
        // setLoading && setLoading(false);
      });
  };

  const fetchProductGroups = async () => {
    await axios
      .get('https://v2-app.chowis.com/api/dior/product_recommendation_groups', {
        headers: {
          'X-CHOWIS-CONSULTANT-TOKEN': token,
        },
      })
      .then((res) => {
        console.log('res data', res.data);
        setProductGroups(res?.data?.data);
      })
      .catch((err) => {
        console.log('Presign Upload Error => ', err);
        // setLoading && setLoading(false);
      });
  };

  const onClickNewGroup = () => {
    setId(null);
    setName(null);
    setLotion(null);
    setSerum(null);
    setCream(null);
    setEye(null);
    setUv(null);
    setMakeup1(null);
    setMakeup2(null);
    setMakeup3(null);
    setModalType('add-form');
    setOpenModal(true);
  };

  const onClickEditGroup = (id) => {
    setId(id);
    const group = productGroups.find((e) => e.id === id);
    console.log(group);
    setName(group?.name);
    setLotion(group.products.find((e) => e.category === 'Lotions'));
    setSerum(group.products.find((e) => e.category === 'Serums'));
    setCream(group.products.find((e) => e.category === 'Creams'));
    setEye(group.products.find((e) => e.category === 'Eye Care'));
    setUv(group.products.find((e) => e.category === 'UV Protection'));
    const makeUps = group.products.filter((e) => e.routine === 'Makeup');
    console.log(makeUps);
    setMakeup1(makeUps[0]);
    setMakeup2(makeUps[1]);
    setMakeup3(makeUps[2]);
    setModalType('edit-form');
    setOpenModal(true);
  };

  const onChangeRecommendGroup = (id, type) => {
    const group = productGroups.find((e) => e.id === id);
    if (type === 'skincare') {
      setLotion(group.products.find((e) => e.category === 'Lotions'));
      setSerum(group.products.find((e) => e.category === 'Serums'));
      setCream(group.products.find((e) => e.category === 'Creams'));
      setEye(group.products.find((e) => e.category === 'Eye Care'));
      setUv(group.products.find((e) => e.category === 'UV Protection'));
    }
    if (type === 'makeup') {
      const makeUps = group.products.filter((e) => e.routine === 'Makeup');
      console.log(makeUps);
      setMakeup1(makeUps[0]);
      setMakeup2(makeUps[1]);
      setMakeup3(makeUps[2]);
    }
  };

  const handleOnSearch = (string, results) => {
    // onSearch will have as the first callback parameter
    // the string searched and for the second the results.
    console.log(string, results);
  };

  const handleOnHover = (result) => {
    // the item hovered
    console.log(result);
  };

  const handleOnSelect = (item, type) => {
    // the item selected
    console.log(type);
    console.log(item);
    if (type === 'lotion') {
      setLotion(item);
    }
    if (type === 'serum') {
      setSerum(item);
    }
    if (type === 'cream') {
      setCream(item);
    }
    if (type === 'eye') {
      setEye(item);
    }
    if (type === 'uv') {
      setUv(item);
    }
    if (type === 'makeup1') {
      setMakeup1(item);
    }
    if (type === 'makeup2') {
      setMakeup2(item);
    }
    if (type === 'makeup3') {
      setMakeup3(item);
    }
  };

  const handleOnFocus = () => {
    console.log('Focused');
  };

  const formatResult = (item) => {
    return (
      <div
        style={{
          display: 'flex',
          padding: '10px',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <img src={item.image_url} style={{ width: '50px', height: '50px' }} />
        <span>{item.code}</span>
        <span style={{ width: '150px' }}>{item.name}</span>
      </div>
    );
  };

  const saveProductGroup = () => {
    const productData = {
      name: name,
      locations: [],
      products_selected: [
        lotion?.id,
        serum?.id,
        cream?.id,
        eye?.id,
        uv?.id,
        makeup1?.id,
        makeup2?.id,
        makeup3?.id,
      ],
    };
    let method, url;
    if (id) {
      method = 'PUT';
      url = `https://v2-app.chowis.com/api/dior/product_recommendation_groups/${id}`;
    } else {
      method = 'POST';
      url = 'https://v2-app.chowis.com/api/dior/product_recommendation_groups';
    }

    axios({
      method: method,
      url: url,
      data: productData,
      headers: {
        'X-CHOWIS-CONSULTANT-TOKEN': token,
      },
    }).then((res) => {
      console.log(res);
      if (res.status === 200) {
        // reload
        window.location.reload();
        setOpenModal(false);
      }
    });
  };

  const renderAddForm = () => {
    return (
      <Box className="modal-box" style={{ height: '620px', width: '600px' }}>
        <TextField
          label={'Recommendation Name'}
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

        <div className="tab-container" style={{ marginTop: '20px' }}>
          <div
            className={activeTab == 'skincare' ? 'active-tab' : 'tab'}
            onClick={() => {
              setActiveTab('skincare');
            }}
          >
            Skincare
          </div>
          <div
            className={activeTab == 'makeup' ? 'active-tab' : 'tab'}
            onClick={() => {
              setActiveTab('makeup');
            }}
          >
            Make Up
          </div>
        </div>
        {activeTab == 'skincare' && (
          <>
            <div
              style={{
                marginTop: '10px',
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'column',
              }}
            >
              <div>Select Recommendation</div>
              <TextField
                select
                size="small"
                variant="outlined"
                style={{ marginTop: '10px', width: '300px' }}
                onChange={(e) =>
                  onChangeRecommendGroup(e.target.value, 'skincare')
                }
              >
                {productGroups.map((e) => {
                  return <MenuItem value={e.id}>{e.name}</MenuItem>;
                })}
              </TextField>
            </div>
            <div
              style={{
                marginTop: '10px',
                background: '#FFFFFF',
                border: '1px solid #5A5A5A',
                borderRadius: '10px',
                padding: '20px',
              }}
            >
              <Grid container spacing={4} alignItems="center">
                <Grid item xs={2}>
                  <div>Lotion</div>
                </Grid>
                <Grid item xs={10}>
                  <div style={{ width: 400 }}>
                    <ReactSearchAutocomplete
                      items={products.filter((e) => e.category === 'Lotions')}
                      onSearch={handleOnSearch}
                      onHover={handleOnHover}
                      onSelect={(e) => handleOnSelect(e, 'lotion')}
                      onFocus={handleOnFocus}
                      autoFocus
                      formatResult={formatResult}
                      showIcon={false}
                      inputSearchString={lotion?.name}
                      styling={{
                        height: '34px',
                        border: '1px solid',
                        borderRadius: '4px',
                        backgroundColor: 'white',
                        overflow: 'auto',
                        zIndex: '9999',
                      }}
                    />
                  </div>
                </Grid>
              </Grid>
              <Grid container spacing={4} alignItems="center">
                <Grid item xs={2}>
                  <div>Serum</div>
                </Grid>
                <Grid item xs={10}>
                  <div style={{ width: 400 }}>
                    <ReactSearchAutocomplete
                      items={products.filter((e) => e.category === 'Serums')}
                      onSearch={handleOnSearch}
                      onHover={handleOnHover}
                      onSelect={(e) => handleOnSelect(e, 'serum')}
                      onFocus={handleOnFocus}
                      autoFocus
                      formatResult={formatResult}
                      showIcon={false}
                      inputSearchString={serum?.name}
                      styling={{
                        height: '34px',
                        border: '1px solid',
                        borderRadius: '4px',
                        backgroundColor: 'white',
                        overflow: 'auto',
                        zIndex: '9998',
                      }}
                    />
                  </div>
                </Grid>
              </Grid>
              <Grid container spacing={4} alignItems="center">
                <Grid item xs={2}>
                  <div>Cream</div>
                </Grid>
                <Grid item xs={10}>
                  <div style={{ width: 400 }}>
                    <ReactSearchAutocomplete
                      items={products.filter((e) => e.category === 'Creams')}
                      onSearch={handleOnSearch}
                      onHover={handleOnHover}
                      onSelect={(e) => handleOnSelect(e, 'cream')}
                      onFocus={handleOnFocus}
                      autoFocus
                      formatResult={formatResult}
                      showIcon={false}
                      inputSearchString={cream?.name}
                      styling={{
                        height: '34px',
                        border: '1px solid',
                        borderRadius: '4px',
                        backgroundColor: 'white',
                        overflow: 'auto',
                        zIndex: '9997',
                      }}
                    />
                  </div>
                </Grid>
              </Grid>
              <Grid container spacing={4} alignItems="center">
                <Grid item xs={2}>
                  <div>Eye</div>
                </Grid>
                <Grid item xs={10}>
                  <div style={{ width: 400 }}>
                    <ReactSearchAutocomplete
                      items={products.filter((e) => e.category === 'Eye Care')}
                      onSearch={handleOnSearch}
                      onHover={handleOnHover}
                      onSelect={(e) => handleOnSelect(e, 'eye')}
                      onFocus={handleOnFocus}
                      autoFocus
                      formatResult={formatResult}
                      showIcon={false}
                      inputSearchString={eye?.name}
                      styling={{
                        height: '34px',
                        border: '1px solid',
                        borderRadius: '4px',
                        backgroundColor: 'white',
                        overflow: 'auto',
                        zIndex: '9996',
                      }}
                    />
                  </div>
                </Grid>
              </Grid>
              <Grid container spacing={4} alignItems="center">
                <Grid item xs={2}>
                  <div>UV</div>
                </Grid>
                <Grid item xs={10}>
                  <div style={{ width: 400 }}>
                    <ReactSearchAutocomplete
                      items={products.filter(
                        (e) => e.category === 'UV Protection'
                      )}
                      onSearch={handleOnSearch}
                      onHover={handleOnHover}
                      onSelect={(e) => handleOnSelect(e, 'uv')}
                      onFocus={handleOnFocus}
                      autoFocus
                      formatResult={formatResult}
                      showIcon={false}
                      inputSearchString={uv?.name}
                      styling={{
                        height: '34px',
                        border: '1px solid',
                        borderRadius: '4px',
                        backgroundColor: 'white',
                        overflow: 'auto',
                        zIndex: '9995',
                      }}
                    />
                  </div>
                </Grid>
              </Grid>
            </div>
          </>
        )}
        {activeTab == 'makeup' && (
          <>
            <div
              style={{
                marginTop: '10px',
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'column',
              }}
            >
              <div>Select Recommendation</div>
              <TextField
                select
                size="small"
                variant="outlined"
                style={{ marginTop: '10px', width: '300px' }}
                onChange={(e) =>
                  onChangeRecommendGroup(e.target.value, 'makeup')
                }
              >
                {productGroups.map((e) => {
                  return <MenuItem value={e.id}>{e.name}</MenuItem>;
                })}
              </TextField>
            </div>
            <div
              style={{
                marginTop: '10px',
                background: '#FFFFFF',
                border: '1px solid #5A5A5A',
                borderRadius: '10px',
                padding: '20px',
              }}
            >
              <Grid container spacing={4} alignItems="center">
                <Grid item xs={2}>
                  <div>Make-up 1</div>
                </Grid>
                <Grid item xs={10}>
                  <div style={{ width: 400 }}>
                    <ReactSearchAutocomplete
                      items={products.filter((e) => e.routine === 'Makeup')}
                      onSearch={handleOnSearch}
                      onHover={handleOnHover}
                      onSelect={(e) => handleOnSelect(e, 'makeup1')}
                      onFocus={handleOnFocus}
                      autoFocus
                      formatResult={formatResult}
                      showIcon={false}
                      inputSearchString={makeup1?.name}
                      styling={{
                        height: '34px',
                        border: '1px solid',
                        borderRadius: '4px',
                        backgroundColor: 'white',
                        overflow: 'auto',
                        zIndex: '9999',
                      }}
                    />
                  </div>
                </Grid>
              </Grid>
              <Grid container spacing={4} alignItems="center">
                <Grid item xs={2}>
                  <div>Make-up 2</div>
                </Grid>
                <Grid item xs={10}>
                  <div style={{ width: 400 }}>
                    <ReactSearchAutocomplete
                      items={products.filter((e) => e.routine === 'Makeup')}
                      onSearch={handleOnSearch}
                      onHover={handleOnHover}
                      onSelect={(e) => handleOnSelect(e, 'makeup2')}
                      onFocus={handleOnFocus}
                      autoFocus
                      formatResult={formatResult}
                      showIcon={false}
                      inputSearchString={makeup2?.name}
                      styling={{
                        height: '34px',
                        border: '1px solid',
                        borderRadius: '4px',
                        backgroundColor: 'white',
                        overflow: 'auto',
                        zIndex: '9998',
                      }}
                    />
                  </div>
                </Grid>
              </Grid>
              <Grid container spacing={4} alignItems="center">
                <Grid item xs={2}>
                  <div>Make-up 3</div>
                </Grid>
                <Grid item xs={10}>
                  <div style={{ width: 400 }}>
                    <ReactSearchAutocomplete
                      items={products.filter((e) => e.routine === 'Makeup')}
                      onSearch={handleOnSearch}
                      onHover={handleOnHover}
                      onSelect={(e) => handleOnSelect(e, 'makeup3')}
                      onFocus={handleOnFocus}
                      autoFocus
                      formatResult={formatResult}
                      showIcon={false}
                      inputSearchString={makeup3?.name}
                      styling={{
                        height: '34px',
                        border: '1px solid',
                        borderRadius: '4px',
                        backgroundColor: 'white',
                        overflow: 'auto',
                        zIndex: '9997',
                      }}
                    />
                  </div>
                </Grid>
              </Grid>
            </div>
          </>
        )}
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            saveProductGroup();
          }}
          style={{ width: '100%', display: 'flex', marginTop: '20px' }}
        >
          Save
        </Button>
      </Box>
    );
  };

  return (
    <Layout title={'Product Recommendation`'} disableLayout={false}>
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
          {(modalType === 'add-form' || modalType === 'edit-form') &&
            renderAddForm()}
          {/* {modalType === 'upload-form' && 
            <UploadFormProduct
              token={token} 
              onClose={() => setOpenModal(false)}
              saveUploadUrl='https://v2-app.chowis.com/api/dior/product_recommendations/import'
              exampleFileUrl='https://portal-apptree-bucket.s3.ap-northeast-2.amazonaws.com/uploads/images/dior/import_company_branches/3b33bed2-1fc8-49be-ac58-db00000effc9-products.xlsx'
              modelName='Products'
            />
          }
          {(modalType === 'export-form') && <ExportFormProduct />} */}
        </>
      </Modal>
      <Grid container direction="column" spacing={2} wrap="nowrap">
        <Grid item xs>
          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              padding: '20px',
            }}
          >
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                onClickNewGroup();
              }}
            >
              New Group
            </Button>
          </div>

          <Grid container>
            {/* {productGroups.map((e, idx) => {
            return(
              <Grid item xs={4}>
                <div className='product-recommendations-card'>
                  <span style={{fontSize: '18px'}}>Recommendation Group Name</span>
                  <div className='group-name-box'>
                    {e.name}
                  </div>
                  <span style={{fontSize: '18px', marginTop: '10px', fontWeight: '700'}}>Access rights location</span>
                  <ul>
                    {e.countries && e.countries.map((a) => {
                      return(
                        <li>{a}</li>
                      )})
                    }
                  </ul>
                  <span style={{fontSize: '18px', marginTop: '10px', fontWeight: '700'}}>Skincare products</span>
                  <ul>
                    {e.products && e.products.filter(e => e.routine === 'Skincare')?.map((a) => {
                      return(
                        <li>{a?.name}</li>
                      )})
                    }
                  </ul>
                  <span style={{fontSize: '18px', marginTop: '10px', fontWeight: '700'}}>Makeup products</span>
                  <ul>
                    {e.products && e.products.filter(e => e.routine === 'Makeup')?.map((a) => {
                      return(
                        <li>{a?.name}</li>
                      )})
                    }
                  </ul>
                  <Button
                    variant="contained"
                    color="primary"
                    style={{width: '100%'}}
                    onClick={()=>{onClickEditGroup(e.id)}}
                  >
                    Edit Group
                  </Button>
                </div>
              </Grid>
            )
          })} */}
            {/* <div className="recommendation-group-header">
              <div style={{width: '100px'}}>
                <Checkbox color="primary"/>
              </div>
              <div style={{width: '20px'}}></div>
              <div style={{width: '200px'}}>Group Name</div>
              <div style={{width: '100px'}}>Routine</div>
              <div style={{width: '100px'}}>Access Rights</div>
              <div style={{width: '100px'}}>Status</div>
              <div style={{width: '150px'}}>No. of Products</div>
            </div>
            {productGroups.map((productGroup, idx) => {
              return(
                <div className="recommendation-group-body">
                  <div style={{width: '100px'}}>
                      <Checkbox color="primary"/>
                  </div>
                  <div style={{width: '20px'}}>
                    <ArrowCircleDownIcon />
                  </div>
                  <div style={{width: '200px'}}>{productGroup.name}</div>
                  <div style={{width: '100px'}}>{productGroup.routine}</div>
                  <div style={{width: '100px'}}>{productGroup.countries.join(',')}</div>
                  <div style={{width: '100px'}}>Active</div>
                  <div style={{width: '150px'}}>{productGroup.products}</div>
                </div>
              )
            })} */}
            <TableWrapper
              style={{
                maxHeight: '100%',
                overflow: 'hidden',
                overflowX: 'initial',
                position: 'relative',
              }}
              // isLoading={results.isValidating}
            >
              <Table size="small" aria-label="a dense table">
                <TableHead>
                  <TableRow sx={{ backgroundColor: 'rgba(211,211,211,.2)' }}>
                    <TableCell>
                      <Checkbox color="primary" />
                    </TableCell>
                    <TableCell scope="header">Group Name</TableCell>
                    <TableCell>Routine</TableCell>
                    <TableCell>Access Rights</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>No. of Products</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {productGroups.map((productGroup, index) => (
                    <>
                      <TableRow key={productGroup.id}>
                        <TableCell>
                          <Checkbox color="primary" />
                          <IconButton
                            aria-label="expand row"
                            size="small"
                            onClick={() => setOpen(open === index ? -1 : index)}
                          >
                            {open === index ? (
                              <KeyboardArrowUpIcon />
                            ) : (
                              <KeyboardArrowDownIcon />
                            )}
                          </IconButton>
                        </TableCell>
                        <TableCell>{productGroup.name}</TableCell>
                        <TableCell>{productGroup.routine}</TableCell>
                        <TableCell>
                          {productGroup.countries.join(',')}
                        </TableCell>
                        <TableCell>Active</TableCell>
                        <TableCell>{productGroup.products.length}</TableCell>
                        <TableCell>
                          <Button
                            variant="contained"
                            color="primary"
                            style={{ width: '100%' }}
                            onClick={() => {
                              onClickEditGroup(productGroup.id);
                            }}
                          >
                            Edit
                          </Button>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell
                          colSpan={6}
                          sx={{
                            paddingBottom: 0,
                            paddingTop: 0,
                            border: '0px',
                          }}
                        >
                          <Collapse
                            in={open === index}
                            timeout="auto"
                            unmountOnExit
                          >
                            <TableWrapper
                              style={{
                                maxHeight: '100%',
                                overflow: 'hidden',
                                overflowX: 'initial',
                                position: 'relative',
                              }}
                              // isLoading={results.isValidating}
                            >
                              <Table size="small" aria-label="a dense table">
                                <TableHead>
                                  <TableRow
                                    sx={{
                                      backgroundColor: 'rgba(211,211,211,.2)',
                                    }}
                                  >
                                    <TableCell scope="header">
                                      Product Name
                                    </TableCell>
                                    <TableCell>Code</TableCell>
                                    <TableCell>Category</TableCell>
                                    <TableCell>Collection</TableCell>
                                  </TableRow>
                                </TableHead>

                                <TableBody>
                                  {productGroup.products.map(
                                    (product, index) => (
                                      <TableRow key={product.id}>
                                        <TableCell>{product.name}</TableCell>
                                        <TableCell>{product.code}</TableCell>
                                        <TableCell>
                                          {product.category}
                                        </TableCell>
                                        <TableCell>
                                          {product.collection}
                                        </TableCell>
                                      </TableRow>
                                    )
                                  )}
                                </TableBody>
                              </Table>
                            </TableWrapper>
                          </Collapse>
                        </TableCell>
                      </TableRow>
                    </>
                  ))}
                </TableBody>
              </Table>
            </TableWrapper>
          </Grid>
        </Grid>
      </Grid>
    </Layout>
  );
}
