import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/auth/LoginPage';
import DashboardPage from './pages/dashboard/DashboardPage';
import AccountsPage from './pages/accounts/AccountsPage';
import CardsPage from './pages/cards/CardsPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Ruta de Login */}
        <Route path="/" element={<LoginPage />} />

        {/* Ruta de Dashboard */}
        <Route path="/dashboard" element={<DashboardPage />} />

        {/* Ruta de Accounts */}
        <Route path="/accounts" element={<AccountsPage />} />

        {/* Ruta de Cards */}
        <Route path="/cards" element={<CardsPage />} />

        {/* Redirección por defecto para rutas no encontradas */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
