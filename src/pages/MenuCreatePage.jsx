import { useNavigate } from 'react-router-dom';
import MenuForm from '../components/MenuForm';

export default function MenuCreatePage() {
  const navigate = useNavigate();

  const handleCreate = async (formData, setError) => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/menu`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ ...formData, price: parseFloat(formData.price) })
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
    <div className="new-dish-container">
  <h2 className="new-dish-title">Nuevo Plato</h2>
  <MenuForm onSubmit={handleCreate} submitLabel="Crear Plato" />
</div>

  );
}