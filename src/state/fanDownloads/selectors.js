import { get } from 'lodash';

const reducer = 'fanDownloadsReducer';

const downloads = (state) => get(state, `${reducer}.downloads`, {});

export default {
  downloads,
};
