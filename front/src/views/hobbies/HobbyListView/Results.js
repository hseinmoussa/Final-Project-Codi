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

import { useNavigate } from 'react-router-dom';

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

  const navigate = useNavigate();

  const tokenAdmin = window.localStorage.getItem('tokenAdmin');

  const search = useSelector((state) => {
    return state.SearchHobby.hobby;
  });

  const [open, setOpen] = useState(false);
  const [info, setInfo] = useState({});

  const handleOpen = () => {
    setOpen(!open);
  };

  const setInputState = (e) => {
    let file;

    if (e.target.files) {
      file = e.target.files[0];
      setInfo({ ...info, [e.target.name]: file });
    } else setInfo({ ...info, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e, id) => {
    e.preventDefault();

    try {
      let formData = new FormData();

      formData.append('name', info.name);
      formData.append('image', info.image);

      formData.append('_method', 'put');

      fetch(process.env.REACT_APP_URL + `admin/hobby/${info.id}`, {
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
      fetch(
        process.env.REACT_APP_URL +
          `admin/hobbies/${limit}?page=${page + 1}&name=${search}`,
        {
          method: 'get',
          // body: formData,
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
      console.log(search);

      fetch(
        process.env.REACT_APP_URL +
          `admin/hobbies/${limit}?page=1&name=${search}`,
        {
          method: 'get',
          // body: formData,
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
  }, [search]);

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    console.log(newPage);
    setPage(newPage);
  };

  const handleDeleteOne = (e, id) => {
    e.preventDefault();
    if (window.confirm('Are you sure you want to delete it?'))
      try {
        fetch(process.env.REACT_APP_URL + `admin/hobby/${id}`, {
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
              console.log(res.data);
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
              console.log(res);
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
      ['name']: customer.name,
      ['image']: customer.image
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
            Edit Admin
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

              <Box mt={1}>
                <Box mt={1}>
                  <input
                    accept="image/*"
                    type="file"
                    name="image"
                    // value={info.image}
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
                    Edit Hobby
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
                <TableCell>Name</TableCell>
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
                      </TableCell>

                      <TableCell>
                        <Box alignItems="center" display="flex">
                          {customer.image && (
                            <Avatar
                              className={classes.avatar}
                              src={process.env.REACT_APP_URL2 + customer.image}
                            >
                              {getInitials(
                                process.env.REACT_APP_URL2 + customer.image
                              )}
                            </Avatar>
                          )}
                          {customer.name && (
                            <Typography color="textPrimary" variant="body1">
                              {customer.name}
                            </Typography>
                          )}
                        </Box>
                      </TableCell>

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