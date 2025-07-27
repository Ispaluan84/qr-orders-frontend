import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from './pages/HomePage';
import CreateRestaurantPage from './pages/CreateRestaurantPage';
import RestaurantListPage from './pages/RestaurantListPage';
import RestaurantDetailPage from './pages/RestaurantDetailPage';
import MenuPage from './pages/MenuPage.js';
import CreateOrderPage from './pages/CreateOrderPage';
import OrdersPage from './pages/OrdersPage';
import CreateMenuItemPage from "./pages/CreateMenuItemPage.js";
import PublicMenuPage from "./pages/PublicMenuPage.js";

function App() {
  return (
    <Router>
      <Routes>

        <Route path="/admin/login" element={<LoginPage />} />
        <Route path="/public/:slug" element={<PublicMenuPage />} />
        <Route path="/" element={<RestaurantListPage />} />
        <Route path="/restaurant/create" element={ <CreateRestaurantPage /> } />
        <Route path="/restaurant/:slug" element={ <RestaurantDetailPage />} />
        <Route path="/restaurant/:slug/menu/create" element={ <CreateMenuItemPage />} />
        <Route path="/restaurant/:slug/menu" element={ <MenuPage /> } />
        <Route path="/restaurant/:slug/order" element={ <CreateOrderPage /> } />
        <Route path="/restaurant/:id/orders" element={ <OrdersPage /> } />
      </Routes>
    </Router>
  );
}

export default App;