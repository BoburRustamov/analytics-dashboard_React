import type { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useUnit } from 'effector-react';
import { $isAuthenticated } from '../../entities/auth/model';

export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const isAuthenticated = useUnit($isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};