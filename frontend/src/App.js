import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header'
import Dashboard from './components/pages/Dashboard'
import Login from './components/pages/Login'
import Register from './components/pages/Register'


function App() {
  return (
    <>
    <Router>
      <div className="container">
        <Header/>
        <Routes>
          <Route path='/' element={<Dashboard/>} />
          <Route path='/register' element={<Register/>} />
          <Route path='/login' element={<Login/>} />
        </Routes>
        <ToastContainer/>
      </div>
    </Router>
    </>
  )
}

export default App