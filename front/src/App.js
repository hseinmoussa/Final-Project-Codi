import 'react-perfect-scrollbar/dist/css/styles.css';
import React from 'react';
import { useRoutes, useNavigate } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';
import GlobalStyles from 'src/components/GlobalStyles';
import 'src/mixins/chartjs';
import theme from 'src/theme';
import routes from 'src/routes';

const App = () => {
  const routing = useRoutes(routes);

  const navigate = useNavigate();

  const tokenAdmin = window.localStorage.getItem('tokenAdmin');
  const tokenUser = window.localStorage.getItem('tokenUser');
  const admin = window.localStorage.getItem('Admin');
  const user = window.localStorage.getItem('User');
  const route = window.location.href;

  if (route.includes('/admin') && !tokenAdmin && !admin)
    return <div>{window.location.replace('/Log/dash')}</div>;
  else if (route.includes('/usercostumer') && !tokenUser && !user)
    return <div>{window.location.replace('/loginUser')}</div>;
  else if (window.location.pathname == '/loginUser' && tokenUser && user)
    return <div>{window.location.replace('/Home')}</div>;
  else
    return (
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        {routing}
      </ThemeProvider>
    );
};

export default App;
