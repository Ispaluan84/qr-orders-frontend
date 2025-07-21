import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CreateRestaurantPage() {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        contactPhone: '',
        tables: 1,
    });


 const navigate = useNavigate();

 const handleChange = (e) => {
     const { name, value } = e.target;
     setFormData((prev) => ({
         ...prev,
         [name]: name === 'tables' ? parseInt(value) : value,
     }));
 };

 const handleSubmit = async (e) => {
     e.preventDefault();
     try {
         const res = await fetch(`${process.env.REACT_APP_API_URL}/api/restaurants`, {
             method: 'POST',
             headers: { 'Content-Type': 'application/json' },
             body: JSON.stringify(formData),
         });

         if(!res.ok) {
             throw new Error('Error al crear restaurante');
         }

         const data = await res.json();
         alert('Restaurante creado con exito');
         navigate('/');
     } catch (error) {
        alert(error.message);
     }
 };

 return (
     <div style={{ padding: '2rem'}}>
         <h2>Crear Restaurante</h2>
         <form onSubmit={handleSubmit}>
             <div>
                 <label>Nombre:</label>
                 <input name='name' value={formData.name} onChange={handleChange} required />
             </div>
             <div>
                 <label>Descripción:</label>
                 <input name='description' value={formData.description} onChange={handleChange} />
             </div>
             <div>
                 <label>Teléfono:</label>
                 <input name='contactPhone' value={formData.contactPhone} onChange={handleChange} />
             </div>
             <div>
                 <label>Numero de Mesas:</label>
                 <input type='number' name='tables' value={formData.tables} onChange={handleChange} min={1} />
             </div>
             <button type='submit'>Crear</button>
         </form>
     </div>
 );
}