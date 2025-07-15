import React from 'react';
import { CallState, type CallStatusProps } from '@/types';
import { formatTime } from '@/utils/timeUtils';

const CallStatus: React.FC<CallStatusProps> = ({ 
  callState, 
  duration, 
//   isRunning 
}) => {
  const getStatusText = (state: CallState): string => {
    switch (state) {
      case CallState.IDLE:
        return 'Gözləmə';
      case CallState.CONNECTING:
        return 'Qoşulur';
      case CallState.ACTIVE:
        return 'Davam edən';
      case CallState.ENDED:
        return 'Sonlandı';
      default:
        return 'Xətdə';
    }
  };

  const getStatusClass = (state: CallState): string => {
    switch (state) {
      case CallState.IDLE:
        return 'status-idle';
      case CallState.CONNECTING:
        return 'status-connecting';
      case CallState.ACTIVE:
        return 'status-active';
      case CallState.ENDED:
        return 'status-ended';
      default:
        return 'status-error';
    }
  };

  return (
    <div className="call-status">
      <div className="status-container">
        <div className={`status-indicator ${getStatusClass(callState)}`}>
          <span className="status-text">
            Zəngin statusu: {getStatusText(callState)}
          </span>
        </div>
        
        {(callState === CallState.ACTIVE || callState === CallState.ENDED) && (
          <div className="duration-display">
            <span className="duration-label">Müddət: </span>
            <span className="duration-time">{formatTime(duration)}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default CallStatus;