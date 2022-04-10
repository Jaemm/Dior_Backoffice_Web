import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogContent,
  DialogProps,
  DialogTitle,
  FormControlLabel,
  FormGroup,
  Grid,
  IconButton,
  TextField,
  Typography,
} from '@material-ui/core'
import { Close } from '@material-ui/icons'
import { format } from 'date-fns'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

interface ExportToFileDialogProps extends DialogProps {
  open: boolean
  onClose: () => void
  isLoading?: boolean
  onSave?: (filename: string) => void
}

export function ExportToFileDialog({ open, isLoading, onClose, onSave }: ExportToFileDialogProps) {
  const { t } = useTranslation()
  const [filename, setFilename] = useState(format(new Date(), 'yyy-MM-dd_hhmmss'))

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        <Grid container alignItems="center">
          <Grid item xs>
            <Typography style={{ fontSize: 20 }}>{t('export_dialog.title')}</Typography>
          </Grid>
          <Grid item>
            <IconButton edge="end" onClick={onClose}>
              <Close />
            </IconButton>
          </Grid>
        </Grid>
      </DialogTitle>
      <DialogContent>
        <Box marginBottom={2} width={300}>
          <Grid container direction="column" spacing={2}>
            <Grid item>
              <TextField
                label={t('export_dialog.file_name')}
                value={filename}
                onChange={(e) => {
                  setFilename(e.target.value)
                }}
                variant="outlined"
                size="small"
                fullWidth
              />
            </Grid>
            <Grid item>
              <Typography>{t('export_dialog.select_file_format')}</Typography>
              <FormGroup>
                <Grid container spacing={2}>
                  <Grid item>
                    <FormControlLabel
                      title={t('export_dialog.not_supported')}
                      disabled
                      control={<Checkbox name="pdf" />}
                      label="PDF"
                    />
                  </Grid>
                  <Grid item>
                    <FormControlLabel
                      title={t('export_dialog.not_supported')}
                      disabled
                      control={<Checkbox name="excel" />}
                      label="Excel"
                    />
                  </Grid>
                  <Grid item>
                    <FormControlLabel checked control={<Checkbox name="csv" />} label="CSV" />
                  </Grid>
                </Grid>
              </FormGroup>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                disabled={isLoading}
                onClick={() => {
                  onSave?.(filename)
                }}
              >
                {t('export_dialog.save')}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
    </Dialog>
  )
}
