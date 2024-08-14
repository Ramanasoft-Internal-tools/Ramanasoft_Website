import React, { useState } from 'react';
import { Button, Menu, MenuItem } from '@mui/material';
import HRLogin from './components/HRLogin';
import SuperAdminLogin from './components/SALogin';
import InternLogin from './components/InternLogin';

const LoginSelector = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedLogin, setSelectedLogin] = useState('');

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleMenuItemClick = (loginType) => {
    setSelectedLogin(loginType);
    handleClose();
  };
  return (
    <div className="login-selector">
      {!selectedLogin ? (
        <>
          <Button variant="contained" color="primary" onClick={handleClick}>
            Login
          </Button>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={() => handleMenuItemClick('HR')}>
              HR Login
            </MenuItem>
            <MenuItem onClick={() => handleMenuItemClick('SuperAdmin')}>
              SuperAdmin Login
            </MenuItem>
            <MenuItem onClick={() => handleMenuItemClick('Intern')}>
              Intern Login
            </MenuItem>
          </Menu>
        </>
      ) : (
        selectedLogin === 'HR' ? (
          <HRLogin />
        ) : selectedLogin === 'SuperAdmin' ? (
          <SuperAdminLogin />
        ) : (
          <InternLogin />
        )
      )}
    </div>
  );
};

export default LoginSelector;
