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
<div className="menu-container">
  <div className="menu-header">
    <h2 className="menu-title">Gestión del Menú</h2>
    <Link to={`/admin/${id}/menu/create`} className="menu-button">
      Añadir Plato
    </Link>
  </div>

  {menuItems.length === 0 ? (
    <p>No hay platos en el menú.</p>
  ) : (
    menuItems.map((item) => (
      <div className="menu-card" key={item._id}>
        <h3 className="menu-card-title">{item.name}</h3>
        <p>{item.description}</p>
        <p><strong>Categoría:</strong> {item.category}</p>
        <p><strong>Precio:</strong> €{item.price}</p>
        {!item.available && (
          <p className="menu-unavailable">No disponible</p>
        )}
        <div className="menu-card-buttons">
          <button className="menu-button" onClick={() => toggleAvailability(item._id)}>
            {item.available ? 'Ocultar' : 'Mostrar'}
          </button>
          <Link className="menu-button" to={`/admin/menu/edit/${item._id}`}>
            Editar
          </Link>
          <button
            className="menu-button danger"
            onClick={() => handleDelete(item._id)}
          >
            Eliminar
          </button>
        </div>
      </div>
    ))
  )}
</div>
  );
}

