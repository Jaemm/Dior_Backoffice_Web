import { useState } from 'react';
import { version } from '../../package.json';
import { useTranslation } from 'react-i18next';
import { useAccessFlags } from '../data/AccessFlags';
import Logo from '../assets/images/dior-logo-sidebar.png';
import { Link, useHistory, useRouteMatch } from 'react-router-dom';
import { ReactComponent as IconPos } from '../assets/icons/pos.svg';
import { ReactComponent as IconUser } from '../assets/icons/user.svg';
import { ReactComponent as IconRecom } from '../assets/icons/recom.svg';
import { ReactComponent as IconBranch } from '../assets/icons/branch.svg';
import { ReactComponent as IconBeauty } from '../assets/icons/beauty.svg';
import { ReactComponent as IconLogout } from '../assets/icons/logout.svg';
import { ReactComponent as IconMarket } from '../assets/icons/market.svg';
import { ReactComponent as IconProduct } from '../assets/icons/product.svg';
import { ReactComponent as IconPosActive } from '../assets/icons/pos-active.svg';
import { ReactComponent as IconAttributes } from '../assets/icons/attributes.svg';
import { ReactComponent as IconRegistered } from '../assets/icons/registered.svg';
import { ReactComponent as IconUserActive } from '../assets/icons/user-active.svg';
import { ReactComponent as IconRecomActive } from '../assets/icons/recom-active.svg';
import { ReactComponent as IconBranchActive } from '../assets/icons/branch-active.svg';
import { ReactComponent as IconBeautyActive } from '../assets/icons/beauty-active.svg';
import { ReactComponent as IconMarketActive } from '../assets/icons/market-active.svg';
import { ReactComponent as IconProductActive } from '../assets/icons/product-active.svg';
import { ReactComponent as IconAttributesActive } from '../assets/icons/attributes-active.svg';
import { ReactComponent as IconRegisteredActive } from '../assets/icons/registered-active.svg';
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
  Typography,
} from '@material-ui/core';

export function Sidebar() {
  const match = useRouteMatch();
  const { t } = useTranslation();
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
        background: 'linear-gradient(90deg, #FFFFFF -29.43%, #CBCBCB 100%)',
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
        <img
          src={Logo}
          style={{ display: 'block', marginLeft: 'auto', marginRight: 'auto' }}
          alt="logo.png"
        />
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
              {match.path.includes('/brand-details') ? (
                <IconBranch />
              ) : (
                <IconBranchActive />
              )}
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
            {match.path.includes('/beauty-consultants') ? (
              <IconBeautyActive />
            ) : (
              <IconBeauty />
            )}
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
            {match.path.includes('/registered-devices') ? (
              <IconRegisteredActive />
            ) : (
              <IconRegistered />
            )}
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
              {match.path.includes('/product-catalog') ? (
                <IconProductActive />
              ) : (
                <IconProduct />
              )}
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
            {match.path.includes('/product-recommendations') ? (
              <IconRecomActive />
            ) : (
              <IconRecom />
            )}
          </ListItemIcon>
          <ListItemText primary={'Product Recommendation'} />
        </ListItem>

        <ListItem
          button
          component={Link}
          to="/statistics"
          selected={match.path.includes('/statistics')}
          className="menu"
        >
          <ListItemIcon>
            {match.path.includes('/statistics') ? (
              <IconPosActive />
            ) : (
              <IconPos />
            )}
          </ListItemIcon>
          <ListItemText primary={'Statistics'} />
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
            {match.path.includes('/market-managements') ? (
              <IconMarketActive />
            ) : (
              <IconMarket />
            )}
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
            {match.path.includes('/user-managements') ? (
              <IconUserActive />
            ) : (
              <IconUser />
            )}
          </ListItemIcon>
          <ListItemText primary={'User Management'} />
        </ListItem>
        <ListItem
          button
          component={Link}
          to="/product-attributes"
          selected={match.path.includes('/product-attributes')}
          className="menu"
        >
          <ListItemIcon>
            {match.path.includes('/product-attributes') ? (
              <IconAttributesActive />
            ) : (
              <IconAttributes />
            )}
          </ListItemIcon>
          <ListItemText primary={'Product Attributes'} />
        </ListItem>
        <ListItem
          button
          onClick={() => {
            setShowLogoutConfirmation(true);
          }}
        >
          <ListItemIcon>
            <IconLogout />
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
