export const Types = {
  downloadListLoaded: 'FAN_DOWNLOADS_LIST_LOADED',
};

const downloadListLoaded = (payload) => (
  { type: Types.downloadListLoaded, payload }
);

const Actions = {
  downloadListLoaded,
};

export default Actions;
