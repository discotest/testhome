import React, { useEffect, useRef } from 'react';
import { useHistory, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styled from 'styled-components';
import BackgroundImage from 'components/BackgroundImage';
import Divider from 'components/Divider';
import logo from 'assets/logo.png';
import SocialMediaButton from 'components/SocialMediaButton';
import actions from 'state/authentication/actions';
import AuthSwitch from './AuthSwitch';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

const MainContainer = styled.div`
  width: 500px;
  max-width: 90%;
  margin: auto;
  margin-top: 40px;
  margin-bottom: 40px;
  display: flex;
  align-items: center;
  flex-direction: column;
  font-family: Roobert;
`;

const Authentication = ({
  selectedForm,
  auth,
}) => {
  const initialRender = useRef(true);
  const history = useHistory();

  useEffect(() => {
    if (initialRender.current) {
      // check localstorage for token and auth type
      initialRender.current = false;
      return;
    }
    history.push('/');
  }, [auth]);
  return (
    <MainContainer>
      <BackgroundImage src={logo} width={200} height={133} />
      <AuthSwitch />
      <SocialMediaButton socialMedia="facebook" />
      <SocialMediaButton socialMedia="google" />
      <Divider size={30} />
      {selectedForm === 'login' && <LoginForm />}
      {selectedForm === 'register' && <RegisterForm />}
    </MainContainer>
  );
};

Authentication.propTypes = {
  selectedForm: PropTypes.string.isRequired,
  auth: PropTypes.string,
};

Authentication.defaultProps = {
  auth: '',
};

const mapStateToProps = (state) => ({
  selectedForm: state.authenticationReducer.selectedForm,
  auth: state.authenticationReducer.auth,
});

const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Authentication));
