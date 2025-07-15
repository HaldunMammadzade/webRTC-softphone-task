// Call State enum
export enum CallState {
  IDLE = 'idle',
  CONNECTING = 'connecting',
  ACTIVE = 'active',
  ENDED = 'ended',
  ERROR = 'error'
}

// WebRTC related types
export interface MediaStreamConstraints {
  audio: boolean;
  video: boolean;
}

export interface AudioTrackSettings {
  deviceId?: string;
  echoCancellation?: boolean;
  noiseSuppression?: boolean;
  autoGainControl?: boolean;
}

// Component props interfaces
export interface CallStatusProps {
  callState: CallState;
  duration: number;
  isRunning: boolean;
}

export interface CallControlsProps {
  callState: CallState;
  isMuted: boolean;
  isLoading: boolean;
  onStartCall: () => void;
  onEndCall: () => void;
  onToggleMute: () => void;
}

export interface AudioPlayerProps {
  stream: MediaStream;
  isMuted: boolean;
}

// Hook return types
export interface UseWebRTCReturn {
  callState: CallState;
  audioStream: MediaStream | null;
  isMuted: boolean;
  isLoading: boolean;
  error: string | null;
  startCall: () => Promise<void>;
  endCall: () => void;
  toggleMute: () => void;
}

export interface UseTimerReturn {
  time: number;
  isRunning: boolean;
  startTimer: () => void;
  stopTimer: () => void;
  resetTimer: () => void;
}

// Error types
export interface WebRTCError {
  name: string;
  message: string;
  constraint?: string;
}

// Browser support check
export interface BrowserSupport {
  getUserMedia: boolean;
  webRTC: boolean;
  mediaDevices: boolean;
}