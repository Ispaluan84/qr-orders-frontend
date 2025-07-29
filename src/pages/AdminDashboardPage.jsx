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
<div className="min-h-screen bg-gray-50 px-6 py-12">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{restaurant.name}</h1>
        <p className="text-gray-600 mb-8">{restaurant.description}</p>

        <div className="space-y-4">
          <button
            onClick={() => navigate('/admin/menu')}
            className="w-full bg-blue-600 text-white font-semibold px-4 py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Ver / Editar Menú
          </button>

          <button
            onClick={() => navigate('/admin/orders')}
            className="w-full bg-green-600 text-white font-semibold px-4 py-3 rounded-lg hover:bg-green-700 transition"
          >
            Ver Pedidos
          </button>

          <button
            onClick={handleLogout}
            className="w-full bg-red-600 text-white font-semibold px-4 py-3 rounded-lg hover:bg-red-700 transition"
          >
            Cerrar Sesión
          </button>
        </div>
      </div>
    </div>
  );
}

