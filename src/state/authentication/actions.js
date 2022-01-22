import { get } from 'lodash';
import jwtDecode from 'jwt-decode';
import * as authSelectors from 'state/authentication/selectors';
import { LOCALSTORAGE_REFRESH_TOKEN_KEY } from 'utils/constants';

export const Types = {
  loginFormUpdated: 'AUTH_LOGIN_FORM_UPDATED',
  registerFormUpdated: 'AUTH_REGISTER_FORM_UPDATED',
  switchFormType: 'AUTH_SWITCH_FORM_TYPE',
  resetState: 'AUTH_RESET',
  onSubmitRegister: 'AUTH_REGISTER_FORM_SUBMIT',
  onAuthenticated: 'AUTH_SUCCEEDED',
  onSessionLoaded: 'AUTH_SESSION_LOADED',
};

/* EVENTS */
const loginFormUpdated = (path, value) => (
  { type: Types.loginFormUpdated, payload: { path, value } }
);
const registerFormUpdated = (path, value) => (
  { type: Types.registerFormUpdated, payload: { path, value } }
);
const switchFormType = (formType) => ({ type: Types.switchFormType, payload: formType });
const onSessionLoaded = () => ({ type: Types.onSessionLoaded });
const resetState = () => ({ type: Types.resetState });
const onAuthenticated = (authType, token, username) => ({
  type: Types.onAuthenticated,
  payload: { authType, token, username },
});

/* COMMANDS */
const handleAuthentication = (authResponse) => (dispatch) => {
  const token = get(authResponse, 'data.token', '');
  const refreshToken = get(authResponse, 'data.refresh_token', '');
  const decodedToken = jwtDecode(token);
  const roles = get(decodedToken, 'roles', []);
  const username = get(decodedToken, 'username', '');
  const authType = roles.includes('ROLE_ARTIST') ? 'artist' : 'fan';
  window.localStorage.setItem(LOCALSTORAGE_REFRESH_TOKEN_KEY, refreshToken);
  dispatch(onSessionLoaded());
  dispatch(onAuthenticated(authType, token, username));
};

const onSubmitRegister = () => async (dispatch, getState, { api }) => {
  const state = getState();
  const registerForm = authSelectors.registerForm(state);
  const formToSubmit = {
    email: get(registerForm, 'email', ''),
    roles: get(registerForm, 'userType') === 'artist' ? ['ROLE_ARTIST'] : ['fan'],
    password: get(registerForm, 'password'),
    name: get(registerForm, 'username'),
    country: get(registerForm, 'country.value'),
    state: get(registerForm, 'state.value'),
    city: get(registerForm, 'city.value'),
  };
  try {
    await api.submitRegisterForm(formToSubmit);
    const authResponse = await api.submitLoginForm({
      email: get(registerForm, 'email', ''),
      password: get(registerForm, 'password', ''),
    });
    dispatch(handleAuthentication(authResponse));
  } catch (e) {
    window.alert(e.message);
  }
};

const onSubmitLogin = () => async (dispatch, getState, { api }) => {
  const state = getState();
  const loginForm = authSelectors.loginForm(state);
  try {
    const authResponse = await api.submitLoginForm(loginForm);
    dispatch(handleAuthentication(authResponse));
  } catch (e) {
    window.alert(e.message);
  }
};

const loadSession = () => async (dispatch, getState, { api }) => {
  const refreshToken = window.localStorage.getItem(LOCALSTORAGE_REFRESH_TOKEN_KEY);
  if (!refreshToken) {
    dispatch(onSessionLoaded());
    return;
  }
  const authResponse = await api.refreshToken(refreshToken);
  dispatch(handleAuthentication(authResponse));
};

const Actions = {
  loginFormUpdated,
  registerFormUpdated,
  switchFormType,
  onSubmitRegister,
  resetState,
  onAuthenticated,
  onSubmitLogin,
  loadSession,
};

export default Actions;
