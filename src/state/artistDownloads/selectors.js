import { get } from 'lodash';

const reducer = 'artistDownloadsReducer';

const downloads = (state) => get(state, `${reducer}.downloads`, {});

export default {
  downloads,
};
