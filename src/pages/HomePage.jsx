import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <div className="landing-container">
  <h1 className="landing-title">
    Bienvenido a <span className="highlight">QR Orders</span>
  </h1>
  <p className="landing-description">
    Visualiza el menú, haz pedidos fácilmente desde tu mesa y administra tu restaurante de forma eficiente.
  </p>

  <div className="landing-buttons">
    <Link to="/admin/login" className="landing-button admin">
      Acceder como Administrador
    </Link>
    <Link to="/menu" className="landing-button client">
      Ver Menú como Cliente
    </Link>
  </div>
</div>

  );
}


