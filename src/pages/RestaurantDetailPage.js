import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';

export default function RestaurantDetailPage() {
    const { slug } = useParams();
    const [ restaurant, setRestaurant ] = useState(null);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/api/restaurants/${slug}`)
        .then(res => res.json())
        .then(data => setRestaurant(data))
        .catch(() => alert("Error al cargar restaurante"));
    }, [ slug ]);

    if (!restaurant) return <p>Cargando...</p>;

    return (
        <div style={{ padding: '1rem' }}>
            <h2>{restaurant.name}</h2>
            <p><strong>Descripción:</strong> {restaurant.description}</p>
            <p><strong>Teléfono:</strong> {restaurant.contactPhone}</p>
            <p><strong>Mesas:</strong> {restaurant.tables}</p>
        </div>
    );
}