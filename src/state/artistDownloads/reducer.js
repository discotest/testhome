import genericReducer from 'utils/generic-reducer';
import { Types } from './actions';

const initialState = {
  downloads: [
    {
      songName: 'Hear me now',
      artist: 'Alok',
      genre: 'Electronic',
    },
    {
      songName: 'Shine on you crazy diamond',
      artist: 'Pink Floyd',
      genre: 'Rock',
    },
  ],
};

const reductionLookup = {
  [Types.downloadListLoaded]: (state, downloads) => ({ ...state, downloads }),
};

export default genericReducer(initialState, reductionLookup);
