import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Usa localStorage
import userReducer from '../features/user/userSlice';
import uiReducer from '../features/ui/uiSlice';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user'], // Solo persistir el estado del usuario
};

const rootReducer = combineReducers({
  user: userReducer,
  ui: uiReducer, // Reducer de UI
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'], // Ignora las acciones de redux-persist
        ignoredPaths: ['register', 'rehydrate'], // Ignora las rutas no serializables
      },
    }),
});

export const persistor = persistStore(store);
export default store;
