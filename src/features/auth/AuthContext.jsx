import { createContext, useContext, useState } from 'react';
import { login as loginService } from './authService';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  // El token vive solo en memoria de la sesión del navegador (sessionStorage)
  const [token, setToken] = useState(() => sessionStorage.getItem('token'));
  const [user, setUser] = useState(() => JSON.parse(sessionStorage.getItem('user') || 'null'));

  const login = async (username, password) => {
    const data = await loginService(username, password);
    sessionStorage.setItem('token', data.token);
    sessionStorage.setItem('user', JSON.stringify(data.user));
    setToken(data.token);
    setUser(data.user);
  };

  const logout = () => {
    sessionStorage.clear();
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ token, user, isAuthenticated: !!token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
