import React, { ReactNode } from 'react';

import { useUserState } from '../data/UserState';
import { Login } from './Login';

export function ProtectedRoutes({ children }: { children: ReactNode }) {
  const userState = useUserState();

  if (userState.token) {
    return <>{children}</>;
  }

  return <Login />;
}
