import { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';

export default function AdminDashboardPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [ restaurant, setRestaurant] = useState(null);
    const adminRestaurantId = localStorage.getItem('adminRestaurantId')
   
   
   
    useEffect(() => {
        const token = localStorage.getItem('token');

        if (!token) {
            alert('No Autorizado');
            navigate('/admin/login')
            return;
        }

        fetch(`${process.env.REACT_APP_API_URL}/api/restaurants/${id}`)
        .then(res => res.json())
        .then(data => setRestaurant(data))
        .catch(err => {
            console.error(err);
            alert('Error al cargar restaurante')
        });
    }, [id, navigate]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('adminRestaurantId');
        navigate('/admin/login');
    };

    if(!restaurant) return <p className='text-center mt -10'>Cargando Restaurante</p>

    return (
        <div className="max-w-3xl mx-auto py-10 px-4">
      <h2 className="text-2xl font-bold mb-2">Panel de {restaurant.name}</h2>
      <p className="text-gray-600 mb-6">{restaurant.description}</p>

      <div className="space-y-4">
        <Link
          to={`/restaurant/${restaurant.slug}/menu`}
          className="block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-center"
        >
          Ver / Editar Menú
        </Link>
        <Link
          to={`/restaurant/${restaurant._id}/orders`}
          className="block bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 text-center"
        >
          Ver Pedidos
        </Link>
        <button
          onClick={handleLogout}
          className="block w-full bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Cerrar Sesión
        </button>
      </div>
    </div>
  );
}
