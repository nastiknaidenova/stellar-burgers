import React, { FC } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from '../../services/store';
import { selectIsAuthChecked } from '../../services/slices/user';

type ProtectedRouteProps = {
  requiresAuth?: boolean;
  children: React.ReactElement;
};

export const ProtectedRoute: FC<ProtectedRouteProps> = ({
  requiresAuth = false,
  children
}) => {
  const isAuthChecked = useSelector(selectIsAuthChecked);
  const location = useLocation();

  if (!isAuthChecked) {
    if (!requiresAuth && !isAuthChecked) {
      return <Navigate replace to='/login' state={{ from: location }} />;
    }
  }

  if (requiresAuth && isAuthChecked) {
    const redirectTo = location.state?.from || { pathname: '/' };
    return <Navigate replace to={redirectTo} />;
  }

  return children;
};
