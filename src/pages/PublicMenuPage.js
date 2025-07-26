import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function PublicMenuPage() {
  const { slug } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [menuItems, setMenuItems] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [tableNumber, setTableNumber] = useState('');
  const [formErrors, setFormErrors] = useState({});

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

      const newErrors = {};

    if (!tableNumber) {
      newErrors.tableNumber = "Debes ingresar número de mesa";
    }

    if (items.length === 0) {
      newErrors.items = "Debes seleccionar un producto";
    }

    if (Object.keys(newErrors).length > 0) {
      setFormErrors(newErrors)
      return;
    }

    setFormErrors({});

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

  const groupedItems = menuItems.reduce((acc, item) => { 
    const cat = item.category || 'Otros';
    if(!acc[cat]) acc[cat] = [];
    acc[cat].push(item);
    return acc;
  }, {});

 if (!restaurant) return <p style={{ padding: '2rem' }}>Cargando menú...</p>;

  
 return (
  <div className="max-w-4xl mx-auto px-4 py-6">
    <h2 className="text-2xl font-bold mb-4 text-center">{restaurant.name}</h2>
    <p className="text-gray-600 mb-6 text-center">{restaurant.description}</p>

    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Número de mesa */}
      <div>
        <label className="block font-medium mb-1">Número de mesa:</label>
        <input
          type="number"
          value={tableNumber}
          onChange={(e) => setTableNumber(e.target.value)}
          required
          className="border rounded px-3 py-2 w-full sm:w-1/2"
        />
        {formErrors.tableNumber && (
          <p className="text-red-500 text-sm mt-1">{formErrors.tableNumber}</p>
        )}
      </div>

      {/* Categorías y productos */}
      {Object.entries(groupedItems).map(([category, items]) => (
        <div key={category} className="mt-6">
          <h3 className="text-xl font-semibold mb-3 text-blue-700">{category.toUpperCase()}</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            {items.map(item => (
              <div
                key={item._id}
                className="flex justify-between items-center border rounded px-3 py-2 shadow-sm bg-white"
              >
                <div className="flex flex-col">
                  <span className="font-semibold">{item.name}</span>
                  <span className="text-sm text-gray-500">{item.price}€</span>
                </div>
                <input
                  type="number"
                  min={0}
                  className="w-20 border rounded px-2 py-1 text-center"
                  value={quantities[item._id] || 0}
                  onChange={(e) => handleQuantityChange(item._id, e.target.value)}
                />
              </div>
            ))}
          </div>
        </div>
      ))}

      {formErrors.items && (
        <p className="text-red-500 text-sm">{formErrors.items}</p>
      )}

      {/* Botón de envío */}
      <div className="text-center">
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded transition"
        >
          Enviar pedido
        </button>
      </div>
    </form>
  </div>
);
} 