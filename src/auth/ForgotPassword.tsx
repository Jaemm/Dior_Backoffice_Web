import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

interface ForgotPasswordProps {
  open: boolean;
  onClose: () => void;
}

export function ForgotPassword({ open, onClose }: ForgotPasswordProps) {
  const { t } = useTranslation();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);

  const form = useForm<{ email: string }>({
    defaultValues: {
      email: '',
    },
  });
  const { enqueueSnackbar } = useSnackbar();

  const onSubmit = (value: any) => {
    setLoading(true);
    axios
      .post(
        'https://v2-app.chowis.com/api/partnerdb/consultants/password',
        value
      )
      .then((res) => {
        setLoading(false);
        enqueueSnackbar(t('forgot_password.recover_email_sent_msg'), {
          variant: 'success',
        });
        onClose();
      })
      .catch((err) => {
        setLoading(false);
        const message = err?.response?.data?.error;
        setError(message);
      });
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{t('forgot_password.title')}</DialogTitle>
      <DialogContent>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          {!!error && (
            <Box paddingBottom={2}>
              <Alert severity="error">{error}</Alert>
            </Box>
          )}
          <Grid container direction="column" spacing={2}>
            <Grid item>
              <TextField
                label={t('forgot_password.email')}
                variant="outlined"
                size="small"
                fullWidth
                helperText={
                  form.errors.email?.message || t('forgot_password.helper_text')
                }
                name="email"
                type="email"
                inputRef={form.register({
                  required: t('forgot_password.email_required_msg'),
                })}
                error={!!form.errors.email?.message}
              />
            </Grid>
            <Grid item>
              <Button
                type="submit"
                disabled={loading}
                disableElevation
                variant="contained"
                color="primary"
                fullWidth
              >
                {loading ? <CircularProgress /> : t('forgot_password.recover')}
              </Button>
            </Grid>
          </Grid>
        </form>
        <Box marginTop={2} />
      </DialogContent>
    </Dialog>
  );
}
