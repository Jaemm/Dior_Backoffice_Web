import React from 'react';
import { Button, Checkbox, Grid, Typography } from '@material-ui/core';
import { Refresh } from '@material-ui/icons';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { useHttpResource } from '../api/API';
import ProductModal from './ProductModal';
import ExportToCSV from './ExportToCSV';

export function ProductCatalogDataTable(props) {
  const { isLoading, productList, setSelectedID, selectedID } = props;

  const sortedProductList = productList?.sort((a, b) => {
    if (a.id > b.id) return 1;
    if (a.id < b.id) return -1;
    return 0;
  });

  const { t } = useTranslation();

  const headers = [
    { label: 'ID', key: 'id' },
    { label: 'Name', key: 'name' },
    { label: 'Description', key: 'description' },
    { label: 'Link', key: 'link' },
    { label: 'Product Type', key: 'product_type' },
  ];

  const results = useHttpResource(props.resource_url);

  return (
    <>
      <Grid container direction="column" spacing={2} wrap="nowrap">
        <Grid item container spacing={2} alignItems="center" justify="flex-end">
          {props.toolbar?.export && (
            <Grid item>
              <Grid container spacing={2}>
                <Grid item>
                  <Button
                    onClick={() => {
                      results.revalidate();
                    }}
                    disabled={results.isValidating}
                    variant="outlined"
                    startIcon={<Refresh />}
                  >
                    {t('datatable.refresh')}
                  </Button>
                </Grid>
                <ExportToCSV data={productList} headers={headers} />
              </Grid>
            </Grid>
          )}
        </Grid>

        <TableBox>
          <TableHeader>
            <Checkbox color="primary" className="id" />
            {/* <p className="id">PID</p> */}
            <p className="image">Image</p>
            <p className="product-code">Product Code</p>
            <p className="product-name">Product Name</p>
            <p className="category">Category</p>
            <p className="collection">Collection</p>
            <p className="axis">Axis</p>
            <p className="link">Link</p>
            <p className="modification">Modification</p>
          </TableHeader>
          {isLoading && (
            <Typography
              variant="h4"
              style={{ textAlign: 'center', marginTop: 50 }}
            >
              Loading ...
            </Typography>
          )}
          {!isLoading && productList?.length === 0 && (
            <Typography
              variant="h6"
              style={{ textAlign: 'center', marginTop: 50 }}
            >
              {' '}
              No Data.
            </Typography>
          )}
          <TableContaier>
            {!isLoading &&
              productList &&
              sortedProductList.map((item) => (
                <div className="single-table-item">
                  <Checkbox
                    color="primary"
                    checked={selectedID === item.id ? true : false}
                    onClick={() => setSelectedID(item.id)}
                    className="id"
                  />
                  {/* <p className="id">{item.id}</p> */}
                  <div className="image-box">
                    {item?.image_url ? (
                      <img
                        className="image"
                        src={item?.image_url}
                        alt="product"
                      />
                    ) : (
                      <p>No Image</p>
                    )}
                  </div>
                  <p className="product-code">{item.code}</p>
                  <p className="product-name">{item.name}</p>
                  <a href={item.link} target="blank" className="category">
                    {item.category}
                  </a>
                  <p className="colelction" style={{ textAlign: 'center' }}>
                    {item.collection}
                  </p>
                  <p className="routine" style={{ textAlign: 'center' }}>
                    {item.routine}
                  </p>
                  <p className="link" style={{ textAlign: 'center' }}>
                    {item.link}
                  </p>
                  <div className="edit-btn">
                    <ProductModal title="Edit" item={item} />
                  </div>
                </div>
              ))}
          </TableContaier>
        </TableBox>
      </Grid>
    </>
  );
}

const TableBox = styled.div`
  border: 1px solid #999;
  border-radius: 5px;
  height: 650px;
  overflow: auto;
`;
const TableHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  position: sticky;
  top: 0px;
  background: #fff;
  z-index: 1;
  border-bottom: 1px solid #707070;
  p {
    font-size: 18px;
    font-weight: 600;
    color: #707070;
  }
  .id {
    width: 5%;
  }
  .image {
    width: 15%;
    margin-right: 5%;
  }
  .product-name {
    width: 25%;
  }
  .price {
    width: 25%;
  }
  .brand {
    width: 25%;
  }
  .status {
    width: 25%;
    text-align: center;
  }
  .modification {
    width: 10%;
  }
`;

const TableContaier = styled.div`
  .single-table-item {
    border-bottom: 1px solid #999;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0px 20px;

    .id {
      width: 5%;
    }
    .image-box {
      width: 15%;
      height: 90px;
      margin: 5px 0px;
      margin-right: 5%;
      border: 1px solid #000;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #f1f9ff;
      border-color: #707070;
    }
    .image {
      width: 100%;
      height: 100%;
    }
    .image-box p {
      font-size: 12px;
      color: #707070;
    }
    .product-name {
      width: 25%;
    }
    .price {
      width: 25%;
    }
    .brand {
      width: 25%;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }
    .status-box {
      width: 15%;
      display: flex;
      align-items: center;
      justify-content: space-around;
    }
    .edit-btn {
      width: 10%;
    }
  }
`;
