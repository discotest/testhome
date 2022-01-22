import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';

import authenticationReducer from 'state/authentication/reducer';
import artistUploadReducer from 'state/artistUpload/reducer';
import artistDownloadsReducer from 'state/artistDownloads/reducer';
import fanDownloadsReducer from 'state/fanDownloads/reducer';

const rootReducer = combineReducers({
  authenticationReducer,
  artistUploadReducer,
  artistDownloadsReducer,
  fanDownloadsReducer,
});

const store = (extraArguments) => configureStore({
  reducer: rootReducer,
  middleware: [thunk.withExtraArgument(extraArguments)],
});
export default store;
