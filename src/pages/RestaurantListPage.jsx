import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function RestaurantListPage() {
    const [ restaurants, setRestaurants ] = useState([]);
    const [ loading, setLoading ] = useState(true);

    useEffect(() => {
        const fetchRestaurants = async () => {
            try {
                const res = await fetch(`${process.env.REACT_APP_API_URL}/api/restaurants`);
                const data = await res.json();
                setRestaurants(data);
            } catch (error) {
                alert('Error al cargar restaurantes');
            } finally {
                setLoading(false)
            }
        };
        fetchRestaurants();
    }, []);

    if (loading) return <p>Cargando restaurantes...</p>


    return (
        <div>
            <h2>Lista de Restaurantes</h2>
            {restaurants.length === 0 ? (
                <p>No hay restaurantes registrados.</p>
            ) : (
                <ul>
                    {restaurants.map((r) => (
                        <div key={r._id}>
                            <Link to={`/restaurant/${r.slug}`}>
                             <h3>{r.name}</h3>
                            </Link>
                        </div>
                    ))}
                </ul>
            )}
        </div>
    );
}