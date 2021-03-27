import React, { useState, useEffect } from 'react';
import { Box, Container, makeStyles } from '@material-ui/core';
import Page from 'src/components/Page';
import Results from './Results';
import Toolbar from './Toolbar';
import Footer from 'src/components/Footer/Footer';
import MainLayout from 'src/layouts/MainLayout';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const UserHobbyListView = () => {
  const classes = useStyles();

  const [render, setRender] = useState(0);

  const [hobby, setHobby] = useState([]);

  const [state, setState] = useState([]);

  useEffect(() => {
    try {
      fetch(process.env.REACT_APP_URL + `hobbies/10000`, {
        method: 'get'
      })
        .then((response) => response.json())
        .then((res) => {
          if (res.status == 200) {
            setHobby(res.data);
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
            console.log(res);
            // alert(res.error.message[Object.keys(res.error.message)][0]);
          }
        });
    } catch (e) {
      console.log(e);
    }
  }, []);

  let Hobby = [];
  if (hobby.data)
    if (hobby.data[0] != undefined) {
      for (let i = 0; i < hobby.data.length; i++) {
        Hobby.push(
          <option value={hobby.data[i].id}>{hobby.data[i].name}</option>
        );
      }
    }

  useEffect(() => {
    try {
      fetch(process.env.REACT_APP_URL + `states/10000`, {
        method: 'get'
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
            console.log(res);
            // alert(res.error.message[Object.keys(res.error.message)][0]);
          }
        });
    } catch (e) {
      console.log(e);
    }
  }, []);

  let State = [];
  if (state.data)
    if (state.data[0] != undefined) {
      for (let i = 0; i < state.data.length; i++) {
        State.push(
          <option value={state.data[i].id}>
            {state.data[i].name} ({state.data[i].country.name})
          </option>
        );
      }
    }

  return (
    <Page className={classes.root} title="Customers">
      <div style={{ minHeight: '8vh' }}>
        <MainLayout />
      </div>

      <Container maxWidth={false}>
        <Toolbar
          setRender={setRender}
          render={render}
          Hobby={Hobby}
          State={State}
        />
        <Box mt={3}>
          <Results
            render={render}
            setRender={setRender}
            Hobby={Hobby}
            State={State}
          />
        </Box>
      </Container>
      <hr style={{ width: '75vw', margin: '1% auto' }}></hr>

      <Footer />
    </Page>
  );
};

export default UserHobbyListView;
