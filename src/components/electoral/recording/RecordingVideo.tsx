
import React from 'react';

interface RecordingVideoProps {
  videoRef: React.RefObject<HTMLVideoElement>;
}

const RecordingVideo: React.FC<RecordingVideoProps> = ({ videoRef }) => {
  return (
    <div className="hidden">
      <video ref={videoRef} autoPlay playsInline />
    </div>
  );
};

export default RecordingVideo;
