// src/components/AdminPanel.js
import React, { useState } from 'react';
import { updateDisplaySettings } from '../services/displayControl';

const AdminPanel = () => {
  const [loading, setLoading] = useState(false);

  const setDefaultView = async () => {
    setLoading(true);
    await updateDisplaySettings('1', {
      content: 'default',
      status: 'online',
      videoId: 'D8-Zus1IAvk'
    });
    setLoading(false);
  };

  const setEmergencyView = async () => {
    setLoading(true);
    await updateDisplaySettings('1', {
      content: 'emergency',
      status: 'online',
      emergencyMessage: 'Emergency evacuation required'
    });
    setLoading(false);
  };

  const setAnnouncementsView = async () => {
    setLoading(true);
    await updateDisplaySettings('1', {
      content: 'announcements',
      status: 'online',
      announcements: [
        'Visiting hours: 2 PM - 8 PM',
        'Cafeteria closed for maintenance'
      ]
    });
    setLoading(false);
  };

  const setScheduleView = async () => {
    setLoading(true);
    await updateDisplaySettings('1', {
      content: 'schedule',
      status: 'online',
      schedule: [
        { time: '9:00 AM', event: 'Morning Rounds' },
        { time: '2:00 PM', event: 'Visiting Hours Begin' }
      ]
    });
    setLoading(false);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Display Control Panel</h1>
      <div className="space-y-4">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
          onClick={setDefaultView}
          disabled={loading}
        >
          Show Default View
        </button>
        
        <button
          className="bg-red-500 text-white px-4 py-2 rounded disabled:opacity-50"
          onClick={setEmergencyView}
          disabled={loading}
        >
          Show Emergency Alert
        </button>
        
        <button
          className="bg-green-500 text-white px-4 py-2 rounded disabled:opacity-50"
          onClick={setAnnouncementsView}
          disabled={loading}
        >
          Show Announcements
        </button>
        
        <button
          className="bg-purple-500 text-white px-4 py-2 rounded disabled:opacity-50"
          onClick={setScheduleView}
          disabled={loading}
        >
          Show Schedule
        </button>
      </div>
    </div>
  );
};

export default AdminPanel;