import { useEffect, useState } from 'react';

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/orders`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const data = await res.json();
      setOrders(data);
    } catch (err) {
      console.error('Error al cargar los pedidos:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/orders/${orderId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!res.ok) throw new Error('Error al actualizar el estado');
      fetchOrders();
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading) {
    return <p className="text-center mt-10">Cargando pedidos...</p>;
  }

  return (
    <div className="orders-page-container">
  <h2 className="orders-page-title">Pedidos Recibidos</h2>

  {orders.length === 0 ? (
    <p>No hay pedidos por el momento.</p>
  ) : (
    <ul className="orders-list">
      {orders.map((order) => (
        <li key={order._id} className="order-card">
          <p className="order-info"><strong>Mesa:</strong> {order.tableNumber}</p>
          <p className="order-info"><strong>Estado:</strong> {order.status}</p>

          <ul className="order-items">
            {order.items.map((item) => (
              <li key={item.menuItem._id}>
                {item.menuItem.name} × {item.quantity}
              </li>
            ))}
          </ul>

          <select
            value={order.status}
            onChange={(e) => handleStatusChange(order._id, e.target.value)}
            className="order-select"
          >
            <option value="pendiente">Pendiente</option>
            <option value="preparando">Preparando</option>
            <option value="listo">Listo</option>
            <option value="entregado">Entregado</option>
          </select>
        </li>
      ))}
    </ul>
  )}
</div>

  );
}
