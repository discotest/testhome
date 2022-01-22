import { get } from 'lodash';
import genericReducer from 'utils/generic-reducer';
import { Country, State, City } from 'country-state-city';
import { validateRegisterForm, validateLoginForm } from 'utils';
import { Types } from './actions';

const countries = Country.getAllCountries()
  .map(({ isoCode, name }) => ({ value: isoCode, label: name }));

const brasilianStates = State.getStatesOfCountry('BR')
  .map(({ isoCode, name }) => ({ value: isoCode, label: name }));

const initialState = {
  selectedForm: 'login',
  loginForm: {
    email: '',
    password: '',
  },
  registerForm: {
    email: '',
    password: '',
    repeatPassword: '',
    country: {
      value: 'BR',
      options: countries,
    },
    state: {
      value: '',
      options: [{ value: '', label: '' }, ...brasilianStates],
    },
    city: {
      value: '',
      options: [],
      disabled: true,
    },
    username: '',
    userType: '',
    agreeWithTerms: false,
  },
  canSubmitRegisterForm: false,
  canSubmitLoginForm: false,
  auth: '',
  token: '',
  username: '',
  sessionLoaded: false,
};

const reductionLookup = {
  [Types.switchFormType]: (state, selectedForm) => ({
    ...initialState,
    auth: get(state, 'auth', ''),
    token: get(state, 'token', ''),
    username: get(state, 'username', ''),
    selectedForm,
  }),
  [Types.onAuthenticated]: (_, { authType, token, username }) => (
    {
      ...initialState,
      sessionLoaded: true,
      auth: authType,
      token,
      username,
    }
  ),
  [Types.loginFormUpdated]: (state, { path, value }) => {
    const currentLoginForm = { ...get(state, 'loginForm', {}) };
    const updatedLoginForm = {
      ...currentLoginForm,
      [path]: value,
    };
    const canSubmitLoginForm = validateLoginForm(updatedLoginForm);
    return {
      ...state,
      loginForm: updatedLoginForm,
      canSubmitLoginForm,
    };
  },
  [Types.registerFormUpdated]: (state, { path, value }) => {
    const currentRegisterForm = { ...get(state, 'registerForm', {}) };
    if (path === 'country.value') {
      const currentCountry = get(state, 'registerForm.country', {});
      const newStatesOptions = State.getStatesOfCountry(value)
        .map(({ isoCode, name }) => ({ value: isoCode, label: name }));
      const updatedRegisterForm = {
        ...currentRegisterForm,
        country: {
          ...currentCountry,
          value,
        },
        state: {
          value: '',
          options: [{ value: '', label: '' }, ...newStatesOptions],
        },
        city: {
          value: '',
          options: [],
          disabled: true,
        },
      };
      const canSubmitRegisterForm = validateRegisterForm(updatedRegisterForm);
      return {
        ...state,
        registerForm: updatedRegisterForm,
        canSubmitRegisterForm,
      };
    }

    if (path === 'state.value') {
      const currentCountry = get(state, 'registerForm.country.value', '');
      const currentStates = get(state, 'registerForm.state', {});
      const newCityOptions = City.getCitiesOfState(currentCountry, value)
        .map(({ name }) => ({ value: name, label: name }));
      const updatedRegisterForm = {
        ...currentRegisterForm,
        state: {
          ...currentStates,
          value,
        },
        city: {
          value: '',
          options: [{ value: '', label: '' }, ...newCityOptions],
          disabled: false,
        },
      };
      const canSubmitRegisterForm = validateRegisterForm(updatedRegisterForm);
      return {
        ...state,
        registerForm: updatedRegisterForm,
        canSubmitRegisterForm,
      };
    }

    if (path === 'city.value') {
      const currentCity = get(state, 'registerForm.city', {});
      const updatedRegisterForm = {
        ...currentRegisterForm,
        city: {
          ...currentCity,
          value,
        },
      };
      const canSubmitRegisterForm = validateRegisterForm(updatedRegisterForm);
      return {
        ...state,
        registerForm: updatedRegisterForm,
        canSubmitRegisterForm,
      };
    }

    const updatedRegisterForm = {
      ...currentRegisterForm,
      [path]: value,
    };
    const canSubmitRegisterForm = validateRegisterForm(updatedRegisterForm);
    return {
      ...state,
      registerForm: updatedRegisterForm,
      canSubmitRegisterForm,
    };
  },
  [Types.onSessionLoaded]: (state) => ({
    ...state,
    sessionLoaded: true,
  }),
  [Types.resetState]: () => initialState,
};

export default genericReducer(initialState, reductionLookup);
