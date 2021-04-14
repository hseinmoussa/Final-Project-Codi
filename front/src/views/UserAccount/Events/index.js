import React, { useState, useEffect } from 'react';
import { Box, Container, Grid, makeStyles } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import Page from 'src/components/Page';
import Toolbar from './Toolbar';
import ProductCard from './ProductCard';
import { useSelector, connect } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';

import { useNavigate } from 'react-router-dom';

import MainLayout from 'src/layouts/MainLayout';

import Footer from 'src/components/Footer/Footer';

import { Calendar, momentLocalizer } from 'react-big-calendar';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import moment from 'moment';
const localizer = momentLocalizer(moment);

const DnDCalendar = withDragAndDrop(Calendar);

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
  const [state, setState] = useState([]);
  const [hobby, setHobby] = useState([]);

  const navigate = useNavigate();

  const tokenUser = window.localStorage.getItem('tokenUser');

  const search = useSelector((state) => {
    return state.SearchEvent.event;
  });

  useEffect(() => {
    try {
      fetch(process.env.REACT_APP_URL + `user/events/12?page=${page}`, {
        method: 'get',
        headers: {
          Accept: 'application/json',
          Authorization: 'Bearer ' + tokenUser
        }
      })
        .then((response) => response.json())
        .then((res) => {
          if (res.status == 200) {
            console.log(res.data);
            setEvents(res.data.data);

            setTotal(res.data.last_page);
          } else if (
            res.status == 'Token expired' ||
            res.status == 'Not authorized'
          ) {
            window.localStorage.removeItem('tokenUser');
            window.localStorage.removeItem('User');
            toast.info('Cookies Expired, Please Login Again', {
              position: 'top-center',
              autoClose: 1000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              onClose: () => navigate('/loginUser', { replace: true }),
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
        process.env.REACT_APP_URL + `user/events/12?page=1&name=${search}`,
        {
          method: 'get',
          // body: formData,
          headers: {
            Accept: 'application/json',
            Authorization: 'Bearer ' + tokenUser
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
            window.localStorage.removeItem('tokenUser');
            window.localStorage.removeItem('User');
            toast.info('Cookies Expired, Please Login Again', {
              position: 'top-center',
              autoClose: 1000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              onClose: () => navigate('/loginUser', { replace: true }),
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
      fetch(process.env.REACT_APP_URL + `states/1000`, {
        method: 'get',
        headers: {
          Accept: 'application/json',
          Authorization: 'Bearer ' + tokenUser
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
            window.localStorage.removeItem('tokenUser');
            window.localStorage.removeItem('User');
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

  useEffect(() => {
    try {
      fetch(process.env.REACT_APP_URL + `hobbies/10000`, {
        method: 'get'
      })
        .then((response) => response.json())
        .then((res) => {
          if (res.status == 200) {
            setHobby(res.data);
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
          <option value={state.data[i].id}>
            {state.data[i].name}({state.data[i].country.name})
          </option>
        );
      }
    }

  let Hobby = [];
  if (hobby.data)
    if (hobby.data[0] != undefined) {
      for (let i = 0; i < hobby.data.length; i++) {
        Hobby.push({ value: hobby.data[i].id, label: hobby.data[i].name });
      }
    }

  let Events = [];

  for (let i = 0; i < events.length; i++) {
    var startLocalDate = new Date(events[i].start_date);
    var newStartDate = new Date(
      startLocalDate.getTime() - startLocalDate.getTimezoneOffset() * 60 * 1000
    );

    var endLocalDate = new Date(events[i].end_date);
    var newendDate = new Date(
      endLocalDate.getTime() - endLocalDate.getTimezoneOffset() * 60 * 1000
    );

    Events.push({
      start: newStartDate,
      end: newendDate,
      title: events[i].name
    });
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
      <MainLayout />
      <Toolbar
        setRender={setRender}
        render={render}
        State={State}
        Hobby={Hobby}
      />
      <Container maxWidth={false}>
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
                  State={State}
                  Hobby={Hobby}
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
        <Box mt={3} display="flex">
          <Box m="auto" mt={5} mb={3} style={{ textAlign: 'center' }}>
            <h2> {Intl.DateTimeFormat().resolvedOptions().timeZone} </h2>
          </Box>
        </Box>
        {events && events[0] && events[0].start_date && (
          <DnDCalendar
            defaultDate={new Date(events[0].start_date)}
            defaultView="month"
            events={Events}
            localizer={localizer}
            draggableAccessor={(event) => false}
            views={['month', 'agenda']}
            style={{ height: '100vh' }}
          />
        )}
      </Container>
      <hr style={{ width: '75vw', margin: '1% auto' }}></hr>

      <Footer />
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
