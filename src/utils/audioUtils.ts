import type { BrowserSupport } from '@/types';

/**
 
 * @returns 
 */
export const checkBrowserSupport = (): BrowserSupport => {
  const support: BrowserSupport = {
    getUserMedia: false,
    webRTC: false,
    mediaDevices: false
  };


  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    support.getUserMedia = true;
    support.mediaDevices = true;
  } else if (navigator.getUserMedia) {
    support.getUserMedia = true;
  }


  if (window.RTCPeerConnection || window.webkitRTCPeerConnection || window.mozRTCPeerConnection) {
    support.webRTC = true;
  }

  return support;
};

/**
 * Audio constraints yaradır
 * @param options - Audio tənzimləmələri
 * @returns MediaStreamConstraints
 */
export const createAudioConstraints = (options?: {
  echoCancellation?: boolean;
  noiseSuppression?: boolean;
  autoGainControl?: boolean;
}): MediaStreamConstraints => {
  return {
    audio: {
      echoCancellation: options?.echoCancellation ?? true,
      noiseSuppression: options?.noiseSuppression ?? true,
      autoGainControl: options?.autoGainControl ?? true
    },
    video: false
  };
};

/**

 * @param stream - MediaStream
 * @returns 
 */
export const isStreamActive = (stream: MediaStream | null): boolean => {
  if (!stream) return false;
  
  const audioTracks = stream.getAudioTracks();
  return audioTracks.length > 0 && audioTracks.some(track => track.enabled && track.readyState === 'live');
};

/**

 * @param stream - MediaStream
 */
export const logAudioTracks = (stream: MediaStream): void => {
  const audioTracks = stream.getAudioTracks();
  

  
  audioTracks.forEach((track, index) => {
    console.log(`Track ${index + 1}:`, {
      id: track.id,
      kind: track.kind,
      label: track.label,
      enabled: track.enabled,
      readyState: track.readyState,
      settings: track.getSettings()
    });
  });
};

/**
 * @param 
 */
export const cleanupAudioStream = (stream: MediaStream | null): void => {
  if (!stream) return;
  
  
  stream.getTracks().forEach(track => {
    track.stop();
  });
};

/**
 * @returns Promise<PermissionState>
 */
export const checkMicrophonePermission = async (): Promise<PermissionState> => {
  try {
    const permission = await navigator.permissions.query({ name: 'microphone' as PermissionName });
    return permission.state;
  } catch (error) {
    console.warn('Mikrofon icazəsi yoxlanıla bilmədi:', error);
    return 'prompt';
  }
};

declare global {
  interface Window {
    webkitRTCPeerConnection: typeof RTCPeerConnection;
    mozRTCPeerConnection: typeof RTCPeerConnection;
  }
  
  interface Navigator {
    getUserMedia: (
      constraints: MediaStreamConstraints,
      successCallback: (stream: MediaStream) => void,
      errorCallback: (error: Error) => void
    ) => void;
  }
}