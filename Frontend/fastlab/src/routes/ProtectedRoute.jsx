import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

export const ProtectedRoute =({ role, children, reDirecTo})=>{
    
const { isAuthenticated, birth } = useSelector((state) => state.user);

  // Si no está autenticado, redirigir al login
  if (!isAuthenticated) {
    return <Navigate to={reDirecTo} replace />;
  }

  // Validar el rol del usuario
  if (role === 'admin' && birth !== '') {
    return <Navigate to="/notauthorized" replace />;
  }
  if (role === 'paciente' && birth === '') {
    return <Navigate to="/notauthorized" replace />;
  }

  // Renderizar rutas hijas si pasa las validaciones
  return children? children: <Outlet />;

}