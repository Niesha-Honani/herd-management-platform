import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from '../pages/LoginPage'
import DashboardPage from "../pages/DashboardPage";
import HerdsPage from "../pages/HerdsPage";

function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to="/login" replace />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/herds" element={<HerdsPage />} />
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes