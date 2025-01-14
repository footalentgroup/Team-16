import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import LoginPaciente from "./pages/LoginPaciente";
import LoginAdmin from "./pages/LoginAdmin";
import PacienteInicio from "./pages/PacienteInicio";
import PacienteHistorial from "./pages/PacienteHistorial";
import PacienteMisDatos from "./pages/PacienteMisDatos";

import AdminResultados from "./pages/AdminResultados/AdminResultados";
import AdminConfiguracion from "./pages/AdminConfiguracion/AdminConfiguracion";
import AdminConfiguracionDoctores from "./pages/AdminConfiguracion/AdminConfiguracionDoctores";
import AdminConfiguracionMiCuenta from "./pages/AdminConfiguracion/AdminConfiguracionMiCuenta";

import SearchPatient from "./pages/AdminPedidos/SearchPatient";
import SelectionPatient from "./pages/AdminPedidos/SelectionPatient"; // Importa el nuevo componente

function App() {
  return (
    <Router>
      <Routes>
        {/* Rutas de autenticación */}
        <Route path="/" element={<LoginPaciente />} />
        <Route path="/login/admin" element={<LoginAdmin />} />

        {/* Rutas para el flujo de paciente */}
        <Route path="/paciente/inicio" element={<PacienteInicio />} />
        <Route path="/paciente/historial" element={<PacienteHistorial />} />
        <Route path="/paciente/misdatos" element={<PacienteMisDatos />} />

        {/* Rutas para el flujo de administración */}
        <Route
          path="/admin/ingresar-orden"
          element={<SelectionPatient/>} // Ruta del nuevo componente
        />
        <Route
          path="/admin/ingresar-orden/paciente-registrado"
          element={<SearchPatient />}
        />
        <Route path="/admin/resultados" element={<AdminResultados />} />
        <Route path="/admin/configuracion" element={<AdminConfiguracion />} />
        <Route
          path="/admin/configuracion/doctores"
          element={<AdminConfiguracionDoctores />}
        />
        <Route
          path="/admin/configuracion/mi-cuenta"
          element={<AdminConfiguracionMiCuenta />}
        />
      </Routes>
    </Router>
  );
}

export default App;
