import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import LoginPaciente from "./pages/LoginPaciente";
import LoginAdmin from './pages/LoginAdmin';
import PacienteInicio from './pages/PacienteInicio';
import PacienteHistorial from './pages/PacienteHistorial';
import PacienteMisDatos from './pages/PacienteMisDatos';
import AdminPedidos from './pages/AdminPedidos/AdminPedidos';
import AdminResultados from './pages/AdminResultados/AdminResultados';
import AdminConfiguracion from './pages/AdminConfiguracion/AdminConfiguracion';
import AdminConfiguracionDoctores from './pages/AdminConfiguracion/AdminConfiguracionDoctores';
import AdminConfiguracionMiCuenta from './pages/AdminConfiguracion/AdminConfiguracionMiCuenta';
import AddPatient from './pages/AddPatient/AddPatient';
import AddAnalisis from './pages/AddAnalisis/AddAnalisis';

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

        {/* rutas para el admin */}
        <Route path='/admin/pedidos' element={<AdminPedidos/>} />
        <Route path='/admin/resultados' element={<AdminResultados/>} />
        <Route path='/admin/configuracion' element={<AdminConfiguracion/>} />
        <Route path='/admin/configuracion/doctores' element={<AdminConfiguracionDoctores/>} />
        <Route path='/admin/configuracion/mi-cuenta' element={<AdminConfiguracionMiCuenta/>} />




{/* rutas de registrar paciente */}
<Route path='/admin/add-paciente' element={<AddPatient/>} />
<Route path="admin/add-analisis" element={<AddAnalisis/>} />

      </Routes>
    </Router>
        
    </>
  );
}

export default App
