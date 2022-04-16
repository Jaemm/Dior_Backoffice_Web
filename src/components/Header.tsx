import {
  Box,
  BoxProps,
  Button,
  Menu,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from '@material-ui/core';
import { Person } from '@material-ui/icons';
import { useRequest } from 'ahooks';
import React, { useState, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { useUserState, setUser } from '../data/UserState';
import { useSwitchAppAPI } from '../auth/data/LoginAPI';
import { useAccessFlags } from '../data/AccessFlags';
import { ChangePassword } from './ChangePassword';

interface SectionHeaderProps {
  title: ReactNode
}

export function Header({ title }: SectionHeaderProps, props: BoxProps) {
  const user = useUserState();
  const { t } = useTranslation();
  const [showUpdatePasswordDialog, setShowUpdatePasswordDialog] = useState(
    false
  );
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const switchAppApi = useSwitchAppAPI();
  const accessFlags = useAccessFlags();

  const switchAppRequest = useRequest(switchAppApi.switchApp, {
    manual: true,
    onSuccess: (data) => {
      console.log(data);
      setUser(data);

      window.location.href = accessFlags.has_access_to_brand_details
        ? '/brand-details'
        : '/customer-record';
    },
    onError: (e) => {
      if (e) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const message = e.message as any;
        // setError(message[currentLanguage])
      }
    },
  });

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSwitchApp = (a: any) => {
    const app_id = a.target.value;
    switchAppRequest.run({
      app_id: app_id,
      email: user.email,
      token: user.chowis,
    });
  };

  return (
    <Box {...props} style={{ display: 'flex', justifyContent: 'space-between', backgroundColor: 'white', padding: '20px' }}>
      <div className="title">{title}</div>
      {showUpdatePasswordDialog && (
        <ChangePassword
          open
          onClose={() => {
            setShowUpdatePasswordDialog(false);
          }}
        />
      )}
      {/* <FormControl
        variant="outlined"
        style={{ marginRight: 10, minWidth: 350 }}
        size="small"
      >
        <InputLabel id="demo-simple-select-outlined-label">
          Service Name
        </InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={user.app_id}
          onChange={handleSwitchApp}
          label="Service Name"
        >
          {user && user.applications && user.applications.length > 0 ? (
            user?.applications?.map((app: any) => {
              return <MenuItem value={app.id}>{app.name}</MenuItem>;
            })
          ) : (
            <MenuItem>No service name is available</MenuItem>
          )}
        </Select>
      </FormControl> */}
      <Button
        variant="outlined"
        size="large"
        aria-controls="user-menu"
        aria-haspopup="true"
        onClick={handleClick}
        endIcon={<Person />}
      >
        {user.id}
      </Button>
      <Menu
        id="user-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem
          onClick={() => {
            setShowUpdatePasswordDialog(true);
            handleClose();
          }}
        >
          {t('update_password.change_password')}
        </MenuItem>
      </Menu>
    </Box>
  );
}
