// src/pages/HomePage.jsx
import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
      <h1 className="text-3xl font-bold mb-4 text-center text-gray-800">
        Bienvenido a QR Orders
      </h1>
      <p className="text-gray-600 mb-6 text-center max-w-md">
        Visualiza el menú, haz pedidos fácilmente desde tu mesa y administra tu restaurante de forma eficiente.
      </p>
      <Link
        to="/admin/login"
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded transition"
      >
        Acceder como Administrador
      </Link>
    </div>
  );
}

