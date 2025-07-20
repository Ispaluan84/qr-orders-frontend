import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function OrdersPage() {
  const { id } = useParams(); // ID del restaurante
  const [orders, setOrders] = useState([]);

  const fetchOrders = () => {
    fetch(`http://localhost:5000/api/orders/${id}`)
      .then(res => res.json())
      .then(data => setOrders(data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchOrders();
  }, [id]);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const res = await fetch(`http://localhost:5000/api/orders/${orderId}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });

      if (!res.ok) throw new Error('Error al actualizar el estado');

      fetchOrders(); // recargar pedidos después del cambio
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Pedidos del Restaurante</h2>
      {orders.length === 0 ? (
        <p>No hay pedidos aún.</p>
      ) : (
        <ul>
          {orders.map(order => (
            <li key={order._id} style={{ marginBottom: '1rem', borderBottom: '1px solid #ccc' }}>
              <p><strong>Mesa:</strong> {order.tableNumber}</p>
              <p><strong>Estado:</strong> {order.status}</p>
              <ul>
                {order.items.map(item => (
                  <li key={item.menuItem._id}>
                    {item.menuItem.name} x{item.quantity}
                  </li>
                ))}
              </ul>

              <label>Cambiar estado: </label>
              <select
                value={order.status}
                onChange={(e) => handleStatusChange(order._id, e.target.value)}
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
