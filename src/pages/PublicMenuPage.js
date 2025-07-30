import { useEffect, useState } from 'react';
import Toast from '../components/Toast';

export default function PublicMenuPage() {
  const [menu, setMenu] = useState([]);
  const [tableNumber, setTableNumber] = useState('');
  const [quantities, setQuantities] = useState({});
  const [message, setMessage] = useState('')
  const [toast, setToast] = useState({ message: '', type: ''});
  
  
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/api/menu`)
      .then(res => res.json())
      .then(data => setMenu(data))
      .catch(err => {
        console.error('Error cargando menú:', err);
        setMessage('Error al cargar el menú');
      })
  }, []);

  const groupedMenu = menu.reduce((acc, item) => {
  acc[item.category] = acc[item.category] || [];
  acc[item.category].push(item);
  return acc;
}, {});


  const handleQuantityChange = (id, value) => {
    setQuantities(prev => ({
      ...prev,
      [id]: parseInt(value, 10) || 0
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const items = Object.entries(quantities)
      .filter(([_, qty]) => qty > 0)
      .map(([itemId, quantity]) => ({ menuItem: itemId, quantity }));

    if (!tableNumber || items.length === 0) {
      setToast("Debes indicar número de mesa y seleccionar productos");
      return;
    }


    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tableNumber, items})
      });

      if (!res.ok) throw new Error("Error al realizar el pedido");

      setToast({message: 'Pedido enviado con éxito', type: 'success'});
      setQuantities({});
      setTableNumber('');
    } catch (err) {
      setToast(err.message);
    }
  };


return (
  <div className="menu-page-container">
  <h1 className="menu-page-title">Menú</h1>

  {message && (
    <div className="menu-message">{message}</div>
  )}

  <form onSubmit={handleSubmit} className="menu-form">
    <div className="form-group">
      <label className="form-label">Número de mesa:</label>
      <input
        type="number"
        value={tableNumber}
        onChange={(e) => setTableNumber(e.target.value)}
        required
        className="form-input"
      />
    </div>

    {Object.keys(groupedMenu).map((category) => (
      <div key={category} className="menu-category">
        <h2 className="category-title">{category}</h2>
        {groupedMenu[category].map((item) => (
          <div key={item._id} className="menu-item">
            <div className="menu-item-content">
              <div>
                <h3 className="item-name">{item.name}</h3>
                <p className="item-description">{item.description}</p>
                <p className="item-price">€{item.price}</p>
              </div>
              <input
                type="number"
                min={0}
                className="item-quantity"
                value={quantities[item._id] || ''}
                onChange={(e) => handleQuantityChange(item._id, e.target.value)}
              />
            </div>
          </div>
        ))}
      </div>
    ))}

    <button type="submit" className="submit-button">
      Enviar Pedido
    </button>

    {toast.message && (
      <Toast
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ message: '', type: '' })}
      />
    )}
  </form>
</div>

);
}
