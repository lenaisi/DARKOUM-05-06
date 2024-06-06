// store.js

import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Importez le type de stockage que vous souhaitez utiliser

import userReducer from './userSlice';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user'], 
};

const persistedUserReducer = persistReducer(persistConfig, userReducer);

export const store = configureStore({
  reducer: {
    user: persistedUserReducer,
  },
});

export const persistor = persistStore(store);
