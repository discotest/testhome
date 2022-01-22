import createStore from 'store';
import { get } from 'lodash';
import { Country, State, City } from 'country-state-city';
import actions from './actions';

describe('authentication reducer', () => {
  let store;
  let api;

  beforeEach(() => {
    api = {};
    store = createStore({ api });
  });

  describe('selectedForm', () => {
    it('should be login by default', () => {
      const authenticationReducer = get(store.getState(), 'authenticationReducer');
      expect(authenticationReducer.selectedForm).toBe('login');
    });

    it('should be register after switch action is dispatched', () => {
      store.dispatch(actions.switchFormType('register'));
      const authenticationReducer = get(store.getState(), 'authenticationReducer');
      expect(authenticationReducer.selectedForm).toBe('register');
    });
  });

  describe('loginForm', () => {
    it('should be empty by default', () => {
      const authenticationReducer = get(store.getState(), 'authenticationReducer');
      expect(authenticationReducer.loginForm).toMatchObject({
        email: '',
        password: '',
      });
    });

    it('should update email field after change action is dispatched', () => {
      store.dispatch(actions.loginFormUpdated('email', 'fake-email'));
      const authenticationReducer = get(store.getState(), 'authenticationReducer');
      expect(authenticationReducer.loginForm).toMatchObject({
        email: 'fake-email',
        password: '',
      });
    });

    it('should update password field after change action is dispatched', () => {
      store.dispatch(actions.loginFormUpdated('password', 'fake-password'));
      const authenticationReducer = get(store.getState(), 'authenticationReducer');
      expect(authenticationReducer.loginForm).toMatchObject({
        email: '',
        password: 'fake-password',
      });
    });

    it('should be empty after switching form type', () => {
      store.dispatch(actions.loginFormUpdated('email', 'fake-email'));
      store.dispatch(actions.switchFormType('register'));
      const authenticationReducer = get(store.getState(), 'authenticationReducer');
      expect(authenticationReducer.loginForm).toMatchObject({
        email: '',
        password: '',
      });
    });
  });

  describe('registerForm', () => {
    describe('email', () => {
      it('should be empty by default', () => {
        const authenticationReducer = get(store.getState(), 'authenticationReducer');
        const email = authenticationReducer?.registerForm?.email;
        expect(email).toBe('');
      });

      it('should be updated after change action is dispatched', () => {
        store.dispatch(actions.registerFormUpdated('email', 'fake-email'));
        const authenticationReducer = get(store.getState(), 'authenticationReducer');
        const email = authenticationReducer?.registerForm?.email;
        expect(email).toBe('fake-email');
      });
    });

    describe('password', () => {
      it('should be empty by default', () => {
        const authenticationReducer = get(store.getState(), 'authenticationReducer');
        const password = authenticationReducer?.registerForm?.password;
        expect(password).toBe('');
      });

      it('should be updated after change action is dispatched', () => {
        store.dispatch(actions.registerFormUpdated('password', 'fake-password'));
        const authenticationReducer = get(store.getState(), 'authenticationReducer');
        const password = authenticationReducer?.registerForm?.password;
        expect(password).toBe('fake-password');
      });
    });

    describe('repeatPassword', () => {
      it('should be empty by default', () => {
        const authenticationReducer = get(store.getState(), 'authenticationReducer');
        const repeatPassword = authenticationReducer?.registerForm?.repeatPassword;
        expect(repeatPassword).toBe('');
      });

      it('should be updated after change action is dispatched', () => {
        store.dispatch(actions.registerFormUpdated('repeatPassword', 'fake-password'));
        const authenticationReducer = get(store.getState(), 'authenticationReducer');
        const repeatPassword = authenticationReducer?.registerForm?.repeatPassword;
        expect(repeatPassword).toBe('fake-password');
      });
    });

    describe('country', () => {
      const countries = Country.getAllCountries()
        .map(({ isoCode, name }) => ({ value: isoCode, label: name }));

      it('should be Brazil by default', () => {
        const authenticationReducer = get(store.getState(), 'authenticationReducer');
        const countryValue = authenticationReducer?.registerForm?.country?.value;
        expect(countryValue).toBe('BR');
      });

      it('should have all the countries options', () => {
        const authenticationReducer = get(store.getState(), 'authenticationReducer');
        const countryOptions = authenticationReducer?.registerForm?.country?.options;
        expect(countryOptions).toMatchObject(countries);
      });

      it('should be updated after change event', () => {
        store.dispatch(actions.registerFormUpdated('country.value', 'US'));
        const authenticationReducer = get(store.getState(), 'authenticationReducer');
        const countryValue = authenticationReducer?.registerForm?.country?.value;
        expect(countryValue).toBe('US');
      });
    });

    describe('state', () => {
      const brasilianStates = State.getStatesOfCountry('BR')
        .map(({ isoCode, name }) => ({ value: isoCode, label: name }));

      it('should have no value by default', () => {
        const authenticationReducer = get(store.getState(), 'authenticationReducer');
        const stateValue = authenticationReducer?.registerForm?.state?.value;
        expect(stateValue).toBe('');
      });

      it('should have all brasilian states as options by default', () => {
        const authenticationReducer = get(store.getState(), 'authenticationReducer');
        const stateOptions = authenticationReducer?.registerForm?.state?.options;
        expect(stateOptions).toMatchObject([
          { value: '', label: '' },
          ...brasilianStates,
        ]);
      });

      it('should be updated after change event', () => {
        store.dispatch(actions.registerFormUpdated('state.value', 'SP'));
        const authenticationReducer = get(store.getState(), 'authenticationReducer');
        const stateValue = authenticationReducer?.registerForm?.state?.value;
        expect(stateValue).toBe('SP');
      });

      it('should be empy if country changes', () => {
        store.dispatch(actions.registerFormUpdated('country.value', 'US'));
        const authenticationReducer = get(store.getState(), 'authenticationReducer');
        const stateValue = authenticationReducer?.registerForm?.state?.value;
        expect(stateValue).toBe('');
      });

      it('should have new options if country changes', () => {
        store.dispatch(actions.registerFormUpdated('country.value', 'US'));
        const authenticationReducer = get(store.getState(), 'authenticationReducer');
        const stateOptions = authenticationReducer?.registerForm?.state?.options;
        const newCountryStates = State.getStatesOfCountry('US')
          .map(({ isoCode, name }) => ({ value: isoCode, label: name }));
        expect(stateOptions).toMatchObject([
          { value: '', label: '' },
          ...newCountryStates,
        ]);
      });
    });

    describe('city', () => {
      it('should have no value by default', () => {
        const authenticationReducer = get(store.getState(), 'authenticationReducer');
        const cityValue = authenticationReducer?.registerForm?.city?.value;
        expect(cityValue).toBe('');
      });

      it('should be disabled by default', () => {
        const authenticationReducer = get(store.getState(), 'authenticationReducer');
        const cityIsDisabled = authenticationReducer?.registerForm?.city?.disabled;
        expect(cityIsDisabled).toBe(true);
      });

      it('should have no options by default', () => {
        const authenticationReducer = get(store.getState(), 'authenticationReducer');
        const cityOptions = authenticationReducer?.registerForm?.city?.options;
        expect(cityOptions).toMatchObject([]);
      });

      it('should have options after state is defined', () => {
        store.dispatch(actions.registerFormUpdated('state.value', 'SP'));
        const spCities = City.getCitiesOfState('BR', 'SP')
          .map(({ name }) => ({ value: name, label: name }));
        const authenticationReducer = get(store.getState(), 'authenticationReducer');
        const cityOptions = authenticationReducer?.registerForm?.city?.options;
        expect(cityOptions).toMatchObject([{ value: '', label: '' }, ...spCities]);
      });

      it('should be enabled after state is defined', () => {
        store.dispatch(actions.registerFormUpdated('state.value', 'SP'));
        const authenticationReducer = get(store.getState(), 'authenticationReducer');
        const cityIsDisabled = authenticationReducer?.registerForm?.city?.disabled;
        expect(cityIsDisabled).toBe(false);
      });
    });

    describe('username', () => {
      it('should be empty by default', () => {
        const authenticationReducer = get(store.getState(), 'authenticationReducer');
        const username = authenticationReducer?.registerForm?.username;
        expect(username).toBe('');
      });

      it('should be updated after change action is dispatched', () => {
        store.dispatch(actions.registerFormUpdated('username', 'fake-username'));
        const authenticationReducer = get(store.getState(), 'authenticationReducer');
        const username = authenticationReducer?.registerForm?.username;
        expect(username).toBe('fake-username');
      });
    });

    describe('userType', () => {
      it('should be empty by default', () => {
        const authenticationReducer = get(store.getState(), 'authenticationReducer');
        const userType = authenticationReducer?.registerForm?.userType;
        expect(userType).toBe('');
      });

      it('should be updated after change action is dispatched', () => {
        store.dispatch(actions.registerFormUpdated('userType', 'artist'));
        const authenticationReducer = get(store.getState(), 'authenticationReducer');
        const userType = authenticationReducer?.registerForm?.userType;
        expect(userType).toBe('artist');
      });
    });

    describe('agreeWithTerms', () => {
      it('should be false by default', () => {
        const authenticationReducer = get(store.getState(), 'authenticationReducer');
        const agreeWithTerms = authenticationReducer?.registerForm?.agreeWithTerms;
        expect(agreeWithTerms).toBe(false);
      });

      it('should be updated after change action is dispatched', () => {
        store.dispatch(actions.registerFormUpdated('agreeWithTerms', true));
        const authenticationReducer = get(store.getState(), 'authenticationReducer');
        const agreeWithTerms = authenticationReducer?.registerForm?.agreeWithTerms;
        expect(agreeWithTerms).toBe(true);
      });
    });
  });
});
