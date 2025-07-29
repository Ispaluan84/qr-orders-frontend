import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import MenuForm from '../components/MenuForm';

export default function MenuEditPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [initialData, setInitialData] = useState(null);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/api/menu/${id}`)
      .then(res => res.json())
      .then(data => setInitialData(data))
      .catch(() => alert('Error al cargar el plato'));
  }, [id]);

  const handleUpdate = async (formData, setError) => {
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

  if (!initialData) return <p className="text-center mt-10">Cargando...</p>;

  return (
    <div className="max-w-xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Editar Plato</h2>
      <MenuForm
        initialData={initialData}
        onSubmit={handleUpdate}
        submitLabel="Actualizar Plato"
      />
    </div>
  );
}
