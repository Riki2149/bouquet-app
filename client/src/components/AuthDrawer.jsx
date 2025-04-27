import React, { useState } from 'react';
import { Drawer, Box, Button, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Login from '../pages/Login';
import SignUp from '../pages/SignUp';

const AuthDrawer = ({ open, onClose }) => {
  const [isLoginView, setIsLoginView] = useState(true);

  const switchToSignUp = () => {
    setIsLoginView(false);
  };

  const switchToLogin = () => {
    setIsLoginView(true);
  };

  const handleClose = () => {
    onClose();
    setIsLoginView(true);
  };

  return (
    <Drawer
      anchor="left"
      open={open}
      onClose={handleClose}
      sx={{
        '& .MuiDrawer-paper': {
          width: { xs: '100%', sm: '400px' },
          height: '100%',
          justifyContent: 'center',
          display: 'flex',
          position: 'relative',
          p: 2
        }
      }}
    >
      {/* כפתור סגירה בפינה העליונה */}
      <IconButton
        onClick={handleClose}
        sx={{
          position: 'absolute',
          top: 10,
          right: 10,
          color: 'black',
        }}
      >
        <CloseIcon />
      </IconButton>

      <Box sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        {isLoginView ? (
          <Login 
            closeDrawer={handleClose} 
            switchToSignUp={switchToSignUp} 
          />
        ) : (
          <SignUp 
            closeDrawer={handleClose} 
            switchToLogin={switchToLogin} 
          />
        )}
      </Box>
    </Drawer>
  );
};

export default AuthDrawer;
