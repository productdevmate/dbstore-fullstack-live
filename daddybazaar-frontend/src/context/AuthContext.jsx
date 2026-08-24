import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { authApi } from '../api/authApi';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem('user');
      return stored ? JSON.parse(stored) : null;
    } catch { return null; }
  });
  const [loading, setLoading] = useState(false);

  const login = useCallback(async (credentials) => {
    setLoading(true);
    try {
      const { data } = await authApi.login(credentials);
      const authData = data.data;
      localStorage.setItem('accessToken',  authData.accessToken);
      localStorage.setItem('refreshToken', authData.refreshToken);
      localStorage.setItem('user', JSON.stringify(authData));
      setUser(authData);
      return { success: true, data: authData };
    } catch (err) {
      return { success: false, message: err.response?.data?.message || 'Login failed' };
    } finally {
      setLoading(false);
    }
  }, []);

  const register = useCallback(async (formData) => {
    setLoading(true);
    try {
      const { data } = await authApi.register(formData);
      const authData = data.data;
      localStorage.setItem('accessToken',  authData.accessToken);
      localStorage.setItem('refreshToken', authData.refreshToken);
      localStorage.setItem('user', JSON.stringify(authData));
      setUser(authData);
      return { success: true, data: authData };
    } catch (err) {
      const errors = err.response?.data?.data || {};
      return { success: false, message: err.response?.data?.message || 'Registration failed', errors };
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    setUser(null);
  }, []);

  const isAuthenticated = !!user && !!localStorage.getItem('accessToken');
  const isOwner      = user?.role === 'OWNER';
  const isSuperAdmin = user?.role === 'SUPER_ADMIN';

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, isAuthenticated, isOwner, isSuperAdmin }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
};
