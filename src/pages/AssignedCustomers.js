import {
  Box,
  Breadcrumbs,
  Divider,
  Grid,
  Paper,
  Typography,
  Button
} from "@material-ui/core";
import { useRequest } from "ahooks";
import React, {useState, useRef} from "react";
import { useTranslation } from "react-i18next";
import { Link, useParams } from "react-router-dom";
import { InferType } from "yup";
import axios from "axios";
import { useAPI } from "../api/API";
import { DataTable } from "../components/DataTable";
import { Layout } from "../components/Layout";
import { useAppContext } from '../data/AppContext';

export function CustomerDetailsPage() {
  const [dataInCSV, setDataInCSV] = useState('')
  const [exportLoading, setExportLoading] = useState(false)
  const { token } = useAppContext();
  const csvFile = useRef(null)

  const api = useAPI();
  const { t } = useTranslation();
  const params = useParams();
  const bm = useRequest(() =>
    api.requestResource(`/api/partnerdb/consultants/${params.brand_id}`)
  );

  const onClickExportButton = () => {
    setExportLoading(true)
    const url = `https://v2-app.chowis.com/api/partnerdb/consultants/${params.brand_id}/customers_export`
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

  return (
    <Layout
      title={
        <Breadcrumbs aria-label="breadcrumb">
          <Link to="/beauty-consultants/">Beauty Consultants</Link>
          <Typography display="initial">
            {t("assigned_customers.assigned_customers")}
          </Typography>
        </Breadcrumbs>
      }
    >
      <Paper variant="outlined">
        <Box padding={2}>
          <Box marginBottom={1} />

          <Grid container spacing={2}>
            <Grid item sm={4}>
              <Typography gutterBottom>
                <b>POS CODE:</b> {bm.data?.code || "-"}
              </Typography>
              <Typography gutterBottom>
                <b>BC CODE:</b> {bm.data?.consultant_branch?.code || "-"}
              </Typography>
            </Grid>
            <Grid item sm={4}>
              <Typography gutterBottom>
                <b>COUNTRY:</b>{" "}
                {bm.data?.country || "-"}
              </Typography>
              <Typography gutterBottom>
                <b>BC EMAIL:</b>{" "}
                {bm.data?.email || "-"}
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Paper>
      <div style={{display: 'flex', justifyContent: 'end', marginTop: '20px'}}>
        <Button
          variant="contained"
          onClick={()=> {onClickExportButton()}}
          disabled={exportLoading}
          color="primary">
          {exportLoading ? 'Loading ...' : 'Export'}
        </Button>
        <a
          href={`data:text/csv;charset=utf-8,${escape(dataInCSV)}`}
          download="customers.csv"
          ref={csvFile}
          style={{display: 'none'}}
        >
          download
        </a>
      </div>

      <Box marginTop={2}>
        <Typography variant="body1">
          <b>{t("assigned_customers.assigned_customers")}</b>
        </Typography>
        <Divider />
        <Box marginY={2}>
          <DataTable
            dataIndex="id"
            resource_url={`/api/partnerdb/consultants/${params.brand_id}/customers`}
            shouldFetch={!!params.brand_id}
            columns={[
              { label: t("assigned_customers.last_name"), key: "surname" },
              { label: t("assigned_customers.first_name"), key: "name" },
              { label: t("assigned_customers.service_name"), key: "app_name" },
              { label: t("assigned_customers.email"), key: "email" },
              { label: t("assigned_customers.phone_number"), key: "phone" },
              { label: t("assigned_customers.country"), key: "country" },
              {
                label: t("analysis_history.title"),
                content: ({ id }) => (
                  <Link to={`/customer-record/${id}/`}>
                    {t("analysis_history.view_details")}
                  </Link>
                ),
              },
            ]}
            toolbar={{

            }}
            filters={[
              { label: t("brand_details.all"), key: "all" },
              { label: t("assigned_customers.last_name"), key: "surname" },
              { label: t("assigned_customers.first_name"), key: "name" },
              { label: t("assigned_customers.service_name"), key: "app_name" },
              { label: t("assigned_customers.email"), key: "email" },
              { label: t("assigned_customers.phone_number"), key: "phone" },
              { label: t("assigned_customers.country"), key: "country" },
            ]}
          />
        </Box>
      </Box>
    </Layout>
  );
}
