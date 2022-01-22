import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { get } from 'lodash';

const API_URL = 'http://143.244.200.196';

const generateRequestHeader = (token) => ({
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

const setPostRequestPayload = (payload, token) => ({
  ...payload,
  // user: `/user/${get(jwtDecode(token), 'id', '')}`,
  // user: `${get(jwtDecode(token), 'id', '')}`,
});

const api = {
  submitRegisterForm: (form) => axios.post(`${API_URL}/users`, form),
  submitLoginForm: (form) => axios.post(`${API_URL}/authentication_token`, form),
  refreshToken: (refreshToken) => axios.post(`${API_URL}/refresh_token`, { refresh_token: refreshToken }),
  createMedia: (file, token) => {
    const formData = new FormData();
    formData.append('file', file);
    return axios.post(
      `${API_URL}/media_objects`,
      formData,
      generateRequestHeader(token),
    );
  },
  createAlbum: (payload, token) => axios.post(
    `${API_URL}/albums`,
    setPostRequestPayload(payload, token),
    generateRequestHeader(token),
  ),
  createMusic: (payload, token) => axios.post(
    `${API_URL}/music`,
    setPostRequestPayload(payload, token),
    generateRequestHeader(token),
  ),
};

export default api;
