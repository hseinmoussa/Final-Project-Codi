import React from 'react';
import classNames from 'classnames';
import { Link, useNavigate } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import img1 from './Hobbies.jpg';
import moment from 'moment';
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
import EmailIcon from '@material-ui/icons/Email';

import RoomIcon from '@material-ui/icons/Room';
import RoomTwoToneIcon from '@material-ui/icons/RoomTwoTone';

import { Calendar, momentLocalizer } from 'react-big-calendar';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

// const events = [{ start: new Date(), end: new Date(), title: 'special event' }];
const DnDCalendar = withDragAndDrop(Calendar);

const useStyles = makeStyles((theme) => ({
  root: {},

  carousel: {
    ['@media (max-width:780px)']: {
      height: '40vh'
    },
    ['@media (min-width:780px)']: {
      height: '120vh'
    }
  },
  HeroCarousel: {
    ['@media (min-width:780px)']: {
      position: 'relative',
      textAlign: 'center',
      marginTop: '10vh'
    },
    ['@media (max-width:780px)']: {
      position: 'relative',
      textAlign: 'center',
      marginTop: '5vh',

      // display: 'flex',
      // justifyContent: 'center',
      // alignContent: 'center',

      width: '100vw',
      height: '40vh'
      // margin: 'auto',
      // marginTop: '5vh',
      // backgroundPosition: 'center',
      // backgroundRepeat: 'no-repeat',
      // backgroundSize: 'cover'
      // background: "URL('/static/images/hobbies2.jpg')"
    }
  },
  CarouselContainer: {
    ['@media (max-width:780px)']: {
      // display: 'none'
    }
  },

  HeroCarouselText: {
    ['@media (min-width:780px)']: {
      position: 'absolute',
      top: '40%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      color: 'white',
      fontSize: '2rem'
    },
    ['@media (max-width:780px)']: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',

      margin: 'auto',
      color: 'white',
      fontSize: '1.5rem',
      width: '100%'
    },

    fontFamily: 'New Century Schoolbook, TeX Gyre Schola, serif',
    fontWeight: 'bolder',

    margin: 'auto',
    textAlign: 'center'
  },
  time: {
    ['@media (min-width:780px)']: {
      width: '25%',
      fontSize: '50px',
      fontWeight: '500',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      color: '#fff',
      marginTop: '5%',
      fontFamily: 'Barlow Condensed, Arial, sans-serif',
      borderRadius: '4px',
      paddingBottom: '10px',
      webkitTransform: 'matrix(1, 0.3, 0, 1, 0, 0)',
      msTransform: 'matrix(1, 0.3, 0, 1, 0, 0)',
      transform: 'matrix(1, 0.3, 0, 1, 0, 0)'
    },

    ['@media (max-width:780px)']: {
      width: '25%',
      fontSize: '50px',
      fontWeight: '500',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      color: '#fff',
      fontFamily: 'Barlow Condensed, Arial, sans-serif',
      borderRadius: '4px',
      paddingBottom: '10px',
      webkitTransform: 'matrix(1, 0.3, 0, 1, 0, 0)',
      msTransform: 'matrix(1, 0.3, 0, 1, 0, 0)',
      transform: 'matrix(1, 0.3, 0, 1, 0, 0)'
    }
  },

  timeSpan: {
    ['@media (min-width:780px)']: {
      fontSize: '25px',
      fontWeight: 'bolder',
      display: 'block',
      color: '#daa520',
      textTransform: 'uppercase'
    },
    ['@media (max-width:780px)']: {
      fontSize: '16px',
      fontWeight: 'bolder',
      display: 'block',
      color: '#daa520',
      textTransform: 'uppercase'
    }
  },
  bigTitle: {
    ['@media (min-width:780px)']: {
      lineHeight: '.9',
      fontWeight: '700'
    },
    ['@media (max-width:780px)']: {
      fontSize: '50px',
      lineHeight: '1'
    },
    textTransform: 'capitalize',
    color: 'transparent',
    '-webkitTextFillColor': 'transparent',
    '-webkitTextStrokeWidth': '2px',
    '-webkitTextStrokeColor': '#fff',
    fontSize: '140px',
    color: '#fff'
  },
  smallTitle: {
    ['@media (min-width:780px)']: {
      fontSize: '50px',
      fontWeight: '700',
      lineHeight: '1.2',
      textTransform: 'uppercase',
      fontFamily: 'Barlow Condensed, Arial, sans-serif',
      color: '#daa520'
    }
  },
  hurryUp: {
    ['@media (min-width:780px)']: {
      fontSize: '30px',
      color: 'white',
      fontWeight: '500',
      marginBottom: '0',
      textTransform: 'uppercase',
      fontFamily: 'Barlow Condensed, Arial, sans-serif'
    },
    ['@media (max-width:780px)']: {
      fontSize: '15px',
      color: 'white',
      fontWeight: '500',
      marginBottom: '0',
      textTransform: 'uppercase',
      fontFamily: 'Barlow Condensed, Arial, sans-serif'
    }
  },
  description: {
    ['@media (min-width:780px)']: {
      width: '75%',
      lineHeight: '2em'
    }
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
  blackBox: {
    ['@media (min-width:780px)']: {
      width: '100vw',
      height: '120vh'
    },
    ['@media (max-width:780px)']: {
      width: '100vw',
      height: '40vh'
    },

    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    position: 'absolute',
    top: 0
  },
  calendar: {
    ['@media (min-width:780px)']: {
      height: '80vh',
      width: '80vw'
    },
    ['@media (max-width:780px)']: {
      height: '40vh',
      width: '85vw'
    }
  },
  FromTo: {
    ['@media (min-width:780px)']: {
      width: '25vw',
      height: '30vh'
    },
    ['@media (max-width:780px)']: {
      width: '40vw',
      height: '20vh'
    },
    textAlign: 'center',
    mozBackgroundClip: 'padding',
    webkitBackgroundClip: 'padding-box',
    backgroundClip: 'padding-box',
    mozBoxShadow: '0 0 13px 3px rgba(0,0,0,.5)',
    webkitBoxShadow: '0 0 13px 3px rgba(0,0,0,.5)',
    boxShadow: '0 0 13px 3px rgba(0,0,0,.5)'
  }
}));

export default function Event(props) {
  const classes = useStyles();
  const [state, setState] = React.useState({
    raised: false,
    shadow: 1
  });

  const [time, setTime] = React.useState({
    days: 0,
    hours: '00',
    minutes: '00',
    seconds: '00',
    timeUp: false
  });
  const [event, setEvent] = React.useState([]);

  const [events, setEvents] = React.useState([
    { start: new Date(), end: new Date(), title: 'special event' }
  ]);

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  React.useEffect(() => {
    let timer1 =
      event &&
      event.start_date &&
      setInterval(() => {
        let eventDate = +new Date(event.start_date);

        let difference =
          eventDate -
          +new Date(
            Date.now() + new Date().getTimezoneOffset() * 60000
          ).getTime();
        if (difference < 1) {
          clearInterval(timer1);
          setTime({ ...time, timeUp: true });
        } else {
          let days = Math.floor(difference / (1000 * 60 * 60 * 24));
          let hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
          let minutes = Math.floor((difference / (1000 * 60)) % 60);
          let seconds = Math.floor((difference / 1000) % 60);
          setTime({
            ...time,
            days: days,
            hours: hours > 9 ? hours : `0${hours}`,
            minutes: minutes > 9 ? minutes : `0${minutes}`,
            seconds: seconds > 9 ? seconds : `0${seconds}`
          });
        }
      }, 1000);

    return () => {
      clearInterval(timer1);
    };
  }, [event.start_date]);
  const { id } = useParams();

  React.useEffect(() => {
    try {
      fetch(process.env.REACT_APP_URL + `event/${id}`, {
        method: 'get'
      })
        .then((response) => response.json())
        .then((res) => {
          if (res.status == 200) {
            setEvent(res.data);
            var startLocalDate = new Date(res.data.start_date);
            var newStartDate = new Date(
              startLocalDate.getTime() -
                startLocalDate.getTimezoneOffset() * 60 * 1000
            );

            var endLocalDate = new Date(res.data.end_date);
            var newendDate = new Date(
              endLocalDate.getTime() -
                endLocalDate.getTimezoneOffset() * 60 * 1000
            );

            setEvents([
              {
                start: newStartDate,
                end: newendDate,
                title: res.data.name
              }
            ]);
          } else {
            // alert(res.error.message[Object.keys(res.error.message)][0]);
          }
        });
    } catch (e) {}
  }, []);

  const dayString = time.days > 1 ? 'days' : 'day';

  return (
    <div>
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
        <div className={classes.blackBox}></div>
        {/* className={classNames(classes.main, classes.mainRaised)}> */}
        <div className={classes.HeroCarouselText}>
          <span className={classes.hurryUp}>Hurry Up! Don't Waste Time</span>

          <h5>{events && events[0].start.toDateString()}</h5>
          <h5>({Intl.DateTimeFormat().resolvedOptions().timeZone})</h5>
          {/* <h5>{event && event.start_date && event.start_date.split(' ')[0]}</h5> */}
          <h1>
            <Flip left cascade>
              {/* {moment(event.start_date).format('DD/MM/YYYY')} */}

              <span className={classes.bigTitle}>{event && event.name}</span>
            </Flip>
          </h1>
          <Grid container>
            <Grid item xs={12} sm={12} lg={6}>
              <h6>
                <RoomTwoToneIcon style={{ color: '#daa520' }} />
                {event &&
                  event.state &&
                  event.state.country &&
                  event.state.country.name}{' '}
                ( {event && event.state && event.state.name})
              </h6>
            </Grid>
            <Grid item xs={12} sm={12} lg={6}>
              <h6>
                <CalendarTodayIcon style={{ color: '#daa520' }} />
                {event && event.start_date && event.start_date.split(' ')[0]}
              </h6>
            </Grid>
          </Grid>

          {time.timeUp ? (
            <p>Event in progress</p>
          ) : (
            <Grid container style={{ maxWidth: '95vw', margin: 'auto' }}>
              <Grid item xs={3} sm={3} lg={3} className={classes.time}>
                {time.days}
                <span className={classes.timeSpan}>{dayString}</span>
              </Grid>
              <Grid item xs={3} sm={3} lg={3} className={classes.time}>
                {time.hours}
                <span className={classes.timeSpan}>Hours</span>
              </Grid>
              <Grid item xs={3} sm={3} lg={3} className={classes.time}>
                {time.minutes}
                <span className={classes.timeSpan}>Minutes</span>
              </Grid>
              <Grid item xs={3} sm={3} lg={3} className={classes.time}>
                {time.seconds}
                <span className={classes.timeSpan}>seconds</span>
              </Grid>
            </Grid>
          )}
        </div>
      </div>

      <Box display="flex">
        <Box m="auto" mt={3} mb={3} style={{ textAlign: 'center' }}>
          <h2 className={classes.smallTitle}>{event && event.name}</h2>
        </Box>
      </Box>
      <Box display="flex">
        <Box m="auto" mb={3} style={{ textAlign: 'center' }}>
          ({Intl.DateTimeFormat().resolvedOptions().timeZone})
        </Box>
      </Box>
      <Box display="flex">
        <Box m="auto" mb={3} style={{ textAlign: 'center' }}>
          {event && event.start_date && (
            <DnDCalendar
              defaultDate={new Date(event.start_date)}
              defaultView="month"
              events={events}
              localizer={localizer}
              // onEventDrop={() => console.log(1)}
              // onEventResize={() => console.log(1)}
              resizable
              draggableAccessor={(event) => false}
              views={['month', 'agenda']}
              className={classes.calendar}
            />
          )}
        </Box>
      </Box>
      <Box display="flex">
        <Box m="auto" mt={3} mb={3} className={classes.FromTo}>
          <Box m="auto" mt={3} mb={3} style={{ textAlign: 'center' }}>
            <b>Start</b>
          </Box>
          <CalendarTodayIcon style={{ color: '#daa520' }} />
          {events && events[0].start.toDateString()}
          <Box m="auto" mt={3} mb={3} style={{ textAlign: 'center' }}>
            <TimerIcon style={{ color: '#daa520' }} />
            {events && events[0].start.getHours()}:
            {events && events[0].start.getMinutes().toString().length == 1
              ? events[0].start.getMinutes() + '0'
              : events[0].start.getMinutes()}
          </Box>
        </Box>
        <Box m="auto" mt={3} mb={3} className={classes.FromTo}>
          <Box m="auto" mt={3} mb={3} style={{ textAlign: 'center' }}>
            <b>End</b>
          </Box>
          <CalendarTodayIcon style={{ color: '#daa520' }} />
          {events && events[0].end.toDateString()}
          <Box m="auto" mt={3} mb={3} style={{ textAlign: 'center' }}>
            <TimerIcon style={{ color: '#daa520' }} />
            {events && events[0].end.getHours()}:
            {events && events[0].end.getMinutes().toString().length == 1
              ? events[0].end.getMinutes() + '0'
              : events[0].end.getMinutes()}
            {/* {event && event.end_date && event.end_date.split(' ')[1]} */}
          </Box>
        </Box>
      </Box>
      <Box display="flex">
        <Box m="auto" mt={3} mb={3} className={classes.moreDetailsSection}>
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
              <Box
                display="flex"
                m="auto"
                mt={3}
                mb={3}
                className={classes.description}
              >
                <p style={{ lineHeight: '3em' }}>
                  {event && event.description}
                </p>
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
                  {event && event.user && event.user.email && (
                    <a
                      style={{ textDecoration: 'none', color: '#2f4f4f' }}
                      href={'mailto:' + event.user.email}
                    >
                      {event.user.email}
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
                  {event && event.user && event.user.phone && (
                    <a
                      style={{ textDecoration: 'none', color: '#2f4f4f' }}
                      href={'tel:' + event.user.phone}
                    >
                      {event.user.phone}
                    </a>
                  )}
                </Grid>
                {/* </Box> */}
              </Grid>
              {/* </Box> */}
              <Box display="flex">
                <Box m="auto" mt={3} mb={3} style={{ textAlign: 'center' }}>
                  <FaceIcon style={{ color: '#daa520' }} />
                  {event && event.user && event.user.name}
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
