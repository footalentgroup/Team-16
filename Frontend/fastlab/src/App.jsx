import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import LoginPaciente from "./pages/LoginPaciente";
import LoginAdmin from "./pages/LoginAdmin";
import PacienteInicio from "./pages/PacienteInicio";
import PacienteHistorial from "./pages/PacienteHistorial";
import PacienteMisDatos from "./pages/PacienteMisDatos";
import AdminResultados from "./pages/AdminResultados/AdminResultados";
import AdminConfiguracion from "./pages/AdminConfiguracion/AdminConfiguracion";
import AdminConfiguracionDoctores from "./pages/AdminConfiguracion/AdminConfiguracionDoctores";
import AdminConfiguracionMiCuenta from "./pages/AdminConfiguracion/AdminConfiguracionMiCuenta";
import PublicRoute from "./routes/PublicRoutes";
import { ProtectedRoute } from "./routes/ProtectedRoute";
import NotFound from "./pages/NotFound";
import Notauthorized from "./pages/Notauthorized";
import AdminConfiguracionAnadirDoctores from "./pages/AdminConfiguracion/AdminConfiguracionAnadirDoctores";
import AdminConfiguracionEditarDoctores from "./pages/AdminConfiguracion/AdminConfiguracionEditarDoctores";
import AdminConfiguracionBioquimicos from "./pages/AdminConfiguracion/AdminConfiguracionBioquimicos";
import AdminConfiguracionAnalisis from './pages/AdminConfiguracion/AdminConfiguracionAnalisis'

import PacienteHistorialResultadoAnalisis from "./pages/PacienteHistorialResultadoAnalisis";

import SearchPatient from "./pages/AdminPedidos/SearchPatient";
import SelectionPatient from "./pages/AdminPedidos/SelectionPatient";
import ReportMethod from "./pages/AdminPedidos/ReportMethod";
import AddPatient from "./pages/AddPatient/AddPatient";
import AddAnalisis from "./pages/AddAnalisis/AddAnalisis";
import ResultadosList from "./pages/AdminResultados/ResultadosList"; // Agregado

import ResultadoAnalisisAdmin from './components/ResultadoAnalisis/ResultadoAnalisisAdmin';
import AdminResults from "./pages/AdminResultados/AdminResults";
import CargaResultados from "./pages/AdminResultados/InfoAnalisisPost";
import Parameters from "./pages/AdminResultados/Parameters";

import AdminConfiguracionAnadirAnalisis from './pages/AdminConfiguracion/AdminConfiguracionAnadirAnalisis'
import AdminConfiguracionEditarAnalisis from './pages/AdminConfiguracion/AdminConfiguracionEditarAnalisis'


const App = () => {
  return (
    <>
      <Router>
        <Routes>
          {/* Rutas públicas para login */}
          <Route
            index
            element={
              <PublicRoute>
                <LoginPaciente />
              </PublicRoute>
            }
          />
          <Route
            path="/login"
            element={
              <PublicRoute>
                <LoginPaciente />
              </PublicRoute>
            }
          />
          <Route
            path="/admin-login"
            element={
              <PublicRoute>
                <LoginAdmin />
              </PublicRoute>
            }
          />

          <Route
            path="/paciente"
            element={
              <ProtectedRoute role="paciente" reDirecTo="/login" />
            }
          >
            {/* Rutas para el flujo de paciente */}
            <Route path="inicio" element={<PacienteInicio />} />
            <Route path="historial" element={<PacienteHistorial />} />
            <Route path="historial/:id" element={<PacienteHistorialResultadoAnalisis />} />
            <Route path="misdatos" element={<PacienteMisDatos />} />
          </Route>

          <Route
            path="/admin"
            element={
              <ProtectedRoute role="admin" reDirecTo="/admin-login" />
            }
          >
            {/* rutas para el admin */}

            

            <Route path="resultados" element={<AdminResults />} />
            <Route path="resultados/lista-de-resultados" element={<ResultadosList />} />
            <Route path="resultados/carga-de-resultados" element={<AdminResultados />} /> 
            <Route path="resultados/carga-de-resultados/info-analisis" element={<CargaResultados />} /> 
            <Route path="resultados/carga-de-resultados/parametros" element={<Parameters />} />
            <Route path="resultados/lista-de-resultados/detalle/:id" element={<ResultadoAnalisisAdmin />} /> 

             {/* Detalles por ID */}
            <Route path="configuracion" element={<AdminConfiguracion />} />
            <Route path="configuracion/doctores" element={<AdminConfiguracionDoctores />} />
            <Route path="configuracion/mi-cuenta" element={<AdminConfiguracionMiCuenta />} />
            <Route path="configuracion/doctores/añadir" element={<AdminConfiguracionAnadirDoctores />} />
            <Route path="configuracion/doctores/:id" element={<AdminConfiguracionEditarDoctores />} />
            <Route path='configuracion/bioquimicos' element={<AdminConfiguracionBioquimicos />} />
            <Route path='configuracion/analisis' element={<AdminConfiguracionAnalisis />} />
            <Route path='configuracion/analisis/añadir' element={<AdminConfiguracionAnadirAnalisis />} />
            <Route path='configuracion/analisis/:id' element={<AdminConfiguracionEditarAnalisis />} />

            <Route path="ingresar-orden" element={<SelectionPatient />} />
            <Route path="ingresar-orden/paciente-registrado" element={<SearchPatient />} />
            <Route path="ingresar-orden/paciente-registrado/orden-de-analisis/metodo-de-envio"element={<ReportMethod />}
            />

            {/* rutas de registrar paciente */}
            <Route path="ingresar-orden/registrar-paciente" element={<AddPatient />} />
            <Route
              path="ingresar-orden/paciente-registrado/orden-de-analisis"
              element={<AddAnalisis />}
            />
          </Route>

          <Route path="/notauthorized" element={<Notauthorized />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
};

export default App
