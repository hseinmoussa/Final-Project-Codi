import React from 'react';
import classNames from 'classnames';
import { Link, useNavigate } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import './style.css';
import img1 from './bg4.jpg';
import img2 from './Hobbies.jpg';
import img3 from './hobbies2.jpg';
import img4 from './piano.jpg';
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

const useStyles = makeStyles((theme) => ({
  root: {},
  inp: {
    color: 'white'
  },
  root2: {
    display: 'flex',
    '& > * + *': {
      marginLeft: theme.spacing(2)
    }
  },
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
  },
  cardHovered: {
    transform: 'scale3d(1.05, 1.05, 1)'
  },
  categories: {},
  paper: {
    position: 'absolute',
    // minWidth: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  },

  avatar0: {
    backgroundRepeat: 'no-repeat',

    width: ' 1214px',
    height: '622px',
    margin: '0 auto',
    textAlign: 'center',
    maxWidth: '100%',
    background: "URL('/static/images/bg4.jpg')",
    backgroundRepeat: 'no-repeat',
    ['@media (max-width:780px)']: {
      backgroundPosition: '50%',
      paddingTop: '10%',
      paddingBottom: '10%',
      height: 'auto'
    }
  },

  avatar1: {
    height: '100%',
    width: '100vw',

    /* Center and scale the image nicely */
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    background: "URL('/static/images/contact.jpg')"
  },

  avatar: {
    ['@media (min-width:780px)']: {
      width: ' 1014px',
      height: '100%',
      margin: '0 auto',
      textAlign: 'center',
      padding: '80px 150px 95px',
      maxWidth: '100%',
      background: "URL('/static/images/Shape.png')",
      backgroundRepeat: 'no-repeat'
    },
    ['@media (max-width:780px)']: {
      background: 'hsla(0,0%,100%,.8)',
      width: '90%',
      height: 'auto',
      padding: '20px',
      margin: 'auto',
      textAlign: 'center'
    }
  },

  avatarform: {
    margin: 'auto',
    marginTop: '5%',
    marginBottom: '5%',
    width: '40%',
    height: '100%',
    padding: '30px',
    border: '1px solid rgba(0,0,0,.2)',
    mozBorderRadius: '5px',
    webkitBorderRadius: '5px',
    borderRadius: '5px',
    mozBackgroundClip: 'padding',
    webkitBackgroundClip: 'padding-box',
    backgroundClip: 'padding-box',
    background: 'rgba(0, 0, 0, 0.5)',
    mozBoxShadow: '0 0 13px 3px rgba(0,0,0,.5)',
    webkitBoxShadow: '0 0 13px 3px rgba(0,0,0,.5)',
    boxShadow: '0 0 13px 3px rgba(0,0,0,.5)',
    overflow: 'hidden',
    ['@media (max-width:780px)']: {
      width: '90%',
      height: 'auto',
      padding: '20px',
      textAlign: 'center'
    }
  },
  titleavatar2: {
    fontSize: '1.5rem',
    fontFamily: 'hexa',
    letterSpacing: '2px',
    // color: '#dd761e',
    color: '#daa520',
    paddingBottom: '35px',
    fontWeight: '400 !important'
  },
  contactAvatar: {
    background: "URL('/static/images/contact.jpg')"
  },
  textavatar: {
    fontFamily: 'Montserrat,sans-serif',
    ['@media (max-width:780px)']: {
      fontSize: '0.8rem'
    },
    ['@media (min-width:780px)']: {
      fontSize: '1.5rem'
    }
  },
  titleavatar: {
    fontSize: '2rem',
    fontFamily: 'hexa',
    letterSpacing: '2px',
    // color: '#dd761e',
    color: '#daa520',
    paddingTop: '50px',
    paddingBottom: '35px',
    fontWeight: '400 !important'
  }
}));

export default function Home(props) {
  const classes = useStyles();
  const [state, setState] = React.useState({
    raised: false,
    shadow: 1
  });

  const navigate = useNavigate();

  const [state2, setState2] = React.useState({
    raised: false,
    shadow: 1
  });

  const [events, setEvents] = React.useState([]);
  const [hobbiesMain, setHobbiesMain] = React.useState([]);

  // const tokenAdmin = window.localStorage.getItem('tokenAdmin');

  const [info, setInfo] = React.useState({});

  const setInputState = (e) => {
    setInfo({ ...info, [e.target.name]: e.target.value });
  };

  const handleClick2 = (e, id, item) => {
    console.log(11);
    navigate(
      `/event/${id}`,
      {
        replace: true
      },
      { state: item }
    );
  };
  const handleClick = (e, id) => {
    console.log(11);
    navigate(`/EventsByHobby/${id}`, {
      replace: true
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(info);

    var body = new FormData();
    body.append('email', info.email);
    body.append('name', info.name);
    body.append('subject', info.subject);
    body.append('message', info.message);
    body.append('phone', info.phone);

    try {
      fetch(process.env.REACT_APP_URL + `contactus`, {
        method: 'post',
        body: body
      })
        .then((response) => response.json())
        .then((res) => {
          if (res.status == 200) {
            toast.info('Email Sent Successfuly', {
              position: 'top-center',
              autoClose: 1000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              onClose: () =>
                setInfo({
                  ['name']: '',
                  ['email']: '',
                  ['subject']: '',
                  ['phone']: '',
                  ['message']: ''
                }),
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
    } catch (e) {}
  };

  React.useEffect(() => {
    try {
      fetch(process.env.REACT_APP_URL + `events/8?page=1`, {
        method: 'get'
        // headers: {
        //   Accept: 'application/json',
        //   Authorization: 'Bearer ' + tokenAdmin
        // }
      })
        .then((response) => response.json())
        .then((res) => {
          if (res.status == 200) {
            console.log(res);
            setEvents(res.data.data);
          } else {
            // alert(res.error.message[Object.keys(res.error.message)][0]);
          }
        });
    } catch (e) {}

    try {
      fetch(process.env.REACT_APP_URL + `hobbiesmain/8?page=1`, {
        method: 'get'
        // headers: {
        //   Accept: 'application/json',
        //   Authorization: 'Bearer ' + tokenAdmin
        // }
      })
        .then((response) => response.json())
        .then((res) => {
          if (res.status == 200) {
            console.log(res);
            setHobbiesMain(res.data.data);
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
            <div>
              <img className={classes.carousel} src={img1} />
            </div>
            <div>
              <img className={classes.carousel} src={img2} />
            </div>
            <div>
              <img className={classes.carousel} src={img3} />
            </div>
            <div>
              <img className={classes.carousel} src={img4} />
            </div>
          </Carousel>
        </div>
        {/* className={classNames(classes.main, classes.mainRaised)}> */}
        <div className={classes.HeroCarouselText}>
          <h1>
            <Flip left cascade>
              Hobby Connect
            </Flip>
          </h1>
        </div>
      </div>

      <Card className={classes.root} style={{ padding: 20 }} id="about">
        <Box display="flex">
          <Box m="auto" mt={3} mb={3} style={{ textAlign: 'center' }}>
            <span style={{ color: 'blue' }}> --</span>
            <i> who are we ? </i> <span style={{ color: 'blue' }}>--</span>
            <strong>
              <h2
                style={{
                  fontFamily: 'URW Chancery L, cursive ',
                  fontSize: '3rem'
                }}
              >
                <Bounce bottom cascade>
                  About Us
                </Bounce>
              </h2>
            </strong>
          </Box>
        </Box>
        <Box display="flex">
          <Box
            m="auto"
            mt={3}
            mb={3}
            style={{ textAlign: 'center' }}
            className={classes.avatar0}
          >
            <Zoom in={true} timeout={5000}>
              <div className={classes.avatar} to="/app/account">
                <h2 className={classes.titleavatar}>
                  <b>About Us</b>
                </h2>
                <p className={classes.textavatar}>
                  Hobby connect is a web app that would help the users to meet
                  other people who share the same hobbies and to try out things
                  together.
                  <br></br>
                  We Help connecting movie lovers, chess players, joggers,
                  bowlers, and gives them the opportunity to meet in person to
                  do their thing or attend Events together, as well as we give
                  the opportunity for Tutors (or Freelancers) to give courses .
                </p>
              </div>
            </Zoom>
          </Box>
        </Box>
      </Card>

      <Card className={classes.root} style={{ padding: 20 }}>
        <Box display="flex">
          <Box m="auto" mt={3} mb={3} style={{ textAlign: 'center' }}>
            <span style={{ color: 'blue' }}> --</span>
            <i> Events </i> <span style={{ color: 'blue' }}>--</span>
            <strong>
              <h2
                style={{
                  fontFamily: 'URW Chancery L, cursive ',
                  fontSize: '3rem'
                }}
              >
                <Zom left cascade>
                  Main Hobbies
                </Zom>
              </h2>
            </strong>
          </Box>
        </Box>
        <Box display="flex">
          <Box m="auto" mt={1}>
            <Zom cascade>
              <Grid container={500} spacing={3}>
                {hobbiesMain.map((hobbymain, index) => {
                  return (
                    <Grid
                      container
                      item
                      xs={12}
                      sm={6}
                      md={4}
                      lg={3}
                      style={{ textAlign: 'center' }}
                    >
                      <ButtonBase
                        className={classes.cardAction}
                        onClick={(event) => handleClick(event, hobbymain.id)}
                      >
                        <Card
                          classes={{
                            root:
                              state2.raised && hobbymain.id == state2.id
                                ? classes.cardHovered
                                : ''
                          }}
                          style={{ textAlign: 'center', width: '100%' }}
                          onMouseOver={() =>
                            setState2({
                              raised: true,
                              shadow: 3,
                              id: hobbymain.id
                            })
                          }
                          onMouseOut={() =>
                            setState2({ raised: false, shadow: 1 })
                          }
                          onclick={() => handleClick(hobbymain.id)}
                          raised={state2.raised}
                          className={classes.root}
                        >
                          <CardActionArea>
                            <CardMedia
                              component="img"
                              alt="Contemplative Reptile"
                              height="250"
                              width="250"
                              image={
                                process.env.REACT_APP_URL2 + hobbymain.image
                              }
                              title="Contemplative Reptile"
                            />

                            <CardContent>
                              <Typography
                                gutterBottom
                                variant="h5"
                                component="h2"
                                style={{ textTransform: 'uppercase' }}
                              >
                                {hobbymain.name}
                              </Typography>
                            </CardContent>
                          </CardActionArea>
                          <CardActions>
                            <Button
                              size="small"
                              color="primary"
                              style={{ color: '#daa520' }}
                              onclick={
                                handleClick

                                // window.location.replace(
                                //   `/EventsByHobby/${hobbymain.id}`
                                // )
                                // navigate(`/EventsByHobby/${hobbymain.id}`, {
                                //   replace: true
                                // })
                              }
                            >
                              Check It
                            </Button>
                          </CardActions>
                        </Card>
                      </ButtonBase>
                    </Grid>
                  );
                })}
              </Grid>
            </Zom>
          </Box>
        </Box>
      </Card>

      <Card className={classes.root} style={{ padding: 20 }}>
        <Box display="flex">
          <Box m="auto" mt={3} mb={3} style={{ textAlign: 'center' }}>
            <span style={{ color: 'blue' }}> --</span>
            <i> Events </i> <span style={{ color: 'blue' }}>--</span>
            <strong>
              <h2
                style={{
                  fontFamily: 'URW Chancery L, cursive ',
                  fontSize: '3rem'
                }}
              >
                <Zom right cascade>
                  Newest Events
                </Zom>
              </h2>
            </strong>
          </Box>
        </Box>
        <Box display="flex">
          <Box m="auto" mt={1}>
            <Zom cascade>
              <Grid container={500} spacing={3}>
                {events.map((event, index) => {
                  return (
                    <Grid
                      container
                      item
                      xs={12}
                      sm={6}
                      md={4}
                      lg={3}
                      style={{ textAlign: 'center' }}
                    >
                      <ButtonBase
                        className={classes.cardAction}
                        onClick={(e) => handleClick2(e, event.id)}
                      >
                        <Card
                          classes={{
                            root:
                              state.raised && event.id == state.id
                                ? classes.cardHovered
                                : ''
                          }}
                          style={{ textAlign: 'center', width: '100%' }}
                          onMouseOver={() =>
                            setState({ raised: true, shadow: 3, id: event.id })
                          }
                          onMouseOut={() =>
                            setState({ raised: false, shadow: 1 })
                          }
                          raised={state.raised}
                          className={classes.root}
                        >
                          <CardActionArea>
                            {event.images && event.images[0] && (
                              <CardMedia
                                component="img"
                                alt="Contemplative Reptile"
                                height="250"
                                width="250"
                                image={
                                  process.env.REACT_APP_URL2 +
                                  event.images[0].image
                                }
                                title="Contemplative Reptile"
                              />
                            )}
                            <CardContent>
                              <Typography
                                gutterBottom
                                variant="h5"
                                component="h2"
                                style={{ textTransform: 'uppercase' }}
                              >
                                {event.name}
                              </Typography>
                              <Typography
                                variant="body2"
                                color="textSecondary"
                                component="p"
                              >
                                <p>
                                  {' '}
                                  <b>State : </b>
                                  {event.state.name}
                                </p>
                                <p>
                                  {' '}
                                  <b>Location :</b>
                                  {event.location}
                                </p>
                                <p>
                                  {' '}
                                  <b>Added By :</b>{' '}
                                  {event && event.user && event.user.name}
                                </p>
                                <p>
                                  {' '}
                                  <b>Description :</b>
                                  {event.description}
                                </p>
                              </Typography>
                            </CardContent>
                          </CardActionArea>
                          <CardActions>
                            <Button
                              size="small"
                              color="primary"
                              style={{ color: '#daa520' }}
                            >
                              Check It
                            </Button>
                          </CardActions>
                        </Card>
                      </ButtonBase>
                    </Grid>
                  );
                })}
              </Grid>
            </Zom>
          </Box>
        </Box>
      </Card>
      <Card className={classes.root} style={{ padding: 20 }} id="contact">
        <Box display="flex">
          <Box m="auto" mt={3} mb={3} style={{ textAlign: 'center' }}>
            <span style={{ color: 'blue' }}> --</span>
            <i> who are we ? </i> <span style={{ color: 'blue' }}>--</span>
            <strong>
              <h2
                style={{
                  fontFamily: 'URW Chancery L, cursive ',
                  fontSize: '3rem'
                }}
              >
                <Bounce bottom cascade>
                  Contact Us
                </Bounce>
              </h2>
            </strong>
          </Box>
        </Box>
        <Box display="flex">
          <Box
            m="auto"
            mt={3}
            mb={3}
            style={{ textAlign: 'center' }}
            className={classes.avatar1}
          >
            <Zom>
              <div className={classes.avatarform} to="/app/account">
                <h2 className={classes.titleavatar2}>
                  <b>Get in touch with us by filling out the form below!</b>
                </h2>
                <p className={classes.textavatar}>
                  <ValidatorForm
                    // ref="form"
                    onSubmit={handleSubmit}
                    onError={(errors) => console.log(errors)}
                  >
                    <Grid container spacing={3}>
                      <Grid item xs>
                        <TextValidator
                          label="Name"
                          className={classes.inp}
                          name="name"
                          id="name"
                          value={info.name}
                          validators={['required', 'isString']}
                          errorMessages={[
                            'this field is required',
                            'Invalide Name '
                          ]}
                          placeholder="Name"
                          onChange={(e) => setInputState(e)}
                        />
                      </Grid>
                    </Grid>
                    <Grid container spacing={3}>
                      <Grid item xs>
                        <TextValidator
                          label="Email"
                          name="email"
                          id="email"
                          value={info.email}
                          validators={['required', 'isEmail']}
                          errorMessages={[
                            'this field is required',
                            'Invalide Email '
                          ]}
                          placeholder="Email"
                          onChange={(e) => setInputState(e)}
                        />
                      </Grid>
                      <Grid item xs>
                        <TextValidator
                          id="phone"
                          label="Phone"
                          placeholder="Phone"
                          name="phone"
                          value={info.phone}
                          validators={['required', 'isNumber']}
                          errorMessages={[
                            'this field is required',
                            'Invalide Phone number'
                          ]}
                          onChange={(e) => setInputState(e)}
                        />
                      </Grid>
                    </Grid>

                    <Grid container spacing={3}>
                      <Grid item xs>
                        <TextValidator
                          label="Subject"
                          name="subject"
                          id="subject"
                          value={info.subject}
                          validators={['required', 'isString']}
                          errorMessages={[
                            'this field is required',
                            'Invalide Subject '
                          ]}
                          placeholder="Subject"
                          onChange={(e) => setInputState(e)}
                        />
                      </Grid>
                      <Grid item xs>
                        <TextValidator
                          id="message"
                          label="Message"
                          placeholder="Message"
                          name="message"
                          value={info.message}
                          validators={['required', 'isString']}
                          errorMessages={[
                            'this field is required',
                            'Invalide Message'
                          ]}
                          onChange={(e) => setInputState(e)}
                        />
                      </Grid>
                    </Grid>
                    <Box display="flex">
                      <Box m="auto" mt={3}>
                        <Button
                          color="primary"
                          variant="contained"
                          type="submit"
                        >
                          Send
                        </Button>
                      </Box>
                    </Box>
                  </ValidatorForm>
                </p>
              </div>
            </Zom>
          </Box>
        </Box>
      </Card>

      <hr style={{ width: '75vw', margin: '1% auto' }}></hr>

      <Footer />
    </div>
  );
}
