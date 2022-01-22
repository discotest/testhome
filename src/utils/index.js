import { get } from 'lodash';

export const validateEmail = (email = '') => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

export const validateRegisterForm = (form) => {
  if (!get(form, 'agreeWithTerms')) return false;
  if (!get(form, 'username')) return false;
  if (!get(form, 'userType')) return false;
  if (!get(form, 'country.value')) return false;
  if (!get(form, 'password')) return false;
  if (get(form, 'password') !== get(form, 'repeatPassword')) return false;
  if (!get(form, 'email') || !validateEmail(get(form, 'email'))) return false;
  return true;
};

export const validateLoginForm = (form) => {
  if (!get(form, 'email') || !validateEmail(get(form, 'email'))) return false;
  if (!get(form, 'password')) return false;
  return true;
};
