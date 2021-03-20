import React, { useState } from 'react';
import { Box, Container, makeStyles } from '@material-ui/core';
import Page from 'src/components/Page';
import Results from './Results';
import Toolbar from './Toolbar';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const StateListView = () => {
  const classes = useStyles();

  const [render, setRender] = useState(0);
  return (
    <Page className={classes.root} title="Customers">
      <Container maxWidth={false}>
        <Toolbar setRender={setRender} render={render} />
        <Box mt={3}>
          <Results render={render} setRender={setRender} />
        </Box>
      </Container>
    </Page>
  );
};

export default StateListView;
