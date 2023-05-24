import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';

// import Routes from './routes';
// Pages
import LandingPage from './pages/landing/LandingPage';
import LoginPage from './pages/login/LoginPage';
import ResetPassword from './pages/resetPassword/ResetPassword';
import Layout from './components/layout/Layout';
import Kelas from './pages/kelas/Kelas';
import Dashboard from './pages/dashboard/Dashboard';
import Content from './pages/kelas/Content';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/peserta" element={<Layout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="kelas/:name" element={<Kelas />} />
          <Route path="materi/:id" element={<Content />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
