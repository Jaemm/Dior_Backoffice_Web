import { yupResolver } from '@hookform/resolvers/yup'
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
  Typography,
} from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import { useLocalStorageState, useRequest } from 'ahooks'
import React, { useEffect, useState, version } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'

import { setUser, useUserState } from '../data/UserState'
import { APP_LANGUAGES, useAppLanguage } from '../i18n/hooks'
import { useLoginAPI } from './data/LoginAPI'
import { LoginDTO, loginSchema } from './data/LoginDTO'

export function ResetPasswordPage() {
  const history = useHistory()
  const { t } = useTranslation()
  const [currentLanguage, setLanguage] = useAppLanguage()
  const [userCredentials, setUserCredentials] = useLocalStorageState<LoginDTO>('user_credentials')
  const { register, handleSubmit, errors, formState, getValues } = useForm({
    defaultValues: loginSchema.cast(userCredentials),
    resolver: yupResolver(loginSchema),
    reValidateMode: 'onBlur',
  })
  const userState = useUserState()
  const loginAPI = useLoginAPI()
  const [error, setError] = useState()
  const [shouldRememberCredentials, setShouldRememberCredentials] = useState(!!userCredentials)

  const loginRequest = useRequest(loginAPI.login, {
    manual: true,
    onSuccess: (data) => {
      setUser(data)
      if (shouldRememberCredentials) {
        setUserCredentials(getValues())
      } else {
        setUserCredentials(undefined)
      }

      window.location.href = '/registered-devices'
    },
    onError: (e) => {
      if (e) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const message = e.message as any
        setError(message[currentLanguage])
      }
    },
  })

  useEffect(() => {
    if (userState.token) {
      history.replace('/registered-devices')
    }
  }, [history, userState.token])

  const onSubmit = (values: LoginDTO) => loginRequest.run(values)

  return (
    <Box height="100%" display="flex" justifyContent="center" alignItems="center">
      <Box>
        <Card variant="outlined">
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Box width="360px" marginTop={2} padding={2}>
                <Grid container spacing={2} direction="column">
                  <Grid item>
                    <Typography variant="h5" align="center" gutterBottom>
                      {t('reset_password.title')}
                    </Typography>
                  </Grid>
                  {!!error && (
                    <Box paddingBottom={2}>
                      <Alert severity="error">{error}</Alert>
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
                        setShouldRememberCredentials(checked)
                      }}
                      checked={shouldRememberCredentials}
                      control={<Checkbox name="remember_me" color="primary" />}
                      label={t('login.remember_me')}
                    />
                  </Grid>
                  <Grid item>
                    <Button
                      startIcon={formState.isSubmitting && <CircularProgress size={18} />}
                      disabled={formState.isSubmitting}
                      disableElevation
                      variant="contained"
                      color="primary"
                      fullWidth
                      type="submit"
                    >
                      {t('login.login')}
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </form>
          </CardContent>
        </Card>
        <Box paddingY={2} display="flex" justifyContent="space-between" alignItems="center">
          <Typography color="textSecondary">
            {t('version')}: {version}
          </Typography>
          <TextField
            label={currentLanguage !== 'en' ? `${t('language')}/Language` : t('language')}
            value={currentLanguage}
            select
            variant="outlined"
            size="small"
            onChange={(event) => {
              setLanguage(event.target.value)
            }}
            style={{ width: 120 }}
          >
            {APP_LANGUAGES.map(({ code, value }) => (
              <MenuItem key={code} value={code}>
                {value}
              </MenuItem>
            ))}
          </TextField>
        </Box>
      </Box>
    </Box>
  )
}
