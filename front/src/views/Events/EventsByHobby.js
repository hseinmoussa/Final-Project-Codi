import React, { useEffect } from 'react';
import {
  Container,
  Grid,
  makeStyles,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
  Box,
  ButtonBase
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import Zom from 'react-reveal/Zoom';

import MainLayout from 'src/layouts/MainLayout';
import { ToastContainer, toast } from 'react-toastify';

import Footer from 'src/components/Footer/Footer';
import { Pagination } from '@material-ui/lab';
import { useParams } from 'react-router-dom';

import { useNavigate } from 'react-router-dom';

import CookieConsent, {
  Cookies,
  getCookieConsentValue
} from 'react-cookie-consent';

const useStyles = makeStyles((theme) => ({
  carousel: {
    ['@media (max-width:780px)']: {
      // minHeight: '40vw',
      // maxHeight: '50vw',
      height: '200px'
    },
    ['@media (min-width:780px)']: {
      // minHeight: '25vw',
      // maxHeight: '30vw',
      height: '200px'
    },
    objectFit: 'cover',
    borderTopLeftRadius: '15px',
    borderTopRightRadius: '15px'
  },
  contain: {
    ['@media (min-width:780px)']: {
      marginTop: '5%'
    },
    ['@media (max-width:780px)']: {
      marginTop: '10%'
    }
  },
  lastitems: {
    fontFamily: 'Berkshire Swash, handwriting',
    // font-family: "Courier New", monospace !important;
    paddingTop: '2%'
  },
  lastitemsLink: {
    textDecoration: 'none',
    color: 'rgb(255, 174, 0)',
    transition: 'all 0.2s linear'
  }
}));

export default function EventsByHobby(props) {
  const classes = useStyles();

  const [events, setEvents] = React.useState([]);
  const [newestEvents, setNewestEvents] = React.useState([]);

  const [state, setState] = React.useState({
    raised: false,
    shadow: 1
  });

  const [total, setTotal] = React.useState(0);
  const [page, setPage] = React.useState(1);

  const country_user = Cookies.get('country');

  const navigate = useNavigate();

  const { id } = useParams();
  const handleChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleClick = (e, id, item) => {
    console.log(11);
    navigate(
      `/event/${id}`,
      {
        replace: true
      },
      { state: item }
    );
  };

  const CapitalizeFirstLetter = (str) => {
    return str.length ? str.charAt(0).toUpperCase() + str.slice(1) : str;
  };
  useEffect(() => {
    try {
      fetch(process.env.REACT_APP_URL + `eventsbyhobby/9/${id}?page=${page}`, {
        method: 'get'
      })
        .then((response) => response.json())
        .then((res) => {
          if (res.status == 200) {
            console.log(res);
            setEvents(res.data.data);
            setTotal(res.data.last_page);
          } else {
            // alert(res.error.message[Object.keys(res.error.message)][0]);
          }
        });
    } catch (e) {}
  }, [page]);

  useEffect(() => {
    try {
      let country;
      if (getCookieConsentValue() && Cookies.get('country') != undefined)
        country = Cookies.get('country');
      else country = '';
      fetch(
        process.env.REACT_APP_URL + `events/10?page=${page}&country=${country}`,
        {
          method: 'get'
        }
      )
        .then((response) => response.json())
        .then((res) => {
          if (res.status == 200) {
            console.log(res);
            setNewestEvents(res.data.data);
          } else {
            // alert(res.error.message[Object.keys(res.error.message)][0]);
          }
        });
    } catch (e) {}
  }, [page, getCookieConsentValue()]);

  return (
    <div>
      <MainLayout />
      <Container className={classes.contain}>
        <Box display="flex">
          <Box m="auto" mt={3} mb={3} style={{ textAlign: 'center' }}>
            <strong>
              <h2
                style={{
                  fontFamily: 'URW Chancery L, cursive ',
                  fontSize: '3rem'
                }}
              >
                <Zom right cascade>
                  Events
                </Zom>
              </h2>
            </strong>
          </Box>
        </Box>
        <Grid container={500} spacing={3}>
          <Grid container item xs={12} sm={12} md={9} lg={9}>
            <Grid container={500} spacing={3}>
              {events.map((event, index) => {
                return (
                  <Grid
                    container
                    item
                    xs={12}
                    sm={6}
                    md={4}
                    lg={4}
                    style={{ textAlign: 'center' }}
                  >
                    <ButtonBase
                      className={classes.cardAction}
                      onClick={(e) => handleClick(e, event.id, event)}
                    >
                      <Card
                        classes={{
                          root:
                            state.raised && event.id == state.id
                              ? classes.cardHovered
                              : ''
                        }}
                        style={{ textAlign: 'center' }}
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
                              alt="Contemplative Reptile"
                              height="auto"
                              // width="250"
                              // image={process.env.REACT_APP_URL2 + hobbymain.image}
                              title="Contemplative Reptile"
                              style={{ padding: '15px' }}
                            >
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
                                  <img
                                    className={classes.carousel}
                                    src={
                                      process.env.REACT_APP_URL2 +
                                      event.images[0].image
                                    }
                                  />
                                </div>
                                <div>
                                  <img
                                    className={classes.carousel}
                                    src={
                                      process.env.REACT_APP_URL2 +
                                      event.images[0].image
                                    }
                                  />
                                </div>
                              </Carousel>
                            </CardMedia>
                          )}
                          <CardContent>
                            <Typography
                              gutterBottom
                              variant="h5"
                              component="h2"
                              style={{ textTransform: 'uppercase' }}
                            >
                              <b>{CapitalizeFirstLetter(event.name)}</b>
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
                                <b>Start : </b>
                                {event.start_date}
                              </p>
                              <strong>Coordinated Universal Time (UTC)</strong>
                              <p>
                                {' '}
                                <b>End : </b>
                                {event.end_date}
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
            <Box m="auto" mt={3} display="flex" justifyContent="center">
              <Pagination
                color="primary"
                count={total}
                page={page}
                onChange={handleChange}
                size="small"
              />
            </Box>
          </Grid>
          <Grid
            container
            item
            xs={12}
            sm={12}
            md={3}
            lg={3}
            style={{ height: '100%' }}
          >
            <Card
              style={{ textAlign: 'center', height: 'auto', width: '100%' }}
              raised={state.raised}
              className={classes.root}
              className={classes.lastitems}
            >
              <h2
                style={{
                  fontFamily: 'Berkshire Swash, handwriting'
                }}
              >
                {getCookieConsentValue() &&
                Cookies.get('country') != undefined &&
                country_user != undefined
                  ? 'Newest Events In Your Country'
                  : 'Newest Events'}
              </h2>

              <Grid container={500} spacing={3} style={{ margin: 'auto' }}>
                {newestEvents &&
                  newestEvents[0] &&
                  newestEvents.map((value, index) => {
                    return (
                      <Grid container item xs={12} sm={12} md={12} lg={12}>
                        <div style={{ marginTop: '5%' }}>
                          <b>
                            <Link
                              to={`/article/${value.id}`}
                              replace
                              className={classes.lastitemsLink}
                            >
                              {CapitalizeFirstLetter(value.name)} »
                            </Link>
                          </b>
                          <span style={{ Color: 'grey', opacity: '0.5' }}>
                            {' '}
                            {value.state && value.state.name}({' '}
                            {value.state &&
                              value.state.country &&
                              value.state.country.name}
                            ){' '}
                          </span>
                        </div>
                      </Grid>
                    );
                  })}
              </Grid>
            </Card>
          </Grid>
        </Grid>
      </Container>
      <hr style={{ width: '75vw', margin: '1% auto' }}></hr>

      <Footer />
    </div>
  );
}
