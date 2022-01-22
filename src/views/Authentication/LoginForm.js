import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styled from 'styled-components';
import Input from 'components/Input';
import Button from 'components/Button';
import actions from 'state/authentication/actions';
import { SMALL_DEVICES_WIDTH } from 'utils/constants';
import * as authSelectors from 'state/authentication/selectors';

const TextContainer = styled.div`
  color: #868D96;
  font-size: 14px;
  margin-top: 5px;
`;

const ButtonContainer = styled.div`
  margin-top: 25px;
`;

const InputContainer = styled.div`
  width: 400px;
  @media (max-width: ${SMALL_DEVICES_WIDTH}px) {
    width: 290px;
  }
`;

const LoginForm = ({
  loginForm,
  loginFormUpdated,
  onSubmitLogin,
  canSubmit,
}) => (
  <>
    <InputContainer>
      <Input
        label="Email"
        value={get(loginForm, 'email', '')}
        onChange={(e) => loginFormUpdated('email', e.target.value)}
      />
    </InputContainer>
    <InputContainer>
      <Input
        label="Password"
        type="password"
        value={get(loginForm, 'password', '')}
        onChange={(e) => loginFormUpdated('password', e.target.value)}
      />
    </InputContainer>
    <TextContainer>
      <span>We&apos;ll never share your information with anyone else</span>
    </TextContainer>
    <ButtonContainer>
      <Button
        label="Submit"
        onClick={onSubmitLogin}
        disabled={!canSubmit}
      />
    </ButtonContainer>
  </>
);

LoginForm.propTypes = {
  loginForm: PropTypes.object.isRequired,
  loginFormUpdated: PropTypes.func.isRequired,
  onSubmitLogin: PropTypes.func.isRequired,
  canSubmit: PropTypes.bool,
};

LoginForm.defaultProps = {
  canSubmit: false,
};

const mapStateToProps = (state) => ({
  loginForm: authSelectors.loginForm(state),
  canSubmit: authSelectors.canSubmitLoginForm(state),
});

const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
