import { initializeApp } from 'firebase/app';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { getDatabase, connectDatabaseEmulator } from 'firebase/database';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Auth
const auth = getAuth(app);

// Initialize Database
const database = getDatabase(app);

// Enhanced debug logging
console.log('Firebase initialization check:', {
  isAppInitialized: Boolean(app),
  isAuthInitialized: Boolean(auth),
  isDatabaseInitialized: Boolean(database),
  projectId: firebaseConfig.projectId,
  authDomain: firebaseConfig.authDomain,
  currentHost: window.location.hostname,
  isLocalhost: window.location.hostname === '127.0.0.1',
  environmentVariablesPresent: {
    apiKey: Boolean(process.env.REACT_APP_API_KEY),
    authDomain: Boolean(process.env.REACT_APP_AUTH_DOMAIN),
    databaseUrl: Boolean(process.env.REACT_APP_DATABASE_URL),
  }
});

// Development environment setup
if (process.env.NODE_ENV === 'development') {
  console.log('Development environment detected');
  
  // Check if using IP address instead of localhost
  if (window.location.hostname === '127.0.0.1') {
    console.log('Using IP address (127.0.0.1) for local development');
  }

  // Connect to emulators if enabled
  if (process.env.REACT_APP_USE_FIREBASE_EMULATOR === 'true') {
    // Update emulator host to use 127.0.0.1 instead of localhost
    connectAuthEmulator(auth, 'http://127.0.0.1:9099');
    connectDatabaseEmulator(database, '127.0.0.1', 9000);
    console.log('Connected to Firebase Emulators:', {
      authEmulator: 'http://127.0.0.1:9099',
      databaseEmulator: 'http://127.0.0.1:9000'
    });
  }
}

// Error handling for initialization
auth.onAuthStateChanged((user) => {
  console.log('Auth state changed:', {
    isAuthenticated: Boolean(user),
    userId: user?.uid,
    userEmail: user?.email,
    timestamp: new Date().toISOString()
  });
}, (error) => {
  console.error('Auth state change error:', {
    code: error.code,
    message: error.message,
    timestamp: new Date().toISOString()
  });
});

export { auth };
export { database };