import { useState, useCallback, useRef } from 'react';
import { CallState, type UseWebRTCReturn } from '@/types';

export const useWebRTC = (): UseWebRTCReturn => {
  const [callState, setCallState] = useState<CallState>(CallState.IDLE);
  const [audioStream, setAudioStream] = useState<MediaStream | null>(null);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
  const streamRef = useRef<MediaStream | null>(null);

  const startCall = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    setCallState(CallState.CONNECTING);

    try {
     
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: false
      });

     
      streamRef.current = stream;
      setAudioStream(stream);
      setCallState(CallState.ACTIVE);
      
      
      stream.getAudioTracks().forEach(track => {
        track.addEventListener('ended', () => {
          setCallState(CallState.ENDED);
        });

        track.addEventListener('mute', () => {
          console.log('Audio track mute oldu');
        });

        track.addEventListener('unmute', () => {
          console.log('Audio track unmute oldu');
        });
      });

     
      
    } catch (err) {
      console.error('Zəng başlatılarkən xəta:', err);
      
      let errorMessage = 'Naməlum xəta baş verdi';
      
      if (err instanceof Error) {
        switch (err.name) {
          case 'NotAllowedError':
            errorMessage = 'Mikrofon icazəsi verilmədi';
            break;
          case 'NotFoundError':
            errorMessage = 'Mikrofon tapılmadı';
            break;
          case 'NotReadableError':
            errorMessage = 'Mikrofon istifadə edilə bilmir';
            break;
          case 'OverconstrainedError':
            errorMessage = 'Mikrofon tənzimləmələri dəstəklənmir';
            break;
          default:
            errorMessage = err.message;
        }
      }
      
      setError(errorMessage);
      setCallState(CallState.IDLE);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const endCall = useCallback(() => {
    
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => {
        track.stop();
        console.log('Track dayandırıldı:', track.kind);
      });
      
      streamRef.current = null;
    }
    
    setAudioStream(null);
    setCallState(CallState.ENDED);
    setIsMuted(false);
    setError(null);
    
    setTimeout(() => {
      setCallState(CallState.IDLE);
    }, 3000);
  }, []);

  const toggleMute = useCallback(() => {
    if (streamRef.current) {
      const audioTracks = streamRef.current.getAudioTracks();
      
      audioTracks.forEach(track => {
        track.enabled = !track.enabled;
        console.log('Audio track enabled:', track.enabled);
      });
      
      setIsMuted(!isMuted);
      console.log('Mute statusu dəyişdirildi:', !isMuted);
    }
  }, [isMuted]);

  return {
    callState,
    audioStream,
    isMuted,
    isLoading,
    error,
    startCall,
    endCall,
    toggleMute
  };
};