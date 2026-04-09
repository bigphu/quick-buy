import './App.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Homepage from './pages/Homepage'
import CartPage from './pages/CartPage'
import AdminPage from './pages/Admin'
import AccountPage from './pages/AccountPage'
import LoginPage from './pages/Login'
import RequireAuth from './components/common/RequireAuth'
import { getAuthUser } from './services/auth'

function AuthRedirect() {
  const authUser = getAuthUser();

  if (!authUser) {
    return <Navigate to="/login" replace />;
  }

  return <Navigate to={authUser.role === 'admin' ? '/admin' : '/account'} replace />;
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/start" element={<AuthRedirect />} />
        <Route path="/cart" element={<RequireAuth allowedRoles={['customer']}><CartPage /></RequireAuth>} />
        <Route path="/admin" element={<RequireAuth allowedRoles={['admin']}><AdminPage /></RequireAuth>} />
        <Route path="/account" element={<RequireAuth allowedRoles={['customer']}><AccountPage /></RequireAuth>} />
      </Routes>
    </Router>

  )
}

export default App