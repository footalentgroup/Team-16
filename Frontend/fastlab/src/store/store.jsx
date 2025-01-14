import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Usa localStorage
import userReducer from '../features/user/userSlice';
import uiReducer from '../features/ui/uiSlice';

// Configuración de persistencia
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user'], // Persistir el estado de usuario y administrador
};

// Combinación de reducers
const rootReducer = combineReducers({
  user: userReducer, 
  ui: uiReducer, // Reducer de UI
});

// Reducer persistido
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configuración del store
const store = configureStore({
  reducer: persistedReducer,
 middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false
})
    
});

// Exportar persistor y store
export const persistor = persistStore(store);
export default store;
