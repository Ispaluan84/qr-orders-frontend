import { useNavigate } from 'react-router-dom';

export default function AdminDashboardPage() {
    
    const navigate = useNavigate();
    
    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/admin/login');
    };

    return (
    <div className="max-w-xl mx-auto py-10 px-4">
      <h2 className="text-2xl font-bold mb-6">Panel del Administrador</h2>

      <div className="space-y-4">
        <button
          onClick={() => navigate('/admin/menu')}
          className="block w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Gestionar Menú
        </button>
        <button
          onClick={() => navigate('/admin/orders')}
          className="block w-full bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
          Ver Pedidos
        </button>
        <button
          onClick={handleLogout}
          className="block w-full bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
          Cerrar Sesión
        </button>
      </div>
    </div>
  );
}

