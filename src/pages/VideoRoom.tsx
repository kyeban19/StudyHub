import React, { useState } from 'react';
import { JitsiMeeting } from '@jitsi/react-sdk';
import { Video, LogOut } from 'lucide-react';
import './VideoRoom.css';

export const VideoRoom: React.FC = () => {
  const [roomName, setRoomName] = useState('StudyHub-General');
  const [isJoined, setIsJoined] = useState(false);

  const handleJoin = (e: React.FormEvent) => {
    e.preventDefault();
    if (roomName.trim()) {
      setIsJoined(true);
    }
  };

  return (
    <div className="video-room-container">
      <div className="video-header">
        <h1>Study Rooms</h1>
        <p>Join a room to start studying with friends.</p>
      </div>

      {!isJoined ? (
        <form className="room-controls glass-panel p-4" onSubmit={handleJoin}>
          <input
            type="text"
            className="room-input"
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
            placeholder="Enter room name..."
            required
          />
          <button type="submit" className="btn-primary">
            Join Room
          </button>
        </form>
      ) : (
        <div className="room-controls">
          <span style={{ fontSize: '1.2rem', fontWeight: 500 }}>
            Room: <strong style={{ color: 'var(--accent-blue)' }}>{roomName}</strong>
          </span>
          <button 
            className="btn-secondary" 
            style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
            onClick={() => setIsJoined(false)}
          >
            <LogOut size={18} />
            Leave Room
          </button>
        </div>
      )}

      <div className="jitsi-container glass-panel">
        {isJoined ? (
          <JitsiMeeting
            domain="meet.jit.si"
            roomName={roomName}
            configOverwrite={{
              startWithAudioMuted: true,
              disableModeratorIndicator: true,
              startScreenSharing: true,
              enableEmailInStats: false
            }}
            interfaceConfigOverwrite={{
              DISABLE_JOIN_LEAVE_NOTIFICATIONS: true
            }}
            userInfo={{
              displayName: 'Student'
            }}
            getIFrameRef={(iframeRef) => {
              iframeRef.style.height = '100%';
              iframeRef.style.width = '100%';
            }}
          />
        ) : (
          <div className="empty-room-state">
            <div className="video-icon-large">
              <Video size={32} />
            </div>
            <h2>Ready to Study?</h2>
            <p>Enter a room name above to start a video session.</p>
          </div>
        )}
      </div>
    </div>
  );
};
