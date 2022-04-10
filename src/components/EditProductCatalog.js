import React, { useState } from 'react';
import {
  Box,
  Breadcrumbs,
  Button,
  Checkbox,
  Grid,
  Slider,
  TextareaAutosize,
  TextField,
  Typography,
} from '@material-ui/core';
import { Layout } from './Layout';
import styled from 'styled-components';
import ArrowBackIosRoundedIcon from '@material-ui/icons/ArrowBackIosRounded';
import ImageIcon from '@material-ui/icons/Image';
import { NavLink } from 'react-router-dom';
import FileUpload from './FileUpload';

const marks = [
  {
    value: 0,
    label: '0',
  },
  {
    value: 10,
    label: '10',
  },
  {
    value: 20,
    label: '20',
  },
  {
    value: 60,
    label: '60',
  },
  {
    value: 100,
    label: '100',
  },
];

function valuetext(value) {
  return value;
}

const defaultValule = {
  image: null,
  product_name: '',
  price: '',
  brand: '',
  ingredient_preference: '',
  description: '',
  age_range: '',
  skin_type: '',
  balm: false,
  cream: false,
  gel: false,
  liquid: false,
  lotion: false,
  mask: false,
  mousse: false,
  oil: false,
  srub: false,
  serum: false,
  spray: false,
  stick: false,
  wipes: false,
  spots: false,
  pores: false,
  wrinkles: false,
  dark_circles: false,
  sensitivity: false,
  impurities: false,
  oiliness: false,
  radiance: false,
  dullness: false,
  elasticity: false,
  keratin: false,
  sebum: false,
  hydration: false,
  ph_level: false,
};

const EditProductCatalog = (props) => {
  const [userDetails, setUserDetails] = useState(defaultValule);

  return (
    <Layout
      title={
        <Breadcrumbs>
          <Typography display="initial">Edit Product Catalog</Typography>
        </Breadcrumbs>
      }
    >
      <Header>
        <NavLink to={'/product-catalog'} style={{ textDecoration: 'none' }}>
          <Button
            variant="contained"
            style={{ background: '#fff' }}
            startIcon={<ArrowBackIosRoundedIcon fontSize="small" />}
          >
            Previous Page
          </Button>
        </NavLink>
      </Header>

      <Box>
        <Grid>
          <Button
            variant="contained"
            color="primary"
            style={{ marginRight: '15px' }}
          >
            Save Product
          </Button>
          <Button variant="contained">Clear</Button>
        </Grid>
        <Box
          style={{
            boxShadow: '0px 0px 10px #999',
            marginTop: 20,
            padding: '56px 68px',
          }}
        >
          <Grid>
            <Grid>
              <Title>Add Product</Title>
              <Container>
                <div className="image-container">
                  <ImageIcon htmlColor="blue" />
                  <FileUpload
                    setUserDetails={setUserDetails}
                    userDetails={userDetails}
                  />
                </div>
                <div className="input-container">
                  <Title>Product Name</Title>
                  <TextField variant="outlined" placeholder="Product Name" />
                  <Title>Price</Title>
                  <TextField variant="outlined" placeholder="Price" />
                  <Title>Brand</Title>
                  <TextField variant="outlined" placeholder="Brand" />
                  <Title>Ingredient Preference</Title>
                  <TextField
                    variant="outlined"
                    placeholder="Ingredient Preference"
                  />
                </div>
                <div className="description-container">
                  <Title>Description</Title>
                  <TextareaAutosize
                    style={{ height: '138px', width: '100%' }}
                    aria-label="minimum height"
                    minRows={3}
                    placeholder="Minimum 3 rows"
                  />
                  <Title>Age Range</Title>
                  <Slider
                    track="normal"
                    getAriaValueText={valuetext}
                    defaultValue={[10, 20]}
                    marks={marks}
                  />
                  <Title>Skin Type</Title>
                  <div className="checkbox-container">
                    <Checkbox />
                    <Typography>Combination</Typography>

                    <Checkbox />
                    <Typography>Normal</Typography>

                    <Checkbox />
                    <Typography>Sensitivity</Typography>

                    <Checkbox />
                    <Typography>Oily</Typography>

                    <Checkbox />
                    <Typography>Dry</Typography>
                  </div>
                </div>
              </Container>
            </Grid>
          </Grid>
          <Grid>
            <Title>Formulation</Title>
            <StyledCheckboxContainer>
              <div className="box">
                <Checkbox color="primary" />
                <Typography className="checkbox-text">Balm</Typography>

                <Checkbox color="primary" />
                <Typography className="checkbox-text">Cream</Typography>

                <Checkbox color="primary" />
                <Typography className="checkbox-text">Gel</Typography>

                <Checkbox color="primary" />
                <Typography className="checkbox-text">Liquid</Typography>

                <Checkbox color="primary" />
                <Typography className="checkbox-text">Lotion</Typography>
                <Checkbox color="primary" />
                <Typography className="checkbox-text">Mask</Typography>

                <Checkbox color="primary" />
                <Typography className="checkbox-text">Mousse</Typography>
              </div>
              <div className="box">
                <Checkbox color="primary" />
                <Typography className="checkbox-text">Oil</Typography>

                <Checkbox color="primary" />
                <Typography className="checkbox-text">Scrub</Typography>

                <Checkbox color="primary" />
                <Typography className="checkbox-text">Serum</Typography>
                <Checkbox color="primary" />
                <Typography className="checkbox-text">Spray</Typography>

                <Checkbox color="primary" />
                <Typography className="checkbox-text">Stick</Typography>

                <Checkbox color="primary" />
                <Typography className="checkbox-text">Wipes</Typography>
              </div>
            </StyledCheckboxContainer>
          </Grid>
          <Grid>
            <Title>Concern</Title>
            <StyledCheckboxContainer>
              <div className="box">
                <Checkbox color="primary" />
                <Typography className="checkbox-text">Spots</Typography>

                <Checkbox color="primary" />
                <Typography className="checkbox-text">Pores</Typography>

                <Checkbox color="primary" />
                <Typography className="checkbox-text">Wrinkles</Typography>

                <Checkbox color="primary" />
                <Typography className="checkbox-text">Dark Circles</Typography>

                <Checkbox color="primary" />
                <Typography className="checkbox-text">Sensitivity</Typography>
                <Checkbox color="primary" />
                <Typography className="checkbox-text">Impurities</Typography>

                <Checkbox color="primary" />
                <Typography className="checkbox-text">Oiliness</Typography>
              </div>
              <div className="box">
                <Checkbox color="primary" />
                <Typography className="checkbox-text">Radiance</Typography>

                <Checkbox color="primary" />
                <Typography className="checkbox-text">Dullness</Typography>

                <Checkbox color="primary" />
                <Typography className="checkbox-text">Elasticity</Typography>
                <Checkbox color="primary" />
                <Typography className="checkbox-text">Keratin</Typography>

                <Checkbox color="primary" />
                <Typography className="checkbox-text">Sebum</Typography>

                <Checkbox color="primary" />
                <Typography className="checkbox-text">Hydration</Typography>
                <Checkbox color="primary" />
                <Typography className="checkbox-text">PH level</Typography>
              </div>
            </StyledCheckboxContainer>
          </Grid>
        </Box>
      </Box>
    </Layout>
  );
};

export default EditProductCatalog;

const Header = styled.header`
  margin-top: -145px;
  margin-bottom: 120px;
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
  .image-container {
    margin-top: 10px;
    height: 185px;
    width: 185px;
    border: 3px dashed blue;
    background: #f1f9ff;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    object-fit: cover;
  }
  .input-container {
    display: flex;
    flex-direction: column;
    width: 30%;
  }
  .checkbox-container {
    display: flex;
    align-items: center;
  }
`;

const StyledCheckboxContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  border: 1px solid #707070;
  border-radius: 4px;
  .box {
    display: flex;
    align-items: center;
  }

  .checkbox-text {
    width: 100px;
  }
`;
