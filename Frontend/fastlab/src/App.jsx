import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import LoginPaciente from "./pages/LoginPaciente";
import LoginAdmin from './pages/LoginAdmin';
<<<<<<< HEAD
import DatosPersonales from './components/DatosPersonales/DatosPersonales';
=======
import PacienteInicio from './pages/PacienteInicio';
import PacienteHistorial from './pages/PacienteHistorial';
import PacienteMisDatos from './pages/PacienteMisDatos';
>>>>>>> 7bf6d0a75c8d3b2c7d548a878edb59285d7ac616


function App() {
  return (
    <>
      <Router>
      <Routes>
        {/* Definir rutas simples */}
        <Route path="/" element={<LoginPaciente />} />
        <Route path="/login/admin" element={<LoginAdmin />} />
<<<<<<< HEAD
        <Route path="/datosPersonales" element={<DatosPersonales/>} />
=======
        {/* Rutas para el flujo de paciente */}
        <Route path='/paciente/inicio' element={<PacienteInicio />} />
        <Route path='/paciente/historial' element={<PacienteHistorial />} />
        <Route path='/paciente/misdatos' element={<PacienteMisDatos />} />


>>>>>>> 7bf6d0a75c8d3b2c7d548a878edb59285d7ac616
      </Routes>
    </Router>
        
    </>
  );
}

export default App;
