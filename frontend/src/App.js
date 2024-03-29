import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  return (
    <>
  
      <Router>
        <Header />
        <div className='container'>
          <Routes>
            <Route path='/' element={<Dashboard />} ></Route>
            <Route path='/register' element={<Register />} ></Route>
            <Route path='/login' element={<Login />} ></Route>
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    
    </>
  );
}

export default App;
