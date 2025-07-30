import { useState, useEffect } from 'react';

export default function MenuForm({ initialData = {}, onSubmit, submitLabel = 'Guardar' }) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: 'principal',
    imageUrl: '',
    ...initialData
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (parseFloat(formData.price) <= 0) {
      setError('El precio debe ser mayor que 0');
      return;
    }

    onSubmit(formData, setError);
  };

  return (
    <form onSubmit={handleSubmit} className="dish-form">
  {error && <p className="form-error">{error}</p>}

  <input
    name="name"
    type="text"
    placeholder="Nombre del plato"
    value={formData.name}
    onChange={handleChange}
    required
    className="form-input"
  />
  <textarea
    name="description"
    placeholder="Descripción"
    value={formData.description}
    onChange={handleChange}
    className="form-input"
  />
  <input
    name="price"
    type="number"
    step="0.01"
    placeholder="Precio"
    value={formData.price}
    onChange={handleChange}
    required
    className="form-input"
  />
  <select
    name="category"
    value={formData.category}
    onChange={handleChange}
    className="form-input"
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
    className="form-input"
  />

  <button type="submit" className="form-button">
    {submitLabel}
  </button>
</form>

  );
}
