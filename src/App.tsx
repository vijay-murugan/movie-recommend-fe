import { Routes, Route, useNavigate } from 'react-router-dom'
import './App.css'
import { Login } from './components/login/index';
import { Register } from './components/login/register';
import { Rate } from './components/ratingpage';
import { useAuth } from './contexts/authcontext';
import { doSignOut } from './firebase/auth';
import { useEffect } from 'react';

function Home() {
  const navigate = useNavigate();
  const auth = useAuth();
  const userLoggedIn = auth?.userLoggedIn;

   useEffect(() => {
    if (userLoggedIn) {
      navigate('/rate');
    }
  }, [userLoggedIn, navigate]);
   return (
    <div style={{ textAlign: 'center', marginTop: '4rem' }}>
      <button className="button" onClick={() => navigate('/login')}>Login</button>
      <button className="button" onClick={() => navigate('/register')} style={{ marginLeft: '1rem' }}>Register</button>
    </div>
  );
}



function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/rate" element={<Rate />} />
    </Routes>
  );
}

export default App
