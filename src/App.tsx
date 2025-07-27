import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom'
import './App.css'
import { Login } from './components/login/index';
import {Register} from './components/login/register';
import { useAuth } from './contexts/authcontext';
import { doSignOut } from './firebase/auth';

function Home() {
  const navigate = useNavigate();
  const auth = useAuth();
  const userLoggedIn = auth?.userLoggedIn;
  const userEmail = auth?.userEmail;
  const handleLogout = async () => {
    await doSignOut();
    navigate('/login');
  };

  if (userLoggedIn) {
    return (
      <div style={{ textAlign: 'center', marginTop: '4rem' }}>
        <h2>Welcome{userEmail ? `, ${userEmail}` : ''}!</h2>
        <button onClick={handleLogout} style={{ marginTop: '2rem' }}>
          Logout
        </button>
      </div>
    );
  }
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
    </Routes>
  );
}

export default App
