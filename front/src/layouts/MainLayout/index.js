import {
  AppBar,
  Toolbar,
  Typography,
  makeStyles,
  Button,
  IconButton,
  Drawer,
  Link,
  MenuItem
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import React, { useState, useEffect, useRef } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';

const useStyles = makeStyles(() => ({
  header: {
    backgroundColor: '#400CCC',
    paddingRight: '79px',
    paddingLeft: '118px',
    '@media (max-width: 900px)': {
      paddingLeft: 0
    }
  },
  logo: {
    fontFamily: 'Work Sans, sans-serif',
    fontWeight: 600,
    color: '#FFFEFE',
    textAlign: 'left'
  },
  menuButton: {
    fontFamily: 'Open Sans, sans-serif',
    fontWeight: 700,
    size: '18px',
    marginLeft: '38px'
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  drawerContainer: {
    padding: '20px 30px'
  }
}));

export default function MainLayout() {
  const { header, logo, menuButton, toolbar, drawerContainer } = useStyles();

  const navigate = useNavigate();

  const [state, setState] = useState({
    mobileView: false,
    drawerOpen: false
  });

  const tokenUser = window.localStorage.getItem('tokenUser');
  const User = window.localStorage.getItem('User');

  if (!tokenUser && !User)
    var [headersData, setHeadersData] = useState([
      {
        label: 'About Us',
        href: '/home#about'
      },
      {
        label: 'Contact Us',
        href: '/home#contact'
      },
      {
        label: 'Sign Up',
        href: '/register'
      },
      {
        label: 'Login',
        href: '/loginUser'
      }
    ]);
  else
    var [headersData, setHeadersData] = useState([
      {
        label: 'Listings',
        href: '/listings'
      },
      {
        label: 'Mentors',
        href: '/mentors'
      },
      {
        label: 'Logout',
        href: '/logout'
      }
    ]);
  const { mobileView, drawerOpen } = state;

  useEffect(() => {
    const setResponsiveness = () => {
      return window.innerWidth < 900
        ? setState((prevState) => ({ ...prevState, mobileView: true }))
        : setState((prevState) => ({ ...prevState, mobileView: false }));
    };

    setResponsiveness();

    window.addEventListener('resize', () => setResponsiveness());
  }, []);

  const [logout, setLogout] = useState(false);

  const isInitialMount2 = useRef(true);

  useEffect(() => {
    if (isInitialMount2.current) {
      isInitialMount2.current = false;
    } else {
      if (logout) {
        window.localStorage.removeItem('tokenUser');
        window.localStorage.removeItem('User');
        navigate('/', { replace: true });
      }
    }
  }, [logout]);

  const displayDesktop = () => {
    return (
      <Toolbar className={toolbar}>
        {Logo}
        <div>{getMenuButtons()}</div>
      </Toolbar>
    );
  };

  const displayMobile = () => {
    const handleDrawerOpen = () =>
      setState((prevState) => ({ ...prevState, drawerOpen: true }));
    const handleDrawerClose = () =>
      setState((prevState) => ({ ...prevState, drawerOpen: false }));

    return (
      <Toolbar>
        <IconButton
          {...{
            edge: 'start',
            color: 'inherit',
            'aria-label': 'menu',
            'aria-haspopup': 'true',
            onClick: handleDrawerOpen
          }}
        >
          <MenuIcon />
        </IconButton>

        <Drawer
          {...{
            anchor: 'left',
            open: drawerOpen,
            onClose: handleDrawerClose
          }}
        >
          <div className={drawerContainer}>{getDrawerChoices()}</div>
        </Drawer>

        <div>{Logo}</div>
      </Toolbar>
    );
  };

  const getDrawerChoices = () => {
    return headersData.map(({ label, href }) => {
      if (label == 'Logout')
        return (
          <Link
            onClick={() => setLogout(true)}
            color="inherit"
            style={{ textDecoration: 'none' }}
          >
            <MenuItem>{label}</MenuItem>
          </Link>
        );
      return (
        <HashLink
          {...{
            component: RouterLink,
            to: href,
            color: 'inherit',
            style: { textDecoration: 'none' },
            key: label
          }}
        >
          <MenuItem>{label}</MenuItem>
        </HashLink>
      );
    });
  };

  const Logo = (
    <Button onClick={() => navigate('/')}>
      <Typography variant="h6" component="h1" className={logo}>
        Hobby Connect
      </Typography>
    </Button>
  );

  const getMenuButtons = () => {
    return headersData.map(({ label, href }) => {
      if (label == 'Logout')
        return (
          <Button
            className={menuButton}
            color="inherit"
            onClick={() => setLogout(true)}
          >
            {label}
          </Button>
        );
      return (
        <HashLink
          key={label}
          // color={inherit}
          className={menuButton}
          to={href}
          component={RouterLink}
          style={{ color: 'white' }}
        >
          {label}
        </HashLink>
      );
    });
  };

  return (
    <header>
      <AppBar className={header}>
        {mobileView ? displayMobile() : displayDesktop()}
      </AppBar>
    </header>
  );
}
