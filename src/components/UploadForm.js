import React, {useState, useRef} from 'react';
import { Grid, Button, Modal, Box, TextField, MenuItem } from '@material-ui/core';
import axios from 'axios';
import { useSnackbar } from 'notistack';

const UploadForm = (props) => {
  const inputFile = useRef(null) 
  const [loadingUpload, setLoadingUpload] = useState(false)
  const [filename, setFileName] = useState('')
  const [publicUrl, setPublicUrl] = useState('')
  const {token, onClose, saveUploadUrl, modelName} = props
  const { enqueueSnackbar } = useSnackbar();

  const onBrowseFileClick = () => {
    // `current` points to the mounted file input element
   if(inputFile && inputFile.current){
     // @ts-ignore: Object is possibly 'null'.
    inputFile.current.click();
   }
  }

  const onUploadFile = (files) => {
    if(files.length === 0){
      return ;
    }
    console.log(files)
    setLoadingUpload(true);
    const filename = files[0]?.name
    setFileName(filename)
    axios({
      method: 'GET',
      url: `https://v2-app.chowis.com/api/dior/company_branches/presign_upload_import_file?filename=${filename}`,
      headers: {
        'X-CHOWIS-CONSULTANT-TOKEN': token,
      },
    })
    .then((res) => {
      console.log(res)
      if(res.status === 200){
        const {presigned_url, public_url} = res.data
        console.log(presigned_url, public_url)
        setPublicUrl(public_url)
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
    })

  }

  const onSaveUpload = () => {
    axios({
      method: 'POST',
      url: saveUploadUrl,
      headers: {
        'X-CHOWIS-CONSULTANT-TOKEN': token,
      },
      data: {file_url: publicUrl}
    })
    .then((res) => {
      console.log(res)
      enqueueSnackbar('Success upload', {
        variant: 'success',
      });
      onClose()
      window.location.reload(false);
    })
  }


  return(      
    <Box className="modal-box">
      <div className="modal-header">Upload a list of {modelName}</div>
      <div className="modal-subheader">Please download sample file</div>
      <div style={{display: 'flex', justifyContent: 'center', marginTop: '10px'}}>
        <Button
            variant="contained"
            color="primary"
            style={{marginRight: '10px'}}
            // onClick={() => {onClickAddButton()}}
        >
          Download
        </Button>
      </div>

      <div className="border"/>

      <input type="file" ref={inputFile} style={{display: 'none'}} onChange={(e)=>{onUploadFile(e.target.files)}}/>
      <div style={{display: 'flex'}}>
        <div className="upload-field">{filename ? filename : 'Link here'}</div>
        <Button
            variant="contained"
            color="primary"
            style={{marginRight: '10px'}}
            onClick={() => {onBrowseFileClick()}}
        >
          Browse
        </Button>
      </div>

      <div style={{display: 'flex', marginTop: '30px', justifyContent: 'center'}}>
        <Button
              variant="contained"
              color="primary"
              style={{marginRight: '10px'}}
              onClick={() => {onClose()}}
          >
            Cancel
        </Button>
        <Button
            variant="contained"
            color="primary"
            style={{marginRight: '10px'}}
            onClick={() => {onSaveUpload()}}
            disabled={loadingUpload}
        >
          Upload
        </Button>
      </div>

    </Box>
  )

}

export default UploadForm