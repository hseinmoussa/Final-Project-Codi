import React, { useState, useEffect } from 'react';
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
import FacebookIcon from 'src/icons/Facebook';
import GoogleIcon from 'src/icons/Google';
import Page from 'src/components/Page';
import { ToastContainer, toast } from 'react-toastify';
import MainLayout from 'src/layouts/MainLayout';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: 'auto',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const LoginUser = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  const [resend, setResend] = useState(false);
  const [WaitingToVerify, setWaitingToVerify] = useState('');

  useEffect(() => {
    if (localStorage.getItem('WaitingToVerify') != null) {
      setResend(true);
      setWaitingToVerify(localStorage.getItem('WaitingToVerify'));
    }
  }, []);

  const handleResend = (e) => {
    try {
      let formData = new FormData();
      formData.append('email', WaitingToVerify);

      fetch(process.env.REACT_APP_URL + `email/resend`, {
        method: 'post',
        body: formData
        // headers: {
        //   Accept: "application/json",
        //   Authorization: "Bearer " + token,
        // },
      })
        .then((response) => response.json())
        .then((res) => {
          if (res == 'User already have verified email!') {
            localStorage.removeItem('WaitingToVerify');
            return toast.info(res, {
              position: 'top-center',
              autoClose: 3000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              // onClose: () => (window.location.href = '/'),
              draggable: true,
              progress: undefined
            });
          }
          toast.info(res, {
            position: 'top-center',
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            // onClose: () => (window.location.href = "/"),
            draggable: true,
            progress: undefined
          });
        });
    } catch (e) {
      console.log(e);
    }
  };

  const handleSubmit = async (e) => {
    // e.preventDefault();

    const url = process.env.REACT_APP_URL + 'user/login';
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
    }).catch(function (error) {
      console.log(error);
    });

    const res = await response.json();
    const result = await response.status;

    if (result == 200) {
      var accessToken = res.access_token;
      var user = res.user;
      var userId = user.id;
      var id = JSON.stringify(userId);
      window.localStorage.setItem('tokenUser', accessToken);
      window.localStorage.setItem('User', id);
      toast.info('You Successfully loged in !', {
        position: 'top-right',
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        onClose: () => navigate('/', { replace: true }),
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      });
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
      <MainLayout />
      <Box
        display="flex"
        flexDirection="column"
        height="100%"
        justifyContent="center"
        style={{ marginTop: '10vh' }}
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

                {resend ? (
                  <Typography color="textSecondary" variant="body1">
                    Resend Verification Link ?{' '}
                    <Button onClick={handleResend}>resend</Button>
                  </Typography>
                ) : (
                  ''
                )}

                <Typography color="textSecondary" variant="body1">
                  Forgot Password?{' '}
                  <Link component={RouterLink} to="/forgot" variant="h6">
                    Forgot Password
                  </Link>
                </Typography>
                <Typography color="textSecondary" variant="body1">
                  Don&apos;t have an account?{' '}
                  <Link component={RouterLink} to="/register" variant="h6">
                    Sign up
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

export default LoginUser;
