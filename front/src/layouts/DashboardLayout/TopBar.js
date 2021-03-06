import React, { useState, useEffect, useRef } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  AppBar,
  Badge,
  Box,
  Hidden,
  IconButton,
  Toolbar,
  makeStyles,
  Button,
  Typography
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/NotificationsOutlined';
import InputIcon from '@material-ui/icons/Input';

const useStyles = makeStyles(() => ({
  root: { backgroundColor: '#2f4f4f' },
  avatar: {
    width: 60,
    height: 60
  }
}));

const TopBar = ({ className, onMobileNavOpen, ...rest }) => {
  const classes = useStyles();

  const [logout, setLogout] = useState(false);

  const navigate = useNavigate();

  const isInitialMount2 = useRef(true);

  const Logo = (
    <Button onClick={() => navigate('/')}>
      <Typography
        variant="h6"
        component="h1"
        // className={logo}
        style={{
          color: 'white'
        }}
      >
        Hobby Connect
      </Typography>
    </Button>
  );

  useEffect(() => {
    if (isInitialMount2.current) {
      isInitialMount2.current = false;
    } else {
      if (logout) {
        window.localStorage.removeItem('tokenAdmin');
        window.localStorage.removeItem('Admin');
        navigate('/Log/dash', { replace: true });
      }
    }
  }, [logout]);

  const handleLogout = () => {
    setLogout(!logout);
  };

  return (
    <AppBar className={clsx(classes.root, className)} elevation={0} {...rest}>
      <Toolbar>
        <RouterLink to="/">{Logo}</RouterLink>
        <Box flexGrow={1} />
        <Hidden mdDown>
          <IconButton color="inherit" onClick={handleLogout}>
            <InputIcon />
          </IconButton>
        </Hidden>
        <Hidden lgUp>
          <IconButton color="inherit" onClick={onMobileNavOpen}>
            <MenuIcon />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};

TopBar.propTypes = {
  className: PropTypes.string,
  onMobileNavOpen: PropTypes.func
};

export default TopBar;
