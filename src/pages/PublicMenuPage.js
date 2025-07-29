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
  <div className="max-w-2xl mx-auto p-4">
    <h1 className="text-2xl font-bold mb-4 text-center">Menú</h1>

    {message && (
      <div className="mb-4 text-center text-sm text-red-500">{message}</div>
    )}
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block font-medium mb-1">Número de mesa:</label>
        <input
          type="number"
          value={tableNumber}
          onChange={(e) => setTableNumber(e.target.value)}
          required
          className="border rounded px-3 py-2 w-full"
        />
      </div>

      {menu.map(item => (
        <div key={item._id} className="border-b pb-2 mb-2">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-semibold text-lg">{item.name}</h3>
              <p className="text-gray-700 text-sm">{item.description}</p>
              <p className="text-green-600 font-bold">€{item.price}</p>
            </div>
            <input
              type="number"
              min={0}
              className="w-20 border rounded px-2 py-1 ml-4"
              value={quantities[item._id] || ''}
              onChange={(e) => handleQuantityChange(item._id, e.target.value)

              }
            />
          </div>
        </div>
      ))}

      <button
        type="submit"
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 w-full"
      >
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
