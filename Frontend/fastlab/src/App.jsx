import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import LoginPaciente from "./pages/LoginPaciente";
import LoginAdmin from "./pages/LoginAdmin";
import PacienteInicio from "./pages/PacienteInicio";
import PacienteHistorial from "./pages/PacienteHistorial";
import PacienteMisDatos from "./pages/PacienteMisDatos";
import AdminPedidos from "./pages/AdminPedidos/AdminPedidos";
import AdminResultados from "./pages/AdminResultados/AdminResultados";
import AdminConfiguracion from "./pages/AdminConfiguracion/AdminConfiguracion";
import AdminConfiguracionDoctores from "./pages/AdminConfiguracion/AdminConfiguracionDoctores";
import AdminConfiguracionMiCuenta from "./pages/AdminConfiguracion/AdminConfiguracionMiCuenta";
import PublicRoute from "./routes/PublicRoutes";
import { ProtectedRoute } from "./routes/ProtectedRoute";
import NotFound from "./pages/NotFound";
import Notauthorized from "./pages/NotAuthorized";
function App() {
  return (
    <>
      <Router>
        <Routes>
          {/* Rutas públicas para login */}
          <Route index element={
              <PublicRoute>
                <LoginPaciente />
              </PublicRoute>
            }
          />

          <Route path="/login" element={
              <PublicRoute>
                <LoginPaciente />
              </PublicRoute>
            }
          />
          <Route path="/admin-login" element={
              <PublicRoute>
                <LoginAdmin />
              </PublicRoute>
            }
          />

          <Route path="/paciente" element={<ProtectedRoute role="paciente" 
            reDirecTo="/login"
          />}>
            {/* Rutas para el flujo de paciente */}
            <Route path="inicio" element={<PacienteInicio />} />
            <Route path="historial" element={<PacienteHistorial />} />
            <Route path="misdatos" element={<PacienteMisDatos />} />
          </Route>

          <Route path="/admin" element={<ProtectedRoute role="admin" reDirecTo="/admin-login" />}>
            {/* rutas para el admin */}
            <Route path="pedidos" element={<AdminPedidos />} />
            <Route path="resultados" element={<AdminResultados />} />
            <Route path="configuracion" element={<AdminConfiguracion />}/>
            <Route path="configuracion/doctores" element={<AdminConfiguracionDoctores />} />
            <Route path="configuracion/mi-cuenta" element={<AdminConfiguracionMiCuenta />} />
          </Route>

          <Route path="/notauthorized" element={<Notauthorized />}/>
          <Route path="*" element={<NotFound />} />
            
        </Routes>
      </Router>
    </>
  );
}

export default App;
