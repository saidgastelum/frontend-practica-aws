import { apiFetch } from '../../services/api';

export const login = (username, password) =>
  apiFetch('/auth/login', { method: 'POST', body: { username, password } });

export const getDashboard = (token) => apiFetch('/dashboard', { token });
