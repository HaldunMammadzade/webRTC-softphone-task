import React, { useEffect } from 'react';
import CallStatus from './CallStatus';
import CallControls from './CallControls';
import AudioPlayer from './AudioPlayer';
import { useWebRTC } from '@/hooks/useWebRTC';
import { useTimer } from '@/hooks/useTimer';
import { CallState } from '@/types';

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

  // Zəng vəziyyətinə görə timer-ı idarə et
  useEffect(() => {
    if (callState === CallState.ACTIVE && !isRunning) {
      startTimer();
    } else if (callState === CallState.ENDED || callState === CallState.IDLE) {
      stopTimer();
      if (callState === CallState.IDLE) {
        resetTimer();
      }
    }
  }, [callState, isRunning, startTimer, stopTimer, resetTimer]);

  const handleStartCall = async () => {
    try {
      resetTimer(); // Yeni zəng başlamazdan əvvəl reset et
      await startCall();
    } catch (err) {
      console.error('Zəng başlatılarkən xəta:', err);
      resetTimer(); // Error olsa da reset et
    }
  };

  const handleEndCall = () => {
    endCall();
    stopTimer();
    // Reset timer automatically handled by useEffect
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