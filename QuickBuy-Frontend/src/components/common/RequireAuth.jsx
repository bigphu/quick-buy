import { Navigate } from 'react-router-dom';
import { getAuthUser } from '../../services/auth';

export default function RequireAuth({ children, allowedRoles }) {
  const authUser = getAuthUser();

  if (!authUser) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(authUser.role)) {
    return <Navigate to={authUser.role === 'admin' ? '/admin' : '/account'} replace />;
  }

  return children;
}
