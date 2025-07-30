import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function MenuFormPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: 'principal',
    imageUrl: ''
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/menu`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          ...formData,
          price: parseFloat(formData.price),
        })
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Error al crear el plato');
      }

      alert('Plato creado correctamente');
      navigate('/admin/menu');
    } catch (err) {
      setError(err.message);
    }
  };

return (
    <div className="container">
      <h2 className="section-title">Nuevo Plato</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <input className="input" name="name" type="text" placeholder="Nombre del plato" value={formData.name} onChange={handleChange} required />
        <textarea className="input" name="description" placeholder="Descripción" value={formData.description} onChange={handleChange} />
        <input className="input" name="price" type="number" step="0.01" placeholder="Precio" value={formData.price} onChange={handleChange} required />
        <select className="input" name="category" value={formData.category} onChange={handleChange}>
          <option value="entrante">Entrante</option>
          <option value="principal">Principal</option>
          <option value="postre">Postre</option>
          <option value="bebida">Bebida</option>
        </select>
        <input className="input" name="imageUrl" type="text" placeholder="URL de imagen (opcional)" value={formData.imageUrl} onChange={handleChange} />
        <button className="btn" type="submit">Guardar Plato</button>
      </form>
    </div>
  );
}
         