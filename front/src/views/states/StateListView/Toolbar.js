import React, { useState, useEffect } from 'react';
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
import { ToastContainer, toast } from 'react-toastify';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import Modal from '@material-ui/core/Modal';
import Search_State from '../../../store/actions/Search_State';
import { useDispatch, connect } from 'react-redux';
import { Search as SearchIcon } from 'react-feather';

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
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [info, setInfo] = useState({});
  const [state, setState] = useState([]);

  const navigate = useNavigate();

  const tokenAdmin = window.localStorage.getItem('tokenAdmin');

  const handleOpen = () => {
    setOpen(!open);
  };

  const setInputState = (e) => {
    setInfo({ ...info, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    try {
      let formData = new FormData();
      formData.append(
        'country_id',
        document.getElementById('country_id').value
      );
      formData.append('name', document.getElementById('name').value);

      fetch(process.env.REACT_APP_URL + `admin/state`, {
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

  useEffect(() => {
    try {
      fetch(process.env.REACT_APP_URL + `admin/countries/1000`, {
        method: 'get',
        headers: {
          Accept: 'application/json',
          Authorization: 'Bearer ' + tokenAdmin
        }
      })
        .then((response) => response.json())
        .then((res) => {
          if (res.status == 200) {
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
          <option value={state.data[i].id}>{state.data[i].name}</option>
        );
      }
    }

  const search = (e) => {
    if (e.target.name == 'name') dispatch(Search_State(e.target.value));
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
        <Button color="primary" variant="contained" onClick={handleOpen}>
          Add State
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
              Add New State
            </h2>

            <ValidatorForm
              // ref="form"
              onSubmit={handleSubmit}
              onError={(errors) => console.log(errors)}
            >
              <TextValidator
                label="Name"
                name="name"
                id="name"
                validators={['required', 'isString']}
                errorMessages={[
                  'this field is required',
                  'State name is not valid'
                ]}
                value={info.name}
                placeholder="Name"
                onChange={setInputState}
              />

              <Grid container spacing={3}>
                <Grid item>
                  <FormControl>
                    <InputLabel htmlFor="country_id">Country</InputLabel>
                    <Select
                      required
                      native
                      value={info.country_id}
                      onChange={setInputState}
                      inputProps={{
                        name: 'country',
                        id: 'country_id'
                      }}
                    >
                      <option aria-label="None" value="" />
                      {State}
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
                    Add State
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
    country: state.SearchCountry.country
  };
};

export default connect(mapStateToProps)(Toolbar);

//export default Toolbar;
