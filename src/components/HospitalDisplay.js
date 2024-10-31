import React, { useEffect, useRef } from 'react';

const HospitalDisplay = () => {
  // Extract video ID from your YouTube URL
  const videoId = "D8-Zus1IAvk";

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <iframe 
        className="w-full h-screen"
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}`}
        title="Hospital Display"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen>
      </iframe>
    </div>
  );
};

export default HospitalDisplay;