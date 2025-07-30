import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import QRCodePrintPage from "./pages/QRCodePrintPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import PublicMenuPage from "./pages/PublicMenuPage.js";
import LoginPage from "./pages/LoginPage.js";
import AdminDashboardPage from "./pages/AdminDashboardPage.jsx";
import MenuFormPage from "./pages/MenuFormPage.jsx";
import OrdersPage from './pages/OrdersPage.jsx';
import AdminMenuPage from "./pages/AdminMenuPage.jsx";
import MenuEditPage from "./pages/MenuEditPage.jsx";

function App() {
  return (
    <Router>
      <Routes>

        <Route path="/admin/qrs" element={<QRCodePrintPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/menu" element={<PublicMenuPage />} />

        <Route path="/admin/login" element={<LoginPage />} />
        <Route path="/admin" element={<AdminDashboardPage />} />
        <Route path="/admin/menu" element={<AdminMenuPage />} />
        <Route path="/admin/menu/create" element={ <MenuFormPage />} />
        <Route path="/admin/menu/edit/:id" element={<MenuEditPage />} />
        <Route path="/admin/orders" element={ <OrdersPage /> } />
      </Routes>
    </Router>
  );
}

export default App;