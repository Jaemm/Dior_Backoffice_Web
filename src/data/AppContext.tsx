import React, { PropsWithChildren } from 'react'

import { UserStateDTO } from '../auth/data/LoginDTO'
import { useUserState } from './UserState'

export interface AppContextProps extends UserStateDTO {}

const Context = React.createContext<AppContextProps | null>(null)

export function useAppContext() {
  const ctx = React.useContext(Context) as NonNullable<AppContextProps>
  if (!ctx) {
    throw new Error('Oops! You forgot to wrap your with <AppContextProvider>.')
  }
  return ctx
}

export function AppContextProvider({ children }: PropsWithChildren<unknown>) {
  const userState = useUserState()

  return <Context.Provider value={userState}>{children}</Context.Provider>
}
