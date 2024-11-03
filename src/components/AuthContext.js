// AuthContext.js
import { createContext, useContext, useState, useEffect } from 'react';
import { 
  signInWithEmailAndPassword, 
  onAuthStateChanged,
  signOut 
} from 'firebase/auth';
import { auth } from '../firebase';

const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
      console.log('Auth state changed:', { 
        isAuthenticated: Boolean(user),
        userEmail: user?.email,
        uid: user?.uid 
      });
    });

    return unsubscribe;
  }, []);

  const login = async (email, password) => {
    console.log('Login attempt starting...', { email });
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log('Login successful:', userCredential.user.email);
      return userCredential;
    } catch (error) {
      console.error('Login error:', { 
        code: error.code,
        message: error.message,
        email 
      });
      throw error;
    }
  };

  const logout = () => signOut(auth);

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);