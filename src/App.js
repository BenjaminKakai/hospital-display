// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HospitalDisplay from './components/HospitalDisplay';
import AdminPanel from './components/AdminPanel';
import NavigationHeader from './components/NavigationHeader'; 
import { AuthProvider, Login, ProtectedRoute } from './components/Auth'; // Import AuthProvider, Login, and ProtectedRoute
import './App.css';

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <div className="App">
          <NavigationHeader /> {/* Add NavigationHeader here */}
          <Routes>
            <Route path="/" element={<HospitalDisplay />} />
            <Route path="/login" element={<Login />} /> {/* Add Login route */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminPanel /> {/* Protect AdminPanel route */}
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
};

export default App;
