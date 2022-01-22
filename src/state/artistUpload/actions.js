import { get, isNil } from 'lodash';
import * as authenticationSelectors from 'state/authentication/selectors';
import * as artistUploadSelectors from 'state/artistUpload/selectors';

export const Types = {
  uploadSingleFormUpdated: 'ARTIST_UPLOAD_SINGLE_FORM_UPDATED',
  uploadAlbumFormUpdated: 'ARTIST_UPLOAD_ALBUM_FORM_UPDATED',
  uploadAlbumFormTrackUpdated: 'ARTIST_UPLOAD_ALBUM_FORM_TRACK_UPDATED',
  uploadAlbumFormAddTrack: 'ARTIST_UPLOAD_ALBUM_FORM_ADD_TRACK',
  switchFormType: 'ARTIST_UPLOAD_FORM_SWITCH',
};

// EVENTS
const uploadSingleFormUpdated = (path, value) => (
  { type: Types.uploadSingleFormUpdated, payload: { path, value } }
);
const uploadAlbumFormUpdated = (path, value) => (
  { type: Types.uploadAlbumFormUpdated, payload: { path, value } }
);
const uploadAlbumFormTrackUpdated = (path, index, value) => (
  { type: Types.uploadAlbumFormTrackUpdated, payload: { path, index, value } }
);
const switchFormType = (value) => ({ type: Types.switchFormType, payload: value });
const uploadAlbumFormAddTrack = () => ({ type: Types.uploadAlbumFormAddTrack });

// COMMANDS
const onSubmitUpload = (albumCoverImg, tracksPayload = {}, type = 'album') => async (
  dispatch,
  getState,
  { api },
) => {
  const state = getState();
  const token = authenticationSelectors.token(state);
  const form = type === 'album'
    ? artistUploadSelectors.uploadAlbumForm(state)
    : artistUploadSelectors.uploadSingleForm(state);

  try {
    // create album/single cover
    const albumCoverResponse = await api.createMedia(albumCoverImg, token);
    const albumCoverImgId = get(albumCoverResponse, 'data.@id', '');

    // create album/single
    const createAlbumPayload = {
      name: type === 'album' ? get(form, 'albumName', '') : get(form, 'songName', ''),
      type,
      image: albumCoverImgId,
      active: true,
    };
    const createAlbumResponse = await api.createAlbum(createAlbumPayload, token);
    const newAlbumId = get(createAlbumResponse, 'data.@id', '');

    // create media for tracks
    const orderedMediaTracksKeys = Object.keys(tracksPayload).sort((a, b) => a - b);
    const createdMedia = await Promise.all(orderedMediaTracksKeys
      .reduce((apiPromises, key) => (isNil(tracksPayload[key])
        ? [...apiPromises]
        : [...apiPromises, api.createMedia(tracksPayload[key], token)]
      ), []));
    const createdMediaIds = createdMedia.map((media) => get(media, 'data.@id'));

    // create musics
    if (type === 'album') {
      const tracks = get(form, 'tracks', []);
      await Promise.all(tracks.map((track, index) => api.createMusic(
        {
          name: get(track, 'songName', ''),
          description: 'fake-description',
          fileName: createdMediaIds[index],
          album: newAlbumId,
          active: true,
        },
        token,
      )));
    } else {
      await api.createMusic(
        {
          name: get(form, 'songName', ''),
          description: get(form, 'description', ''),
          fileName: createdMediaIds[0],
          album: newAlbumId,
          active: true,
        },
        token,
      );
    }
    window.alert('Upload completed!');
  } catch (error) {
    window.alert(error);
  }
};

const Actions = {
  uploadSingleFormUpdated,
  uploadAlbumFormUpdated,
  switchFormType,
  uploadAlbumFormTrackUpdated,
  uploadAlbumFormAddTrack,
  onSubmitUpload,
};

export default Actions;
