import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux'; // Para integrar Redux
import { PersistGate } from 'redux-persist/integration/react'; // Para manejar persistencia
import store, { persistor } from './store/store.jsx'; // Importar el store y persistor
import './index.css';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={<div>Cargando...</div>} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </StrictMode>
);
