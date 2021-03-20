import React, { useState, useEffect } from 'react';
import { Container, Grid, makeStyles } from '@material-ui/core';
import Page from 'src/components/Page';
import Profile from './Profile';
import ProfileDetails from './ProfileDetails';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const Account = () => {
  const classes = useStyles();

  const [user, setUser] = useState('');

  const tokenAdmin = window.localStorage.getItem('tokenAdmin');

  const id = window.localStorage.getItem('Admin');

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
          console.log(res);
          if (res.status == 200) {
            setUser(res.data);
          } else {
            console.log(res);
            // alert(res.error.message[Object.keys(res.error.message)][0]);
          }
        });
    } catch (e) {
      console.log(e);
    }
  }, []);

  return (
    <Page className={classes.root} title="Account">
      <Container maxWidth="lg">
        {/* <Grid container spacing={3}>
          <Grid item lg={4} md={6} xs={12}>
            <Profile user={user} />
          </Grid>
          <Grid item lg={8} md={6} xs={12}>
            <ProfileDetails user={user} />
          </Grid>
        </Grid> */}
        <ProfileDetails user={user} />
      </Container>
    </Page>
  );
};

export default Account;
