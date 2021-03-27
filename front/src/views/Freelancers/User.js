import React from 'react';
import classNames from 'classnames';
import { Link, useNavigate } from 'react-router-dom';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
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
  HeroCarousel: {
    ['@media (min-width:780px)']: {
      position: 'relative',
      textAlign: 'center',
      marginTop: '10vh',
      height: '120vh'
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
    },

    backgroundPosition: 'center',

    background: "URL('/static/images/hobbies2.jpg')",
    backgroundRepeat: 'no-repeat',
    backgroundAttachment: 'fixed'
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
        {/* {userHobby && userHobby.image && (
          <img
            style={{ width: '100vw', backgroundAttachment: 'fixed' }}
            className={classes.carousel}
            src={process.env.REACT_APP_URL2 + userHobby.image}
          />
        )} */}
        {/* className={classNames(classes.main, classes.mainRaised)}> */}
        <div className={classes.HeroCarouselText}>
          {userHobby && userHobby.fees_per_hour}$
          <h1>
            <Flip left cascade>
              {/* {moment(event.start_date).format('DD/MM/YYYY')} */}

              <span style={{ textTransform: 'capitalize' }}>
                {userHobby && userHobby.user_name}
              </span>
            </Flip>
          </h1>
          {userHobby &&
            userHobby.state &&
            userHobby.state.country &&
            userHobby.state.country.name}{' '}
          ( {userHobby && userHobby.state && userHobby.state.name})
        </div>
      </div>
      <Box display="flex">
        <Box m="auto" mt={3} mb={3} style={{ textAlign: 'center' }}>
          <Box
            m="auto"
            component="fieldset"
            mb={3}
            borderColor="transparent"
            style={{ textAlign: 'center' }}
          >
            <Typography component="legend" style={{ margin: 'auto' }}>
              Rating
            </Typography>
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
          <CalendarTodayIcon />
          {userHobby && userHobby.user_hobby_name}
          <Box m="auto" mt={3} mb={3} style={{ textAlign: 'center' }}>
            <FaceIcon />
            {userHobby && userHobby.gender}
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
          <strong>About</strong>
          <Card
            style={{
              textAlign: 'center',
              height: 'auto',
              width: '100%',
              marginTop: '2%'
            }}
          >
            <p>{userHobby && userHobby.about}</p>
            <CardContent>
              <Box display="flex">
                <Box m="auto" mt={3} mb={3} style={{ textAlign: 'center' }}>
                  <EmailIcon />
                  {userHobby && userHobby.email}
                </Box>
                <Box m="auto" mt={3} mb={3} style={{ textAlign: 'center' }}>
                  <PhoneIcon />
                  {userHobby && userHobby.phone}
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
