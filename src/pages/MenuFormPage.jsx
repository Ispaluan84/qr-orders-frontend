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
    <div className="max-w-xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Nuevo Plato</h2>
      {error && <p className="text-red-600 mb-2">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="name"
          type="text"
          placeholder="Nombre del plato"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full border px-3 py-2 rounded"
        />
        <textarea
          name="description"
          placeholder="Descripción"
          value={formData.description}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        />
        <input
          name="price"
          type="number"
          step="0.01"
          placeholder="Precio"
          value={formData.price}
          onChange={handleChange}
          required
          className="w-full border px-3 py-2 rounded"
        />
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        >
          <option value="entrante">Entrante</option>
          <option value="principal">Principal</option>
          <option value="postre">Postre</option>
          <option value="bebida">Bebida</option>
        </select>
        <input
          name="imageUrl"
          type="text"
          placeholder="URL de imagen (opcional)"
          value={formData.imageUrl}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Guardar Plato
        </button>
      </form>
    </div>
  );
}
