import React from 'react';
import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom';
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
    height: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const ResetPassword = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  const { id } = useParams();
  const handleSubmit = async (e) => {
    // e.preventDefault();

    const url = process.env.REACT_APP_URL + 'reset';
    const body = {
      token: id,
      password: e.password
    };

    let formData = new FormData();
    formData.append('password', e.password);
    formData.append('token', id);

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
      // var accessToken = res.access_token;
      // var admin = res.admin;
      // var adminId = admin.id;
      // var id = JSON.stringify(adminId);
      // window.localStorage.setItem('tokenAdmin', accessToken);
      // window.localStorage.setItem('admin', id);
      toast.info('You Seccussfuly Chnaged Password !', {
        position: 'top-right',
        autoClose: 1000,
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
      >
        <Container maxWidth="sm">
          <Formik
            initialValues={{
              password: ''
            }}
            validationSchema={Yup.object().shape({
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
                    Change Password
                  </Typography>
                </Box>

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
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    Change Password
                  </Button>
                </Box>

                <Typography color="textSecondary" variant="body1">
                  Go Back
                  <Link component={RouterLink} to="/register" variant="h6">
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

export default ResetPassword;
