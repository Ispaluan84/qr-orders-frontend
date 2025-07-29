import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4 text-center">
      <h1 className="text-4xl font-bold mb-4 text-gray-800">
        Bienvenido a <span className="text-blue-600">QR Orders</span>
      </h1>
      <p className="text-gray-600 mb-8 max-w-md">
        Visualiza el menú, haz pedidos fácilmente desde tu mesa y administra tu restaurante de forma eficiente.
      </p>

      <div className="space-y-3 sm:space-y-0 sm:space-x-4 flex flex-col sm:flex-row">
        <Link
          to="/admin/login"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded transition"
        >
          Acceder como Administrador
        </Link>

        <Link
          to="/menu"
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-6 rounded transition"
        >
          Ver Menú como Cliente
        </Link>
      </div>
    </div>
  );
}


