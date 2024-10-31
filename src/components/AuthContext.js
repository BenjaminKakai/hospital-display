import React, { useState, createContext, useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import Card, { CardHeader, CardTitle, CardContent } from './ui/Card'; // Adjust according to the relative path

// Create auth context
const AuthContext = createContext(null);

// Login component
const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const auth = useContext(AuthContext);

  const handleLogin = (e) => {
    e.preventDefault();
    // Replace with your desired username/password
    if (username === 'benjaminkakaimasai@gmail.com' && password === 'co37x74bob') {
      auth.signIn(() => {
        localStorage.setItem('isAuthenticated', 'true');
      });
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Hospital Display Admin Login</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            {error && (
              <div className="p-3 bg-red-100 text-red-700 rounded">
                {error}
              </div>
            )}
            <div>
              <label className="block text-sm font-medium mb-1">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-3 py-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border rounded"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Login
            </button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

// Protected Route wrapper
const ProtectedRoute = ({ children }) => {
  const auth = useContext(AuthContext);
  const location = useLocation();

  if (!auth.isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

// Auth Provider component
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem('isAuthenticated') === 'true'
  );

  const signIn = (callback) => {
    setIsAuthenticated(true);
    callback();
  };

  const signOut = (callback) => {
    setIsAuthenticated(false);
    localStorage.removeItem('isAuthenticated');
    callback();
  };

  const value = { isAuthenticated, signIn, signOut };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { Login, ProtectedRoute, AuthContext };