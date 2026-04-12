import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Products from './pages/Products'
import ScrollToTop from './components/ScrollToTop'

function App() {
  return (
    <div className="min-h-screen bg-dark-950 text-white">
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/prodotti" element={<Products />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
