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
    <div className="max-w-3xl mx-auto py-10 px-4">
      <h2 className="text-2xl font-bold mb-2">Panel de {restaurant.name}</h2>
      <p className="text-gray-600 mb-6">{restaurant.description}</p>

      <div className="space-y-4">
        <button
          onClick={() => navigate('/admin/menu')}
          className="block w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-center">
          Ver / Editar Menú
        </button>

        <button
          onClick={() => navigate('/admin/orders')}
          className="block w-full bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 text-center">
          Ver Pedidos
        </button>

        <button
          onClick={handleLogout}
          className="block w-full bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 text-center">
          Cerrar Sesión
        </button>
      </div>
    </div>
  );
}
