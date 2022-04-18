import {
  Box,
  Breadcrumbs,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { Layout } from '../components/Layout';
import { ProductCatalogDataTable } from '../components/PorductCatalogDataTable';
import axios from 'axios';
import { useAppContext } from '../data/AppContext';
import ProductModal from '../components/ProductModal';
import { useSnackbar } from 'notistack';

const useStyles = makeStyles(() => ({
  formControl: {
    minWidth: 120,
  },
  select: {},
  label: {},
}));

const ProductCatalog = () => {
  const { token } = useAppContext();
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();

  const [productList, setProductList] = React.useState();
  const [isLoading, setIsLoading] = React.useState(false);
  const [selectedID, setSelectedID] = React.useState();
  const [confirmDelete, setConfirmDelete] = React.useState(false);

  const onDeleteProduct = () => {
    axios
      .delete(
        `https://v2-app.chowis.com/api/pmx/product_recommendations/${selectedID}`,
        {
          headers: {
            'X-CHOWIS-CONSULTANT-TOKEN': token,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        setConfirmDelete(false);
        setTimeout(() => {
          window.location.reload();
        }, 1000);
        enqueueSnackbar('Product Successfully Deleted', {
          variant: 'success',
        });
      })
      .catch((err) => {
        console.log('delete err', err);
        setConfirmDelete(false);
        enqueueSnackbar(err.message, {
          variant: 'error',
        });
      });
  };

  const fetchListOfProductRecommendations = () => {
    setIsLoading(true);
    axios
      .get('https://v2-app.chowis.com/api/pmx/product_recommendations', {
        headers: {
          'X-CHOWIS-CONSULTANT-TOKEN': token,
        },
      })
      .then((res) => {
        console.log('LIst', res.data.data);
        setProductList(res.data?.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log('Product catalog List Err', err);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchListOfProductRecommendations();
  }, []);

  return (
    <Layout title={t('sidebar.product_catalog')}>
        <ProductModal title="Add Product" icon="add" />
        <div>
          <Button
            disabled={!selectedID}
            variant="contained"
            onClick={() => setConfirmDelete(true)}
          >
            Delete Product
          </Button>
          <Dialog open={confirmDelete}>
            <DialogTitle>Are you sure to delete this item?</DialogTitle>
            <DialogContent>
              <Box marginBottom={2}>
                <Grid container spacing={2}>
                  <Grid item xs>
                    <Button
                      fullWidth
                      variant="outlined"
                      onClick={() => {
                        setConfirmDelete(false);
                      }}
                    >
                      No
                    </Button>
                  </Grid>
                  <Grid item xs>
                    <Button
                      fullWidth
                      color="secondary"
                      variant="outlined"
                      onClick={() => onDeleteProduct()}
                    >
                      Yes
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </DialogContent>
          </Dialog>
        </div>
        {/* <FormControl
          style={{ marginLeft: 20, width: 200 }}
          variant="outlined"
          className={classes.formControl}
          size="small"
        >
          <InputLabel id="demo-simple-select-label" className={classes.label}>
            Filter By Brand
          </InputLabel>
          <Select
            className={classes.select}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={filter}
            onChange={handleChange}
            label="Age"
          >
            <MenuItem value="all">All</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl> */}

      <Box marginTop={3} />

      <Grid container direction="column" spacing={2} wrap="nowrap">
        <Grid item xs>
          <ProductCatalogDataTable
            productList={productList}
            isLoading={isLoading}
            setSelectedID={setSelectedID}
            selectedID={selectedID}
            dataIndex="id"
            resource_url="/api/pmx/product_recommendations"
            toolbar={{
              export: true,
            }}
          />
        </Grid>
      </Grid>
    </Layout>
  );
};

export default ProductCatalog;

const Header = styled.div`
  display: flex;
  align-items: 'center';
  margin-top: -146px;
  margin-bottom: 100px;
`;
