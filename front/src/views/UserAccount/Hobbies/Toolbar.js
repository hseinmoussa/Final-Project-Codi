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
  Grid,
  Checkbox
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

const Toolbar = ({ className, setRender, render, Hobby, State, ...rest }) => {
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const [info, setInfo] = useState({});

  const [freelancer, setFreelancer] = useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };
  const navigate = useNavigate();

  const tokenUser = window.localStorage.getItem('tokenUser');

  const setInputState = (e) => {
    let file;

    if (e.target.files) {
      file = e.target.files[0];
      setInfo({ ...info, [e.target.name]: file });
    } else setInfo({ ...info, [e.target.name]: e.target.value });
  };

  const handleChangeFreelancer = (e) => {
    console.log(e.target.checked);
    setFreelancer(e.target.checked);
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    try {
      let formData = new FormData();
      formData.append('hobby_id', document.getElementById('hobby_id').value);
      formData.append('state_id', document.getElementById('state_id').value);
      formData.append('address', document.getElementById('address').value);
      formData.append('level_id', document.getElementById('level_id').value);

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

      if (
        document.getElementById('about').value &&
        document.getElementById('about').value != undefined &&
        document.getElementById('about').value != ''
      ) {
        formData.append('about', document.getElementById('about').value);
      }

      fetch(process.env.REACT_APP_URL + `user/user_hobby`, {
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

            if (res.error && res.error.message) {
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
            }

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
          Add new Hobby
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
              Add New Hobby
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
                    Add New Hobby
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
