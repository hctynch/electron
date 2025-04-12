import { Route, HashRouter as Router, Routes } from 'react-router-dom'
import './App.css'
import About from './components/About'
import Documentation from './components/Documentation'
import Home from './components/Home'
import Navbar from './components/Navbar'
import UpdateComponent from './components/UpdateComponent'

const App = () => {
  return (
    <div className='min-w-screen min-h-screen absolute inset-0 bg-gradient-to-t from-black to-gray-600 flex'>
      <Navbar />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/documentation" element={<Documentation />} />
          <Route path="/about" element={<About />} />
          <Route path="/update" element={<UpdateComponent />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
