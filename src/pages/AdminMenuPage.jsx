import { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';

export default function AdminMenuPage() {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const {id} = useParams();

useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/admin/login');
      return;
    }

    fetch(`${process.env.REACT_APP_API_URL}/api/menu`)
      .then(res => res.json())
      .then(data => setMenuItems(data))
      .catch(err => console.error('Error cargando el menú:', err))
      .finally(() => setLoading(false));
  }, [navigate]);

  const toggleAvailability = async (id) => {
    try {
      await fetch(`${process.env.REACT_APP_API_URL}/api/menu/${id}/toggle`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setMenuItems((prev) =>
        prev.map(item =>
          item._id === id ? { ...item, available: !item.available } : item
        )
      );
    } catch (err) {
      alert('Error al cambiar disponibilidad');
    }
  };

  if (loading) return <p className="text-center mt-10">Cargando menú...</p>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Gestión del Menú</h2>
        <Link 
            to={`/admin/${Id}/menu/create`}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Añadir Plato
        </Link>
      </div>

      {menuItems.length === 0 ? (
        <p>No hay platos en el menú.</p>
      ) : (
        <ul className="space-y-4">
          {menuItems.map(item => (
            <li
              key={item._id}
              className="p-4 border rounded flex justify-between items-center"
            >
              <div>
                <h3 className="text-lg font-semibold">{item.name}</h3>
                <p className="text-gray-600">{item.category}</p>
                <p className="text-green-600 font-bold">€{item.price}</p>
                {!item.available && (
                  <p className="text-red-500 text-sm">No disponible</p>
                )}
              </div>
              <button
                onClick={() => toggleAvailability(item._id)}
                className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300"
              >
                {item.available ? 'Ocultar' : 'Mostrar'}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
