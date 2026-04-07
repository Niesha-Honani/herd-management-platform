import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { LoginPage } from '../pages/LoginPage'
import { DashboardPage } from "../pages/DashboardPage";
import { HerdsPage } from "../pages/HerdsPage";
import { RanchesPage } from "../pages/RanchesPage";
import { ProtectedRoute } from "../components/ProtectedRoute";

function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to="/login" replace />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/dashboard" element={
                    <ProtectedRoute>
                        <DashboardPage />
                    </ProtectedRoute>
                    }
                />
                <Route path="/herds" element={
                    <ProtectedRoute>
                        <HerdsPage />
                    </ProtectedRoute>
                    }
                />
                <Route path="/ranches" element={
                    <ProtectedRoute>
                        <RanchesPage />
                    </ProtectedRoute>
                }
                />
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes