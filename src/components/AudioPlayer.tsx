import React, { useEffect, useRef } from 'react';
import type { AudioPlayerProps } from '@/types';

const AudioPlayer: React.FC<AudioPlayerProps> = ({ stream, isMuted }) => {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current && stream) {
      audioRef.current.srcObject = stream;
    }
  }, [stream]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = isMuted;
    }
  }, [isMuted]);

  return (
    <div className="audio-player">
      <div className="audio-container">
        <h3>Lokal Audio Stream</h3>
        <audio
          ref={audioRef}
          autoPlay
          controls
          muted={isMuted}
          className="audio-element"
        />
        <div className="audio-info">
          <p>Stream statusu: {stream ? 'Aktiv' : 'Deaktiv'}</p>
          <p>Mute statusu: {isMuted ? 'Səssiz' : 'Səsli'}</p>
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;