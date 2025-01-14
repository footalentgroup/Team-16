import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';


function PublicRoute({ children }) {
  const { isAuthenticated, birth } = useSelector((state) => state.user);

  // Si está autenticado, redirigir según el rol
  if (isAuthenticated) {
    return <Navigate to={birth === '' ? '/admin/pedidos' : '/paciente/inicio'} replace />;
  }

  // Renderizar las rutas públicas (login)
  return children? children: <Outlet />;
}

export default PublicRoute;
