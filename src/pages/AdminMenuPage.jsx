import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function AdminMenuPage() {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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

const groupedMenu = menuItems.reduce((acc, item) => {
  acc[item.category] = acc[item.category] || [];
  acc[item.category].push(item);
  return acc;
}, {});


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

  const handleDelete = async (id) => {
    if (!window.confirm('¿Estás seguro de que deseas eliminar este plato?')) return;

    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/menu/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (!res.ok) throw new Error('Error al eliminar el plato');

      setMenuItems((prev) => prev.filter(item => item._id !== id));
    } catch (err) {
      alert('No se pudo eliminar el plato');
      console.error(err);
    }
  };

  if (loading) return <p className="text-center mt-10">Cargando menú...</p>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Gestión del Menú</h2>
        <Link 
            to={`/admin/menu/create`}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Añadir Plato
        </Link>
      </div>

      {menuItems.length === 0 ? (
        <p>No hay platos en el menú.</p>
      ) : (
        <div className="space-y-6">
  {Object.keys(groupedMenu).map(category => (
    <div key={category}>
      <h3 className="text-xl font-bold mb-2 capitalize">{category}</h3>
      <ul className="space-y-4">
        {groupedMenu[category].map(item => (
          <li
            key={item._id}
            className="p-4 border rounded flex justify-between items-center"
          >
            <div>
              <h4 className="text-lg font-semibold">{item.name}</h4>
              <p className="text-gray-600">{item.category}</p>
              <p className="text-green-600 font-bold">€{item.price}</p>
              {!item.available && (
                <p className="text-red-500 text-sm">No disponible</p>
              )}
            </div>

            <div className="flex space-x-2">
              <button
                onClick={() => navigate(`/admin/menu/edit/${item._id}`)}
                className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
              >
                Editar
              </button>

              <button
                onClick={() => handleDelete(item._id)}
                className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
              >
                Eliminar
              </button>

              <button
                onClick={() => toggleAvailability(item._id)}
                className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300"
              >
                {item.available ? 'Ocultar' : 'Mostrar'}
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  ))}
</div>
)}
</div>
);
}
