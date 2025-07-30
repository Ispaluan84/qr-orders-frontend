import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function CreateOrderPage() {
  const { slug } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [menuItems, setMenuItems] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [tableNumber, setTableNumber] = useState(1);

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

    if (items.length === 0) {
      alert("No hay productos seleccionados");
      return;
    }

    const body = {
      tableNumber,
      restaurant: restaurant._id,
      items
    };

    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });

      if (!res.ok) throw new Error("Error al crear el pedido");

      alert("Pedido realizado con éxito");
      setQuantities({});
    } catch (err) {
      alert(err.message);
    }
  };

  if (!restaurant) return <p>Cargando restaurante...</p>;

  return (
      <div className="order-form-container">
  <h2 className="order-title">Pedir en {restaurant.name}</h2>
  <form onSubmit={handleSubmit} className="order-form">
    <div className="order-field">
      <label htmlFor="tableNumber">Número de mesa:</label>
      <input
        id="tableNumber"
        type="number"
        value={tableNumber}
        min={1}
        onChange={(e) => setTableNumber(parseInt(e.target.value))}
        className="order-input"
      />
    </div>

    {menuItems.map((item) => (
      <div className="order-item" key={item._id}>
        <strong>{item.name}</strong> - {item.price}€<br />
        <input
          type="number"
          min={0}
          value={quantities[item._id] || 0}
          onChange={(e) => handleQuantityChange(item._id, e.target.value)}
          className="order-input"
        />
      </div>
    ))}

    <button type="submit" className="order-submit-button">
      Realizar Pedido
    </button>
  </form>
</div>

  );
}
