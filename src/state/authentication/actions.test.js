import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import authenticationActions from './actions';

describe('authentication actions', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  let store;
  let mockStore;
  let api;
  beforeEach(() => {
    api = {};
    const middlewares = [thunk.withExtraArgument({ api })];
    mockStore = configureStore(middlewares);
    store = mockStore();
  });

  describe('loginFormUpdated', () => {
    const run = (path = 'email', value = 'fake-value') => store.dispatch(authenticationActions.loginFormUpdated(path, value));

    it('should be dispatched correctly', async () => {
      await run();
      expect(store.getActions()).toContainEqual(authenticationActions.loginFormUpdated('email', 'fake-value'));
    });
  });

  describe('registerFormUpdated', () => {
    const run = (path = 'email', value = 'fake-value') => store.dispatch(authenticationActions.registerFormUpdated(path, value));

    it('should be dispatched correctly', async () => {
      await run();
      expect(store.getActions()).toContainEqual(authenticationActions.registerFormUpdated('email', 'fake-value'));
    });
  });

  describe('switchFormType', () => {
    const run = (value) => store.dispatch(authenticationActions.switchFormType(value));

    it('should be dispatched correctly', async () => {
      await run('fake-value');
      expect(store.getActions()).toContainEqual(authenticationActions.switchFormType('fake-value'));
    });
  });
});
