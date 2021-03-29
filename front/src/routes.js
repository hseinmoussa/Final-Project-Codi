import React from 'react';
import { Navigate } from 'react-router-dom';
import DashboardLayout from 'src/layouts/DashboardLayout';
import MainLayout from 'src/layouts/MainLayout';
import AccountView from 'src/views/account/AccountView';
import CustomerListView from 'src/views/customer/CustomerListView';
import AdminListView from 'src/views/admin/AdminListView';
import HobbyListView from 'src/views/hobbies/HobbyListView';
import CountryListView from 'src/views/countries/CountryListView';
import EventHobbyListView from 'src/views/event_hobby/EventHobbyListView';
import StateListView from 'src/views/states/StateListView';
import UserHobbyListView from 'src/views/user_hobby/UserHobbyListView';

import DashboardView from 'src/views/reports/DashboardView';
import LoginView from 'src/views/auth/LoginView';
import LoginUser from 'src/views/auth/LoginUser';
import Forgot from 'src/views/auth/Forgot';
import ResetPassword from 'src/views/auth/ResetPassword';

import NotFoundView from 'src/views/errors/NotFoundView';
import EventListView from 'src/views/event/EventListView';
import RegisterView from 'src/views/auth/RegisterView';
import SettingsView from 'src/views/settings/SettingsView';

import Dashboard from 'src/views/Dashboard/Dashboard';

import Home from 'src/views/Home/Home';

import Events from 'src/views/Events/Events';
import EventsByHobby from 'src/views/Events/EventsByHobby';
import Event from 'src/views/Events/Event';

import Freelancers from 'src/views/Freelancers/Freelancers';
import User from 'src/views/Freelancers/User';
import Partner from 'src/views/Freelancers/Partner';

import Not_Freelancers from 'src/views/Freelancers/Not_Freelancers';

import UserAccount from 'src/views/UserAccount/UserAccount';
import EventCRUD from 'src/views/UserAccount/Events';
import HobbyCRUD from 'src/views/UserAccount/Hobbies';

import Test from 'src/views/test';

const routes = [
  {
    path: 'admin',
    element: <DashboardLayout />,
    children: [
      { path: 'account', element: <AccountView /> },
      { path: 'customers', element: <CustomerListView /> },
      { path: 'admins', element: <AdminListView /> },
      { path: 'hobbies', element: <HobbyListView /> },
      { path: 'countries', element: <CountryListView /> },
      { path: 'eventsHobbies', element: <EventHobbyListView /> },
      { path: 'usersHobbies', element: <UserHobbyListView /> },
      { path: 'states', element: <StateListView /> },
      { path: 'dashboard', element: <Dashboard /> },
      { path: 'events', element: <EventListView /> },
      { path: 'settings', element: <SettingsView /> },
      { path: '/', element: <Dashboard /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  },

  {
    path: '/Log',
    // element: <MainLayout />,
    children: [
      { path: 'dash', element: <LoginView /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  },

  {
    path: '/',
    // element: <MainLayout />,
    children: [
      { path: 'loginUser', element: <LoginUser /> },
      { path: 'forgot', element: <Forgot /> },
      { path: 'resetpass/:id', element: <ResetPassword /> },
      { path: 'register', element: <RegisterView /> },
      { path: 'home', element: <Home /> },
      { path: 'Events', element: <Events /> },
      { path: 'EventsByHobby/:id', element: <EventsByHobby /> },
      { path: 'Event/:id', element: <Event /> },

      { path: 'Freelancers', element: <Freelancers /> },
      { path: 'Not_Freelancers', element: <Not_Freelancers /> },
      { path: 'freelancer/:id', element: <User /> },
      { path: 'partner/:id', element: <Partner /> },

      { path: '404', element: <NotFoundView /> },
      { path: 'test', element: <Test /> },
      { path: '/', element: <Navigate to="/home" /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  },

  {
    path: '/usercostumer',
    // element: <MainLayout />,
    children: [
      { path: '/account', element: <UserAccount /> },
      { path: '/events', element: <EventCRUD /> },
      { path: '/hobbies', element: <HobbyCRUD /> }
    ]
  }
];

export default routes;
