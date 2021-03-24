import React from 'react';
import classNames from 'classnames';
import { Link, useNavigate } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import img1 from './Hobbies.jpg';
import { moment } from 'moment';
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

import Footer from 'src/components/Footer/Footer';

import Bounce from 'react-reveal/Bounce';
import Flip from 'react-reveal/Flip';
import Zom from 'react-reveal/Zoom';
import { useParams } from 'react-router-dom';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import TimerIcon from '@material-ui/icons/Timer';
import FaceIcon from '@material-ui/icons/Face';
import PhoneIcon from '@material-ui/icons/Phone';

const useStyles = makeStyles((theme) => ({
  root: {},

  carousel: {
    height: '85vh'
  },
  HeroCarousel: {
    ['@media (min-width:780px)']: {
      position: 'relative',
      textAlign: 'center',
      marginTop: '10vh'
    },
    ['@media (max-width:780px)']: {
      display: 'flex',
      justifyContent: 'center',
      alignContent: 'center',

      width: '100vw',
      height: '40vh',
      margin: 'auto',
      marginTop: '5vh',
      /* Center and scale the image nicely */
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      background: "URL('/static/images/hobbies2.jpg')"
    }
  },
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
  }
}));

export default function Event(props) {
  const classes = useStyles();
  const [state, setState] = React.useState({
    raised: false,
    shadow: 1
  });

  const { id } = useParams();

  const [event, setEvent] = React.useState([]);

  React.useEffect(() => {
    try {
      fetch(process.env.REACT_APP_URL + `event/${id}`, {
        method: 'get'
      })
        .then((response) => response.json())
        .then((res) => {
          if (res.status == 200) {
            console.log(res);
            setEvent(res.data);
          } else {
            // alert(res.error.message[Object.keys(res.error.message)][0]);
          }
        });
    } catch (e) {}
  }, []);

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

      <div className={classes.HeroCarousel}>
        <div className={classes.CarouselContainer}>
          <Carousel
            showArrows={true}
            infiniteLoop={true}
            showThumbs={false}
            autoPlay={true}
            transitionTime="600"
            interval="3000"
            stopOnHover={false}
            swipeable={true}
            showIndicators={true}
            showStatus={true}
          >
            {event &&
              event.images &&
              event.images.map((item, index) => {
                return (
                  <div>
                    {item.image && (
                      <img
                        className={classes.carousel}
                        src={process.env.REACT_APP_URL2 + item.image}
                      />
                    )}
                  </div>
                );
              })}
          </Carousel>
        </div>
        {/* className={classNames(classes.main, classes.mainRaised)}> */}
        <div className={classes.HeroCarouselText}>
          {event && event.start_date && event.start_date.split(' ')[0]}
          <h1>
            <Flip left cascade>
              {/* {moment(event.start_date).format('DD/MM/YYYY')} */}

              <span style={{ textTransform: 'capitalize' }}>
                {event && event.name}
              </span>
            </Flip>
          </h1>
          {event &&
            event.state &&
            event.state.country &&
            event.state.country.name}{' '}
          ( {event && event.state && event.state.name})
        </div>
      </div>
      <Box display="flex">
        <Box m="auto" mt={3} mb={3} style={{ textAlign: 'center' }}>
          <Box m="auto" mt={3} mb={3} style={{ textAlign: 'center' }}>
            <b>From</b>
          </Box>
          <CalendarTodayIcon />
          {event && event.start_date && event.start_date.split(' ')[0]}
          <Box m="auto" mt={3} mb={3} style={{ textAlign: 'center' }}>
            <TimerIcon />
            {event && event.start_date && event.start_date.split(' ')[1]}
          </Box>
        </Box>
        <Box m="auto" mt={3} mb={3} style={{ textAlign: 'center' }}>
          <Box m="auto" mt={3} mb={3} style={{ textAlign: 'center' }}>
            <b>To</b>
          </Box>
          <CalendarTodayIcon />
          {event && event.end_date && event.end_date.split(' ')[0]}
          <Box m="auto" mt={3} mb={3} style={{ textAlign: 'center' }}>
            <TimerIcon />
            {event && event.end_date && event.end_date.split(' ')[1]}
          </Box>
        </Box>
      </Box>
      <Box display="flex">
        <Box
          m="auto"
          mt={3}
          mb={3}
          style={{ textAlign: 'center', width: '75%' }}
        >
          <strong>Details</strong>
          <Card
            style={{
              textAlign: 'center',
              height: 'auto',
              width: '100%',
              marginTop: '2%'
            }}
          >
            <p>{event && event.description}</p>
            <CardContent>
              <Box display="flex">
                <Box m="auto" mt={3} mb={3} style={{ textAlign: 'center' }}>
                  <FaceIcon />
                  {event && event.user && event.user.name}
                </Box>
                <Box m="auto" mt={3} mb={3} style={{ textAlign: 'center' }}>
                  <PhoneIcon />
                  {event && event.user && event.user.phone}
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Box>
      <hr style={{ width: '75vw', margin: '1% auto' }}></hr>

      <Footer />
    </div>
  );
}
