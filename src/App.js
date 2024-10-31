// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HospitalDisplay from './components/HospitalDisplay';
import AdminPanel from './components/AdminPanel';
import NavigationHeader from './components/NavigationHeader'; 
import { AuthProvider, Login, ProtectedRoute } from './components/AuthContext'; 
import NotFound from './components/NotFound'; // Import a NotFound component
import './App.css';

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <div className="App">
          <NavigationHeader />
          <Routes>
            <Route path="/" element={<HospitalDisplay />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminPanel />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<NotFound />} /> {/* Fallback route for 404 */}
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
};

export default App;
