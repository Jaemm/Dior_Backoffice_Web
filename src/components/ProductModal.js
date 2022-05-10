import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { AddIcon } from '@material-ui/data-grid';
import CreateIcon from '@material-ui/icons/Create';
import {
  Button,
  CircularProgress,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@material-ui/core';
import styled from 'styled-components';
import FileUpload from './FileUpload';
import ImageIcon from '@material-ui/icons/Image';
import axios from 'axios';
import { useAppContext } from '../data/AppContext';
import { useSnackbar } from 'notistack';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  label: {
    backgroundColor: 'red',
    margin: 0,
  },
  select: {
    height: '56px',
    padding: 0,
    margin: 0,
  },
}));

const defaultValue = {
  name: '',
  description: '',
  link: '',
  product_type: '',
};

export default function ProductModal({ title, icon, item }) {
  const { token } = useAppContext();
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const state = item ? item : defaultValue;
  const [productData, setProductData] = useState(state);
  const [isLoading, setIsLoading] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const fetchUrl = item?.id
    ? `https://v2-app.chowis.com/api/pmx/product_recommendations/${productData.id}`
    : 'https://v2-app.chowis.com/api/pmx/product_recommendations';

  const method = item ? 'put' : 'post';
  const onCreateProduct = (event) => {
    event.preventDefault();

    setIsLoading(true);
    axios({
      method: method,
      url: fetchUrl,
      data: productData,
      headers: {
        'X-CHOWIS-CONSULTANT-TOKEN': token,
      },
    })
      .then((res) => {
        // console.log('Add Product', res.data);
        setIsLoading(false);
        setProductData(defaultValue);
        setTimeout(() => {
          setOpen(false);
          window.location.reload();
        }, 1000);
        enqueueSnackbar('Product Successfully Added', {
          variant: 'success',
        });
      })
      .catch((err) => {
        // console.log('Product Error', err);

        setIsLoading(false);
        enqueueSnackbar(err.message, {
          variant: 'error',
        });
      });
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button
        variant="contained"
        startIcon={icon === 'add' ? <AddIcon /> : <CreateIcon />}
        color="primary"
        style={{ marginRight: 10, textDecoration: 'none', padding: '7px 10px' }}
        onClick={handleOpen}
      >
        {title}
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        style={{display:'flex',alignItems:'center',justifyContent:'center'}}
        className={classes.modal}
        open={open}
        // onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <form className={classes.paper} onSubmit={onCreateProduct}>
            <Header>
              <Typography color="primary" variant="h5">
                {item && item ? 'EDIT PRODUCT' : 'ADD PRODUCT'}
              </Typography>
              <Button variant="outlined" onClick={handleClose}>
                X
              </Button>
            </Header>

            <Container>
              <div className="image-container">
                {item && (
                  <img
                    src={productData?.image_url}
                    alt="product"
                    className="image"
                  />
                )}
                <ImageIcon htmlColor="blue" />
                <FileUpload
                  setProductData={setProductData}
                  productData={productData}
                  setLoading={setImageLoading}
                />
              </div>

              <div className="input-container">
                <Title>Product Name</Title>
                <TextField
                  variant="outlined"
                  name="name"
                  value={productData.name}
                  onChange={(e) =>
                    setProductData((prev) => ({
                      ...prev,
                      name: e.target.value,
                    }))
                  }
                  required
                />
                <Title>Select product mode</Title>

                <Select
                  name="product_type"
                  variant="outlined"
                  className={classes.select}
                  value={productData.product_type}
                  onChange={(e) =>
                    setProductData((prev) => ({
                      ...prev,
                      product_type: e.target.value,
                    }))
                  }
                  required
                >
                  <MenuItem value="oily">Oily</MenuItem>
                  <MenuItem value="good">Good</MenuItem>
                  <MenuItem value="dry">Dry</MenuItem>
                  <MenuItem value="complextion">Complextion</MenuItem>
                  <MenuItem value="wrinkles">Wrinkles</MenuItem>
                  <MenuItem value="impurities">Impurities</MenuItem>
                  <MenuItem value="keratin">Keratin</MenuItem>
                  <MenuItem value="moisture">Moisture</MenuItem>
                  <MenuItem value="pores">Pores</MenuItem>
                  <MenuItem value="spots">Spots</MenuItem>
                  <MenuItem value="darkcircle">Darkcircle</MenuItem>
                </Select>

                <Title>Product link</Title>
                <TextField
                  variant="outlined"
                  value={productData.link}
                  onChange={(e) =>
                    setProductData((prev) => ({
                      ...prev,
                      link: e.target.value,
                    }))
                  }
                  placeholder="https://example.com"
                  required
                />
                <Title>Description </Title>
                <TextField
                  multiline={true}
                  rowsMax="3"
                  variant="outlined"
                  style={{
                    height: '80px',
                    width: '100%',
                    resize: 'none',
                    borderColor: '#aaa',
                    borderRadius: '5px',
                    padding: 5,
                    fontSize: 16,
                  }}
                  value={productData.description}
                  onChange={(e) =>
                    setProductData((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                  required
                />
              </div>
            </Container>
            <Button
              variant="contained"
              color="primary"
              disabled={imageLoading}
              style={{
                width: '100%',
                height: '50px',
                marginTop: 30,
              }}
              type="submit"
            >
              {isLoading || imageLoading ? (
                <CircularProgress color="red" />
              ) : (
                'Submit'
              )}
            </Button>
          </form>
        </Fade>
      </Modal>
    </div>
  );
}

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Title = styled.div`
  font-size: 18px;
  font-weight: 600;
  color: #3f51b5;
  margin: 10px 0px 5px;
`;
const Container = styled.div`
  display: flex;
  justify-content: space-around;
  width: 700px;
  .image-container {
    margin-top: 10px;

    width: 40%;
    border: 3px dashed blue;
    background: #f1f9ff;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    object-fit: cover;
  }
  .image {
    width: 100%;
    height: 376px;
    object-fit: contain;
    position: absolute;
    top: 0;
  }
  .input-container {
    display: flex;
    flex-direction: column;
    width: 55%;
  }
  .checkbox-container {
    display: flex;
    align-items: center;
  }
`;
