import QRCodeGenerator from '../components/QRCodeGenerator';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdminDashboardPage() {
  const navigate = useNavigate();
  const [restaurant, setRestaurant] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('No autorizado');
      navigate('/admin/login');
      return;
    }

    fetch(`${process.env.REACT_APP_API_URL}/api/restaurant`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

      .then(res => {
        if (!res.ok) throw new Error('No se pudo obtener el restaurante');
        return res.json();
      })
      .then(data => setRestaurant(data))
      .catch(err => {
        console.error(err);
        alert('Error al cargar restaurante');
      });
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/admin/login');
  };

  if (!restaurant) {
    return <p className="text-center mt-10">Cargando restaurante...</p>;
  }

  return (
    <div className="admin-dashboard">
  <div className="admin-box">
    <h1 className="admin-title">{restaurant.name}</h1>
    <p className="admin-description">{restaurant.description}</p>

    <div className="admin-buttons">
      <button
        onClick={() => navigate('/admin/menu')}
        className="admin-button menu"
      >
        Ver / Editar Menú
      </button>

      <button
        onClick={() => navigate('/admin/orders')}
        className="admin-button orders"
      >
        Ver Pedidos
      </button>

      <button
        onClick={handleLogout}
        className="admin-button logout"
      >
        Cerrar Sesión
      </button>
    </div>
  </div>
</div>

  );
}

