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

const Results = ({ className, render, setRender, Hobby, State, ...rest }) => {
  const classes = useStyles();
  const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);
  const [del, setDel] = useState(0);

  const [customers, setCustomers] = useState('1');

  const [open, setOpen] = useState(false);
  const [info, setInfo] = useState({});

  const navigate = useNavigate();

  const tokenUser = window.localStorage.getItem('tokenUser');

  const [freelancer, setFreelancer] = useState(false);

  const handleChangeFreelancer = (e) => {
    console.log(e.target.checked);
    setFreelancer(e.target.checked);
  };

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

      formData.append('hobby_id', info.hobby_id);
      formData.append('state_id', info.state_id);
      formData.append('address', info.address);
      formData.append('level_id', info.level_id);

      if (freelancer) {
        formData.append('is_freelancer', 1);
      } else {
        formData.append('is_freelancer', 0);
      }
      if (freelancer)
        if (
          document.getElementById('fees_per_hour').value &&
          document.getElementById('fees_per_hour').value != undefined &&
          document.getElementById('fees_per_hour').value != ''
        ) {
          formData.append(
            'fees_per_hour',
            document.getElementById('fees_per_hour').value
          );
        }

      if (info.about && info.about != undefined && info.about != '') {
        formData.append('about', info.about);
      }

      formData.append('_method', 'put');

      fetch(process.env.REACT_APP_URL + `user/user_hobby/${info.id}`, {
        method: 'post',
        body: formData,
        headers: {
          Accept: 'application/json',
          Authorization: 'Bearer ' + tokenUser
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
            window.localStorage.removeItem('tokenUser');
            window.localStorage.removeItem('User');
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
          `user/users_hobbies/${limit}?page=${page + 1}`,
        {
          method: 'get',
          headers: {
            Accept: 'application/json',
            Authorization: 'Bearer ' + tokenUser
          }
        }
      )
        .then((response) => response.json())
        .then((res) => {
          if (res.status == 200) {
            setCustomers(res.data.data);
            setTotal(res.data.total);
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
      fetch(process.env.REACT_APP_URL + `user/users_hobbies/${limit}?page=1`, {
        method: 'get',
        headers: {
          Accept: 'application/json',
          Authorization: 'Bearer ' + tokenUser
        }
      })
        .then((response) => response.json())
        .then((res) => {
          if (res.status == 200) {
            setCustomers(res.data.data);
            setTotal(res.data.total);
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
        fetch(process.env.REACT_APP_URL + `user/user_hobby/${id}`, {
          method: 'delete',
          // body: formData,
          headers: {
            Accept: 'application/json',
            Authorization: 'Bearer ' + tokenUser
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
              window.localStorage.removeItem('tokenUser');
              window.localStorage.removeItem('User');
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
    setInfo({
      ['id']: id,
      ['hobby_id']: customer.hobby_id,
      ['level_id']: customer.level_id,
      ['fees_per_hour']: customer.fees_per_hour,
      ['about']: customer.about,
      ['state_id']: customer.state_id,
      ['address']: customer.address
    });
    if (customer.is_freelancer == 1) setFreelancer(true);
    if (customer.is_freelancer == 0) setFreelancer(false);

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
                    <InputLabel htmlFor="gender">Hobby</InputLabel>
                    <Select
                      required
                      native
                      value={info.hobby_id}
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
                  <InputLabel htmlFor="is_freelancer">
                    Check It if you want to Teach It
                  </InputLabel>
                  <Checkbox
                    checked={freelancer ? true : false}
                    onChange={handleChangeFreelancer}
                    name="is_freelancer"
                    id="is_freelancer"
                    placeholder="is freelancer ? (Default no)"
                    inputProps={{ 'aria-label': 'primary checkbox' }}
                  />
                  {/* <InputLabel htmlFor="is_freelancer">Level</InputLabel>
                <Select
                  required
                  native
                  value={info.level_id}
                  onChange={setInputState}
                  value={info.is_freelancer}
                  placeholder="is freelancer ? (Default no)"
                  inputProps={{
                    name: 'is_freelancer',
                    id: 'is_freelancer'
                  }}
                >
                  <option value="0">No</option>
                  <option value="1">Yes</option>
                </Select> */}
                </Grid>
              </Grid>
              <Grid container spacing={3}>
                {freelancer ? (
                  <Grid item xs>
                    <TextValidator
                      helperText="Please specify the Fees per hour (Optional)"
                      label="fees per hour (in USD)"
                      name="fees_per_hour"
                      id="fees_per_hour"
                      placeholder="Fees Per Hour (Optional)"
                      validators={['isNumber']}
                      errorMessages={['fees is not valid']}
                      value={info.fees_per_hour}
                      onChange={(e) => setInputState(e)}
                    />
                  </Grid>
                ) : (
                  ''
                )}
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
                    Edit
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
                <TableCell>State</TableCell>
                <TableCell>Fees Per Hour</TableCell>
                <TableCell>About</TableCell>
                <TableCell>Address</TableCell>
                <TableCell>Level</TableCell>
                <TableCell>Teacher?</TableCell>
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

                      {customer.state.name && (
                        <TableCell>{customer.state.name}</TableCell>
                      )}
                      {console.log(customer.fees_per_hour)}
                      {customer.fees_per_hour &&
                      customer.fees_per_hour != null ? (
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
