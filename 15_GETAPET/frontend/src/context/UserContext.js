import { createContext } from 'react';

import useAuth from '../hooks/useAuth';

const Context = createContext();

function UserProvider({ children }) {
  const { authenticated, logout, register } = useAuth();

  return (
    <Context.Provider value={{ authenticated, logout, register }}>
      {children}
    </Context.Provider>
  );
}

export { Context, UserProvider };
