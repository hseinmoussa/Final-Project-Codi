import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import moment from 'moment';
import { v4 as uuid } from 'uuid';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { ToastContainer, toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import Modal from '@material-ui/core/Modal';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

import {
  Avatar,
  Box,
  Card,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  makeStyles,
  Grid,
  FormControl,
  InputLabel,
  Select,
  Button,
  CircularProgress
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import getInitials from 'src/utils/getInitials';

import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {},
  root2: {
    display: 'flex',
    '& > * + *': {
      marginLeft: theme.spacing(2)
    }
  },
  root3: {
    margin: 'auto',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center'
  },
  avatar: {
    marginRight: theme.spacing(2)
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

const Results = ({ className, render, setRender, ...rest }) => {
  const classes = useStyles();
  const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);
  const [del, setDel] = useState(0);

  const [customers, setCustomers] = useState('1');

  const [open, setOpen] = useState(false);
  const [info, setInfo] = useState({});
  const [hobby, setHobby] = useState([]);
  const [user, setUser] = useState([]);
  const [state, setState] = useState([]);

  const navigate = useNavigate();

  const tokenAdmin = window.localStorage.getItem('tokenAdmin');

  const handleOpen = () => {
    setOpen(!open);
  };

  const setInputState = (e) => {
    setInfo({ ...info, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e, id) => {
    e.preventDefault();

    try {
      let formData = new FormData();
      console.log(info);

      formData.append('hobby_id', info.hobby_id);
      formData.append('user_id', info.user_id);
      formData.append('state_id', info.state_id);
      formData.append('address', info.address);
      formData.append('level_id', info.level_id);

      formData.append('fees_per_hour', info.fees_per_hour);

      if (info.rating && info.rating != undefined && info.rating != '') {
        formData.append('rating', info.rating);
      }
      if (
        info.is_freelancer &&
        info.is_freelancer != undefined &&
        info.is_freelancer != ''
      ) {
        formData.append('is_freelancer', info.is_freelancer);
      }
      if (
        info.fees_per_hour &&
        info.fees_per_hour != undefined &&
        info.fees_per_hour != ''
      ) {
        formData.append('fees_per_hour', info.fees_per_hour);
      }

      if (info.about && info.about != undefined && info.about != '') {
        formData.append('about', info.about);
      }

      formData.append('_method', 'put');

      fetch(process.env.REACT_APP_URL + `admin/user_hobby/${info.id}`, {
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
            console.log(res);
            var msg;
            res.error &&
              res.error.message &&
              (Object.keys(res.error.message)[0] == 0
                ? (msg = res.error.message)
                : (msg =
                    res.error.message[Object.keys(res.error.message)[0]][0]),
              toast.error(msg, {
                position: 'top-center',
                autoClose: 1000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                // onClose: () => (window.location.href = "/cart"),
                draggable: true,
                progress: undefined
              }));
            // alert(res.error.message[Object.keys(res.error.message)][0]);
          }
        });
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    try {
      fetch(
        process.env.REACT_APP_URL +
          `admin/users_hobbies/${limit}?page=${page + 1}`,
        {
          method: 'get',
          headers: {
            Accept: 'application/json',
            Authorization: 'Bearer ' + tokenAdmin
          }
        }
      )
        .then((response) => response.json())
        .then((res) => {
          if (res.status == 200) {
            console.log(res.data);
            setCustomers(res.data.data);
            setTotal(res.data.total);
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
    } catch (e) {}
  }, [limit, page, del, render]);

  useEffect(() => {
    try {
      fetch(process.env.REACT_APP_URL + `admin/users_hobbies/${limit}?page=1`, {
        method: 'get',
        headers: {
          Accept: 'application/json',
          Authorization: 'Bearer ' + tokenAdmin
        }
      })
        .then((response) => response.json())
        .then((res) => {
          if (res.status == 200) {
            console.log(res.data);
            setCustomers(res.data.data);
            setTotal(res.data.total);
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
    } catch (e) {}
  }, []);

  useEffect(() => {
    try {
      fetch(process.env.REACT_APP_URL + `admin/hobbies/10000`, {
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
      fetch(process.env.REACT_APP_URL + `admin/states/100000`, {
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
          <option value={state.data[i].id}>{state.data[i].name}</option>
        );
      }
    }

  useEffect(() => {
    try {
      fetch(process.env.REACT_APP_URL + `admin/users/10000`, {
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

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleDeleteOne = (e, id) => {
    e.preventDefault();
    if (window.confirm('Are you sure you want to delete it?'))
      try {
        fetch(process.env.REACT_APP_URL + `admin/user_hobby/${id}`, {
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

  const handleEdit = (e, id, customer) => {
    console.log(customer);
    setInfo({
      ['id']: id,
      ['user_id']: customer.user_id,
      ['hobby_id']: customer.hobby_id,
      ['level_id']: customer.level_id,
      ['fees_per_hour']: customer.fees_per_hour,
      ['about']: customer.about,
      ['state_id']: customer.state_id,
      ['address']: customer.address,
      ['rating']: customer.rating,
      ['is_freelancer']: customer.is_freelancer
    });

    setOpen(!open);
  };

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
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
        <div
          className={classes.paper}
          style={{ maxWidth: '95vw', minWidth: '35vw' }}
        >
          <h2
            id="simple-modal-title"
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            Edit Item
          </h2>
          {!info.id ? (
            <div className={classes.root2}>
              <CircularProgress />
            </div>
          ) : (
            <ValidatorForm
              // ref="form"
              onSubmit={handleSubmit}
              onError={(errors) => console.log(errors)}
            >
              <Grid container spacing={3}>
                <Grid item>
                  <FormControl>
                    <InputLabel htmlFor="hobby_id">Hobby</InputLabel>
                    <Select
                      required
                      native
                      value={info.hobby_id}
                      onChange={setInputState}
                      inputProps={{
                        name: 'hobby_id',
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
                  <FormControl>
                    <InputLabel htmlFor="is_freelancer">Freelancer?</InputLabel>
                    <Select
                      required
                      native
                      placeholder="is freelancer ? (Default no)"
                      value={info.is_freelancer}
                      onChange={setInputState}
                      inputProps={{
                        name: 'is_freelancer',
                        id: 'is_freelancer'
                      }}
                    >
                      <option aria-label="None" value="" />
                      <option aria-label="None" value="0">
                        No
                      </option>
                      <option aria-label="None" value="1">
                        Yes
                      </option>
                    </Select>
                  </FormControl>
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
                    Edit User Hobby
                  </Button>
                </Box>
              </Box>
            </ValidatorForm>
          )}
        </div>
      </Modal>

      <PerfectScrollbar>
        <Box>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox"></TableCell>
                <TableCell>Hobby</TableCell>
                <TableCell>User</TableCell>
                <TableCell>State</TableCell>
                <TableCell>Fees Per Hour</TableCell>
                <TableCell>About</TableCell>
                <TableCell>Address</TableCell>
                <TableCell>Level</TableCell>
                <TableCell>Rating</TableCell>
                <TableCell>Is Freelancer?</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {customers == '1' ? (
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
                customers.slice(0, limit).map((customer, index) => {
                  return (
                    <TableRow
                      hover
                      key={customer.id ? customer.id : index}
                      selected={selectedCustomerIds.indexOf(customer.id) !== -1}
                    >
                      <TableCell padding="checkbox">
                        {customer.id && (
                          <DeleteIcon
                            // checked={
                            //   selectedCustomerIds.indexOf(customer.id) !== -1
                            // }
                            onClick={(event) =>
                              handleDeleteOne(event, customer.id)
                            }
                            // value="true"
                          />
                        )}
                        {/* <Box alignItems="center" display="flex">
                          {customer.name && (
                            <Typography color="textPrimary" variant="body1">
                              {customer.name}
                            </Typography>
                          )}
                        </Box> */}
                      </TableCell>

                      {/* <TableCell>
                        <Box alignItems="center" display="flex">
                          {customer.name && (
                            <Typography color="textPrimary" variant="body1">
                              {customer.name}
                            </Typography>
                          )}
                        </Box>
                      </TableCell> */}

                      {customer.hobby.name && (
                        <TableCell>{customer.hobby.name}</TableCell>
                      )}

                      {customer.user.name && (
                        <TableCell>{customer.user.name}</TableCell>
                      )}

                      {customer.state.name && (
                        <TableCell>{customer.state.name}</TableCell>
                      )}

                      {customer.fees_per_hour ? (
                        <TableCell>{customer.fees_per_hour} $</TableCell>
                      ) : (
                        <TableCell>Free</TableCell>
                      )}

                      {customer.about ? (
                        <TableCell>{customer.about} </TableCell>
                      ) : (
                        <TableCell>Empty</TableCell>
                      )}

                      {customer.address && (
                        <TableCell>{customer.address}</TableCell>
                      )}

                      {customer.level_id && (
                        <TableCell>{customer.level_id}</TableCell>
                      )}

                      {customer.rating ? (
                        <TableCell>{customer.rating}</TableCell>
                      ) : (
                        <TableCell>No Rating</TableCell>
                      )}

                      {customer.is_freelancer ? (
                        <TableCell>Yes</TableCell>
                      ) : (
                        <TableCell>No </TableCell>
                      )}

                      {customer.id && (
                        <TableCell padding="checkbox">
                          <EditIcon
                            onClick={(event) =>
                              handleEdit(event, customer.id, customer)
                            }
                          />
                        </TableCell>
                      )}
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={total}
        onChangePage={handlePageChange}
        onChangeRowsPerPage={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[1, 10, 25]}
      />
    </Card>
  );
};

Results.propTypes = {
  className: PropTypes.string
};

export default Results;
