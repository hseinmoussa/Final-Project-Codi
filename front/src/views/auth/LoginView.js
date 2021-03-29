import React from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  Box,
  Button,
  Container,
  Grid,
  Link,
  TextField,
  Typography,
  makeStyles
} from '@material-ui/core';

import Page from 'src/components/Page';
import { ToastContainer, toast } from 'react-toastify';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const LoginView = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    // e.preventDefault();

    const url = process.env.REACT_APP_URL + 'admin/login';
    const body = {
      email: e.email,
      password: e.password
    };

    let formData = new FormData();
    formData.append('password', e.password);
    formData.append('email', e.email);

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      // body: formData
      body: JSON.stringify(body)
    }).catch(function (error) {});

    const res = await response.json();
    const result = await response.status;

    if (result == 200) {
      var accessToken = res.access_token;
      var admin = res.admin;
      var adminId = admin.id;
      var id = JSON.stringify(adminId);
      window.localStorage.setItem('tokenAdmin', accessToken);
      window.localStorage.setItem('Admin', id);
      toast.info('You Seccsussfuly loged in !', {
        position: 'top-right',
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        onClose: () => navigate('/admin/dashboard', { replace: true }),
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      });

      // alert( ");
      // this.props.handleModalLog();
    } else {
      toast.error(res.error, {
        position: 'top-right',
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        // onClose: () => this.props.handleModalLog(),
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      });
      // this.setState({ error: res.error });
    }
  };

  return (
    <Page className={classes.root} title="Login">
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
      <Box
        display="flex"
        flexDirection="column"
        height="100%"
        justifyContent="center"
      >
        <Container maxWidth="sm">
          <Formik
            initialValues={{
              email: '',
              password: ''
            }}
            validationSchema={Yup.object().shape({
              email: Yup.string()
                .email('Must be a valid email')
                .max(255)
                .required('Email is required'),
              password: Yup.string().max(255).required('Password is required')
            })}
            onSubmit={(e) => {
              handleSubmit(e);
            }}
          >
            {({
              errors,
              handleBlur,
              handleChange,
              handleSubmit,
              isSubmitting,
              touched,
              values
            }) => (
              <form onSubmit={handleSubmit}>
                <Box mb={3}>
                  <Typography color="textPrimary" variant="h2">
                    Sign in (Admin)
                  </Typography>
                </Box>

                <TextField
                  error={Boolean(touched.email && errors.email)}
                  fullWidth
                  helperText={touched.email && errors.email}
                  label="Email Address"
                  margin="normal"
                  name="email"
                  id="email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="email"
                  value={values.email}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.password && errors.password)}
                  fullWidth
                  helperText={touched.password && errors.password}
                  label="Password"
                  margin="normal"
                  id="password"
                  name="password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="password"
                  value={values.password}
                  variant="outlined"
                />
                <Box my={2}>
                  <Button
                    color="primary"
                    // disabled={isSubmitting}
                    style={{ backgroundColor: '#2f4f4f' }}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    Sign in now
                  </Button>
                </Box>
              </form>
            )}
          </Formik>
        </Container>
      </Box>
    </Page>
  );
};

export default LoginView;
