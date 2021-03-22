import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Card,
  Avatar,
  CardContent,
  CardHeader,
  Typography,
  Divider,
  Grid,
  TextField,
  makeStyles,
  CircularProgress
} from '@material-ui/core';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { ToastContainer, toast } from 'react-toastify';

const states = [
  {
    value: 'alabama',
    label: 'Alabama'
  },
  {
    value: 'new-york',
    label: 'New York'
  },
  {
    value: 'san-francisco',
    label: 'San Francisco'
  }
];

const useStyles = makeStyles(() => ({
  root: {},
  avatar: {
    height: 100,
    width: 100
  }
}));

const ProfileDetails = ({ className, user, ...rest }) => {
  const classes = useStyles();

  const [info, setInfo] = useState(user);

  const tokenAdmin = window.localStorage.getItem('tokenAdmin');

  useEffect(() => {
    setInfo(user);
  }, [user]);

  const setInputState = (e) => {
    let file;

    if (e.target.files) {
      file = e.target.files[0];
      setInfo({ ...info, [e.target.name]: file });
    } else setInfo({ ...info, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e, id) => {
    e.preventDefault();

    try {
      let formData = new FormData();

      formData.append('name', info.name);

      formData.append('email', info.email);

      formData.append('image', info.image);
      formData.append('_method', 'put');

      fetch(process.env.REACT_APP_URL + `admin/adminProf/${info.id}`, {
        method: 'post',
        body: formData,
        headers: {
          Accept: 'application/json',
          Authorization: 'Bearer ' + tokenAdmin
        }
      })
        .then((response) => response.json())
        .then((res) => {
          if (res.status == 200) {
            toast.info('Eddited Successfully', {
              position: 'top-center',
              autoClose: 1000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              onClose: () => (window.location.href = '/admin'),
              draggable: true,
              progress: undefined
            });
          } else {
            res.error &&
              res.error.message &&
              toast.error(
                res.error.message[Object.keys(res.error.message)[0]][0],
                {
                  position: 'top-center',
                  autoClose: 1000,
                  hideProgressBar: true,
                  closeOnClick: true,
                  pauseOnHover: true,
                  // onClose: () => (window.location.href = "/cart"),
                  draggable: true,
                  progress: undefined
                }
              );
            // alert(res.error.message[Object.keys(res.error.message)][0]);
          }
        });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Grid container spacing={3}>
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
      <Grid item lg={4} md={6} xs={12}>
        <Card className={clsx(classes.root, className)} {...rest}>
          <CardContent>
            <Box
              alignItems="center"
              display="flex"
              flexDirection="column"
              p={2}
            >
              <Avatar
                className={classes.avatar}
                src={process.env.REACT_APP_URL2 + user.image}
                to="/app/account"
              />
              <Typography
                className={classes.name}
                color="textPrimary"
                variant="h5"
              >
                {user && user.name}
              </Typography>
            </Box>
          </CardContent>
          <Divider />
        </Card>
      </Grid>
      <Grid item lg={8} md={6} xs={12}>
        <form
          autoComplete="off"
          noValidate
          className={clsx(classes.root, className)}
          {...rest}
          onSubmit={handleSubmit}
        >
          <Card>
            <CardHeader
              subheader="The information can be edited"
              title="Profile"
            />
            <Divider />
            <CardContent>
              {!info.id ? (
                <div className={classes.root2}>
                  <CircularProgress />
                </div>
              ) : (
                <ValidatorForm
                  // ref="form"
                  onSubmit={handleSubmit}
                  onError={(errors) => console.log(errors)}
                >
                  <Grid container spacing={3}>
                    <Grid item md={6} xs={12}>
                      <TextValidator
                        label="First name"
                        name="name"
                        id="name"
                        validators={['required', 'isString']}
                        errorMessages={[
                          'this field is required',
                          'Name is not valid'
                        ]}
                        value={info.name}
                        placeholder="First Name"
                        onChange={setInputState}
                      />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <TextValidator
                        helperText="Please specify the Email"
                        label="Email"
                        name="email"
                        id="email"
                        placeholder="Email"
                        validators={['required', 'isEmail']}
                        errorMessages={[
                          'this field is required',
                          'email is not valid'
                        ]}
                        value={info.email}
                        onChange={(e) => setInputState(e)}
                      />
                    </Grid>

                    <Grid item md={6} xs={12}>
                      <input
                        accept="image/*"
                        type="file"
                        name="image"
                        // value={info.image}
                        onChange={setInputState}
                        // style={{ display: 'none' }}
                        id="image"
                      />
                      <label htmlFor="icon-button-file" />
                    </Grid>
                  </Grid>
                </ValidatorForm>
              )}
            </CardContent>
            <Divider />
            <Box display="flex" justifyContent="flex-end" p={2}>
              <Button color="primary" variant="contained" type="submit">
                Save details
              </Button>
            </Box>
          </Card>
        </form>
      </Grid>
    </Grid>
  );
};

ProfileDetails.propTypes = {
  className: PropTypes.string,
  user: PropTypes.object
};

export default ProfileDetails;
