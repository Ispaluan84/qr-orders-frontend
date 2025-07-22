import { useEffect, useEffet, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function EditCategoriesPage() {
    const { slug } = useParams;
    const [restaurant, setRestaurant] = useState(null);
    const [categories, setCategories] = useState(['']);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/api/restaurant/${slug}`)
        .then (res => res.json())
        .then(data => {
            setRestaurant(data);
            setCategories(data.categories || []);
        });
    }, [slug]);

    const handleChange = (index, value) => {
        const updated = [...categories];
        updated[index] = value;
        setCategories(updated);
    };

    const handleAdd = () => {
        setCategories([...categories, '']);
    };

    const handleRemove = (index) => {
        setCategories(categories.filter((_,i) => i !== index));
    };

    const handleSave = async () => {
        const res = await fetch(`${process.env.REACT_APP_API_URL}/api/restaurants/${restaurant._id}/categories`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json' },
            body: JSON.stringify({ categories })
        });

        if (res.ok) alert('Categorias Actualizadas');
        else alert('Error al Actualizar');
    };

    return (
        <div style={{ padding: '2rem'}}>
            <h2>Editar Categorías para {restaurant?.name}</h2>
            {categories.map((cat, idx) => (
                <div key={idx}>
                    <input value={cat} onChange={e => handleChange(idx, e.target.value)} />
                    <button onclick={() => handleRemove(idx)}>Eliminar</button>
                </div>
            ))}
            <button onClick={handleAdd}>Añadir categoría</button>
            <button onclick={handleSave}>Guardar Cambios</button>
        </div>
    );
}