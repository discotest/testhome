export const Types = {
  downloadListLoaded: 'ARTIST_DOWNLOADS_LIST_LOADED',
};

const downloadListLoaded = (payload) => (
  { type: Types.downloadListLoaded, payload }
);

const Actions = {
  downloadListLoaded,
};

export default Actions;
