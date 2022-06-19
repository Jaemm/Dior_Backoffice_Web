import './GlobalStyles.css';
import './i18n/config';
import 'core-js/es/promise';
import 'core-js/es/set';
import 'core-js/es/map';

import { LocalizationProvider } from '@material-ui/pickers';
import DateFnsAdapter from '@material-ui/pickers/adapter/date-fns';
import enLocale from 'date-fns/locale/en-US';
import { SnackbarProvider } from 'notistack';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { QueryParamProvider } from 'use-query-params';

import { Login } from './auth/Login';
import { Logout } from './auth/Logout';
import { ProtectedRoutes } from './auth/ProtectedRoute';
import { AppContextProvider } from './data/AppContext';
import AnalysisDetailsPage from './pages/AnalysisDetails';
import AnalysisHistoryPage from './pages/AnalysisHistoryPage';
import { CustomerDetailsPage } from './pages/AssignedCustomers';
import BrandDetailsPage from './pages/BrandDetails';
import BeautyConsultantsPage from './pages/BeautyConsultants'
import CustomerRecord from './pages/CustomerRecord';
import RegisteredDevicesPage from './pages/RegisteredDevicesPage';
import { StatisticsAndReports } from './pages/StatisticsAndReports';
import reportWebVitals from './reportWebVitals';
import ProductCatalog from './pages/ProductCatalog';
import EditProductCatalog from './components/EditProductCatalog';
import StoreDetails from './pages/StatisticsAndReportsDetailPage';
import ProductRecommendationsPage from './pages/ProductRecommendationsPage'

const localeMap = {
  en: enLocale,
};

ReactDOM.render(
  <React.StrictMode>
    <LocalizationProvider dateAdapter={DateFnsAdapter} locale={localeMap.en}>
      <SnackbarProvider maxSnack={1}>
        <AppContextProvider>
          <BrowserRouter>
            <QueryParamProvider ReactRouterRoute={Route}>
              {/* <Route path="/login">
                <Login />
              </Route> */}

              <ProtectedRoutes>
                <Switch>
                  <Route path="/brand-details/:brand_id">
                    <CustomerDetailsPage />
                  </Route>

                  <Route path="/brand-details">
                    <BrandDetailsPage />
                  </Route>

                  <Route path="/beauty-consultants">
                    <BeautyConsultantsPage />
                  </Route>

                  <Route path="/customer-record/:customer_id/:analysis_id/:batch_id">
                    <AnalysisDetailsPage />
                  </Route>

                  <Route path="/customer-record/:id">
                    <AnalysisHistoryPage />
                  </Route>

                  <Route path="/customer-record">
                    <CustomerRecord />
                  </Route>

                  <Route exact path="/product-catalog">
                    <ProductCatalog />
                  </Route>
                  <Route exact path="/product-catalog/edit">
                    <EditProductCatalog />
                  </Route>

                  <Route path="/registered-devices">
                    <RegisteredDevicesPage />
                  </Route>

                  <Route path="/statistics/reports/:store_id/store-details/">
                    <StoreDetails />
                  </Route>
                  <Route path="/statistics">
                    <StatisticsAndReports />
                  </Route>

                  <Route path="/product-recommendations">
                    <ProductRecommendationsPage />
                  </Route>

                  <Route path="/logout">
                    <Logout />
                  </Route>

                  <Redirect exact from="/" to="/brand-details" />
                </Switch>
              </ProtectedRoutes>
            </QueryParamProvider>
          </BrowserRouter>
        </AppContextProvider>
      </SnackbarProvider>
    </LocalizationProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
