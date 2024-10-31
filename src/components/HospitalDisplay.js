import React, { useEffect, useState } from 'react';
import { subscribeToDisplayChanges } from '../services/displayControl';

const HospitalDisplay = () => {
  const [displaySettings, setDisplaySettings] = useState({
    content: 'default',
    status: 'online',
    videoId: 'D8-Zus1IAvk'
  });
  
  useEffect(() => {
    // Subscribe to Firebase changes
    const displayId = '1';
    const unsubscribe = subscribeToDisplayChanges(displayId, (newSettings) => {
      if (newSettings) {
        setDisplaySettings(prevSettings => ({
          ...prevSettings,
          ...newSettings
        }));
      }
    });
    
    return () => unsubscribe();
  }, []);

  // Default YouTube View
  const DefaultView = () => (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <iframe
        className="w-full h-screen"
        src={`https://www.youtube.com/embed/${displaySettings.videoId}?autoplay=1&mute=1&loop=1&playlist=${displaySettings.videoId}`}
        title="Hospital Display"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );

  // Emergency View
  const EmergencyView = () => (
    <div className="min-h-screen bg-red-600 flex items-center justify-center">
      <div className="text-white text-center">
        <h1 className="text-6xl font-bold mb-4">⚠️ EMERGENCY ALERT</h1>
        <p className="text-2xl">{displaySettings.emergencyMessage || 'Please follow staff instructions'}</p>
      </div>
    </div>
  );

  // Announcements View
  const AnnouncementsView = () => (
    <div className="min-h-screen bg-blue-600 flex items-center justify-center">
      <div className="text-white text-center p-8">
        <h1 className="text-4xl font-bold mb-6">Hospital Announcements</h1>
        <div className="text-2xl space-y-4">
          {displaySettings.announcements?.map((announcement, index) => (
            <p key={index}>{announcement}</p>
          )) || 'No current announcements'}
        </div>
      </div>
    </div>
  );

  // Schedule View
  const ScheduleView = () => (
    <div className="min-h-screen bg-gray-800 flex items-center justify-center">
      <div className="text-white text-center p-8">
        <h1 className="text-4xl font-bold mb-6">Today's Schedule</h1>
        <div className="text-2xl space-y-4">
          {displaySettings.schedule?.map((item, index) => (
            <div key={index} className="mb-4">
              <p className="font-bold">{item.time}</p>
              <p>{item.event}</p>
            </div>
          )) || 'No scheduled events'}
        </div>
      </div>
    </div>
  );

  // Offline View
  const OfflineView = () => (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="text-white text-center">
        <h1 className="text-4xl font-bold mb-4">Display Offline</h1>
        <p className="text-xl">Please contact technical support</p>
      </div>
    </div>
  );

  // Render different content based on displaySettings.content
  const renderContent = () => {
    switch (displaySettings.content) {
      case 'emergency':
        return <EmergencyView />;
      case 'announcements':
        return <AnnouncementsView />;
      case 'schedule':
        return <ScheduleView />;
      default:
        return <DefaultView />;
    }
  };

  return (
    <div>
      {displaySettings.status === 'online' ? renderContent() : <OfflineView />}
    </div>
  );
};

export default HospitalDisplay;