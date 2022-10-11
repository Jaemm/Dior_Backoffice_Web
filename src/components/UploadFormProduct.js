import React, { useState, useRef } from 'react';
import {
  Grid,
  Button,
  Modal,
  Box,
  TextField,
  MenuItem,
  IconButton,
} from '@material-ui/core';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import { Close } from '@material-ui/icons';
import { useRequest } from 'ahooks';
import { useAPI } from '../api/API';
import { useExcel } from '../hooks/useExcel';

const UploadForm = (props) => {
  const api = useAPI();

  const inputFile = useRef(null);
  const [loadingUpload, setLoadingUpload] = useState(false);
  const [filename, setFileName] = useState('');
  const [publicUrl, setPublicUrl] = useState('');
  const { token, onClose, saveUploadUrl, modelName, exampleFileUrl } = props;
  const { enqueueSnackbar } = useSnackbar();
  const [activeTab, setActiveTab] = useState('products');
  const [multiplePublicUrl, setMultiplePublicUrl] = useState([]);
  const [country, setCountry] = useState('');
  const countriesInfo = useRequest(() =>
    api.requestResource('api/dior/countries')
  );

  const onBrowseFileClick = () => {
    // `current` points to the mounted file input element
    if (inputFile && inputFile.current) {
      // @ts-ignore: Object is possibly 'null'.
      inputFile.current.click();
    }
  };

  const onUploadFile = (files) => {
    if (files.length === 0) {
      return;
    }
    console.log(files);
    setLoadingUpload(true);
    const filename = files[0]?.name;
    setFileName(filename);
    axios({
      method: 'GET',
      url: `https://v2-app.chowis.com/api/dior/company_branches/presign_upload_import_file?filename=${filename}`,
      headers: {
        'X-CHOWIS-CONSULTANT-TOKEN': token,
      },
    }).then((res) => {
      console.log(res);
      if (res.status === 200) {
        const { presigned_url, public_url } = res.data;
        console.log(presigned_url, public_url);
        setPublicUrl(public_url);
        const formData = new FormData();
        formData.append('image', files[0]);

        axios
          .put(presigned_url, files[0], {})
          .then((res) => {
            setLoadingUpload(false);
          })
          .catch((err) => {
            console.log('S3 Testing Error =>', err);
            setLoadingUpload(false);
          });
      }
    });
  };

  const samples = {
    translations: [{ 'Product code': 'M001', Translation: 'Sauvage' }],
    countries: [
      { 'Product code': 'F019004955', Exclusion: 'N' },
      { 'Product code': 'F999375649', Exclusion: 'Y' },
      { 'Product code': 'F999375703', Exclusion: 'Y' },
      { 'Product code': 'F999375746', Exclusion: 'Y' },
      { 'Product code': 'F999375751', Exclusion: 'Y' },
      { 'Product code': 'F999375774', Exclusion: 'Y' },
      { 'Product code': 'F999375783', Exclusion: 'Y' },
      { 'Product code': 'F099033340', Exclusion: 'Y' },
      { 'Product code': 'F999375850', Exclusion: 'Y' },
    ],
    products: [
      {
        'Product code': '001234',
        'Product Name': 'YOLO',
        'Product Link': '',
        Category: 'Fluids',
        Collection: 'YOLO',
        Axis: 'Makeup',
        'Image URL': '',
        'Product Variant Code': '',
      },
      {
        'Product code': '001235',
        'Product Name': 'YOLO 0,5N',
        'Product Link': '',
        Category: 'Fluids',
        Collection: 'YOLO',
        Axis: 'Makeup',
        'Image URL': '',
        'Product Variant Code': '001234',
      },
      {
        'Product code': '001236',
        'Product Name': 'YOLO 00',
        'Product Link': '',
        Category: 'Fluids',
        Collection: 'YOLO',
        Axis: 'Makeup',
        'Image URL': '',
        'Product Variant Code': '001234',
      },
      {
        'Product code': '001237',
        'Product Name': 'YOLO 0N',
        'Product Link': '',
        Category: 'Fluids',
        Collection: 'YOLO',
        Axis: 'Makeup',
        'Image URL': '',
        'Product Variant Code': '001234',
      },
    ],
  };

  const { makeExcel } = useExcel();
  const openInNewTab = (url) => {
    if (props.isExcel) {
      makeExcel(samples[activeTab]);
    } else {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  const onUploadMultipleFile = (files) => {
    if (files.length === 0) {
      return;
    }
    console.log(files);
    setLoadingUpload(true);
    let publicUrls = [];
    Array.from(files).forEach((file) => {
      const filename = file.name;
      setFileName(filename);
      axios({
        method: 'GET',
        url: `https://v2-app.chowis.com/api/dior/company_branches/presign_upload_import_file?filename=${filename}`,
        headers: {
          'X-CHOWIS-CONSULTANT-TOKEN': token,
        },
      }).then((res) => {
        console.log(res);
        if (res.status === 200) {
          const { presigned_url, public_url } = res.data;
          console.log(presigned_url, public_url);
          setPublicUrl(public_url);
          publicUrls = [...publicUrls, public_url];
          setMultiplePublicUrl(publicUrls);

          console.log(publicUrls);
          const formData = new FormData();
          formData.append('image', file);

          axios
            .put(presigned_url, file, {})
            .then((res) => {
              setLoadingUpload(false);
            })
            .catch((err) => {
              console.log('S3 Testing Error =>', err);
              setLoadingUpload(false);
            });
        }
      });
    });
    console.log('publicUrls', publicUrls);
  };

  const onSaveUpload = () => {
    let url, data;
    if (activeTab === 'products') {
      url = 'https://v2-app.chowis.com/api/dior/product_recommendations/import';
      data = { file_url: publicUrl };
    }
    if (activeTab === 'pictures') {
      url =
        'https://v2-app.chowis.com/api/dior/product_recommendations/import_pictures';
      data = { file_urls: multiplePublicUrl };
    }
    if (activeTab === 'countries') {
      url =
        'https://v2-app.chowis.com/api/dior/product_recommendations/import_countries';
      data = { file_url: publicUrl };
    }
    if (activeTab === 'translations') {
      url =
        'https://v2-app.chowis.com/api/dior/product_recommendations/import_translations';
      data = { file_url: publicUrl };
    }
    axios({
      method: 'POST',
      url: url,
      headers: {
        'X-CHOWIS-CONSULTANT-TOKEN': token,
      },
      data: data,
    }).then((res) => {
      console.log(res);
      enqueueSnackbar('Success upload', {
        variant: 'success',
      });
      onClose();
      window.location.reload(false);
    });
  };

  const countriesSelect = countriesInfo?.data?.data?.map((e) => ({
    key: e.name,
    label: e.name,
  }));

  return (
    <Box className="modal-box">
      {/* <div className="modal-header">Upload a list of {modelName}</div> */}
      <div
        style={{
          height: '100%',
          position: 'absolute',
        }}
      >
        <IconButton
          style={{
            top: '-2em',
            right: '-17em',
          }}
          onClick={() => {
            onClose();
          }}
        >
          <Close />
        </IconButton>
      </div>
      <div className="tab-container">
        <div
          className={activeTab == 'products' ? 'active-tab' : 'tab'}
          onClick={() => {
            setActiveTab('products');
          }}
        >
          Products
        </div>
        <div
          className={activeTab == 'pictures' ? 'active-tab' : 'tab'}
          onClick={() => {
            setActiveTab('pictures');
          }}
        >
          Pictures
        </div>
        <div
          className={activeTab == 'countries' ? 'active-tab' : 'tab'}
          onClick={() => {
            setActiveTab('countries');
          }}
        >
          Countries
        </div>
        <div
          className={activeTab == 'translations' ? 'active-tab' : 'tab'}
          onClick={() => {
            setActiveTab('translations');
          }}
        >
          Translations
        </div>
      </div>
      {activeTab === 'products' && (
        <>
          <div className="modal-subheader" style={{ marginTop: '40px' }}>
            Please download sample file
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              marginTop: '10px',
            }}
          >
            <Button
              variant="contained"
              color="primary"
              style={{ marginRight: '10px', borderRadius: '15px' }}
              onClick={() => openInNewTab(exampleFileUrl)}
            >
              Download
            </Button>
          </div>

          <div className="border" />

          <input
            type="file"
            ref={inputFile}
            style={{ display: 'none' }}
            onChange={(e) => {
              onUploadFile(e.target.files);
            }}
          />
          <div
            style={{
              fontFamily: 'Pretendard',
              fontStyle: 'normal',
              fontWeight: '500',
              fontSize: '18px',
              lineHeight: '22px',
              color: '#5A5A5A',
            }}
          >
            Please select Excel {modelName} list to upload:
          </div>
          <div style={{ display: 'flex' }}>
            <div className="upload-field">
              <span style={{ marginLeft: '10px' }}>
                {filename ? filename : 'Link here'}
              </span>
            </div>
            <Button
              variant="contained"
              color="primary"
              style={{ marginRight: '10px', borderRadius: '15px' }}
              onClick={() => {
                onBrowseFileClick();
              }}
            >
              Browse
            </Button>
          </div>

          <div
            style={{
              display: 'flex',
              marginTop: '30px',
              justifyContent: 'center',
            }}
          >
            <Button
              variant="contained"
              color="primary"
              style={{
                marginRight: '10px',
                borderRadius: '15px',
                color: 'black',
                background: 'white',
                border: '1px solid #000000',
                boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
              }}
              onClick={() => {
                onClose();
              }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
              style={{ marginRight: '10px', borderRadius: '15px' }}
              onClick={() => {
                onSaveUpload();
              }}
              disabled={loadingUpload}
            >
              Upload
            </Button>
          </div>
        </>
      )}
      {activeTab === 'pictures' && (
        <>
          <input
            type="file"
            multiple="multiple"
            ref={inputFile}
            style={{ display: 'none' }}
            onChange={(e) => {
              onUploadMultipleFile(e.target.files);
            }}
          />
          <div
            style={{
              fontFamily: 'Pretendard',
              fontStyle: 'normal',
              fontWeight: '500',
              fontSize: '18px',
              lineHeight: '22px',
              color: '#5A5A5A',
              textAlign: 'center',
              margin: '30px 0 10px',
            }}
          >
            Please select product pictures to upload:
          </div>
          <div style={{ display: 'flex' }}>
            <div className="upload-field">
              <span style={{ marginLeft: '10px' }}>
                {filename ? filename : 'Link here'}
              </span>
            </div>
            <Button
              variant="contained"
              color="primary"
              style={{ marginRight: '10px', borderRadius: '15px' }}
              onClick={() => {
                onBrowseFileClick();
              }}
            >
              Browse
            </Button>
          </div>

          <div
            style={{
              display: 'flex',
              marginTop: '30px',
              justifyContent: 'center',
            }}
          >
            <Button
              variant="contained"
              color="primary"
              style={{
                marginRight: '10px',
                borderRadius: '15px',
                color: 'black',
                background: 'white',
                border: '1px solid #000000',
                boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
              }}
              onClick={() => {
                onClose();
              }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
              style={{ marginRight: '10px', borderRadius: '15px' }}
              onClick={() => {
                onSaveUpload();
              }}
              disabled={loadingUpload}
            >
              Upload
            </Button>
          </div>
        </>
      )}
      {activeTab === 'countries' && (
        <>
          <div className="modal-subheader" style={{ marginTop: '40px' }}>
            Please download sample file
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              marginTop: '10px',
            }}
          >
            <Button
              variant="contained"
              color="primary"
              style={{ marginRight: '10px', borderRadius: '15px' }}
              onClick={() => openInNewTab(exampleFileUrl)}
            >
              Download
            </Button>
          </div>
          <div className="border" />
          <TextField
            label={'Select country'}
            select
            variant="outlined"
            size="small"
            fullWidth
            style={{ marginBottom: '20px' }}
            value={country}
            onChange={(e) => {
              setCountry(e.target.value);
            }}
          >
            {countriesSelect?.map(({ label, key }) => (
              <MenuItem key={key} value={key}>
                {label}
              </MenuItem>
            ))}
          </TextField>
          <input
            type="file"
            ref={inputFile}
            style={{ display: 'none', marginTop: '20px' }}
            onChange={(e) => {
              onUploadFile(e.target.files);
            }}
          />
          <div
            style={{
              fontFamily: 'Pretendard',
              fontStyle: 'normal',
              fontWeight: '500',
              fontSize: '18px',
              lineHeight: '22px',
              color: '#5A5A5A',
            }}
          >
            Please select Excel countries list to upload:
          </div>
          <div style={{ display: 'flex' }}>
            <div className="upload-field">
              <span style={{ marginLeft: '10px' }}>
                {filename ? filename : 'Link here'}
              </span>
            </div>
            <Button
              variant="contained"
              color="primary"
              style={{ marginRight: '10px', borderRadius: '15px' }}
              onClick={() => {
                onBrowseFileClick();
              }}
            >
              Browse
            </Button>
          </div>

          <div
            style={{
              display: 'flex',
              marginTop: '30px',
              justifyContent: 'center',
            }}
          >
            <Button
              variant="contained"
              color="primary"
              style={{
                marginRight: '10px',
                borderRadius: '15px',
                color: 'black',
                background: 'white',
                border: '1px solid #000000',
                boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
              }}
              onClick={() => {
                onClose();
              }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
              style={{ marginRight: '10px', borderRadius: '15px' }}
              onClick={() => {
                onSaveUpload();
              }}
              disabled={loadingUpload}
            >
              Upload
            </Button>
          </div>
        </>
      )}

      {activeTab === 'translations' && (
        <>
          <div className="modal-subheader" style={{ marginTop: '40px' }}>
            Please download sample file
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              marginTop: '10px',
            }}
          >
            <Button
              variant="contained"
              color="primary"
              style={{ marginRight: '10px', borderRadius: '15px' }}
              onClick={() => openInNewTab(exampleFileUrl)}
            >
              Download
            </Button>
          </div>
          <div className="border" />
          <TextField
            label={'Select country'}
            select
            variant="outlined"
            size="small"
            fullWidth
            style={{ marginBottom: '20px' }}
            value={country}
            onChange={(e) => {
              setCountry(e.target.value);
            }}
          >
            {countriesSelect?.map(({ label, key }) => (
              <MenuItem key={key} value={key}>
                {label}
              </MenuItem>
            ))}
          </TextField>
          <input
            type="file"
            ref={inputFile}
            style={{ display: 'none' }}
            onChange={(e) => {
              onUploadFile(e.target.files);
            }}
          />
          <div
            style={{
              fontFamily: 'Pretendard',
              fontStyle: 'normal',
              fontWeight: '500',
              fontSize: '18px',
              lineHeight: '22px',
              color: '#5A5A5A',
            }}
          >
            Please select Excel translations list to upload:
          </div>
          <div style={{ display: 'flex' }}>
            <div className="upload-field">
              <span style={{ marginLeft: '10px' }}>
                {filename ? filename : 'Link here'}
              </span>
            </div>
            <Button
              variant="contained"
              color="primary"
              style={{ marginRight: '10px', borderRadius: '15px' }}
              onClick={() => {
                onBrowseFileClick();
              }}
            >
              Browse
            </Button>
          </div>

          <div
            style={{
              display: 'flex',
              marginTop: '30px',
              justifyContent: 'center',
            }}
          >
            <Button
              variant="contained"
              color="primary"
              style={{
                marginRight: '10px',
                borderRadius: '15px',
                color: 'black',
                background: 'white',
                border: '1px solid #000000',
                boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
              }}
              onClick={() => {
                onClose();
              }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
              style={{ marginRight: '10px', borderRadius: '15px' }}
              onClick={() => {
                onSaveUpload();
              }}
              disabled={loadingUpload}
            >
              Upload
            </Button>
          </div>
        </>
      )}
    </Box>
  );
};

export default UploadForm;
