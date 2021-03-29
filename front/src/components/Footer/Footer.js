// src/components/GoToTop/index.tsx

import React, { useState, useEffect } from 'react';
import { Container } from './styles.css';

import { makeStyles } from '@material-ui/core/styles';
import Elev from './rocket.png';
import SocialMediaButtons from 'react-social-media-buttons';
import CookieConsent, { Cookies } from 'react-cookie-consent';

const iconStyle = { color: '#ffffff' };

const useStyles = makeStyles((theme) => ({
  container: {
    '& > * + *': {
      marginTop: theme.spacing(1)
    },

    backgroundColor: 'grey',
    width: '100%',
    margin: 'auto',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingTop: '1%'
  },
  button: {
    zIndex: '99',
    cursor: 'pointer',
    fontSize: '18px',
    backgroundColor: 'inherit',
    display: 'inline-block',
    padding: '10px',
    margin: 'auto'
  },
  span: {
    fontFamily: 'Verdana,sans-serif',
    fontSize: '12px',
    lineHeight: '1.5',
    color: 'grey'
  }
}));
const Footer = () => {
  const [scrolled, setScrolled] = useState(false);
  const [bgColour, setBgColour] = useState('#4C65CC');

  const classes = useStyles();
  useEffect(() => {
    window.addEventListener('scroll', () => {
      const isTop = window.scrollY < 150;

      isTop !== true ? setScrolled(true) : setScrolled(false);
    });
  }, []);

  function handleGoToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  const scrollToTop = () => {
    const c = document.documentElement.scrollTop || document.body.scrollTop;
    console.log(c);
    if (c > 0 && c < 1000) {
      window.requestAnimationFrame(scrollToTop);
      window.scrollTo(0, c - c / 20);
    }
    if (c >= 1000) {
      window.requestAnimationFrame(scrollToTop);
      window.scrollTo(0, c - c / 70);
    }
  };

  return (
    <footer className={classes.container}>
      <SocialMediaButtons
        links={['https://www.facebook.com', 'https://www.twitter.com']}
        buttonStyle={{
          borderRadius: '50%',
          backgroundColor: bgColour
        }}
        fill="black"
        iconStyle={iconStyle}
      />
      <span
        style={{
          fontFamily: 'Verdana,sans-serif',
          fontSize: '12px',
          lineHeight: '1.5'
        }}
      >
        <b>&#169; 2021.</b> All rights reserved.
      </span>
      <div style={{ textAlign: 'center' }}>
        <img
          src={Elev}
          onClick={() => scrollToTop()}
          style={{ maxHeight: '10vh', maxWidth: '10vw' }}
          className={classes.button}
          id="goToTop"
        ></img>
      </div>
      <div>
        <span className={classes.span}>
          {' '}
          Take The Elevator Up To The Roof Top
        </span>
      </div>

      <CookieConsent
        onAccept={() => {
          try {
            fetch('https://ipapi.co/json/')
              .then((response) => response.json())
              .then((res) => {
                console.log(Cookies.set('country', res.country_name));
              });
          } catch (e) {}
        }}
      >
        This website uses cookies to enhance the user experience.
      </CookieConsent>
    </footer>
  );
};

export default Footer;
