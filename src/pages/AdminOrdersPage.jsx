import { useEffect, useState } from 'react';

export default function AdminOrdersPage() {
    const [ orders, setOrders ] = useState([]);
    const [ loading, setLoading ] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');

        fetch(`${process.env.REACT_APP_API_URL}/api/orders`, {
            headers: {
                Authorization: `Bearer ${token}`,     
            },
        })
        .then(res => res.json())
        .then(data => setOrders(data))
        .catch(err => {
            console.error('Error al cargar pedidos:', err);
            alert('Error al cargar pedidos');
        })
        .finally(() => setLoading(false))
    }, []);

    if(loading) return <p className="text-center mt-10">Cargando pedidos...</p>

    return(
        <div className="max-w-4xl mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold mb-6">Pedidos Recibidos</h2>

      {orders.length === 0 ? (
        <p>No hay pedidos todavía.</p>
      ) : (
        <ul className="space-y-4">
          {orders.map(order => (
            <li key={order._id} className="border p-4 rounded">
              <p className="font-semibold">Mesa {order.tableNumber}</p>
              <p className="text-sm text-gray-500">Fecha: {new Date(order.createdAt).toLocaleString()}</p>
              <ul className="mt-2 space-y-1">
                {order.items.map((item, i) => (
                  <li key={i}>
                    • {item.menuItem.name} × {item.quantity}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
    )


}
