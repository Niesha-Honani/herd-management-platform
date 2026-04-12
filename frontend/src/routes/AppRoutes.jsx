import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { DashboardShell } from "../layouts/DashboardShell";
import { LoginPage } from '../pages/LoginPage'
import { SignUpPage } from "../pages/SignUpPage";
import { DashboardPage } from "../pages/DashboardPage";
import { HerdsPage } from "../pages/HerdsPage";
import { AnimalPage } from "../pages/AnimalsPage";
import { RanchesPage } from "../pages/RanchesPage";
import { ProtectedRoute } from "../components/ProtectedRoute";

function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to="/login" replace />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={< SignUpPage />} />
                <Route element={<ProtectedRoute><DashboardShell /></ProtectedRoute>}>
                    <Route path="dashboard" element={<DashboardPage />} />
                    <Route path="herds" element={<HerdsPage />} />
                    <Route path="animals" element={<AnimalPage />} />
                    <Route path="ranches" element={<RanchesPage />}  />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes