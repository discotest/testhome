import genericReducer from 'utils/generic-reducer';
import { Types } from './actions';

const initialState = {
  downloads: [
    {
      songName: 'Master of Puppets',
      artist: 'Metallica',
      genre: 'Heavy Metal',
    },
    {
      songName: 'Billie Jean',
      artist: 'Michael Jackson',
      genre: 'Pop',
    },
  ],
};

const reductionLookup = {
  [Types.downloadListLoaded]: (state, downloads) => ({ ...state, downloads }),
};

export default genericReducer(initialState, reductionLookup);
