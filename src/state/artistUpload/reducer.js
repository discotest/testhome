import genericReducer from 'utils/generic-reducer';
import uuid from 'react-uuid';
import { get, range } from 'lodash';
import { Types } from './actions';

const trackForm = {
  songName: '',
  songArtists: '',
  genre: {
    value: 'genre 1',
    options: [
      { value: 'genre 1', label: 'Genre 1' },
      { value: 'genre 2', label: 'Genre 2' },
      { value: 'genre 3', label: 'Genre 3' },
      { value: 'genre 4', label: 'Genre 4' },
    ],
  },
  subgenres: '',
  bpm: '',
  key: '',
};

const generateTrackForm = () => ({
  ...trackForm,
  id: uuid(),
});

const initialState = {
  selectedForm: 'single',
  uploadSingleForm: {
    songName: '',
    genre: {
      value: 'genre 1',
      options: [
        { value: 'genre 1', label: 'Genre 1' },
        { value: 'genre 2', label: 'Genre 2' },
        { value: 'genre 3', label: 'Genre 3' },
        { value: 'genre 4', label: 'Genre 4' },
      ],
    },
    subgenres: '',
    albumArtist: '',
    bpm: '',
    key: '',
    description: '',
  },
  uploadAlbumForm: {
    albumName: '',
    numberOfTracks: {
      value: '1',
      options: range(1, 30).map((value) => ({
        value: String(value),
        label: String(value),
      })),
    },
    albumGenre: {
      value: 'electronic',
      options: [
        { value: 'electronic', label: 'Electronic' },
        { value: 'rock', label: 'Rock' },
        { value: 'jazz', label: 'Jazz' },
      ],
    },
    albumArtist: '',
    description: '',
    tracks: [generateTrackForm()],
  },
};

const reductionLookup = {
  [Types.switchFormType]: (_, selectedForm) => ({ ...initialState, selectedForm }),
  [Types.uploadSingleFormUpdated]: (state, { path, value }) => {
    const currentForm = get(state, 'uploadSingleForm', {});
    if (path === 'genre.value') {
      const currentGenres = get(currentForm, 'genre', {});
      const updatedForm = {
        ...currentForm,
        genre: {
          ...currentGenres,
          value,
        },
      };
      return {
        ...state,
        uploadSingleForm: updatedForm,
      };
    }
    const updatedForm = {
      ...currentForm,
      [path]: value,
    };
    return {
      ...state,
      uploadSingleForm: updatedForm,
    };
  },
  [Types.uploadAlbumFormUpdated]: (state, { path, value }) => {
    const currentForm = get(state, 'uploadAlbumForm', {});
    if (path === 'albumGenre.value') {
      const currentGenres = get(currentForm, 'albumGenre', {});
      const updatedForm = {
        ...currentForm,
        albumGenre: {
          ...currentGenres,
          value,
        },
      };
      return {
        ...state,
        uploadAlbumForm: updatedForm,
      };
    }
    if (path === 'numberOfTracks.value') {
      const currentNumberOfTracks = get(currentForm, 'numberOfTracks', {});
      const currentTracks = get(currentForm, 'tracks', []);
      const newNumber = Number(value);
      const tracks = newNumber <= currentTracks.length
        ? currentTracks.slice(0, newNumber)
        : [
          ...currentTracks,
          ...range(newNumber - currentTracks.length).map(() => generateTrackForm()),
        ];
      const updatedForm = {
        ...currentForm,
        numberOfTracks: {
          ...currentNumberOfTracks,
          value,
        },
        tracks,
      };
      return {
        ...state,
        uploadAlbumForm: updatedForm,
      };
    }
    const updatedForm = {
      ...currentForm,
      [path]: value,
    };
    return {
      ...state,
      uploadAlbumForm: updatedForm,
    };
  },
  [Types.uploadAlbumFormTrackUpdated]: (state, { path, index, value }) => {
    const currentForm = get(state, 'uploadAlbumForm', {});
    const currentTracks = get(currentForm, 'tracks', []);
    const targetTrack = get(currentTracks, index, {});
    const currentGenres = get(targetTrack, 'genre', {});
    const updatedTrack = (path === 'genre.value')
      ? {
        ...targetTrack,
        genre: {
          ...currentGenres,
          value,
        },
      } : {
        ...targetTrack,
        [path]: value,
      };
    return {
      ...state,
      uploadAlbumForm: {
        ...currentForm,
        tracks: [
          ...currentTracks.slice(0, index),
          updatedTrack,
          ...currentTracks.slice(index + 1, currentTracks.length),
        ],
      },
    };
  },
  [Types.uploadAlbumFormAddTrack]: (state) => {
    const currentForm = get(state, 'uploadAlbumForm', {});
    const currentTracks = get(currentForm, 'tracks', []);
    const currentNumberOfTracks = get(currentForm, 'numberOfTracks', {});
    const currentNumberOfTracksValue = Number(get(currentNumberOfTracks, 'value', '1'));
    return {
      ...state,
      uploadAlbumForm: {
        ...currentForm,
        numberOfTracks: {
          ...currentNumberOfTracks,
          value: String(currentNumberOfTracksValue + 1),
        },
        tracks: [...currentTracks, generateTrackForm()],
      },
    };
  },
};

export default genericReducer(initialState, reductionLookup);
