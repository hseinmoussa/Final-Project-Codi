import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Avatar,
  Box,
  Divider,
  Typography,
  Chip,
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
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import moment from 'moment';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Modal from '@material-ui/core/Modal';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import TimezonePicker from 'react-timezone';
import DatePicker from 'react-datepicker';

import { useNavigate } from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';
import { useSelector } from 'react-redux';
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column'
  },
  statsItem: {
    alignItems: 'center'
  },
  statsIcon: {
    margin: 'auto'
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

const ProductCard = ({
  className,
  event,
  setDel,
  del,
  User,
  State,
  setRender,
  render,
  ...rest
}) => {
  const classes = useStyles();

  const [info, setInfo] = useState(event);

  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  const tokenAdmin = window.localStorage.getItem('tokenAdmin');

  useEffect(() => {
    setInfo(event);
  }, [event]);

  const handleOpen = () => {
    setOpen(!open);
  };

  const setInputState = (e) => {
    let file;

    if (e.target.files) {
      file = e.target.files;
      setInfo({ ...info, [e.target.name]: file });
    } else setInfo({ ...info, [e.target.name]: e.target.value });
  };

  const search = useSelector((state) => {
    return state.SearchEvent.event;
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    try {
      let formData = new FormData();

      formData.append('name', document.getElementById('name').value);
      formData.append('start_date', info.start_date);

      formData.append('end_date', info.end_date);

      formData.append('user_id', document.getElementById('user_id').value);
      formData.append('state_id', document.getElementById('state_id').value);
      formData.append('location', document.getElementById('location').value);
      formData.append(
        'description',
        document.getElementById('description').value
      );

      formData.append('zone', info.zone);

      if (info.image)
        for (let i = 0; i < info.image.length; i++) {
          console.log(1);
          formData.append('photos[]', info.image[i]);
        }
      // formData.append('photos[]', info.image);

      formData.append('_method', 'put');

      fetch(process.env.REACT_APP_URL + `admin/event/${info.id}`, {
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
            toast.info('Eddited Successfully', {
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

  const deleteItem = (e, id) => {
    e.preventDefault();
    if (window.confirm('Are you sure you want to delete it?'))
      try {
        fetch(process.env.REACT_APP_URL + `admin/event/${id}`, {
          method: 'delete',
          // body: formData,
          headers: {
            Accept: 'application/json',
            Authorization: 'Bearer ' + tokenAdmin
          }
        })
          .then((response) => response.json())
          .then((res) => {
            if (res.status == 200) {
              toast.info('Deleted Successfully', {
                position: 'top-center',
                autoClose: 1000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                // onClose: () => (window.location.href = "/cart"),
                draggable: true,
                progress: undefined
              });
              setDel(del + 1);
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
              return toast.info(
                "Couldn't delete item, Please try again later",
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
  const deleteImage = (e, id) => {
    e.preventDefault();
    if (window.confirm('Are you sure you want to delete it?'))
      try {
        fetch(process.env.REACT_APP_URL + `admin/image/${id}`, {
          method: 'delete',
          // body: formData,
          headers: {
            Accept: 'application/json',
            Authorization: 'Bearer ' + tokenAdmin
          }
        })
          .then((response) => response.json())
          .then((res) => {
            if (res.status == 200) {
              toast.info('Deleted Successfully', {
                position: 'top-center',
                autoClose: 1000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                // onClose: () => (window.location.href = "/cart"),
                draggable: true,
                progress: undefined
              });
              setDel(del + 1);
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
              return toast.info(
                "Couldn't delete item, Please try again later",
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
    <Card className={clsx(classes.root, className)} {...rest}>
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
            Edit Event
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
                    (time) =>
                      setInfo({
                        ...info,
                        zone: time
                      })
                    // console.log('New Timezone Selected:', setTimezone(time))
                  }
                  required
                  value={info.zone}
                  inputProps={{
                    placeholder: 'Select Timezone...',
                    name: 'zone',
                    id: 'zone'
                  }}
                />
              </Grid>
            </Grid>

            <Grid container spacing={3}>
              <Grid item xs>
                <TextValidator
                  helperText="Please specify the Description"
                  label="Description"
                  name="description"
                  id="description"
                  placeholder="Description"
                  validators={['required', 'isString']}
                  errorMessages={[
                    'this field is required',
                    'description is not valid'
                  ]}
                  value={info.description}
                  onChange={(e) => setInputState(e)}
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
                    value={info.user_id}
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
                <label htmlFor="start_date">Start Date/Time </label>
                <DatePicker
                  // selected={startDate}
                  onChange={(date) => {
                    // setDatetime(date.toString().split(' GMT')[0]);
                    // setDate1(date);
                    setInfo({
                      ...info,
                      start_date: date
                        .toISOString()
                        .slice(0, 19)
                        .replace('T', ' ')
                    });
                    // setTimezone2(date.toString().split(' GMT')[1].split(' (')[0]);
                  }}
                  showTimeSelect
                  timeFormat="p"
                  timeIntervals={15}
                  required
                  dateFormat="Pp"
                  selected={
                    new Date(
                      Date.UTC(
                        info.start_date.split(/[- :]/)[0],
                        info.start_date.split(/[- :]/)[1] - 1,
                        info.start_date.split(/[- :]/)[2],
                        info.start_date.split(/[- :]/)[3],
                        info.start_date.split(/[- :]/)[4],
                        info.start_date.split(/[- :]/)[5]
                      )
                    )
                  }
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
                <label htmlFor="end_date">End Date/Time </label>
                <DatePicker
                  // selected={startDate}
                  onChange={(date) => {
                    // setDatetime2(date.toString().split(' GMT')[0]);
                    // setDate2(date);
                    setInfo({
                      ...info,
                      end_date: date
                        .toISOString()
                        .slice(0, 19)
                        .replace('T', ' ')
                    });

                    // setTimezone2(date.toString().split(' GMT')[1].split(' (')[0]);
                  }}
                  showTimeSelect
                  timeFormat="p"
                  timeIntervals={15}
                  required
                  dateFormat="Pp"
                  selected={
                    new Date(
                      Date.UTC(
                        info.end_date.split(/[- :]/)[0],
                        info.end_date.split(/[- :]/)[1] - 1,
                        info.end_date.split(/[- :]/)[2],
                        info.end_date.split(/[- :]/)[3],
                        info.end_date.split(/[- :]/)[4],
                        info.end_date.split(/[- :]/)[5]
                      )
                    )
                  }
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
                <label htmlFor="icon-button-file">
                  Add more image (optional){' '}
                </label>
                <input
                  accept="image/*"
                  onChange={setInputState}
                  // style={{ display: 'none' }}
                  type="file"
                  id="image"
                  multiple
                  name="image"
                  multiple
                />
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
                  Edit Event
                </Button>
              </Box>
            </Box>
          </ValidatorForm>
        </div>
      </Modal>
      {/* images: Array [ {…}, {…} ] */}
      ​​​{' '}
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
      <CardContent>
        <Box display="flex" justifyContent="center" mb={3}>
          {/* <Avatar
            alt="event"
            src={event.media}
            variant="square"
          /> */}

          <Grid container spacing={3}>
            {event.images.map((image) => (
              <Grid item xs>
                <Chip
                  // style={{ height: '5vh', marginRight: '1%' }}
                  avatar={
                    <Avatar
                      alt="Natacha"
                      src={process.env.REACT_APP_URL2 + image.image}
                      // variant="square"
                      style={{ height: '100%', width: '50%' }}
                    />
                  }
                  onDelete={(e) => deleteImage(e, image.id)}
                />
              </Grid>
              // <Grid item key={event.id} lg={4} md={6} xs={12}>
              //   <ProductCard className={classes.productCard} event={event} />
              // </Grid>
            ))}
          </Grid>
        </Box>
        <Typography
          align="center"
          color="textPrimary"
          gutterBottom
          variant="h4"
        >
          {event.name}
        </Typography>
        <Typography align="center" color="textPrimary" variant="body1">
          <strong>From: </strong>
          {/* <i> {moment(event.start_date).format('DD/MM/YYYY')}</i> */}
          <i> {event.start_date}</i>

          <br></br>
          <strong>To: </strong>
          {/* <i> {moment(event.end_date).format('DD/MM/YYYY')}</i> */}
          <i> {event.end_date}</i>
        </Typography>
        <Typography align="center" color="textPrimary" variant="body1">
          {/* Zone:{event.zone} */}
          <b>Coordinated Universal Time (UTC)</b>
        </Typography>

        <Typography align="center" color="textPrimary" variant="body1">
          <strong>Created By: </strong>

          {event.user && event.user.name}
          <br></br>
          <i>({event.user && event.user.email})</i>
        </Typography>
        <Typography align="center" color="textPrimary" variant="body1">
          <strong>state: </strong>
          {event.state.name}
        </Typography>
        <Typography align="center" color="textPrimary" variant="body1">
          <strong>Location: </strong>
          {event.location}
        </Typography>
        <Typography align="center" color="textPrimary" variant="body1">
          <strong>Description: </strong>
          {event.description}
        </Typography>
      </CardContent>
      <Box flexGrow={1} />
      <Divider />
      <Box p={2}>
        <Box display="flex">
          <Box m="auto" mt={1}>
            <DeleteIcon
              color="action"
              onClick={(e) => deleteItem(e, event.id)}
            />
          </Box>
          <Box m="auto" mt={1}>
            <EditIcon color="action" onClick={(e) => handleOpen(e, event.id)} />
          </Box>
        </Box>
      </Box>
    </Card>
  );
};

ProductCard.propTypes = {
  className: PropTypes.string,
  event: PropTypes.object.isRequired
};

export default ProductCard;
