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

const RegisterView = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  const [image, setImage] = useState({});
  const [loading, setLoading] = useState(false);

  const isInitialMount = useRef(true);

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
    } else if (!loading) {
      toast.info('Please Check your email to activate your account', {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        onClose: () => (window.location.href = '/loginUser'),
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      });
    }
  }, [loading]);

  const handleSubmit = async (e) => {
    // e.preventDefault();

    setLoading(true);

    console.log(image);
    const url = process.env.REACT_APP_URL + 'user/register';

    let formData = new FormData();
    formData.append('password', e.password);
    formData.append('email', e.email);
    formData.append('name', e.name);
    formData.append('phone', e.phone);
    formData.append('age', e.age);
    formData.append('gender', e.gender);
    formData.append('image', image);

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        // Accept: 'application/json',
        // 'Content-Type': 'application/json'
      },
      body: formData
    }).catch(function (error) {
      console.log(error);
    });

    const res = await response.json();
    const result = await response.status;
    console.log(result);
    console.log(res);
    if (result == 200) {
      console.log(res);
      // var accessToken = res.access_token;
      var WaitingToVerify = e.email;
      // var adminId = admin.id;
      // var id = JSON.stringify(adminId);
      window.localStorage.setItem('WaitingToVerify', WaitingToVerify);
      // window.localStorage.setItem('admin', id);
      setLoading(false);

      // alert( ");
      // this.props.handleModalLog();
    } else {
      var msg;
      if (result == 400)
        msg = res.error.message[Object.keys(res.error.message)[0]][0];
      else msg = res.error;

      toast.error(msg, {
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
          <Container maxWidth="sm">
            <Formik
              initialValues={{
                email: '',
                name: '',
                password: '',
                phone: '',
                age: '',
                image: '',
                gender: '',
                policy: false
              }}
              validationSchema={Yup.object().shape({
                email: Yup.string()
                  .email('Must be a valid email')
                  .max(255)
                  .required('Email is required'),
                name: Yup.string().max(255).required('Your Name is required'),
                password: Yup.string()
                  .max(255)
                  .required('password is required'),
                policy: Yup.boolean().oneOf(
                  [true],
                  'This field must be checked'
                ),
                phone: Yup.number('Must Be Real Phone Number').required(
                  'Phone nb is required'
                ),
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
                <form onSubmit={handleSubmit}>
                  <Box mb={3}>
                    <Typography color="textPrimary" variant="h2">
                      Create new account
                    </Typography>
                    <Typography
                      color="textSecondary"
                      gutterBottom
                      variant="body2"
                    >
                      Use your email to create new account
                    </Typography>
                  </Box>
                  <TextField
                    error={Boolean(touched.name && errors.name)}
                    fullWidth
                    helperText={touched.name && errors.name}
                    label="Your Name"
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
                    label="Password"
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
                    label="phone"
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
                    label="age"
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
                      required
                      name="image"
                      onChange={setInputState}
                      // style={{ display: 'none' }}
                      id="image"
                    />
                    <label htmlFor="icon-button-file" />
                  </Box>
                  <Box alignItems="center" display="flex" ml={-1}>
                    <Checkbox
                      checked={values.policy}
                      name="policy"
                      onChange={handleChange}
                    />
                    <Typography color="textSecondary" variant="body1">
                      I have read the{' '}
                      <Link
                        color="primary"
                        component={RouterLink}
                        to="#"
                        underline="always"
                        variant="h6"
                      >
                        Terms and Conditions
                      </Link>
                    </Typography>
                  </Box>
                  {Boolean(touched.policy && errors.policy) && (
                    <FormHelperText error>{errors.policy}</FormHelperText>
                  )}
                  <Box my={2}>
                    <Button
                      color="primary"
                      fullWidth
                      size="large"
                      type="submit"
                      variant="contained"
                    >
                      Sign up now
                    </Button>
                  </Box>
                  <Typography color="textSecondary" variant="body1">
                    Have an account?{' '}
                    <Link component={RouterLink} to="/login" variant="h6">
                      Sign in
                    </Link>
                  </Typography>
                </form>
              )}
            </Formik>
          </Container>
        </Box>
      )}
    </Page>
  );
};

export default RegisterView;
