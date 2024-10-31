import React, { useState, useEffect } from 'react';
import { updateDisplaySettings, subscribeToDisplayChanges } from '../services/displayControl';
import { AlertTriangle, Monitor, Bell, Calendar, Video, X } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';

const AdminPanel = () => {
  const [loading, setLoading] = useState(false);
  const [currentSettings, setCurrentSettings] = useState(null);
  const [videoId, setVideoId] = useState('D8-Zus1IAvk');
  const [emergencyMessage, setEmergencyMessage] = useState('');
  const [announcements, setAnnouncements] = useState(['']);
  const [scheduleItems, setScheduleItems] = useState([{ time: '', event: '' }]);

  // Subscribe to current display settings
  useEffect(() => {
    const unsubscribe = subscribeToDisplayChanges('1', (settings) => {
      setCurrentSettings(settings);
    });
    return () => unsubscribe();
  }, []);

  const setDefaultView = async () => {
    setLoading(true);
    try {
      await updateDisplaySettings('1', {
        content: 'default',
        status: 'online',
        videoId
      });
    } finally {
      setLoading(false);
    }
  };

  const setEmergencyView = async () => {
    setLoading(true);
    try {
      await updateDisplaySettings('1', {
        content: 'emergency',
        status: 'online',
        emergencyMessage: emergencyMessage || 'Emergency evacuation required'
      });
    } finally {
      setLoading(false);
    }
  };

  const setAnnouncementsView = async () => {
    setLoading(true);
    try {
      await updateDisplaySettings('1', {
        content: 'announcements',
        status: 'online',
        announcements: announcements.filter(a => a.trim())
      });
    } finally {
      setLoading(false);
    }
  };

  const setScheduleView = async () => {
    setLoading(true);
    try {
      await updateDisplaySettings('1', {
        content: 'schedule',
        status: 'online',
        schedule: scheduleItems.filter(item => item.time && item.event)
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAnnouncementChange = (index, value) => {
    const newAnnouncements = [...announcements];
    newAnnouncements[index] = value;
    setAnnouncements(newAnnouncements);
  };

  const addAnnouncement = () => {
    setAnnouncements([...announcements, '']);
  };

  const removeAnnouncement = (index) => {
    setAnnouncements(announcements.filter((_, i) => i !== index));
  };

  const handleScheduleChange = (index, field, value) => {
    const newSchedule = [...scheduleItems];
    newSchedule[index] = { ...newSchedule[index], [field]: value };
    setScheduleItems(newSchedule);
  };

  const addScheduleItem = () => {
    setScheduleItems([...scheduleItems, { time: '', event: '' }]);
  };

  const removeScheduleItem = (index) => {
    setScheduleItems(scheduleItems.filter((_, i) => i !== index));
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Monitor className="w-6 h-6" />
            Hospital Display Control Panel
          </CardTitle>
        </CardHeader>
        <CardContent>
          {currentSettings && (
            <Alert className="mb-6">
              <AlertDescription>
                Currently showing: {currentSettings.content} view
              </AlertDescription>
            </Alert>
          )}

          <div className="grid gap-6">
            {/* Default View Controls */}
            <div className="space-y-4">
              <h3 className="font-semibold flex items-center gap-2">
                <Video className="w-5 h-5" />
                Default View
              </h3>
              <div className="flex gap-4">
                <input
                  type="text"
                  placeholder="YouTube Video ID"
                  value={videoId}
                  onChange={(e) => setVideoId(e.target.value)}
                  className="flex-1 px-3 py-2 border rounded"
                />
                <button
                  onClick={setDefaultView}
                  disabled={loading}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
                >
                  Set Default View
                </button>
              </div>
            </div>

            {/* Emergency View Controls */}
            <div className="space-y-4">
              <h3 className="font-semibold flex items-center gap-2 text-red-600">
                <AlertTriangle className="w-5 h-5" />
                Emergency Alert
              </h3>
              <div className="flex gap-4">
                <input
                  type="text"
                  placeholder="Emergency Message"
                  value={emergencyMessage}
                  onChange={(e) => setEmergencyMessage(e.target.value)}
                  className="flex-1 px-3 py-2 border rounded"
                />
                <button
                  onClick={setEmergencyView}
                  disabled={loading}
                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50"
                >
                  Show Emergency
                </button>
              </div>
            </div>

            {/* Announcements Controls */}
            <div className="space-y-4">
              <h3 className="font-semibold flex items-center gap-2">
                <Bell className="w-5 h-5" />
                Announcements
              </h3>
              {announcements.map((announcement, index) => (
                <div key={index} className="flex gap-4">
                  <input
                    type="text"
                    placeholder="Announcement text"
                    value={announcement}
                    onChange={(e) => handleAnnouncementChange(index, e.target.value)}
                    className="flex-1 px-3 py-2 border rounded"
                  />
                  <button
                    onClick={() => removeAnnouncement(index)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              ))}
              <div className="flex gap-4">
                <button
                  onClick={addAnnouncement}
                  className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                >
                  Add Announcement
                </button>
                <button
                  onClick={setAnnouncementsView}
                  disabled={loading}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
                >
                  Show Announcements
                </button>
              </div>
            </div>

            {/* Schedule Controls */}
            <div className="space-y-4">
              <h3 className="font-semibold flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Schedule
              </h3>
              {scheduleItems.map((item, index) => (
                <div key={index} className="flex gap-4">
                  <input
                    type="text"
                    placeholder="Time (e.g., 9:00 AM)"
                    value={item.time}
                    onChange={(e) => handleScheduleChange(index, 'time', e.target.value)}
                    className="w-1/3 px-3 py-2 border rounded"
                  />
                  <input
                    type="text"
                    placeholder="Event description"
                    value={item.event}
                    onChange={(e) => handleScheduleChange(index, 'event', e.target.value)}
                    className="flex-1 px-3 py-2 border rounded"
                  />
                  <button
                    onClick={() => removeScheduleItem(index)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              ))}
              <div className="flex gap-4">
                <button
                  onClick={addScheduleItem}
                  className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                >
                  Add Schedule Item
                </button>
                <button
                  onClick={setScheduleView}
                  disabled={loading}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
                >
                  Show Schedule
                </button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminPanel;