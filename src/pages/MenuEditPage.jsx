import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function MenuEditPage() {
  const { id } = useParams(); // ID del plato
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    imageUrl: '',
    available: true
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Cargar datos del plato
  useEffect(() => {
    const fetchItem = async () => {
      try {
        const res = await fetch(`${process.env.REACT_APP_API_URL}/api/menu/${id}`);
        const data = await res.json();
        setFormData({
          name: data.name,
          description: data.description,
          price: data.price,
          category: data.category,
          imageUrl: data.imageUrl || '',
          available: data.available
        });
      } catch (err) {
        setError('Error al cargar los datos del plato');
      } finally {
        setLoading(false);
      }
    };

    fetchItem();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/menu/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ ...formData, price: parseFloat(formData.price) })
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Error al actualizar el plato');
      }

      alert('Plato actualizado correctamente');
      navigate('/admin/menu');
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <p className="container">Cargando...</p>;

  return (
    <div className="container">
      <h2 className="section-title">Editar Plato</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <input
          className="input"
          name="name"
          type="text"
          placeholder="Nombre"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <textarea
          className="input"
          name="description"
          placeholder="Descripción"
          value={formData.description}
          onChange={handleChange}
        />
        <input
          className="input"
          name="price"
          type="number"
          step="0.01"
          placeholder="Precio"
          value={formData.price}
          onChange={handleChange}
          required
        />
        <select
          className="input"
          name="category"
          value={formData.category}
          onChange={handleChange}
        >
          <option value="entrante">Entrante</option>
          <option value="principal">Principal</option>
          <option value="postre">Postre</option>
          <option value="bebida">Bebida</option>
        </select>
        <input
          className="input"
          name="imageUrl"
          type="text"
          placeholder="URL de imagen (opcional)"
          value={formData.imageUrl}
          onChange={handleChange}
        />
        <label>
          <input
            type="checkbox"
            name="available"
            checked={formData.available}
            onChange={handleChange}
          />{' '}
          Disponible
        </label>
        <br />
        <button className="btn" type="submit">Guardar Cambios</button>
      </form>
    </div>
  );
}

