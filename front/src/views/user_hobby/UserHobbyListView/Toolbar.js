import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Box,
  Button,
  makeStyles,
  FormControl,
  InputLabel,
  Select,
  Grid
} from '@material-ui/core';
import { ToastContainer, toast } from 'react-toastify';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import Modal from '@material-ui/core/Modal';

import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {},
  importButton: {
    marginRight: theme.spacing(1)
  },
  exportButton: {
    marginRight: theme.spacing(1)
  },
  paper: {
    position: 'absolute',
    // minWidth: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  }
}));

const Toolbar = ({ className, setRender, render, ...rest }) => {
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const [info, setInfo] = useState({});
  const [hobby, setHobby] = useState([]);
  const [user, setUser] = useState([]);
  const [state, setState] = useState([]);

  const handleOpen = () => {
    setOpen(!open);
  };
  const navigate = useNavigate();

  const tokenAdmin = window.localStorage.getItem('tokenAdmin');

  const setInputState = (e) => {
    let file;

    if (e.target.files) {
      file = e.target.files[0];
      setInfo({ ...info, [e.target.name]: file });
    } else setInfo({ ...info, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    try {
      let formData = new FormData();
      console.log(1);
      formData.append('hobby_id', document.getElementById('hobby_id').value);
      formData.append('user_id', document.getElementById('user_id').value);
      formData.append('state_id', document.getElementById('state_id').value);
      formData.append('address', document.getElementById('address').value);
      formData.append('level_id', document.getElementById('level_id').value);

      if (
        document.getElementById('rating').value &&
        document.getElementById('rating').value != undefined &&
        document.getElementById('rating').value != ''
      ) {
        console.log(document.getElementById('rating').value);
        formData.append('rating', document.getElementById('rating').value);
      }
      if (
        document.getElementById('is_freelancer').value &&
        document.getElementById('is_freelancer').value != undefined &&
        document.getElementById('is_freelancer').value != ''
      ) {
        console.log(document.getElementById('is_freelancer').value);
        formData.append(
          'is_freelancer',
          document.getElementById('is_freelancer').value
        );
      }
      if (
        document.getElementById('fees_per_hour').value &&
        document.getElementById('fees_per_hour').value != undefined &&
        document.getElementById('fees_per_hour').value != ''
      ) {
        console.log(document.getElementById('fees_per_hour').value);
        formData.append(
          'fees_per_hour',
          document.getElementById('fees_per_hour').value
        );
      }

      if (
        document.getElementById('about').value &&
        document.getElementById('about').value != undefined &&
        document.getElementById('about').value != ''
      ) {
        formData.append('about', document.getElementById('about').value);
      }

      fetch(process.env.REACT_APP_URL + `admin/user_hobby`, {
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
            console.log(res);
            setOpen(!open);
            setRender(render + 1);
            toast.info('Added Successfully', {
              position: 'top-center',
              autoClose: 1000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              // onClose: () => (window.location.href = "/cart"),
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
            console.log(res);
            var msg;
            if (Object.keys(res.error.message)[0] == 0) msg = res.error.message;
            else msg = res.error.message[Object.keys(res.error.message)[0]][0];
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
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    try {
      fetch(process.env.REACT_APP_URL + `admin/hobbies/1000`, {
        method: 'get',
        headers: {
          Accept: 'application/json',
          Authorization: 'Bearer ' + tokenAdmin
        }
      })
        .then((response) => response.json())
        .then((res) => {
          console.log(res);
          if (res.status == 200) {
            console.log(res.data);
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
      fetch(process.env.REACT_APP_URL + `admin/states/1000`, {
        method: 'get',
        headers: {
          Accept: 'application/json',
          Authorization: 'Bearer ' + tokenAdmin
        }
      })
        .then((response) => response.json())
        .then((res) => {
          console.log(res);
          if (res.status == 200) {
            console.log(res.data);
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

  useEffect(() => {
    try {
      fetch(process.env.REACT_APP_URL + `admin/users/1000`, {
        method: 'get',
        headers: {
          Accept: 'application/json',
          Authorization: 'Bearer ' + tokenAdmin
        }
      })
        .then((response) => response.json())
        .then((res) => {
          console.log(res);
          if (res.status == 200) {
            console.log(res.data);
            setUser(res.data);
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

  let User = [];
  if (user.data)
    if (user.data[0] != undefined) {
      for (let i = 0; i < user.data.length; i++) {
        User.push(<option value={user.data[i].id}>{user.data[i].name}</option>);
      }
    }

  return (
    <div className={clsx(classes.root, className)} {...rest}>
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
      <Box display="flex" justifyContent="flex-end">
        <Button color="primary" variant="contained" onClick={handleOpen}>
          Add User Hobby
        </Button>

        <Modal
          open={open}
          onClose={handleOpen}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <div className={classes.paper} style={{ maxWidth: '95vw' }}>
            <h2
              id="simple-modal-title"
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              Add New User Hobby
            </h2>

            <ValidatorForm
              // ref="form"
              onSubmit={handleSubmit}
              onError={(errors) => console.log(errors)}
            >
              <Grid container spacing={3}>
                <Grid item>
                  <FormControl>
                    <InputLabel htmlFor="gender">Hobby</InputLabel>
                    <Select
                      required
                      native
                      value={info.hobby}
                      onChange={setInputState}
                      inputProps={{
                        name: 'hobby',
                        id: 'hobby_id'
                      }}
                    >
                      <option aria-label="None" value="" />
                      {Hobby}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>

              <Grid container spacing={3}>
                <Grid item>
                  <FormControl>
                    <InputLabel htmlFor="state_id">State</InputLabel>
                    <Select
                      required
                      native
                      value={info.state_id}
                      onChange={setInputState}
                      inputProps={{
                        name: 'state_id',
                        id: 'state_id'
                      }}
                    >
                      <option aria-label="None" value="" />
                      {State}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>

              <Grid container spacing={3}>
                <Grid item>
                  <FormControl>
                    <InputLabel htmlFor="user_id">User</InputLabel>
                    <Select
                      required
                      native
                      value={info.user}
                      onChange={setInputState}
                      inputProps={{
                        name: 'user_id',
                        id: 'user_id'
                      }}
                    >
                      <option aria-label="None" value="" />
                      {User}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>

              <Grid container spacing={3}>
                <Grid item xs>
                  <TextValidator
                    helperText="Please specify the Fees per hour (Optional)"
                    label="fees_per_hour"
                    name="fees_per_hour"
                    id="fees_per_hour"
                    placeholder="Fees Per Hour (Optional)"
                    validators={['isNumber']}
                    errorMessages={['fees is not valid']}
                    value={info.fees_per_hour}
                    onChange={(e) => setInputState(e)}
                  />
                </Grid>
                <Grid item xs>
                  <TextValidator
                    helperText="Please specify the address"
                    label="address"
                    name="address"
                    type="address"
                    id="address"
                    validators={['required']}
                    errorMessages={['this field is required']}
                    placeholder="Address"
                    value={info.address}
                    onChange={(e) => setInputState(e)}
                  />
                </Grid>
              </Grid>

              <Grid container spacing={3}>
                <Grid item xs>
                  <TextValidator
                    helperText="Please specify the About (Optional)"
                    label="about"
                    name="about"
                    id="about"
                    placeholder="About (Optional)"
                    value={info.about}
                    onChange={(e) => setInputState(e)}
                  />
                </Grid>
              </Grid>
              <Grid container spacing={3}>
                <Grid item xs>
                  <TextValidator
                    helperText="Please specify the Rating (Optional)"
                    label="rating"
                    name="rating"
                    id="rating"
                    placeholder="Rating (Optional)"
                    validators={['isNumber']}
                    errorMessages={['fees is not valid']}
                    value={info.rating}
                    onChange={(e) => setInputState(e)}
                  />
                </Grid>
                <Grid item xs>
                  <TextValidator
                    helperText="Please specify if he is freelancer (default no)"
                    label="is_freelancer"
                    name="is_freelancer"
                    type="is_freelancer"
                    id="is_freelancer"
                    placeholder="is freelancer ? (Default no)"
                    value={info.is_freelancer}
                    onChange={(e) => setInputState(e)}
                  />
                </Grid>
              </Grid>

              <Grid container spacing={3}>
                <Grid item>
                  <FormControl>
                    <InputLabel htmlFor="level_id">Level</InputLabel>
                    <Select
                      required
                      native
                      value={info.level_id}
                      onChange={setInputState}
                      inputProps={{
                        name: 'level_id',
                        id: 'level_id'
                      }}
                    >
                      <option aria-label="None" value="" />
                      <option value="1/5">1/5</option>
                      <option value="2/5">2/5</option>
                      <option value="3/5">3/5</option>
                      <option value="4/5">4/5</option>
                      <option value="5/5">5/5</option>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>

              <Box display="flex">
                <Box m="auto" mt={1}>
                  <Button
                    type="submit"
                    color="primary"
                    variant="contained"
                    style={{ margin: 'auto' }}
                  >
                    Add User Hobby
                  </Button>
                </Box>
              </Box>
            </ValidatorForm>
          </div>
        </Modal>
      </Box>
    </div>
  );
};

Toolbar.propTypes = {
  className: PropTypes.string
};

export default Toolbar;
