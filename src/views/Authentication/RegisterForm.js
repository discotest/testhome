import { get } from 'lodash';
import React from 'react';
import { useMediaPredicate } from 'react-media-hook';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styled from 'styled-components';
import Button from 'components/Button';
import Input from 'components/Input';
import Dropdown from 'components/Dropdown';
import actions from 'state/authentication/actions';
import { SMALL_DEVICES_WIDTH } from 'utils/constants';

const FormContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  @media (max-width: 900px) {
    flex-direction: column;
  }
`;

const FieldsContainer = styled.div`
  width: 400px;
  max-width: 100%;
  margin: auto;
  @media (max-width: 500px) {
    width: 290px;
  }
`;

const ProfileInfoContainer = styled.div`
  width: 400px;
  max-width: 100%;
  margin: auto;
  @media (max-width: 500px) {
    width: 320px;
  }
  h1 {
    text-align: center;
    font-weight: 800;
    font-size: 40px;
    @media (max-width: ${SMALL_DEVICES_WIDTH}px) {
      font-size: 35px;
    }
  }
  span {
    font-size: 24px;
    font-weight: 800;
  }
`;

const InfoContentContainer = styled.div`
  margin: 20px;
  height: 150px;
`;

const InputContainer = styled.div`
  margin-top: 15px;
`;

const DropdownContainer = styled.div`
  margin-left: 20px;
  margin-top: 15px;
  width: 360px;
  @media (max-width: 500px) {
    width: 290px;
    margin-left: 0px;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 15px;
`;

const ButtonWrapper = styled.div`
  position: relative;
  .button-description {
    height: 20px;
    text-align: center;
    margin: auto;
    span {
      font-size: 12px;
    }
  }
`;

const SubmitButtonContainer = styled.div`
  width: 170px;
  margin: auto;
  margin-top: 30px;
`;

const TermsOfUseContainer = styled.div`
  margin: auto;
  text-align: center;
  margin-top: 20px;
  span {
    font-size: 16px;
    font-weight: 200;
  }
  input {
    cursor: pointer;
  }
`;

const RegisterForm = ({
  registerForm, registerFormUpdated, onSubmitRegister, canSubmit,
}) => {
  const biggerThan500 = useMediaPredicate('(min-width: 500px)');
  return (
    <>
      <FormContainer>
        <FieldsContainer>
          <InputContainer>
            <Input
              label="Email"
              value={get(registerForm, 'email', '')}
              onChange={(e) => registerFormUpdated('email', e.target.value)}
            />
          </InputContainer>
          <InputContainer>
            <Input
              label="New password"
              type="password"
              value={get(registerForm, 'password', '')}
              onChange={(e) => registerFormUpdated('password', e.target.value)}
            />
          </InputContainer>
          <InputContainer>
            <Input
              label="Repeat password"
              type="password"
              value={get(registerForm, 'repeatPassword', '')}
              onChange={(e) => registerFormUpdated('repeatPassword', e.target.value)}
            />
          </InputContainer>
        </FieldsContainer>
        <FieldsContainer>
          <DropdownContainer>
            <Dropdown
              label="Country"
              options={get(registerForm, 'country.options', [])}
              value={get(registerForm, 'country.value', '')}
              onChange={(e) => registerFormUpdated('country.value', e.target.value)}
            />
          </DropdownContainer>
          <DropdownContainer>
            <Dropdown
              label="State"
              options={get(registerForm, 'state.options', [])}
              value={get(registerForm, 'state.value', '')}
              onChange={(e) => registerFormUpdated('state.value', e.target.value)}
            />
          </DropdownContainer>
          <DropdownContainer>
            <Dropdown
              label="City"
              options={get(registerForm, 'city.options', [])}
              value={get(registerForm, 'city.value', '')}
              disabled={get(registerForm, 'city.disabled')}
              onChange={(e) => registerFormUpdated('city.value', e.target.value)}
            />
          </DropdownContainer>
        </FieldsContainer>
      </FormContainer>
      <ProfileInfoContainer>
        <h1>Profile Information</h1>
        <FieldsContainer>
          <InputContainer>
            <Input
              label="Username"
              value={get(registerForm, 'username', '')}
              onChange={(e) => registerFormUpdated('username', e.target.value)}
            />
          </InputContainer>
        </FieldsContainer>
        <InfoContentContainer>
          <span>Are you:</span>
          <ButtonContainer>
            <ButtonWrapper>
              <Button
                width={biggerThan500 ? 168 : 130}
                height={65}
                color="black"
                label="An artist"
                onClick={() => registerFormUpdated('userType', 'artist')}
                hasActiveBorder={get(registerForm, 'userType') === 'artist'}
              />
              <div className="button-description">
                <span>I produce and listen to music</span>
              </div>
            </ButtonWrapper>
            <ButtonWrapper>
              <Button
                width={biggerThan500 ? 168 : 130}
                height={65}
                color="black"
                label="A fan"
                onClick={() => registerFormUpdated('userType', 'fan')}
                hasActiveBorder={get(registerForm, 'userType') === 'fan'}
              />
              <div className="button-description">
                <span>I listen and support artists</span>
              </div>
            </ButtonWrapper>
          </ButtonContainer>
        </InfoContentContainer>
        <TermsOfUseContainer>
          <input
            type="checkbox"
            checked={get(registerForm, 'agreeWithTerms', false)}
            onChange={() => registerFormUpdated('agreeWithTerms', !get(registerForm, 'agreeWithTerms', false))}
          />
          <span>
            I agree with the
            {' '}
            <Link to="/">terms of use</Link>
          </span>
        </TermsOfUseContainer>
        <SubmitButtonContainer>
          <Button
            label="Submit"
            width={150}
            onClick={onSubmitRegister}
            disabled={!canSubmit}
          />
        </SubmitButtonContainer>
      </ProfileInfoContainer>
    </>
  );
};

RegisterForm.propTypes = {
  registerForm: PropTypes.object.isRequired,
  registerFormUpdated: PropTypes.func.isRequired,
  onSubmitRegister: PropTypes.func.isRequired,
  canSubmit: PropTypes.bool,
};

RegisterForm.defaultProps = {
  canSubmit: false,
};

const mapStateToProps = (state) => ({
  registerForm: state.authenticationReducer.registerForm,
  canSubmit: state.authenticationReducer.canSubmitRegisterForm,
});

const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(RegisterForm);
