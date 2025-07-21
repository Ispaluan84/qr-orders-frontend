import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function PublicMenuPage() {
  const { slug } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [menuItems, setMenuItems] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [tableNumber, setTableNumber] = useState('');

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/api/restaurants/${slug}`)
      .then(res => res.json())
      .then(data => {
        setRestaurant(data);
        return fetch(`${process.env.REACT_APP_API_URL}/api/menu/restaurant/${data._id}`);
      })
      .then(res => res.json())
      .then(menu => setMenuItems(menu))
      .catch(console.error);
  }, [slug]);

  const handleQuantityChange = (id, value) => {
    setQuantities(prev => ({
      ...prev,
      [id]: parseInt(value)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const items = Object.entries(quantities)
      .filter(([_, qty]) => qty > 0)
      .map(([id, qty]) => ({
        menuItem: id,
        quantity: qty
      }));

    if (!tableNumber || items.length === 0) {
      alert("Debes indicar número de mesa y seleccionar productos");
      return;
    }

    const body = {
      tableNumber: parseInt(tableNumber),
      restaurant: restaurant._id,
      items
    };

    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });

      if (!res.ok) throw new Error("Error al realizar el pedido");

      alert('Pedido enviado con éxito');
      setQuantities({});
      setTableNumber('');
    } catch (err) {
      alert(err.message);
    }
  };

  if (!restaurant) return <p>Cargando menú...</p>;

  return (
    <div style={{ padding: '2rem' }}>
      <h2>{restaurant.name}</h2>
      <p>{restaurant.description}</p>

      <form onSubmit={handleSubmit}>
        <label>Número de mesa:</label>
        <input
          type="number"
          value={tableNumber}
          onChange={(e) => setTableNumber(e.target.value)}
          required
        />

        {menuItems.map(item => (
          <div key={item._id} style={{ margin: '1rem 0' }}>
            <strong>{item.name}</strong> - {item.price}€
            <div>
              <input
                type="number"
                min={0}
                value={quantities[item._id] || 0}
                onChange={(e) => handleQuantityChange(item._id, e.target.value)}
              />
            </div>
          </div>
        ))}

        <button type="submit" style={{ marginTop: '1rem' }}>
          Enviar pedido
        </button>
      </form>
    </div>
  );
}
