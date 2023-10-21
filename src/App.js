import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';

// Pages
import LandingPage from './pages/landing/LandingPage';
import RegisterPage from './pages/register/RegisterPage';
import VerifyEmail from './pages/verifyEmail/VerifyEmail';
import LoginPage from './pages/login/LoginPage';
import ResetPassword from './pages/resetPassword/ResetPassword';
import Layout from './components/layout/Layout';
import Kelas from './pages/kelas/Kelas';
import Dashboard from './pages/dashboard/Dashboard';
import Content from './pages/kelas/Content';
import Profile from './pages/profile/Profile';
import ForumDiscussion from './pages/forum/Forum';
import ForumPengajar from './pages/forum/Pengajar';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/profile/:name" element={<Profile />} />
        <Route path="/peserta" element={<Layout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="kelas/:name" element={<Kelas />} />
          <Route path="forum-diskusi/:name" element={<ForumDiscussion />} />
          <Route path="forum-diskusi-pengajar/:name" element={<ForumPengajar />} />
          <Route path="materi/:id" element={<Content />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
