import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Homepage from './pages/Homepage'
import CartPage from './pages/CartPage'
import AdminPage from './pages/Admin'
import AccountPage from './pages/AccountPage'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/account" element={<AccountPage />} />
      </Routes>
    </Router>

  )
}

export default App