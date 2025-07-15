import React from 'react';
import CallStatus from './CallStatus';
import CallControls from './CallControls';
import AudioPlayer from './AudioPlayer';
import { useWebRTC } from '@/hooks/useWebRTC';
import { useTimer } from '@/hooks/useTimer';
// import { CallState } from '@/types';

const CallInterface: React.FC = () => {
  const {
    callState,
    audioStream,
    isMuted,
    isLoading,
    error,
    startCall,
    endCall,
    toggleMute
  } = useWebRTC();

  const { time, isRunning, startTimer, stopTimer, resetTimer } = useTimer();

  const handleStartCall = async () => {
    try {
      await startCall();
      startTimer();
    } catch (err) {
      console.error('Zəng başlatılarkən xəta:', err);
    }
  };

  const handleEndCall = () => {
    endCall();
    stopTimer();
    resetTimer();
  };

  const handleToggleMute = () => {
    toggleMute();
  };

  return (
    <div className="call-interface">
      <CallStatus 
        callState={callState}
        duration={time}
        isRunning={isRunning}
      />
      
      {audioStream && (
        <AudioPlayer 
          stream={audioStream}
          isMuted={isMuted}
        />
      )}
      
      <CallControls
        callState={callState}
        isMuted={isMuted}
        isLoading={isLoading}
        onStartCall={handleStartCall}
        onEndCall={handleEndCall}
        onToggleMute={handleToggleMute}
      />
      
      {error && (
        <div className="error-message">
          <p>Xəta: {error}</p>
        </div>
      )}
    </div>
  );
};

export default CallInterface;