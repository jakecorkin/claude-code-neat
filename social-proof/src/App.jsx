import { Routes, Route } from "react-router-dom";
import { MenuProvider } from "./context/MenuContext";
import LandingPage from "./pages/LandingPage";
import MenuPage from "./pages/MenuPage";
import DishPage from "./pages/DishPage";
import AdminLayout from "./pages/admin/AdminLayout";
import OverviewPage from "./pages/admin/OverviewPage";
import DishesPage from "./pages/admin/DishesPage";
import DishFormPage from "./pages/admin/DishFormPage";
import ReviewsPage from "./pages/admin/ReviewsPage";
import PerformancePage from "./pages/admin/PerformancePage";

export default function App() {
  return (
    <MenuProvider>
      <Routes>
        {/* Landing */}
        <Route path="/" element={<LandingPage />} />

        {/* Customer app */}
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/dish/:id" element={<DishPage />} />

        {/* Admin */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<OverviewPage />} />
          <Route path="dishes" element={<DishesPage />} />
          <Route path="dishes/new" element={<DishFormPage />} />
          <Route path="dishes/:id/edit" element={<DishFormPage />} />
          <Route path="reviews" element={<ReviewsPage />} />
          <Route path="performance" element={<PerformancePage />} />
        </Route>
      </Routes>
    </MenuProvider>
  );
}
