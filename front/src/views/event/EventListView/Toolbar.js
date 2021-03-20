import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import TimezonePicker from 'react-timezone';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
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
import Search_Event from '../../../store/actions/Search_Event';

import { useNavigate } from 'react-router-dom';

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

const Toolbar = ({ className, setRender, render, User, State, ...rest }) => {
  const dispatch = useDispatch();

  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);

  const [open, setOpen] = useState(false);
  const [info, setInfo] = useState({});

  const [timezone, setTimezone] = useState('');
  // const [timezone2, setTimezone2] = useState('');
  const [date1, setDate1] = useState('');
  const [date2, setDate2] = useState('');

  const [datetime, setDatetime] = useState('');
  const [datetime2, setDatetime2] = useState('');

  const navigate = useNavigate();

  const tokenAdmin = window.localStorage.getItem('tokenAdmin');

  const handleOpen = () => {
    setOpen(!open);
  };

  const search = (e) => {
    //action name
    console.log(e.target.name);
    dispatch(Search_Event(e.target.value));
  };
  const setInputState = (e) => {
    let file;

    if (e.target.files) {
      file = e.target.files;
      setInfo({ ...info, [e.target.name]: file });
    } else setInfo({ ...info, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    try {
      let formData = new FormData();
      console.log(info.image);
      formData.append('name', document.getElementById('name').value);
      formData.append('start_date', datetime);

      formData.append('end_date', datetime2);

      formData.append('user_id', document.getElementById('user_id').value);
      formData.append('state_id', document.getElementById('state_id').value);
      formData.append('location', document.getElementById('location').value);
      formData.append('zone', timezone);

      console.log(document.getElementById('name').value);
      console.log(info.image[0]);
      for (let i = 0; i < info.image.length; i++) {
        console.log(info.image[i]);
        formData.append('photos[]', info.image[i]);
      }
      // formData.append('photos[]', info.image);

      fetch(process.env.REACT_APP_URL + `admin/event`, {
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
              Add New Event
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
                errorMessages={['this field is required', 'Name is not valid']}
                value={info.name}
                placeholder="Name"
                onChange={setInputState}
              />

              <Grid container spacing={3}>
                <Grid item xs>
                  <TextValidator
                    helperText="Please specify the Location"
                    label="Location"
                    name="location"
                    id="location"
                    placeholder="Location"
                    validators={['required', 'isString']}
                    errorMessages={[
                      'this field is required',
                      'location is not valid'
                    ]}
                    value={info.location}
                    onChange={(e) => setInputState(e)}
                  />
                </Grid>
                <Grid item xs>
                  <TimezonePicker
                    onChange={
                      (time) => setTimezone(time)

                      // console.log('New Timezone Selected:', setTimezone(time))
                    }
                    required
                    value={timezone}
                    inputProps={{
                      placeholder: 'Select Timezone...',
                      name: 'zone',
                      id: 'zone'
                    }}
                  />
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
                  <label htmlFor="start_date">Start Date/Time</label>
                  <DatePicker
                    // selected={startDate}
                    onChange={(date) => {
                      console.log(date);
                      // setDatetime(date.toString().split(' GMT')[0]);
                      setDate1(date);
                      setDatetime(
                        date.toISOString().slice(0, 19).replace('T', ' ')
                      );
                      // setTimezone2(date.toString().split(' GMT')[1].split(' (')[0]);
                    }}
                    showTimeSelect
                    timeFormat="p"
                    timeIntervals={15}
                    required
                    dateFormat="Pp"
                    selected={date1}
                    inputProps={{
                      placeholder: 'Select Start Date and time',
                      name: 'start_date',
                      id: 'start_date'
                    }}
                  />
                </Grid>
              </Grid>
              <Grid container spacing={3}>
                <Grid item xs>
                  <label htmlFor="end_date">End Date/Time</label>
                  <DatePicker
                    // selected={startDate}
                    onChange={(date) => {
                      // setDatetime2(date.toString().split(' GMT')[0]);
                      setDate2(date);
                      setDatetime2(
                        date.toISOString().slice(0, 19).replace('T', ' ')
                      );
                      // setTimezone2(date.toString().split(' GMT')[1].split(' (')[0]);
                    }}
                    showTimeSelect
                    timeFormat="p"
                    timeIntervals={15}
                    required
                    dateFormat="Pp"
                    selected={date2}
                    inputProps={{
                      placeholder: 'Select End Date and time',
                      name: 'end_date',
                      id: 'end_date'
                    }}
                  />
                </Grid>
              </Grid>
              {/* {(console.log(datetime), console.log(timezone))} */}

              <Box mt={1}>
                <Box mt={1}>
                  <input
                    accept="image/*"
                    required
                    onChange={setInputState}
                    // style={{ display: 'none' }}
                    type="file"
                    id="image"
                    multiple
                    name="image"
                    multiple
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

// const mapStateToProps = (state) => {
//   console.log(state);
//   return {
//     user: state.SearchUser.user,
//   };
// };

const mapDispatchToProps = (dispatch) => {
  return {
    Search_Event: () => dispatch(Search_Event())
  };
};

export default connect(mapDispatchToProps)(Toolbar);
// export default Toolbar;
