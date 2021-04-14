import React, { useState, useEffect, useRef } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormHelperText,
  Link,
  TextField,
  Typography,
  makeStyles,
  FormControl,
  InputLabel,
  Select,
  CircularProgress
} from '@material-ui/core';
import MainLayout from 'src/layouts/MainLayout';

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

const UserAccount = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  const [image, setImage] = useState({});
  const [loading, setLoading] = useState(false);

  const isInitialMount = useRef(true);

  const [customers, setCustomers] = useState({});

  const tokenUser = window.localStorage.getItem('tokenUser');

  const User = window.localStorage.getItem('User');

  const setInputState = (e) => {
    let file;

    if (e.target.files) {
      file = e.target.files[0];
      setImage(file);
    }
  };

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    }
  }, []);

  useEffect(() => {
    try {
      fetch(process.env.REACT_APP_URL + `user/user`, {
        method: 'get',
        // body: formData,
        headers: {
          Accept: 'application/json',
          Authorization: 'Bearer ' + tokenUser
        }
      })
        .then((response) => response.json())
        .then((res) => {
          if (res.status == 200) {
            console.log(res);
            setCustomers(res.data);
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
            console.log(res);
            // alert(res.error.message[Object.keys(res.error.message)][0]);
          }
        });
    } catch (e) {}
  }, []);

  const handleSubmit = async (e) => {
    // e.preventDefault();

    setLoading(true);

    const url = process.env.REACT_APP_URL + 'user/update/' + User;

    let formData = new FormData();
    if (e.password != '' && e.password != undefined)
      formData.append('password', e.password);
    formData.append('email', e.email);
    formData.append('name', e.name);
    formData.append('phone', e.phone);
    formData.append('age', e.age);
    formData.append('gender', e.gender);
    if (image != '' && image != undefined) formData.append('image', image);

    formData.append('_method', 'put');

    const response = await fetch(url, {
      method: 'post',
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer ' + tokenUser
      },

      body: formData
    }).catch(function (error) {});

    const res = await response.json();
    const result = await response.status;

    if (result == 200) {
      setLoading(false);
      return toast.info('Eddited Successfully', {
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
      var msg;
      if (result == 400)
        msg = res.error.message[Object.keys(res.error.message)[0]][0];
      else msg = res.error;
      setLoading(false);

      return toast.error(msg, {
        position: 'top-right',
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        // onClose: () => setLoading(false),
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      });

      // this.setState({ error: res.error });
    }
  };

  return (
    <Page className={classes.root} title="Register">
      {loading ? (
        <div
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%'
          }}
        >
          <div
            style={{
              position: 'relative',
              left: '-50%'
            }}
          >
            <CircularProgress>
              <span className="sr-only">Loading...</span>
            </CircularProgress>
          </div>
        </div>
      ) : (
        ''
      )}
      <Box
        display="flex"
        flexDirection="column"
        // height="100%"
        justifyContent="center"
      >
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
        <Container maxWidth="sm" style={{ marginTop: '10vh' }}>
          <Formik
            enableReinitialize
            initialValues={{
              email: customers.email,
              name: customers.name,
              password: '',
              phone: customers.phone,
              age: customers.age,
              image: customers.image,
              gender: customers.gender
            }}
            validationSchema={Yup.object().shape({
              email: Yup.string()
                .email('Must be a valid email')
                .max(255)
                .required('Email is required'),
              name: Yup.string().max(255).required('Your Name is required'),
              password: Yup.string().max(255),
              phone: Yup.number('Must Be Real Phone Number')
                .min(7)
                .required('Phone nb is required'),
              age: Yup.number('Must Be Number')
                .max(255)

                .required('Age is required')
            })}
            onSubmit={(e) => {
              handleSubmit(e);
              // navigate('/app/dashboard', { replace: true });
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
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSubmit(e);
                }}
                // onSubmit={handleSubmit}
              >
                <Box display="flex">
                  <Box m="auto" mt={3} mb={3} style={{ textAlign: 'center' }}>
                    <img
                      src={process.env.REACT_APP_URL2 + values.image}
                      alt="Avatar"
                      width="25%"
                      style={{ borderRadius: '50%' }}
                    />
                  </Box>
                </Box>
                <Box mb={3}>
                  <Typography variant="h2" style={{ color: '#2f4f4f' }}>
                    Update your account
                  </Typography>
                </Box>

                <TextField
                  error={Boolean(touched.name && errors.name)}
                  fullWidth
                  helperText={touched.name && errors.name}
                  margin="normal"
                  name="name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.name}
                  variant="outlined"
                />

                <TextField
                  error={Boolean(touched.email && errors.email)}
                  fullWidth
                  helperText={touched.email && errors.email}
                  label="Email Address"
                  margin="normal"
                  name="email"
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
                  label="Password (Optional)"
                  margin="normal"
                  name="password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="password"
                  value={values.password}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.phone && errors.phone)}
                  fullWidth
                  helperText={touched.phone && errors.phone}
                  margin="normal"
                  name="phone"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="phone"
                  value={values.phone}
                  variant="outlined"
                />

                <TextField
                  error={Boolean(touched.age && errors.age)}
                  fullWidth
                  helperText={touched.age && errors.age}
                  margin="normal"
                  name="age"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="age"
                  value={values.age}
                  variant="outlined"
                />

                <FormControl>
                  <InputLabel htmlFor="gender">Gender</InputLabel>
                  <Select
                    required
                    native
                    value={values.gender}
                    onChange={handleChange}
                    inputProps={{
                      name: 'gender',
                      id: 'gender'
                    }}
                  >
                    <option aria-label="None" value="" />
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </Select>
                </FormControl>

                <Box mt={1}>
                  <input
                    accept="image/*"
                    type="file"
                    name="image"
                    // value={values.gender}
                    onChange={setInputState}
                    // style={{ display: 'none' }}
                    id="image"
                  />
                  <label htmlFor="icon-button-file" />
                </Box>

                <Box my={2}>
                  <Button
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                    style={{ color: '#daa520', backgroundColor: '#2f4f4f' }}
                  >
                    Update
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

export default UserAccount;
