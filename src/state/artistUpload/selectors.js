import { get } from 'lodash';

const reducer = 'artistUploadReducer';

export const uploadSingleForm = (state) => get(state, `${reducer}.uploadSingleForm`, {});
export const uploadAlbumForm = (state) => get(state, `${reducer}.uploadAlbumForm`, {});
export const selectedForm = (state) => get(state, `${reducer}.selectedForm`, 'single');
