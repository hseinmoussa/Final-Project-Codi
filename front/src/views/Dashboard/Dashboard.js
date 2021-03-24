import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import './Dashboard.css';

import users from './users.png';
import countries from './countries.jpg';
import states from './states.png';
import admins from './admins.jpg';
import hobbies from './hobbies.jpg';
import events from './events.png';
import usersHobbies from './usersHobbies.jpeg';
import eventsHobbies from './eventsHobbies.jpeg';

const Dashboard = (props) => {
  const [state, setState] = useState('');
  const [admin, setAdminCount] = useState('');
  const [userCount, setUserCount] = useState('');
  const [hobby, setHobbyCount] = useState('');
  const [userHobby, setUserHobbiesCount] = useState('');
  const [country, setCountriesCount] = useState('');
  const [eventHobby, setEventHobbyCount] = useState('');
  const [event, setEventsCount] = useState('');

  const image = 'https://placekitten.com/220/130';

  const token = localStorage.getItem('tokenAdmin');

  useEffect(() => {
    Axios.get(process.env.REACT_APP_URL + `admin/states/1000`, {
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer ' + token
      }
    })
      .then((response) => {
        setState(response.data.data.total);
      })
      .catch((err) => console.log(err));
  }, []);
  useEffect(() => {
    Axios.get(process.env.REACT_APP_URL + `admin/users/1000`, {
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer ' + token
      }
    })
      .then((response) => {
        setUserCount(response.data.data.total);
      })
      .catch((err) => console.log(err));
  }, []);
  useEffect(() => {
    Axios.get(process.env.REACT_APP_URL + `admin/admins/1000`, {
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer ' + token
      }
    })
      .then((response) => {
        setAdminCount(response.data.data.total);
      })
      .catch((err) => console.log(err));
  }, []);
  useEffect(() => {
    Axios.get(process.env.REACT_APP_URL + `admin/hobbies/1000`, {
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer ' + token
      }
    })
      .then((response) => {
        setHobbyCount(response.data.data.total);
      })
      .catch((err) => console.log(err));
  }, []);
  useEffect(() => {
    Axios.get(process.env.REACT_APP_URL + `admin/hobbies/1000`, {
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer ' + token
      }
    })
      .then((response) => {
        setUserHobbiesCount(response.data.data.total);
      })
      .catch((err) => console.log(err));
  }, []);
  useEffect(() => {
    Axios.get(process.env.REACT_APP_URL + `admin/countries/1000`, {
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer ' + token
      }
    })
      .then((response) => {
        setCountriesCount(response.data.data.total);
      })
      .catch((err) => console.log(err));
  }, []);
  useEffect(() => {
    Axios.get(process.env.REACT_APP_URL + `admin/events_hobbies/1000`, {
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer ' + token
      }
    })
      .then((response) => {
        setEventHobbyCount(response.data.data.total);
      })
      .catch((err) => console.log(err));
  }, []);
  useEffect(() => {
    Axios.get(process.env.REACT_APP_URL + `admin/events/1000`, {
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer ' + token
      }
    })
      .then((response) => {
        setEventsCount(response.data.data.total);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="home-container">
      <div className="home-wrapper">
        <div className="card">
          <Link className="home-link" to="/admin/customers">
            <div className="card-container">
              <div className="card-image">
                <img className="image" src={users} />
              </div>
              <div className="count">
                <div className="category">
                  <span>Users</span>
                  <div className="number">
                    <span>{userCount}</span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div>

        <div className="card">
          <Link className="home-link" to="/admin/states">
            <div className="card-container">
              <div className="card-image">
                <img className="image" src={states} />
              </div>
              <div className="count">
                <div className="category">
                  <span>States</span>
                  <div className="number">
                    <span>{state}</span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div>

        <div className="card">
          <Link className="home-link" to="/admin/admins">
            <div className="card-container">
              <div className="card-image">
                <img className="image" src={admins} />
              </div>
              <div className="count">
                <div className="category">
                  <span>Admins</span>
                  <div className="number">
                    <span>{admin}</span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div>

        <div className="card">
          <Link className="home-link" to="/admin/hobbies">
            <div className="card-container">
              <div className="card-image">
                <img className="image" src={hobbies} />
              </div>
              <div className="count">
                <div className="category">
                  <span>Hobbies</span>
                  <div className="number">
                    <span>{hobby}</span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div>

        <div className="card">
          <Link className="home-link" to="/admin/usersHobbies">
            <div className="card-container">
              <div className="card-image">
                <img className="image" src={usersHobbies} />
              </div>
              <div className="count">
                <div className="category">
                  <span>Users Hobbies</span>
                  <div className="number">
                    <span>{userHobby}</span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div>

        <div className="card">
          <Link className="home-link" to="/admin/countries">
            <div className="card-container">
              <div className="card-image">
                <img className="image" src={countries} />
              </div>
              <div className="count">
                <div className="category">
                  <span>Countries</span>
                  <div className="number">
                    <span>{country}</span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div>

        <div className="card">
          <Link className="home-link" to="/admin/eventsHobbies">
            <div className="card-container">
              <div className="card-image">
                <img className="image" src={eventsHobbies} />
              </div>
              <div className="count">
                <div className="category">
                  <span>Events Hobbies</span>
                  <div className="number">
                    <span>{eventHobby}</span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div>

        <div className="card">
          <Link className="home-link" to="/admin/events">
            <div className="card-container">
              <div className="card-image">
                <img className="image" src={events} />
              </div>
              <div className="count">
                <div className="category">
                  <span>Events</span>
                  <div className="number">
                    <span>{event}</span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
