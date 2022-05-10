import { yupResolver } from '@hookform/resolvers/yup';
import {
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  Grid,
  MenuItem,
  TextField,
  Typography
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { useLocalStorageState, useRequest } from 'ahooks';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Link as RouteLink, Route, useHistory } from 'react-router-dom';
import styled from 'styled-components';

import { version } from '../../package.json';
import { useAccessFlags } from '../data/AccessFlags';
import { setUser, useUserState } from '../data/UserState';
import { APP_LANGUAGES, useAppLanguage } from '../i18n/hooks';
import { useLoginAPI } from './data/LoginAPI';
import { LoginDTO, loginSchema } from './data/LoginDTO';
import { ForgotPassword } from './ForgotPassword';
import BackgroundImage from '../assets/images/login-background.png'
import Logo from '../assets/images/dior-logo.png'
export function Login() {
  const history = useHistory();
  const { t } = useTranslation();
  const [currentLanguage, setLanguage] = useAppLanguage();
  const [userCredentials, setUserCredentials] = useLocalStorageState<LoginDTO>(
    'user_credentials'
  );
  const { register, handleSubmit, errors, formState, getValues } = useForm({
    defaultValues: loginSchema.cast(userCredentials),
    resolver: yupResolver(loginSchema),
    reValidateMode: 'onBlur',
  });
  const userState = useUserState();
  const loginAPI = useLoginAPI();
  const [error, setError] = useState();
  const [shouldRememberCredentials, setShouldRememberCredentials] = useState(
    !!userCredentials
  );
  const accessFlags = useAccessFlags();

  const loginRequest = useRequest(loginAPI.login, {
    manual: true,
    onSuccess: (data) => {
      setUser(data);
      if (shouldRememberCredentials) {
        setUserCredentials(getValues());
      } else {
        setUserCredentials(undefined);
      }

      const { consultant_position: { name } = {} } = data;

      window.location.href =
        name === 'Admin' ||
        name === 'Super Admin' ||
        name === 'Brand Manager' ||
        name === 'Agent'
          ? '/brand-details'
          : '/customer-record';
    },
    onError: (e) => {
      if (e) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const message = e.message as any;
        console.log('Login Error', message);
      }
    },
  });
  const isError = loginRequest?.error;
  useEffect(() => {
    if (userState.token) {
      history.replace(
        accessFlags.has_access_to_brand_details
          ? '/brand-details'
          : '/customer-record'
      );
    }
  }, [accessFlags.has_access_to_brand_details, history, userState.token]);

  const onSubmit = (values: LoginDTO) => loginRequest.run(values);

  return (
    <Box
      height="100%"
      display="flex"
      justifyContent="center"
      alignItems="center"
      style={{backgroundImage: `url(${BackgroundImage})`}}
    >
      <Route path="/forgot-password">
        {({ match }) => (
          <ForgotPassword
            open={!!match}
            onClose={() => {
              history.replace('/');
            }}
          />
        )}
      </Route>

      <Box>

            <CardContentDiv>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Box marginTop={2} style={{padding: 40+'px'}}>
                  <Grid container spacing={2} direction="column">
                    <Grid item>
                      {/* <Typography variant="h5" align="center" gutterBottom>
                        PARTNERS DATABASE
                      </Typography> */}
                      <img src={Logo} style={{display: 'block', marginLeft: 'auto', marginRight: 'auto'}}/>
                    </Grid>
                    {isError && (
                      <Box paddingBottom={2}>
                        <Alert severity="error">
                          Please check your ID and password.
                        </Alert>
                      </Box>
                    )}
                    <Grid item>
                      <TextField
                        inputRef={register}
                        name="email"
                        label={t('login.username')}
                        variant="outlined"
                        size="small"
                        fullWidth
                        error={!!errors.email}
                        helperText={errors.email?.message}
                      />
                    </Grid>
                    <Grid item>
                      <TextField
                        inputRef={register}
                        name="password"
                        label={t('login.password')}
                        variant="outlined"
                        size="small"
                        type="password"
                        fullWidth
                        error={!!errors.password}
                        helperText={errors.password?.message}
                      />
                    </Grid>
                    <Grid item>
                      <FormControlLabel
                        onChange={(_, checked) => {
                          setShouldRememberCredentials(checked);
                        }}
                        checked={shouldRememberCredentials}
                        control={<Checkbox name="remember_me" color="primary" />}
                        label={t('login.remember_me')}
                      />
                    </Grid>
                    <Grid item>
                      <Button
                        startIcon={
                          formState.isSubmitting && <CircularProgress size={18} />
                        }
                        disabled={formState.isSubmitting}
                        disableElevation
                        variant="contained"
                        // color="primary"
                        style={{background: '#5A5A5A', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)', borderRadius: '15px', color: 'white'}}
                        fullWidth
                        type="submit"
                      >
                        {t('login.login')}
                      </Button>
                    </Grid>
                  </Grid>
                </Box>
              </form>
              <Box marginTop={1}>
                <Grid
                  container
                  spacing={2}
                  direction="column"
                  alignItems="center"
                >
                  <Grid item>
                    <RouteLink to="/forgot-password">
                      {t('login.forgot_password')}
                    </RouteLink>
                  </Grid>
                  <Grid item>
                    {/* <RouteLink to="/register">Register Account</RouteLink> */}
                  </Grid>
                </Grid>
              </Box>
            </CardContentDiv>

      </Box>
    </Box>
  );
}


const CardContentDiv = styled.div`

  width: 500px;
  height: 480px;



  background: rgba(255, 255, 255, 0.3);
  box-shadow: 0px 0px 10px 6px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(20px);
  /* Note: backdrop-filter has minimal browser support */

  border-radius: 18px;
`;