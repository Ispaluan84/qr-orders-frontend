import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PublicMenuPage from "./pages/PublicMenuPage.js";
import LoginPage from "./pages/LoginPage.js";
import AdminDashboardPage from "./pages/AdminDashboardPage.js";
import MenuFormPage from "./pages/MenuFormPage.jsx";
import OrdersPage from './pages/OrdersPage';
import AdminMenuPage from "./pages/AdminMenuPage.jsx";


function App() {
  return (
    <Router>
      <Routes>

        <Route path="/admin/login" element={<LoginPage />} />
        <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
        <Route path="/admin/menu" element={<AdminMenuPage />} />
        <Route path="admin/menu/create" element={ <MenuFormPage />} />
        <Route path="admin/orders" element={ <OrdersPage /> } />
        <Route path="/" element={<HomePage />} />
      </Routes>
    </Router>
  );
}

export default App;