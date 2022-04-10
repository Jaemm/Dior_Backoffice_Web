import {
  Box,
  Breadcrumbs,
  Divider,
  Grid,
  Paper,
  Typography,
} from "@material-ui/core";
import { useRequest } from "ahooks";
import React from "react";
import { useTranslation } from "react-i18next";
import { Link, useParams } from "react-router-dom";
import { InferType } from "yup";

import { useAPI } from "../api/API";
import { DataTable } from "../components/DataTable";
import { Layout } from "../components/Layout";
import { parseDateString } from "../helpers/dateHelpers";
import {
  numberSchema,
  objectSchema,
  stringSchema,
} from "../helpers/SchemaHelpers";

type BM = InferType<typeof bmSchema>;
const bmSchema = objectSchema({
  address: stringSchema(),
  branch: stringSchema(),
  country: stringSchema(),
  email: stringSchema(),
  id: numberSchema(),
  name: stringSchema(),
  register_date: stringSchema(),
  store: stringSchema(),
});

export type Customers = InferType<typeof customersSchema>;
export const customersSchema = objectSchema({
  app_name: stringSchema(),
  country: stringSchema(),
  email: stringSchema(),
  id: numberSchema(),
  name: stringSchema(),
  phone: stringSchema(),
  surname: stringSchema(),
});

export function CustomerDetailsPage() {
  const api = useAPI();
  const { t } = useTranslation();
  const params = useParams<{ brand_id: string }>();
  const bm = useRequest<BM>(() =>
    api.requestResource(`/api/partnerdb/consultants/${params.brand_id}`)
  );

  return (
    <Layout
      title={
        <Breadcrumbs aria-label="breadcrumb">
          <Link to="/brand-details/">{t("sidebar.brand_details")}</Link>
          <Typography display="initial">
            {t("assigned_customers.assigned_customers")}
          </Typography>
        </Breadcrumbs>
      }
    >
      <Paper variant="outlined">
        <Box padding={2}>
          <Typography variant="body1">
            <b>{t("assigned_customers.bm")}</b>
          </Typography>
          <Divider />
          <Box marginBottom={1} />

          <Grid container spacing={2}>
            <Grid item sm={4}>
              <Typography gutterBottom>
                <b>{t("assigned_customers.name")}:</b> {bm.data?.name || "-"}
              </Typography>
              <Typography gutterBottom>
                <b>{t("assigned_customers.store")}:</b> {bm.data?.store || "-"}
              </Typography>
            </Grid>
            <Grid item sm={4}>
              <Typography gutterBottom>
                <b>{t("assigned_customers.contact_information")}:</b>{" "}
                {bm.data?.email || "-"}
              </Typography>
              <Typography gutterBottom>
                <b>{t("assigned_customers.address")}:</b>{" "}
                {bm.data?.address || "-"}
              </Typography>
            </Grid>
            <Grid item sm={4}>
              <Typography gutterBottom>
                <b>{t("assigned_customers.started_since")}:</b>{" "}
                {parseDateString(bm.data?.register_date || "", "-")}
              </Typography>
              <Typography gutterBottom>
                <b>{t("assigned_customers.country")}:</b>{" "}
                {bm.data?.country || "-"}
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Paper>

      <Box marginTop={2}>
        <Typography variant="body1">
          <b>{t("assigned_customers.assigned_customers")}</b>
        </Typography>
        <Divider />
        <Box marginY={2}>
          <DataTable<Customers>
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
              search: true,
              filter_by_date: true,
              filter: true,
              pagination: true,
              export: true,
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
