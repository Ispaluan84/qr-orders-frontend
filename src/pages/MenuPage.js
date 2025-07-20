import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

export default function MenuPage() {
    const { slug } = useParams();
    const [ restaurant, setRestaurant ] = useState(null);
    const [ menuItems, setMenuItems ] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:5000/api/restaurants/${slug}`)
        .then(res => res.json())
        .then((data) => {
            setRestaurant(data);
            return fetch(`http://localhost:5000/api/menu/restaurant/${data._id}`);
        })
        .then(res => res.json())
        .then(menu => setMenuItems(menu))
        .catch(err => console.error(err))
    }, [slug]);

    if (!restaurant) return <p>Cargando restaurante...</p>

    return (
        <div style={{ padding: '2rem'}}>
            <h2>Menú de {restaurant.name}</h2>

            {menuItems.length === 0 ? (
                <p>No hay platos aún.</p>
            ) : (
                <ul>
                    {menuItems.map((item) => (
                        <li key={item._id}>
                            <strong>{item.name}</strong> - {item.category} - {item.price}€
                            {item.available ? '' : ' (No disponible)'}
                        </li>
                    ))}
                </ul>
            )}

            <Link to={`/restaurant/${slug}/menu/create`}>
                <button style={{ marginTop: '1rem' }}>Añadir nuevo plato</button>
            </Link>
        </div>
    )
}