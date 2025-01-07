import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import LoginPaciente from "./pages/LoginPaciente";
import LoginAdmin from './pages/LoginAdmin';
import PacienteInicio from './pages/PacienteInicio';
import PacienteHistorial from './pages/PacienteHistorial';
import PacienteMisDatos from './pages/PacienteMisDatos';


function App() {
  return (
    <>
      <Router>
      <Routes>
        {/* Definir rutas simples */}
        <Route path="/" element={<LoginPaciente />} />
        <Route path="/login/admin" element={<LoginAdmin />} />
        {/* Rutas para el flujo de paciente */}
        <Route path='/paciente/inicio' element={<PacienteInicio />} />
        <Route path='/paciente/historial' element={<PacienteHistorial />} />
        <Route path='/paciente/misdatos' element={<PacienteMisDatos />} />


      </Routes>
    </Router>
        
    </>
  );
}

export default App
