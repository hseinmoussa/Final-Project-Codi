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
import { TagsSelect } from 'react-select-material-ui';

import { withStyles } from '@material-ui/core/styles';
import FavoriteIcon from '@material-ui/icons/Favorite';

import CookieConsent, {
  Cookies,
  getCookieConsentValue
} from 'react-cookie-consent';

import Rating from '@material-ui/lab/Rating';

import { Link } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import Zom from 'react-reveal/Zoom';

import MainLayout from 'src/layouts/MainLayout';
import { ToastContainer, toast } from 'react-toastify';

import Footer from 'src/components/Footer/Footer';
import { Pagination } from '@material-ui/lab';
import { useNavigate } from 'react-router-dom';

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
  },
  paginationButton: {
    '&  .Mui-selected': {
      backgroundColor: '#2f4f4f !important'
    },
    '&  button:hover': {
      backgroundColor: '#2f4f4f !important',
      opacity: '50%'
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

export default function Freelancers(props) {
  const classes = useStyles();

  const navigate = useNavigate();
  const [events, setEvents] = React.useState([]);
  const [newestEvents, setNewestEvents] = React.useState([]);

  const [filter, setFilter] = React.useState([]);

  const [state, setState] = React.useState({
    raised: false,
    shadow: 1
  });

  const country_user = Cookies.get('country');

  const [total, setTotal] = React.useState(0);
  const [page, setPage] = React.useState(1);
  const [hobby, setHobby] = React.useState([]);

  // const [country_user, setCountryUser] = React.useState('');

  const handleChangeTags = (e, v) => {
    setFilter(e);
    console.log(filter);
  };

  const handleChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleClick = (e, id) => {
    console.log(11);
    navigate(`/freelancer/${id}`, {
      replace: true
    });
  };

  // useEffect(() => {
  //   try {
  //     fetch('https://ipapi.co/json/')
  //       .then((response) => response.json())
  //       .then((res) => {
  //         setCountryUser(res.country_name);
  //       });
  //   } catch (e) {}
  // }, []);

  const CapitalizeFirstLetter = (str) => {
    return str.length ? str.charAt(0).toUpperCase() + str.slice(1) : str;
  };
  useEffect(() => {
    try {
      var url;
      if (filter != null) {
        if (filter.length > 0)
          url = `freelancers/9?page=${page}&filter[]=${filter}`;
        else url = `freelancers/9?page=${page}`;
      } else url = `freelancers/9?page=${page}`;

      fetch(process.env.REACT_APP_URL + url, {
        method: 'get'
      })
        .then((response) => response.json())
        .then((res) => {
          if (res.status == 200) {
            setEvents(res.data.data);
            setTotal(res.data.last_page);
          } else {
            // alert(res.error.message[Object.keys(res.error.message)][0]);
          }
        });
    } catch (e) {}
  }, [page, filter]);

  useEffect(() => {
    try {
      var country;
      console.log(Cookies.get('country'));
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
  }, [page, country_user]);

  useEffect(() => {
    try {
      fetch(process.env.REACT_APP_URL + `hobbies/10000`, {
        method: 'get'
      })
        .then((response) => response.json())
        .then((res) => {
          if (res.status == 200) {
            setHobby(res.data);
          } else {
            // alert(res.error.message[Object.keys(res.error.message)][0]);
          }
        });
    } catch (e) {}
  }, []);

  let Hobby = [];
  if (hobby.data)
    if (hobby.data[0] != undefined) {
      for (let i = 0; i < hobby.data.length; i++) {
        Hobby.push({ value: hobby.data[i].id, label: hobby.data[i].name });
      }
    }
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
                Tutor
              </h2>
            </strong>
          </Box>
        </Box>
        <Grid container={500} spacing={3}>
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
              <Box m="auto" mb={5} style={{ textAlign: 'center' }}>
                <h2
                  style={{
                    fontFamily: 'Berkshire Swash, handwriting'
                  }}
                >
                  Filter By Hobby
                </h2>

                <TagsSelect
                  required
                  label="Tag"
                  id="2"
                  options={Hobby}
                  name="hobbies"
                  onChange={(e, v) => handleChangeTags(e, v)}
                  SelectProps={{
                    // isCreatable: true,
                    msgNoOptionsAvailable: 'All tags are selected',
                    msgNoOptionsMatchFilter: 'No tag matches the filter'
                  }}
                />
              </Box>

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
                              to={`/event/${value.id}`}
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
                      onClick={(e) => handleClick(e, event.id)}
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
                          {event.user && event.user.image && (
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
                                  {event && event.user && (
                                    <img
                                      className={classes.carousel}
                                      src={
                                        process.env.REACT_APP_URL2 +
                                        event.user.image
                                      }
                                    />
                                  )}
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
                              <b>
                                {event &&
                                  event.user &&
                                  CapitalizeFirstLetter(event.user.name)}
                              </b>
                            </Typography>
                            <Typography
                              variant="body2"
                              color="textSecondary"
                              component="p"
                            >
                              <p>
                                {' '}
                                <b>Hobby : </b>
                                {event && event.hobby && event.hobby.name}
                              </p>
                              <p>
                                {' '}
                                <b>State : </b>
                                {event && event.state && event.state.name}
                              </p>
                              <p>
                                {' '}
                                <b>Location : </b>
                                {event && event.address}
                              </p>
                              <p>
                                {' '}
                                <strong>Fees Per Hour: </strong>
                                {event && event.fees_per_hour}
                              </p>

                              <p>
                                {' '}
                                <b>Level :</b> {event && event.level_id}
                              </p>
                              <p>
                                {' '}
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
                className={classes.paginationButton}
                count={total}
                page={page}
                onChange={handleChange}
                size="small"
              />
            </Box>
          </Grid>
        </Grid>
      </Container>
      <hr style={{ width: '75vw', margin: '1% auto' }}></hr>

      <Footer />
    </div>
  );
}
