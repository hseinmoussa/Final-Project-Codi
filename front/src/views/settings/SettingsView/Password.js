import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  TextField,
  makeStyles
} from '@material-ui/core';

import { ToastContainer, toast } from 'react-toastify';

import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles({
  root: {}
});
const Password = ({ className, ...rest }) => {
  const classes = useStyles();
  const [values, setValues] = useState({
    password: '',
    verify_password: ''
  });
  const navigate = useNavigate();

  const tokenAdmin = window.localStorage.getItem('tokenAdmin');
  const id = window.localStorage.getItem('Admin');

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  const submit = (e) => {
    e.preventDefault();

    if (values.password != values.verify_password)
      toast.error(
        'Password and verify password should be the same',
        // res.error.message[Object.keys(res.error.message)[0]][0],
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
    else {
      try {
        let formData = new FormData();
        formData.append('password', values.password);
        formData.append('verify_password', values.verify_password);

        fetch(process.env.REACT_APP_URL + `admin/admin/updatePass/${id}`, {
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
              toast.info('Updated Successfully', {
                position: 'top-center',
                autoClose: 1000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                onClose: () => (window.location.href = '/admin'),
                draggable: true,
                progress: undefined
              });
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
              var msg;
              if (Object.keys(res.error.message)[0] == 0)
                msg = res.error.message;
              else
                msg = res.error.message[Object.keys(res.error.message)[0]][0];
              toast.error(msg, {
                position: 'top-center',
                autoClose: 1000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                // onClose: () => (window.location.href = "/cart"),
                draggable: true,
                progress: undefined
              });
              // alert(res.error.message[Object.keys(res.error.message)][0]);
            }
          });
      } catch (e) {}
    }
  };

  return (
    <form className={clsx(classes.root, className)} {...rest}>
      <Card>
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
        <CardHeader subheader="Update password" title="Password" />
        <Divider />
        <CardContent>
          <TextField
            fullWidth
            label="Password"
            margin="normal"
            name="password"
            onChange={handleChange}
            type="password"
            value={values.password}
            variant="outlined"
          />
          <TextField
            fullWidth
            label="Confirm password"
            margin="normal"
            name="verify_password"
            onChange={handleChange}
            type="password"
            value={values.confirm}
            variant="outlined"
          />
        </CardContent>
        <Divider />
        <Box display="flex" justifyContent="flex-end" p={2}>
          <Button color="primary" variant="contained" onClick={submit}>
            Update
          </Button>
        </Box>
      </Card>
    </form>
  );
};

Password.propTypes = {
  className: PropTypes.string
};

export default Password;
