import React, { useEffect, useState, useRef } from 'react';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Button,
  Divider,
  Drawer,
  Hidden,
  List,
  Typography,
  makeStyles,
  Icon
} from '@material-ui/core';
import {
  AlertCircle as AlertCircleIcon,
  BarChart as BarChartIcon,
  Lock as LockIcon,
  Settings as SettingsIcon,
  ShoppingBag as ShoppingBagIcon,
  User as UserIcon,
  UserPlus as UserPlusIcon,
  Users as UsersIcon,
  UserCheck,
  MapPin,
  Heart,
  UserPlus,
  Grid,
  LogOut
} from 'react-feather';
import NavItem from './NavItem';

const items = [
  {
    href: '/admin',
    icon: BarChartIcon,
    title: 'Dashboard'
  },
  {
    href: '/admin/customers',
    icon: UsersIcon,
    title: 'Users'
  },
  {
    href: '/admin/admins',
    icon: UserCheck,
    title: 'Admins'
  },

  {
    href: '/admin/hobbies',
    icon: Heart,
    title: 'Hobbies'
  },
  {
    href: '/admin/usersHobbies',
    icon: UserPlus,
    title: 'Users Hobbies'
  },
  {
    href: '/admin/countries',
    icon: MapPin,
    title: 'Countries'
  },
  {
    href: '/admin/states',
    icon: MapPin,
    title: 'States'
  },
  {
    href: '/admin/eventsHobbies',
    icon: ShoppingBagIcon,
    title: 'Events Hobbies'
  },
  {
    href: '/admin/events',
    icon: Grid,
    title: 'events'
  },
  {
    href: '/admin/account',
    icon: UserIcon,
    title: 'Account'
  },
  {
    href: '/admin/settings',
    icon: SettingsIcon,
    title: 'Settings'
  }
];

const useStyles = makeStyles((theme) => ({
  mobileDrawer: {
    width: 256
  },
  desktopDrawer: {
    width: 256,
    top: 64,
    height: 'calc(100% - 64px)'
  },
  avatar: {
    cursor: 'pointer',
    width: 64,
    height: 64
  },

  button: {
    color: theme.palette.text.secondary,
    fontWeight: theme.typography.fontWeightMedium,
    justifyContent: 'flex-start',
    letterSpacing: 0,
    padding: '10px 8px',
    textTransform: 'none',
    width: '100%'
  },
  icon: {
    marginRight: theme.spacing(1)
  },

  active: {
    color: theme.palette.primary.main,
    '& $title': {
      fontWeight: theme.typography.fontWeightMedium
    },
    '& $icon': {
      color: theme.palette.primary.main
    }
  }
}));

const NavBar = ({ onMobileClose, openMobile }) => {
  const classes = useStyles();
  const location = useLocation();
  const [user, setUser] = useState('');

  const [logout, setLogout] = useState(false);

  const navigate = useNavigate();

  const tokenAdmin = window.localStorage.getItem('tokenAdmin');
  const id = window.localStorage.getItem('Admin');

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
  }, [location.pathname]);

  const isInitialMount2 = useRef(true);

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
  useEffect(() => {
    try {
      fetch(process.env.REACT_APP_URL + `admin/admin/${id}`, {
        method: 'get',
        // body: formData,
        headers: {
          Accept: 'application/json',
          Authorization: 'Bearer ' + tokenAdmin
        }
      })
        .then((response) => response.json())
        .then((res) => {
          if (res.status == 200) {
            setUser(res.data);
          } else {
            // alert(res.error.message[Object.keys(res.error.message)][0]);
          }
        });
    } catch (e) {}
  }, []);
  const content = (
    <Box height="100%" display="flex" flexDirection="column">
      <Box alignItems="center" display="flex" flexDirection="column" p={2}>
        <Avatar
          className={classes.avatar}
          component={RouterLink}
          src={process.env.REACT_APP_URL2 + user.image}
          to="/app/account"
        />
        <Typography className={classes.name} color="textPrimary" variant="h5">
          {user && user.name}
        </Typography>
      </Box>
      <Divider />
      <Box p={2}>
        <List>
          {items.map((item) => (
            <NavItem
              href={item.href}
              key={item.title}
              title={item.title}
              icon={item.icon}
            />
          ))}
        </List>
      </Box>

      <Box p={2}>
        <Button
          onClick={handleLogout}
          activeClassName={classes.active}
          className={classes.button}
        >
          {<LogOut className={classes.icon} size="20" />}
          <span>Logout</span>
        </Button>
      </Box>

      <Box flexGrow={1} />
    </Box>
  );

  return (
    <>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          classes={{ paper: classes.mobileDrawer }}
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
        >
          {content}
        </Drawer>
      </Hidden>
      <Hidden mdDown>
        <Drawer
          anchor="left"
          classes={{ paper: classes.desktopDrawer }}
          open
          variant="persistent"
        >
          {content}
        </Drawer>
      </Hidden>
    </>
  );
};

NavBar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool
};

NavBar.defaultProps = {
  onMobileClose: () => {},
  openMobile: false
};

export default NavBar;
