import React, { useEffect, useState } from 'react';
import { subscribeToDisplayChanges } from '../services/displayControl';

const HospitalDisplay = () => {
  const [displaySettings, setDisplaySettings] = useState({
    content: 'default',
    status: 'online',
    videoId: '6Hwd6fzFGeA'
  });

  // Add connection status monitoring
  const [isConnected, setIsConnected] = useState(true);

  useEffect(() => {
    const displayId = '1';

    // Monitor connection status
    const handleOnline = () => {
      console.log('Connection restored');
      setIsConnected(true);
    };

    const handleOffline = () => {
      console.log('Connection lost');
      setIsConnected(false);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Enhanced subscription with error handling
    const unsubscribe = subscribeToDisplayChanges(displayId, (newSettings) => {
      console.log('Received new settings:', newSettings); // Debug log
      if (newSettings) {
        setDisplaySettings(prevSettings => {
          console.log('Updating from:', prevSettings, 'to:', newSettings); // Debug log
          return {
            ...prevSettings,
            ...newSettings
          };
        });
      }
    });

    // Cleanup
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      unsubscribe();
    };
  }, []);

  // Default YouTube View with enhanced error handling
  const DefaultView = () => (
    <div className="fixed inset-0 w-full h-full bg-black">
      <iframe
        className="w-full h-full"
        src={`https://www.youtube.com/embed/${displaySettings.videoId}?autoplay=1&mute=1&loop=1&playlist=${displaySettings.videoId}&playsinline=1&rel=0`}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
        allowFullScreen
      />
    </div>
  );

  // Emergency View with fallback text
  const EmergencyView = () => (
    <div className="fixed inset-0 w-full h-full bg-red-600 flex items-center justify-center">
      <div className="text-white text-center p-8">
        <h1 className="text-6xl font-bold mb-4">⚠️ EMERGENCY ALERT</h1>
        <p className="text-2xl">{displaySettings.emergencyMessage || 'Please follow staff instructions'}</p>
        {!isConnected && <p className="text-xl mt-4">(Connection issues detected - Some information may be delayed)</p>}
      </div>
    </div>
  );

  // Announcements View with connection status
  const AnnouncementsView = () => (
    <div className="fixed inset-0 w-full h-full bg-blue-600 flex items-center justify-center">
      <div className="text-white text-center p-8">
        <h1 className="text-4xl font-bold mb-6">Hospital Announcements</h1>
        <div className="text-2xl space-y-4">
          {displaySettings.announcements?.map((announcement, index) => (
            <p key={index}>{announcement}</p>
          )) || 'No current announcements'}
          {!isConnected && <p className="text-xl mt-4">(Connection issues detected - Some announcements may be delayed)</p>}
        </div>
      </div>
    </div>
  );

  // Schedule View with connection indicator
  const ScheduleView = () => (
    <div className="fixed inset-0 w-full h-full bg-gray-800 flex items-center justify-center">
      <div className="text-white text-center p-8">
        <h1 className="text-4xl font-bold mb-6">Today's Schedule</h1>
        <div className="text-2xl space-y-4">
          {displaySettings.schedule?.map((item, index) => (
            <div key={index} className="mb-4">
              <p className="font-bold">{item.time}</p>
              <p>{item.event}</p>
            </div>
          )) || 'No scheduled events'}
          {!isConnected && <p className="text-xl mt-4">(Connection issues detected - Schedule may not be current)</p>}
        </div>
      </div>
    </div>
  );

  // Offline View with more detailed status
  const OfflineView = () => (
    <div className="fixed inset-0 w-full h-full bg-gray-900 flex items-center justify-center">
      <div className="text-white text-center">
        <h1 className="text-4xl font-bold mb-4">Display Offline</h1>
        <p className="text-xl">Please contact technical support</p>
        <p className="text-lg mt-4">Connection Status: {isConnected ? 'Connected' : 'Disconnected'}</p>
      </div>
    </div>
  );

  // Enhanced renderContent with error boundary
  const renderContent = () => {
    try {
      switch (displaySettings.content) {
        case 'emergency':
          return <EmergencyView />;
        case 'announcements':
          return <AnnouncementsView />;
        case 'schedule':
          return <ScheduleView />;
        case 'default':
          return <DefaultView />;
        default:
          return <DefaultView />;
      }
    } catch (error) {
      console.error('Render error:', error);
      return <DefaultView />;
    }
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      {displaySettings.status === 'online' ? renderContent() : <OfflineView />}
    </div>
  );
};

export default HospitalDisplay;