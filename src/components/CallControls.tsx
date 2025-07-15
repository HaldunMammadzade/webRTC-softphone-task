import React from 'react';
import { CallState, type CallControlsProps } from '@/types';

const CallControls: React.FC<CallControlsProps> = ({
  callState,
  isMuted,
  isLoading,
  onStartCall,
  onEndCall,
  onToggleMute
}) => {
  const isCallActive = callState === CallState.ACTIVE;
  const isCallIdle = callState === CallState.IDLE;

  return (
    <div className="call-controls">
      <div className="controls-container">
        {isCallIdle && (
          <button
            className="control-button start-button"
            onClick={onStartCall}
            disabled={isLoading}
          >
            {isLoading ? 'Yüklənir...' : 'Zəngi başlat'}
          </button>
        )}

        {isCallActive && (
          <>
            <button
              className={`control-button mute-button ${isMuted ? 'muted' : ''}`}
              onClick={onToggleMute}
            >
              {isMuted ? 'Səsliyə al' : 'Səssizə al'}
            </button>

            <button
              className="control-button end-button"
              onClick={onEndCall}
            >
              Zəngi sonlandır
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default CallControls;