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

const Forgot = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    // e.preventDefault();
    console.log(e);
    try {
      const url = process.env.REACT_APP_URL + 'forgot';
      const body = {
        email: e.email
      };

      let formData = new FormData();
      formData.append('email', e.email);

      const response = await fetch(url, {
        method: 'post',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        // body: formData
        body: JSON.stringify(body)
      }).catch(function (error) {
        console.log(error);
      });

      const res = await response.json();
      const result = await response.status;

      console.log(res);
      if (result == 200) {
        console.log(res);
        // var accessToken = res.access_token;
        // var admin = res.admin;
        // var adminId = admin.id;
        // var id = JSON.stringify(adminId);
        // window.localStorage.setItem('tokenAdmin', accessToken);
        // window.localStorage.setItem('admin', id);
        toast.info(res.data, {
          position: 'top-center',
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          onClose: () => navigate('/loginUser', { replace: true }),
          pauseOnHover: true,
          draggable: true,
          progress: undefined
        });

        // alert( ");
        // this.props.handleModalLog();
      } else {
        if (result == 404)
          toast.error(await res.error.message, {
            position: 'top-center',
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            // onClose: () => this.props.handleModalLog(),
            pauseOnHover: true,
            draggable: true,
            progress: undefined
          });
        // this.setState({ error: res.error });
      }
    } catch (e) {
      console.log(e);
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
              email: ''
            }}
            validationSchema={Yup.object().shape({
              email: Yup.string()
                .email('Must be a valid email')
                .max(255)
                .required('Email is required')
            })}
            onSubmit={(e) => {
              console.log(e);
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
                    Sign in
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

                <Box my={2}>
                  <Button
                    color="primary"
                    // disabled={isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    Forget Password
                  </Button>
                </Box>

                <Typography color="textSecondary" variant="body1">
                  Turn back and{' '}
                  <Link component={RouterLink} to="/loginUser" variant="h6">
                    Sign in
                  </Link>
                </Typography>
              </form>
            )}
          </Formik>
        </Container>
      </Box>
    </Page>
  );
};

export default Forgot;
