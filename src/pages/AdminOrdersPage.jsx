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
      <div className="orders-container">
  <h2 className="orders-title">Pedidos Recibidos</h2>

  {orders.length === 0 ? (
    <p>No hay pedidos todavía.</p>
  ) : (
    <ul className="orders-list">
      {orders.map((order) => (
        <li key={order._id} className="order-card">
          <p className="order-table">Mesa {order.tableNumber}</p>
          <p className="order-date">
            Fecha: {new Date(order.createdAt).toLocaleString()}
          </p>
          <ul className="order-items">
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
