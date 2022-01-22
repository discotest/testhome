import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styled from 'styled-components';
import actions from 'state/authentication/actions';

const MainContainer = styled.div`
  height: 90px;
  width: 350px;
  margin-top: 30px;
`;

const OptionsContainer = styled.div`
  height: 50px;
  width: 190px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: auto;
`;

const AuthOption = styled.div`
  font-size: 28px;
  font-weight: 900;
  color: ${(props) => (props.isActive ? 'black' : '#6B6B6B')};
  cursor: pointer;
`;

const RegisterTextContainer = styled.div`
  margin: auto;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 289px;
  font-size: 15px;
  .register-text {
    color: #868E96;
  }
  .anchor-text {
    color: #0080FF;
    text-decoration: underline;
    cursor: pointer;
    margin-left: 3px;
  }
`;

const AuthSwitch = ({ selectedForm = 'login', switchFormType }) => (
  <MainContainer>
    <OptionsContainer>
      <AuthOption
        isActive={selectedForm === 'login'}
        onClick={() => switchFormType('login')}
      >
        Login
      </AuthOption>
      <AuthOption
        isActive={selectedForm === 'register'}
        onClick={() => switchFormType('register')}
      >
        Register
      </AuthOption>
    </OptionsContainer>
    <RegisterTextContainer>
      <div className="register-text">
        {selectedForm === 'login' ? 'Not registered yet?' : 'Already have an account?'}
      </div>
      <div
        className="anchor-text"
        onClick={() => switchFormType(selectedForm === 'login' ? 'register' : 'login')}
      >
        {selectedForm === 'login' ? 'Create an account now' : 'Log in now'}
      </div>
    </RegisterTextContainer>
  </MainContainer>
);

AuthSwitch.propTypes = {
  selectedForm: PropTypes.oneOf(['login', 'register']).isRequired,
  switchFormType: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  selectedForm: state.authenticationReducer.selectedForm,
});

const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(AuthSwitch);
