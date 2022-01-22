import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Switch,
  Route,
  BrowserRouter as Router,
  Redirect,
} from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import GlobalStyles from 'globalStyles';
import { lightTheme, darkTheme } from 'themes';
import './App.css';
import Navbar from 'components/Navbar';
import FanHome from 'views/FanHome';
import ArtistHome from 'views/ArtistHome';
import ArtistPublic from 'views/ArtistPublic';
import LandingPage from 'views/LandingPage';
import Authentication from 'views/Authentication';
import * as authenticationSelectors from 'state/authentication/selectors';
import actions from 'state/authentication/actions';
import Home from 'views/Home/home';

const App = ({
  auth = '',
  darkMode,
  loadSession,
  sessionLoaded,
}) => {
  useEffect(() => {
    loadSession();
  }, []);
  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <GlobalStyles />
      <Router>
        <Switch>
          <Route
            exact
            path={['/', '/analytics', '/upload', '/downloads']}
            render={() => {
              if (!sessionLoaded) return null;
              if (!auth) return <LandingPage />;
              return (
                <>
                  <Navbar />
                  {(auth === 'fan') && <FanHome />}
                  {(auth === 'artist') && <ArtistHome />}
                </>
              );
            }}
          />
          <Route exact path="/authentication" component={Authentication} />
          <Route exact path="/home" component={Home} />
          <Route
            exact
            path="/artist/:id"
            render={() => (
              <>
                <Navbar />
                <ArtistPublic />
              </>
            )}
          />
          <Redirect from="*" to="/" />
        </Switch>
      </Router>
    </ThemeProvider>
  );
};

App.propTypes = {
  auth: PropTypes.string,
  darkMode: PropTypes.bool,
  sessionLoaded: PropTypes.bool,
  loadSession: PropTypes.func.isRequired,
};

App.defaultProps = {
  auth: '',
  darkMode: false,
  sessionLoaded: false,
};

const mapStateToProps = (state) => ({
  auth: authenticationSelectors.auth(state),
  sessionLoaded: authenticationSelectors.sessionLoaded(state),
});

const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(App);
