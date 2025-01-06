import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import LoginPaciente from "./pages/LoginPaciente";
import LoginAdmin from './pages/LoginAdmin';
import DatosPersonales from './components/DatosPersonales/DatosPersonales';


function App() {
  return (
    <>
      <Router>
      <Routes>
        {/* Definir rutas simples */}
        <Route path="/login/paciente" element={<LoginPaciente />} />
        <Route path="/login/admin" element={<LoginAdmin />} />
        <Route path="/datosPersonales" element={<DatosPersonales/>} />
      </Routes>
    </Router>
        
    </>
  );
}

export default App;
