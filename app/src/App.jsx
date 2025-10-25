import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { ToastContainer, toast } from 'react-toastify'

import Navigation     from './components/Navigation.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import Home           from './pages/Home.jsx'
import CartPage       from './pages/CartPage.jsx'
import ProductDetail  from './pages/ProductDetail.jsx'
import Login          from './pages/Login.jsx'
import Footer         from './components/Footer.jsx'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-toastify/dist/ReactToastify.css'
import './App.css'

function App() {
  const [cart, setCart] = useState([])

  const handleAddToCart = (product) => {
    const existingProduct = cart.find(item => item.id === product.id)

    if (existingProduct) {
      setCart(prevCart => prevCart.map(item =>
        item.id === product.id
          ? { ...item, quantity: (item.quantity || 1) + 1 }
          : item
      ))
      toast.success(`Se agregó otra unidad de ${product.title} al carrito`, {
        position: "top-right",
        autoClose: 2000
      })
    } else {
      setCart(prevCart => [...prevCart, { ...product, quantity: 1 }])
      toast.success(`${product.title} agregado al carrito`, {
        position: "top-right",
        autoClose: 2000
      })
    }
  }

  const handleRemoveFromCart = (productId) => {
    const product = cart.find(item => item.id === productId)
    setCart(cart.filter(item => item.id !== productId))
    toast.info(`${product.title} eliminado del carrito`, {
      position: "top-right",
      autoClose: 2000
    })
  }

  const handleClearCart = () => {
    setCart([])
    toast.success('¡Compra realizada con éxito!', {
      position: "top-right",
      autoClose: 3000
    })
  }

  function AppRoutes() {
    const location = useLocation();
    const isLogin = location.pathname === '/' || location.pathname === '/login';

    return (
      <div id="root">
        {!isLogin && <Navigation cartItemsCount={cart.length} />}

        <div className="app-content" style={{ paddingTop: isLogin ? 0 : '100px' }}>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/home" element={<Home onAddToCart={handleAddToCart} />} />
            <Route path="/product/:id" element={<ProductDetail onAddToCart={handleAddToCart} />} />
            <Route path="/cart" element={<ProtectedRoute><CartPage items={cart} onRemoveFromCart={handleRemoveFromCart} onClearCart={handleClearCart} /> </ProtectedRoute>} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
        
        {!isLogin && <Footer />}
      </div>
    )
  }

  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
        <ToastContainer 
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={true}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          style={{ top: '100px' }} // Esto moverá las notificaciones 100px hacia abajo desde la parte superior
        />
      </Router>
    </AuthProvider>
  )
}

export default App
