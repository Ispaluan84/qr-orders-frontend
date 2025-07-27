import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
    const [ formData, setFormData] = useState({ email: '', password: '' });
    const navigate = useNavigate();
    
    const handleChange = (e) => {
        const {name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`${process.env.REACT_APP_API_URL}/api/auth/login`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(formData)
            });

            if(!res.ok) throw new Error('Login Incorrecto');

            const data= await res.json();

            localStorage.setItem('token', data.token);
            localStorage.setItem('adminRestaurantId', data.admin.restaurant);

            alert('Login Exitoso');
            navigate(`/admin/${data.admin.restaurant}`);
        } catch (err) {
            alert(err.message);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-4 border rounded shadow">
            <h2 className="text-xl font-semibold mb-4">Acceso Administrador</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
            <input
            type="email"
            name="email"
            placeholder="Correo electrónico"
            value={formData.email}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
        />
            <input
                type="password"
                name="password"
                placeholder="Contraseña"
                value={formData.password}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
                required
            />
            <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
          Iniciar sesión
        </button>
      </form>
    </div>
);
}