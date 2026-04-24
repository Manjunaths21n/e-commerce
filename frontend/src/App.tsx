import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { StoreProvider } from './stores/StoreProvider'
import MainLayout from './components/layout/MainLayout'
import Home from './pages/Home'
import Products from './pages/Products'
import ProductDetails from './pages/ProductDetails'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import Profile from './pages/Profile'
import Wishlist from './pages/Wishlist'

import { Toaster } from 'sonner'

function App() {
  return (
    <StoreProvider>
      <Toaster position="top-center" richColors />
      <Router>
        <MainLayout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<ProductDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/wishlist" element={<Wishlist />} />
          </Routes>
        </MainLayout>
      </Router>
    </StoreProvider>
  )
}

export default App
