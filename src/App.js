import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import HospitalDisplay from './components/HospitalDisplay';
import AdminPanel from './components/AdminPanel';
import NavigationHeader from './components/NavigationHeader';
import { AuthProvider } from './components/AuthContext';
import LoginPage from './components/LoginPage'; // Using the styled LoginPage instead of Login
import ProtectedRoute from './components/ProtectedRoute';
import NotFound from './components/NotFound';
import './App.css';

// Layout component to handle conditional header rendering
const Layout = ({ children }) => {
  const location = useLocation();
  const showHeader = location.pathname.includes('/admin');
  
  return (
    <div className="min-h-screen">
      {showHeader && <NavigationHeader />}
      {children}
    </div>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route 
              path="/" 
              element={
                <HospitalDisplay />
              } 
            />
            <Route 
              path="/admin" 
              element={
                <ProtectedRoute>
                  <AdminPanel />
                </ProtectedRoute>
              } 
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </Router>
    </AuthProvider>
  );
};

export default App;