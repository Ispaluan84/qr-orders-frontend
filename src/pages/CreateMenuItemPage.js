import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function CreateMenuItemPage() {
    const { slug } = useParams();
    const navigate = useNavigate();
    const [restaurantId, setRestaurantId] = useState(null);

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        category: 'principal',
        imageUrl: ''
    });


    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/api/restaurants/${slug}`)
        .then(res => res.json())
        .then(data => setRestaurantId(data._id))
        .catch(() => alert('No se pudo cargar el restaurante'));
    }, [ slug ]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ 
            ...prev,
            [name]: value }))
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const body = {
                ...formData,
                price: parseFloat(formData.price),
                restaurant: restaurantId
            };

            const res = await fetch(`${process.env.REACT_APP_API_URL}/api/menu`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            });

            if (!res.ok) throw new Error('Error al crear el plato');

            alert('Plato creado correctamente');
            navigate(`/restaurant/${slug}`)
        } catch (err) {
            alert(err.message);
        }
    };

    if (!restaurantId) return <p>Cargando restaurante...</p>

    return (
        <div style={{ padding: '2rem'}}>
            <h2>Añadir Plato al Menú</h2>
            <form onSubmit={handleSubmit}>
                <input name="name" placeholder="Nombre" value={formData.name} onChange={handleChange} required />
                <input name="description" placeholder="Descripción" value={formData.description} onChange={handleChange} />
                <input type="number" name="price" placeholder="Precio" value={formData.price} onChange={handleChange} step={0.01} required />
                <select name="category" value={formData.category} onChange={handleChange}>
                    <option value="entrante">Entrante</option>
                    <option value="principal">Principal</option>
                    <option value="postre">Postre</option>
                    <option value="bebida">Bebida</option>
                </select>
                <input name="imageUrl" placeholder='URL Imagen (opcional)' value={formData.imageUrl} onChange={handleChange} />
                <button type="submit">Crear Plato</button>
            </form>
        </div>
    );
}