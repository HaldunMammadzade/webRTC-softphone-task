import type { BrowserSupport } from '@/types';

/**
 * @returns Browser support məlumatları
 */
export const checkBrowserSupport = (): BrowserSupport => {
  const support: BrowserSupport = {
    getUserMedia: false,
    webRTC: false,
    mediaDevices: false
  };

  if (navigator.mediaDevices?.getUserMedia) {
    support.getUserMedia = true;
    support.mediaDevices = true;
  } else if ('getUserMedia' in navigator) {
    support.getUserMedia = true;
  }

  if (typeof RTCPeerConnection !== 'undefined' || 
      typeof (window as any).webkitRTCPeerConnection !== 'undefined' || 
      typeof (window as any).mozRTCPeerConnection !== 'undefined') {
    support.webRTC = true;
  }

  return support;
};

/**
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
 * @returns Stream aktiv statusu
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
 * @param stream - MediaStream
 */
export const cleanupAudioStream = (stream: MediaStream | null): void => {
  if (!stream) return;
  
  stream.getTracks().forEach(track => {
    track.stop();
    console.log(`Track dayandırıldı: ${track.kind} (${track.label})`);
  });
};

/**
 * @returns Promise<PermissionState>
 */
export const checkMicrophonePermission = async (): Promise<PermissionState> => {
  try {
    if ('permissions' in navigator && 'query' in navigator.permissions) {
      const permission = await navigator.permissions.query({ name: 'microphone' as PermissionName });
      return permission.state;
    }
    return 'prompt';
  } catch (error) {
    console.warn('Mikrofon icazəsi yoxlanıla bilmədi:', error);
    return 'prompt';
  }
};