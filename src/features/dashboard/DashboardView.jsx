import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import { getDashboard } from '../auth/authService';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';

export default function DashboardView() {
  const { token, user, logout } = useAuth();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    getDashboard(token)
      .then(setData)
      .catch((err) => {
        if (err.status === 401) { logout(); navigate('/login'); }
        else setError(err.message);
      });
  }, []);

  return (
    <Card title="Dashboard protegido">
      <p>Usuario: <strong>{user?.username}</strong> ({user?.role})</p>
      {error && <p className="error">{error}</p>}
      {data && (
        <>
          <p>{data.message}</p>
          <ul>
            <li>Servidores: {data.data.servidores}</li>
            <li>VPCs: {data.data.vpcs}</li>
            <li>Estado: {data.data.estado}</li>
          </ul>
        </>
      )}
      <Button variant="secondary" onClick={() => { logout(); navigate('/login'); }}>Cerrar sesión</Button>
    </Card>
  );
}
