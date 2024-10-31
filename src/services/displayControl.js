// src/services/displayControl.js
import { ref, set, onValue, off } from 'firebase/database';
import { database } from '../firebase';

// Function to update display settings
export const updateDisplaySettings = async (displayId, settings) => {
  try {
    const displayRef = ref(database, `displays/${displayId}`);
    await set(displayRef, {
      ...settings,
      lastUpdated: Date.now()
    });
    return true;
  } catch (error) {
    console.error('Error updating display:', error);
    return false;
  }
};

// Function to listen to display changes
export const subscribeToDisplayChanges = (displayId, callback) => {
  const displayRef = ref(database, `displays/${displayId}`);
  onValue(displayRef, (snapshot) => {
    const data = snapshot.val();
    callback(data);
  });

  // Return unsubscribe function
  return () => off(displayRef);
};

// Initialize default display settings
export const initializeDisplay = async (displayId) => {
  const defaultSettings = {
    content: 'default',
    status: 'online',
    lastUpdated: Date.now()
  };
  
  await updateDisplaySettings(displayId, defaultSettings);
};