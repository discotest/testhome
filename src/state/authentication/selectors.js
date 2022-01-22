import { get } from 'lodash';

const reducer = 'authenticationReducer';

export const loginForm = (state) => get(state, `${reducer}.loginForm`, {});
export const registerForm = (state) => get(state, `${reducer}.registerForm`, {});
export const canSubmitLoginForm = (state) => get(state, `${reducer}.canSubmitLoginForm`, false);
export const canSubmitRegisterForm = (state) => get(state, `${reducer}.canSubmitRegisterForm`, false);
export const auth = (state) => get(state, `${reducer}.auth`, '');
export const sessionLoaded = (state) => get(state, `${reducer}.sessionLoaded`, '');
export const token = (state) => get(state, `${reducer}.token`, '');
