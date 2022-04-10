import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  MenuItem,
  TextField,
  Typography,
} from '@material-ui/core';
import {
  AccountCircle,
  Assignment,
  Devices,
  PowerSettingsNew,
  Sort,
} from '@material-ui/icons';
import LocalMallOutlinedIcon from '@material-ui/icons/LocalMallOutlined';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useHistory, useRouteMatch } from 'react-router-dom';

import { version } from '../../package.json';
import { useAccessFlags } from '../data/AccessFlags';
import { APP_LANGUAGES, useAppLanguage } from '../i18n/hooks';

export function Sidebar() {
  const match = useRouteMatch();
  const [open, setOpen] = useState(true);
  const { t } = useTranslation();
  const [currentLanguage, setLanguage] = useAppLanguage();
  const [showLogoutConfirmation, setShowLogoutConfirmation] = useState(false);
  const history = useHistory();
  const accessFlags = useAccessFlags();

  return (
    <Box
      borderRight="1px solid #dcdcdc"
      height="100%"
      width="240px"
      display="flex"
      flexDirection="column"
    >
      <Dialog
        open={showLogoutConfirmation}
        onClose={() => {
          setShowLogoutConfirmation(false);
        }}
      >
        <DialogTitle>{t('login.logout_confirmation_msg')}</DialogTitle>
        <DialogContent>
          <Box marginBottom={2}>
            <Grid container spacing={2}>
              <Grid item xs>
                <Button
                  fullWidth
                  variant="outlined"
                  onClick={() => {
                    setShowLogoutConfirmation(false);
                  }}
                >
                  {t('login.no')}
                </Button>
              </Grid>
              <Grid item xs>
                <Button
                  fullWidth
                  color="secondary"
                  variant="outlined"
                  onClick={() => {
                    history.push('/logout');
                  }}
                >
                  {t('login.yes')}
                </Button>
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
      </Dialog>

      <Box width="200px" padding="16px">
        <Typography variant="h5" align="center">
          Partners DB
        </Typography>
      </Box>
      <Divider />
      <List>
        {accessFlags.has_access_to_brand_details && (
          <ListItem
            button
            component={Link}
            to="/brand-details"
            selected={match.path === '/brand-details'}
          >
            <ListItemIcon>
              <Sort />
            </ListItemIcon>
            <ListItemText primary={t('sidebar.brand_details')} />
          </ListItem>
        )}

        <ListItem
          button
          component={Link}
          to="/customer-record"
          selected={match.path.includes('/customer-record')}
        >
          <ListItemIcon>
            <AccountCircle />
          </ListItemIcon>
          <ListItemText primary={t('sidebar.customer_record')} />
        </ListItem>
        {(accessFlags.has_access_to_brand_details_customer_record ||
          accessFlags.has_access_to_brand_details) && (
          <ListItem
            button
            component={Link}
            to="/product-catalog"
            selected={match.path.includes('/product-catalog')}
          >
            <ListItemIcon>
              <LocalMallOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Product Catalog" />
          </ListItem>
        )}

        {accessFlags.has_access_to_registered_devices && (
          <ListItem
            button
            component={Link}
            to="/registered-devices"
            selected={match.path === '/registered-devices'}
          >
            <ListItemIcon>
              <Devices />
            </ListItemIcon>
            <ListItemText primary={t('sidebar.registered_devices')} />
          </ListItem>
        )}

        {accessFlags.has_access_to_statistics && (
          <ListItem
            button
            component={Link}
            to="/statistics"
            onClick={() => {
              setOpen(!open);
            }}
            selected={match.path.startsWith('/statistics')}
          >
            <ListItemIcon>
              <Assignment />
            </ListItemIcon>
            <ListItemText primary={t('sidebar.statistics_and_reports')} />
          </ListItem>
        )}
      </List>
      <Divider />
      <List>
        <ListItem
          button
          onClick={() => {
            setShowLogoutConfirmation(true);
          }}
        >
          <ListItemIcon>
            <PowerSettingsNew />
          </ListItemIcon>
          <ListItemText primary={t('sidebar.logout')} />
        </ListItem>
      </List>

      <Box
        paddingX={2}
        paddingY={4}
        display="flex"
        alignItems="flex-end"
        flexGrow={1}
      >
        <Grid container direction="column" alignItems="stretch" spacing={2}>
          <Grid item xs>
            <TextField
              label={
                currentLanguage !== 'en'
                  ? `${t('language')}/Language`
                  : t('language')
              }
              value={currentLanguage}
              select
              variant="outlined"
              size="small"
              fullWidth
              onChange={(event) => {
                setLanguage(event.target.value);
              }}
            >
              {APP_LANGUAGES.map(({ code, value }) => (
                <MenuItem key={code} value={code}>
                  {value}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item>
            <Typography color="textSecondary" align="center">
              {t('version')}: {version}
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
