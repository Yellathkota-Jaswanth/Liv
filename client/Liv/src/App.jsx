import React from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Layout from './components/Layout'
import Login from './components/login/Login'
import Register from './components/register/Register'
import Profile from './components/profile/Profile'
import PrivateRoute from './components/routing/PrivateRoute'
import './App.css'
import Dashboard from './components/pages/Dashboard'
import Home from '../../../git-website/src/pages/Home'
import AppointmentsPage from './components/pages/AppointmentsPage'
import Payment from './components/payment/Payment'
import Chat from './components/chat/Chat'


function App() {

  return (
    <AuthProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
            <Route path="/Home" element={<PrivateRoute><Home /></PrivateRoute>} />
            <Route path="/Dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
            <Route path="/Appointments" element={<PrivateRoute><AppointmentsPage /></PrivateRoute>} />
            <Route path="/Payment" element={<PrivateRoute><Payment /></PrivateRoute>} />
            <Route path="/Chat" element={<PrivateRoute><Chat /></PrivateRoute>} />






            <Route path="/feed" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
            <Route path="/" element={<Navigate to="/login" />} />
          </Routes>
        </Layout>
      </Router>
    </AuthProvider>
  )
}

export default App