import React, { useState, useEffect } from 'react';
import { Box, Container, Grid, makeStyles } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import Page from 'src/components/Page';
import Toolbar from './Toolbar';
import ProductCard from './ProductCard';
import { useSelector, connect } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';

import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  productCard: {
    height: '100%'
  }
}));

// id: uuid(),
// createdAt: '27/03/2019',
// description: 'Dropbox is a file hosting service that offers cloud storage, file synchronization, a personal cloud.',
// media: '/static/images/products/product_1.png',
// title: 'Dropbox',
// totalDownloads: '594'

const EventListView = () => {
  const classes = useStyles();

  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);

  const [events, setEvents] = useState([]);
  const [del, setDel] = useState(0);
  const [render, setRender] = useState(0);
  const [user, setUser] = useState([]);
  const [state, setState] = useState([]);

  const navigate = useNavigate();

  const tokenAdmin = window.localStorage.getItem('tokenAdmin');

  const search = useSelector((state) => {
    return state.SearchEvent.event;
  });

  useEffect(() => {
    try {
      fetch(process.env.REACT_APP_URL + `admin/events/12?page=${page}`, {
        method: 'get',
        headers: {
          Accept: 'application/json',
          Authorization: 'Bearer ' + tokenAdmin
        }
      })
        .then((response) => response.json())
        .then((res) => {
          if (res.status == 200) {
            setEvents(res.data.data);
            setTotal(res.data.last_page);
          } else if (
            res.status == 'Token expired' ||
            res.status == 'Not authorized'
          ) {
            window.localStorage.removeItem('tokenAdmin');
            window.localStorage.removeItem('Admin');
            toast.info('Cookies Expired, Please Login Again', {
              position: 'top-center',
              autoClose: 1000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              onClose: () => navigate('/Log/dash', { replace: true }),
              draggable: true,
              progress: undefined
            });
          } else {
            // alert(res.error.message[Object.keys(res.error.message)][0]);
          }
        });
    } catch (e) {}
  }, [page, del, render]);

  useEffect(() => {
    try {
      fetch(
        process.env.REACT_APP_URL + `admin/events/12?page=1&name=${search}`,
        {
          method: 'get',
          // body: formData,
          headers: {
            Accept: 'application/json',
            Authorization: 'Bearer ' + tokenAdmin
          }
        }
      )
        .then((response) => response.json())
        .then((res) => {
          if (res.status == 200) {
            setEvents(res.data.data);
            setTotal(res.data.last_page);
          } else if (
            res.status == 'Token expired' ||
            res.status == 'Not authorized'
          ) {
            window.localStorage.removeItem('tokenAdmin');
            window.localStorage.removeItem('Admin');
            toast.info('Cookies Expired, Please Login Again', {
              position: 'top-center',
              autoClose: 1000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              onClose: () => navigate('/Log/dash', { replace: true }),
              draggable: true,
              progress: undefined
            });
          } else {
          }
        });
    } catch (e) {}
  }, [search]);

  useEffect(() => {
    try {
      fetch(process.env.REACT_APP_URL + `admin/states/1000`, {
        method: 'get',
        headers: {
          Accept: 'application/json',
          Authorization: 'Bearer ' + tokenAdmin
        }
      })
        .then((response) => response.json())
        .then((res) => {
          if (res.status == 200) {
            setState(res.data);
          } else if (
            res.status == 'Token expired' ||
            res.status == 'Not authorized'
          ) {
            window.localStorage.removeItem('tokenAdmin');
            window.localStorage.removeItem('Admin');
            toast.info('Cookies Expired, Please Login Again', {
              position: 'top-center',
              autoClose: 1000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              onClose: () => navigate('/Log/dash', { replace: true }),
              draggable: true,
              progress: undefined
            });
          } else {
            // alert(res.error.message[Object.keys(res.error.message)][0]);
          }
        });
    } catch (e) {}
  }, []);

  let State = [];
  if (state.data)
    if (state.data[0] != undefined) {
      for (let i = 0; i < state.data.length; i++) {
        State.push(
          <option value={state.data[i].id}>{state.data[i].name}</option>
        );
      }
    }

  useEffect(() => {
    try {
      fetch(process.env.REACT_APP_URL + `admin/users/100000`, {
        method: 'get',
        headers: {
          Accept: 'application/json',
          Authorization: 'Bearer ' + tokenAdmin
        }
      })
        .then((response) => response.json())
        .then((res) => {
          if (res.status == 200) {
            setUser(res.data);
          } else if (
            res.status == 'Token expired' ||
            res.status == 'Not authorized'
          ) {
            window.localStorage.removeItem('tokenAdmin');
            window.localStorage.removeItem('Admin');
            toast.info('Cookies Expired, Please Login Again', {
              position: 'top-center',
              autoClose: 1000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              onClose: () => navigate('/Log/dash', { replace: true }),
              draggable: true,
              progress: undefined
            });
          } else {
            // alert(res.error.message[Object.keys(res.error.message)][0]);
          }
        });
    } catch (e) {}
  }, []);

  let User = [];
  if (user.data)
    if (user.data[0] != undefined) {
      for (let i = 0; i < user.data.length; i++) {
        User.push(<option value={user.data[i].id}>{user.data[i].name}</option>);
      }
    }

  const handleChange = (event, newPage) => {
    setPage(newPage);
  };
  return (
    <Page className={classes.root} title="Products">
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Container maxWidth={false}>
        <Toolbar
          setRender={setRender}
          render={render}
          User={User}
          State={State}
        />
        <Box mt={3}>
          <Grid container spacing={3}>
            {events.map((event) => (
              <Grid item key={event.id} lg={4} md={6} xs={12}>
                <ProductCard
                  className={classes.productCard}
                  setDel={setDel}
                  del={del}
                  event={event}
                  setRender={setRender}
                  render={render}
                  User={User}
                  State={State}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
        <Box mt={3} display="flex" justifyContent="center">
          <Pagination
            color="primary"
            count={total}
            page={page}
            onChange={handleChange}
            size="small"
          />
        </Box>
      </Container>
    </Page>
  );
};

const mapStateToProps = (state) => {
  return {
    event: state.SearchEvent.event
  };
};

export default connect(mapStateToProps)(EventListView);

// export default EventListView;
