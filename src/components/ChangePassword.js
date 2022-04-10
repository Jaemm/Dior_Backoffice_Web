import React, { useState } from 'react';
import { useSnackbar } from 'notistack';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { useForm } from 'react-hook-form';
import { useAppContext } from '../data/AppContext';

export const ChangePassword = ({ open, onClose }) => {
  const { token } = useAppContext();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const [error, setError] = useState();
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();

  const onSubmit = (data) => {
    // console.log('Password', data);
    axios
      .post(
        'https://v2-app.chowis.com/api/partnerdb/consultants/password_change',
        data,
        {
          headers: {
            'X-CHOWIS-CONSULTANT-TOKEN': token,
          },
        }
      )
      .then((res) => {
        // console.log('Password change success', res.data);
        setTimeout(() => {
          onClose();
        }, 2000);
        enqueueSnackbar('Password Successfully Changed', {
          variant: 'success',
        });
      })
      .catch((err) => {
        setError(err.message);
        console.log('Password change Error', err.message);
      });
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{t('update_password.title')}</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          {!!error && (
            <Box paddingBottom={2}>
              <Alert severity="error">{error}</Alert>
            </Box>
          )}
          <Box width="300px">
            <Grid container direction="column" spacing={2}>
              <Grid item>
                <TextField
                  name="password"
                  inputRef={register({
                    required: t('update_password.required'),
                  })}
                  label={t('update_password.old_password')}
                  variant="outlined"
                  size="small"
                  fullWidth
                  error={!!errors.password?.message}
                  helperText={errors.password?.message}
                  type="password"
                />
              </Grid>
              <Grid item>
                <TextField
                  name="new_password"
                  inputRef={register({
                    required: t('update_password.required'),
                  })}
                  label={t('update_password.new_password')}
                  variant="outlined"
                  size="small"
                  fullWidth
                  error={!!errors.new_password?.message}
                  helperText={errors.new_password?.message}
                  type="password"
                />
              </Grid>
              <Grid item>
                <Button
                  type="submit"
                  disableElevation
                  variant="contained"
                  color="primary"
                  fullWidth
                >
                  {t('update_password.change_password')}
                </Button>
              </Grid>
            </Grid>
          </Box>
        </form>
        <Box marginTop={2} />
      </DialogContent>
    </Dialog>
  );
};
