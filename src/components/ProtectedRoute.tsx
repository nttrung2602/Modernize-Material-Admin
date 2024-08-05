import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from 'hooks/useAuth';
import paths from 'routes/path';

interface ProtectedRouteProps {
  redirectPath?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  redirectPath = '/authentication/login',
}) => {
  const { loggedIn, email } = useAuth();

  if (!loggedIn) {
    return <Navigate to={redirectPath} replace />;
  }

  if (email.includes('admin')) {
    return <Navigate to={`/${paths.products}`} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
