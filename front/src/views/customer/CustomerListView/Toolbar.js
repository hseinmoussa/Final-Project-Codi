import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
  makeStyles,
  FormControl,
  InputLabel,
  Select,
  Grid,
  Paper
} from '@material-ui/core';
import { Search as SearchIcon } from 'react-feather';
import { ToastContainer, toast } from 'react-toastify';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import Modal from '@material-ui/core/Modal';

import { useDispatch } from 'react-redux';
import Search_User from '../../../store/actions/Search_User';
import Search_User_Email from '../../../store/actions/Search_User_Email';

import { useNavigate } from 'react-router-dom';

import MuiPhoneNumber from 'material-ui-phone-number';
function rand() {
  return Math.round(Math.random() * 20) - 10;
}
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

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    margin: 'auto'
    // transform: `translate(-${top}%, -${left}%)`
  };
}

const Toolbar = ({ className, setRender, render, ...rest }) => {
  const dispatch = useDispatch();

  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);

  const [open, setOpen] = useState(false);
  const [info, setInfo] = useState({});

  const tokenAdmin = window.localStorage.getItem('tokenAdmin');
  const admin = window.localStorage.getItem('Admin');

  const navigate = useNavigate();

  const handleOpen = () => {
    setOpen(!open);
  };

  const search = (e) => {
    //action name
    if (e.target.name == 'name') dispatch(Search_User(e.target.value));
    if (e.target.name == 'email') dispatch(Search_User_Email(e.target.value));

    //props
    // console.log(rest.user);
  };
  const setInputState = (e) => {
    let file;

    if (e.target.files) {
      file = e.target.files[0];
      setInfo({ ...info, [e.target.name]: file });
    } else setInfo({ ...info, [e.target.name]: e.target.value });
  };
  const setInputStatePhone = (e) => {
    setInfo({ ...info, [phone]: e });
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    try {
      let formData = new FormData();
      formData.append('name', document.getElementById('name').value);
      formData.append('phone', document.getElementById('phone').value);
      formData.append('gender', document.getElementById('gender').value);
      formData.append('age', document.getElementById('age').value);
      formData.append('email', document.getElementById('email').value);
      formData.append('password', document.getElementById('password').value);

      formData.append('image', info.image);

      fetch(process.env.REACT_APP_URL + `user/register`, {
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
            res.success.message ==
            'Please confirm yourself by clicking on verify user button sent to you on your email'
          ) {
            setOpen(!open);
            setRender(render + 1);
            toast.info('Check The inbox to activate account', {
              position: 'top-center',
              autoClose: 3000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              // onClose: () => (window.location.href = "/cart"),
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
        {/* <Button className={classes.importButton}>
          Import
        </Button>
        <Button className={classes.exportButton}>
          Export
        </Button> */}
        <Button color="primary" variant="contained" onClick={handleOpen}>
          Add User
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
              Add New User
            </h2>

            <ValidatorForm
              // ref="form"
              onSubmit={handleSubmit}
              onError={(errors) => console.log(errors)}
            >
              <TextValidator
                label="First name"
                name="name"
                id="name"
                validators={['required', 'isString']}
                errorMessages={['this field is required', 'Name is not valid']}
                value={info.name}
                placeholder="First Name"
                onChange={setInputState}
              />

              <Grid container spacing={3}>
                <Grid item xs>
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
                <Grid item xs>
                  <TextValidator
                    helperText="Please specify the password"
                    label="password"
                    name="password"
                    type="password"
                    id="password"
                    validators={['required', 'minStringLength:8']}
                    errorMessages={['this field is required', 'Weak Password']}
                    placeholder="Password"
                    value={info.password}
                    onChange={(e) => setInputState(e)}
                  />
                </Grid>
              </Grid>

              <Grid container spacing={3}>
                <Grid item xs>
                  {/* <TextValidator
                    label="Phone"
                    name="phone"
                    id="phone"
                    value={info.phone}
                    validators={['required', 'isNumber']}
                    errorMessages={[
                      'this field is required',
                      'Invalide phone number'
                    ]}
                    placeholder="Phone"
                    onChange={(e) => setInputState(e)}
                  /> */}
                  <MuiPhoneNumber
                    required
                    label="Phone"
                    name="phone"
                    id="phone"
                    placeholder="Phone"
                    onChange={(e) => setInputStatePhone(e)}
                  />
                  ,
                </Grid>
                <Grid item xs>
                  <TextValidator
                    id="age"
                    label="Age"
                    placeholder="Age"
                    name="age"
                    type="number"
                    value={info.age}
                    validators={['required', 'isNumber']}
                    errorMessages={['this field is required', 'Invalide age']}
                    onChange={(e) => setInputState(e)}
                  />
                </Grid>
              </Grid>

              <FormControl>
                <InputLabel htmlFor="gender">Gender</InputLabel>
                <Select
                  required
                  native
                  value={info.gender}
                  onChange={setInputState}
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
              </Box>

              <Box display="flex">
                <Box m="auto" mt={1}>
                  <Button
                    type="submit"
                    color="primary"
                    variant="contained"
                    style={{ margin: 'auto' }}
                  >
                    Add User
                  </Button>
                </Box>
              </Box>
            </ValidatorForm>
          </div>
        </Modal>
      </Box>
      <Box mt={3}>
        <Card>
          <CardContent>
            <Grid container spacing={3}>
              <Grid item xs>
                <Box maxWidth={500}>
                  <TextField
                    fullWidth
                    onChange={search}
                    name="name"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SvgIcon fontSize="small" color="action">
                            <SearchIcon />
                          </SvgIcon>
                        </InputAdornment>
                      )
                    }}
                    placeholder="Name"
                    variant="outlined"
                  />
                </Box>
              </Grid>
              <Grid item xs>
                <Box maxWidth={500}>
                  <TextField
                    fullWidth
                    onChange={search}
                    name="email"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SvgIcon fontSize="small" color="action">
                            <SearchIcon />
                          </SvgIcon>
                        </InputAdornment>
                      )
                    }}
                    placeholder="Email"
                    variant="outlined"
                  />
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Box>
    </div>
  );
};

Toolbar.propTypes = {
  className: PropTypes.string
};

const mapStateToProps = (state) => {
  //state.reducer file name . variable inside reducer
  return {
    user: state.SearchUser.user,
    email: state.SearchEmail.email
  };
};

// const mapDispatchToProps = (dispatch) => {
//   return {
//     ClassID: () => dispatch(ClassID())
//   };
// };

export default connect(mapStateToProps)(Toolbar);
// export default Toolbar;
