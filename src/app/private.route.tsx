import { Navigate } from 'react-router-dom';
import { useAuth } from '@/domain/hooks/auth.hook';

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? children : <Navigate to="/" />;
};

export { PrivateRoute };