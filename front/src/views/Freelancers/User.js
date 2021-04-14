import React from 'react';
import classNames from 'classnames';
import { Link, useNavigate } from 'react-router-dom';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { moment } from 'moment';
import RoomTwoToneIcon from '@material-ui/icons/RoomTwoTone';
import PropTypes from 'prop-types';
import {
  Grid,
  Card,
  Box,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Zoom,
  ButtonBase
} from '@material-ui/core';
import MainLayout from 'src/layouts/MainLayout';
import { ToastContainer, toast } from 'react-toastify';
import Rating from '@material-ui/lab/Rating';
import Footer from 'src/components/Footer/Footer';

import Bounce from 'react-reveal/Bounce';
import Flip from 'react-reveal/Flip';
import Zom from 'react-reveal/Zoom';
import { useParams } from 'react-router-dom';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import FaceIcon from '@material-ui/icons/Face';
import PhoneIcon from '@material-ui/icons/Phone';
import EmailIcon from '@material-ui/icons/Email';
import FavoriteIcon from '@material-ui/icons/Favorite';

const useStyles = makeStyles((theme) => ({
  root: {},

  carousel: {
    height: '85vh'
  },
  HeroCarousel: {},
  CarouselContainer: {
    ['@media (max-width:780px)']: {
      display: 'none'
    }
  },

  HeroCarouselText: {
    ['@media (min-width:780px)']: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      color: 'white',
      fontSize: '2rem'
    },
    ['@media (max-width:780px)']: {
      margin: 'auto',
      color: 'black',
      fontSize: '1.5rem'
    },

    fontFamily: 'New Century Schoolbook, TeX Gyre Schola, serif',
    fontWeight: 'bolder',

    margin: 'auto',
    textAlign: 'center'
  },
  blackBox: {
    ['@media (min-width:780px)']: {
      width: '100vw',
      height: '40vh'
    },
    ['@media (max-width:780px)']: {
      width: '100vw',
      height: '40vh'
    },

    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    position: 'absolute',
    top: 0
  },
  smallImage: {
    position: 'absolute',
    top: '40vh',
    left: '10vw'
  },
  moreDetailsSection: {
    ['@media (min-width:780px)']: {
      width: '75%'
    },
    ['@media (max-width:780px)']: {
      width: '95%'
    },
    textAlign: 'center'
  },
  moreDetailsTitle: {
    ['@media (min-width:780px)']: {
      fontSize: '50px',
      fontWeight: '700'
    },
    ['@media (max-width:780px)']: {
      fontSize: '30px',
      fontWeight: '700'
    },
    lineHeight: '1.2',
    fontFamily: 'Barlow Condensed, Arial, sans-serif',
    color: '#daa520'
  },
  description: {
    ['@media (min-width:780px)']: {
      width: '75%'
    }
  }
}));

const StyledRating = withStyles({
  iconFilled: {
    color: '#daa520'
  },
  iconHover: {
    color: '#ff3d47'
  }
})(Rating);
export default function User(props) {
  const classes = useStyles();
  const [state, setState] = React.useState({
    raised: false,
    shadow: 1
  });

  const { id } = useParams();

  const [userHobby, setUserHobby] = React.useState([]);

  React.useEffect(() => {
    try {
      fetch(process.env.REACT_APP_URL + `user_hobby/${id}`, {
        method: 'get'
      })
        .then((response) => response.json())
        .then((res) => {
          if (res.status == 200) {
            console.log(res);
            setUserHobby(res.data);
          } else {
            // alert(res.error.message[Object.keys(res.error.message)][0]);
          }
        });
    } catch (e) {}
  }, []);

  const styles = {
    root: {
      ['@media (min-width:780px)']: {
        position: 'relative',
        textAlign: 'center',
        marginTop: '10vh',
        height: '40vh'
      },
      ['@media (max-width:780px)']: {
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'center',

        height: '40vh',
        margin: 'auto',
        marginTop: '5vh',
        backgroundSize: 'cover'
      },

      width: '100vw',
      backgroundImage: (props) =>
        `url(${process.env.REACT_APP_URL2 + props.image})`,
      backgroundPosition: 'center',
      backgroundSize: '100vw 100vh',

      backgroundRepeat: 'no-repeat',
      backgroundAttachment: 'fixed'
    }
  };

  function MyImageRaw(props) {
    const { classes, ...other } = props;
    return <div className={classes.root} {...other} />;
  }

  MyImageRaw.propTypes = {
    classes: PropTypes.object.isRequired,
    color: PropTypes.string.isRequired
  };

  const MyImage = withStyles(styles)(MyImageRaw);

  return (
    <div style={{ height: '100vh' }}>
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
      <MainLayout />

      {/* <div className={classes.HeroCarousel}> */}
      <MyImage image={userHobby.image}>
        {/* {userHobby && userHobby.image && (
          <img
            style={{ width: '100vw', backgroundAttachment: 'fixed' }}
            className={classes.carousel}
            src={process.env.REACT_APP_URL2 + userHobby.image}
          />
        )} */}
        {/* className={classNames(classes.main, classes.mainRaised)}> */}

        <div className={classes.HeroCarouselText}>
          <h1>
            {/* {moment(event.start_date).format('DD/MM/YYYY')} */}

            <span style={{ textTransform: 'capitalize' }}>
              {userHobby && userHobby.user_name}
            </span>
          </h1>
          {userHobby && userHobby.user_hobby_name}
          <div>
            {userHobby && userHobby.fees_per_hour}{' '}
            <span style={{ color: '#daa520' }}>$/hour</span>
          </div>
        </div>
        <div className={classes.blackBox}></div>
      </MyImage>

      {userHobby.image && (
        <div className={classes.smallImage}>
          <img
            src={process.env.REACT_APP_URL2 + userHobby.image}
            alt="Avatar"
            width="25%"
            style={{ borderRadius: '50%' }}
          />
          <br></br>
        </div>
      )}

      {/* </div> */}

      <Box display="flex">
        <Box m="auto" mt={3} mb={3} style={{ textAlign: 'center' }}>
          <Box
            m="auto"
            component="fieldset"
            mb={3}
            borderColor="transparent"
            style={{ textAlign: 'center' }}
          >
            <h1>
              {/* {moment(event.start_date).format('DD/MM/YYYY')} */}

              <span style={{ textTransform: 'capitalize' }}>
                {userHobby && userHobby.user_name}
              </span>
            </h1>
          </Box>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} lg={12} style={{ textAlign: 'center' }}>
              <h6>
                <RoomTwoToneIcon style={{ color: '#daa520' }} />
                {userHobby &&
                  userHobby.state &&
                  userHobby.state.country &&
                  userHobby.state.country.name}
                {', '}
                {userHobby && userHobby.state && userHobby.state.name}
              </h6>
            </Grid>
          </Grid>
        </Box>
      </Box>

      <Box display="flex">
        <Box mt={5} mb={3}></Box>
      </Box>
      <Grid container>
        <Grid item xs={12} sm={12} lg={4} style={{ textAlign: 'center' }}>
          <Box display="flex">
            <Box m="auto" mb={3} style={{ textAlign: 'center' }}>
              <EmailIcon
                style={{
                  color: '#daa520'
                }}
              />
              {userHobby && userHobby.email && (
                <a
                  style={{ textDecoration: 'none', color: '#2f4f4f' }}
                  href={'mailto:' + userHobby.email}
                >
                  {userHobby.email}
                </a>
              )}
            </Box>
          </Box>
          <Box display="flex">
            <Box m="auto" mb={3} style={{ textAlign: 'center' }}>
              <PhoneIcon style={{ color: '#daa520' }} />
              {userHobby && userHobby.phone && (
                <a
                  style={{ textDecoration: 'none', color: '#2f4f4f' }}
                  href={'tel:' + userHobby.phone}
                >
                  {userHobby.phone}
                </a>
              )}
            </Box>
          </Box>

          <Box display="flex">
            <Box m="auto" mb={3} style={{ textAlign: 'center' }}>
              <StyledRating
                name="customized-color"
                defaultValue={2}
                readOnly
                getLabelText={(value) =>
                  `${value} Heart${value !== 1 ? 's' : ''}`
                }
                precision={0.5}
                icon={<FavoriteIcon fontSize="inherit" />}
              />
            </Box>
          </Box>

          <Box display="flex">
            <Box m="auto" mb={3} style={{ textAlign: 'center' }}>
              <span style={{ color: '#daa520' }}>
                <b>{userHobby && userHobby.fees_per_hour} </b>
              </span>
              <span style={{ textDecoration: 'none', color: '#2f4f4f' }}>
                {' '}
                $/hour
              </span>
            </Box>
          </Box>
        </Grid>

        <Grid
          item
          xs={12}
          sm={12}
          lg={8}
          style={{ textAlign: 'center' }}
          className={classes.moreDetailsSection}
        >
          <h2 className={classes.moreDetailsTitle}>More Details</h2>
          <Card
            style={{
              textAlign: 'center',
              height: 'auto',
              width: '100%',
              marginTop: '2%'
            }}
          >
            <CardContent>
              <Box display="flex">
                <Box
                  display="flex"
                  m="auto"
                  mt={3}
                  mb={3}
                  className={classes.description}
                >
                  <p
                    style={{
                      color: '#666666',
                      fontSize: '16px',
                      marginBottom: '30px',
                      lineHeight: '3em'
                    }}
                  >
                    {userHobby && userHobby.about}
                  </p>
                </Box>
              </Box>

              {/* <Box display="flex">
                <Box m="auto" mt={3} mb={3} style={{ textAlign: 'center' }}> */}

              <Grid container style={{ margin: 'auto' }}>
                <Grid
                  item
                  xs={12}
                  sm={12}
                  lg={6}
                  style={{ textAlign: 'center' }}
                >
                  <EmailIcon
                    style={{
                      color: '#daa520'
                    }}
                  />
                  {userHobby && userHobby.email && (
                    <a
                      style={{ textDecoration: 'none', color: '#2f4f4f' }}
                      href={'mailto:' + userHobby.email}
                    >
                      {userHobby && userHobby.email}
                    </a>
                  )}
                </Grid>
                {/* </Box> */}
                <Grid
                  item
                  xs={12}
                  sm={12}
                  lg={6}
                  style={{ textAlign: 'center' }}
                >
                  {/* <Box m="auto" mt={3} mb={3} style={{ textAlign: 'center' }}> */}
                  <PhoneIcon style={{ color: '#daa520' }} />
                  {userHobby && userHobby.phone && (
                    <a
                      style={{ textDecoration: 'none', color: '#2f4f4f' }}
                      href={'tel:' + userHobby.phone}
                    >
                      {userHobby && userHobby.phone}
                    </a>
                  )}
                </Grid>
                {/* </Box> */}
              </Grid>
              {/* </Box> */}
              <Box display="flex">
                <Box m="auto" mt={3} mb={3} style={{ textAlign: 'center' }}>
                  <FaceIcon style={{ color: '#daa520' }} />
                  {userHobby && userHobby.gender}
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <hr style={{ width: '75vw', margin: '5% auto 2% auto' }}></hr>

      <Footer />
    </div>
  );
}
