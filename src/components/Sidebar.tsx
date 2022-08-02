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
import Logo from '../assets/images/dior-logo-sidebar.png'

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
      style={{
        background: 'linear-gradient(90deg, #FFFFFF -29.43%, #CBCBCB 100%)'
      }}
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
        {/* <Typography variant="h5" align="center">
          Partners DB
        </Typography> */}
        <img src={Logo} style={{display: 'block', marginLeft: 'auto', marginRight: 'auto'}}/>
      </Box>
      <Divider />
      <List>
        {accessFlags.has_access_to_brand_details && (
          <ListItem
            button
            component={Link}
            to="/brand-details"
            selected={match.path === '/brand-details'}
            className="menu"
          >
            <ListItemIcon>
              { match.path.includes('/brand-details') ? 
                <Sort style={{color: 'white'}}/>
                : <Sort />
              }
            </ListItemIcon>
            <ListItemText primary={t('sidebar.brand_details')} />
          </ListItem>
        )}
        <ListItem
          button
          component={Link}
          to="/beauty-consultants"
          selected={match.path.includes('/beauty-consultants')}
          className="menu"
        >
          <ListItemIcon>
            { match.path.includes('/beauty-consultants') ? 
                <AccountCircle style={{color: 'white'}}/>
                : <AccountCircle />
              }
          </ListItemIcon>
          <ListItemText primary={t('sidebar.beauty_consultant')} />
        </ListItem>
        <ListItem
          button
          component={Link}
          to="/registered-devices"
          selected={match.path.includes('/registered-devices')}
          className="menu"
        >
          <ListItemIcon>
            { match.path.includes('/registered-devices') ? 
                <AccountCircle style={{color: 'white'}}/>
                : <AccountCircle />
              }
          </ListItemIcon>
          <ListItemText primary={'Registered Device'} />
        </ListItem>
        {(accessFlags.has_access_to_brand_details_customer_record ||
          accessFlags.has_access_to_brand_details) && (
          <ListItem
            button
            component={Link}
            to="/product-catalog"
            selected={match.path.includes('/product-catalog')}
            className="menu"
          >
            <ListItemIcon>
              { match.path.includes('/product-catalog') ? 
                <LocalMallOutlinedIcon style={{color: 'white'}}/>
                : <LocalMallOutlinedIcon />
              }
            </ListItemIcon>
            <ListItemText primary="Product Catalog" />
          </ListItem>
        )}
        <ListItem
          button
          component={Link}
          to="/product-recommendations"
          selected={match.path.includes('/product-recommendations')}
          className="menu"
        >
          <ListItemIcon>
            { match.path.includes('/product-recommendations') ? 
                <AccountCircle style={{color: 'white'}}/>
                : <AccountCircle />
              }
          </ListItemIcon>
          <ListItemText primary={'Product Recommendation'} />
        </ListItem>

      </List>
      <Divider />
      <List>
        <ListItem
            button
            component={Link}
            to="/market-managements"
            selected={match.path.includes('/market-managements')}
            className="menu"
        >
          <ListItemIcon>
            { match.path.includes('/market-managements') ? 
                <AccountCircle style={{color: 'white'}}/>
                : <AccountCircle />
              }
          </ListItemIcon>
          <ListItemText primary={'Market Management'} />
        </ListItem>
        <ListItem
            button
            component={Link}
            to="/user-managements"
            selected={match.path.includes('/user-managements')}
            className="menu"
        >
          <ListItemIcon>
            { match.path.includes('/user-managements') ? 
                <AccountCircle style={{color: 'white'}}/>
                : <AccountCircle />
              }
          </ListItemIcon>
          <ListItemText primary={'User Management'} />
        </ListItem>
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
            {/* <TextField
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
            </TextField> */}
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
