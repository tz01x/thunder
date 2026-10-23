import React, { useState, useEffect, useRef } from 'react';
import { CursorState } from '../types';

interface SoundAtmosphereProps {
  setCursorState: (state: CursorState) => void;
}

export const SoundAtmosphere: React.FC<SoundAtmosphereProps> = ({ setCursorState }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const droneNodesRef = useRef<{ osc1: OscillatorNode; osc2: OscillatorNode; gain: GainNode } | null>(null);

  useEffect(() => {
    return () => {
      if (audioCtxRef.current) {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, []);

  const toggleSound = () => {
    if (!isPlaying) {
      try {
        const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
        if (!audioCtxRef.current) {
          audioCtxRef.current = new AudioCtx();
        }

        if (audioCtxRef.current.state === 'suspended') {
          audioCtxRef.current.resume();
        }

        const ctx = audioCtxRef.current;
        const masterGain = ctx.createGain();
        masterGain.gain.setValueAtTime(0.001, ctx.currentTime);
        masterGain.gain.exponentialRampToValueAtTime(0.04, ctx.currentTime + 3);
        masterGain.connect(ctx.destination);

        // Low warm sub-drone (45Hz + 45.3Hz for subtle binaural beat)
        const osc1 = ctx.createOscillator();
        const osc2 = ctx.createOscillator();

        osc1.type = 'sine';
        osc1.frequency.setValueAtTime(45, ctx.currentTime);

        osc2.type = 'sine';
        osc2.frequency.setValueAtTime(45.4, ctx.currentTime);

        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(110, ctx.currentTime);

        osc1.connect(filter);
        osc2.connect(filter);
        filter.connect(masterGain);

        osc1.start();
        osc2.start();

        droneNodesRef.current = { osc1, osc2, gain: masterGain };
        setIsPlaying(true);
      } catch (err) {
        console.warn('Audio context init prevented by browser', err);
      }
    } else {
      if (droneNodesRef.current && audioCtxRef.current) {
        const ctx = audioCtxRef.current;
        const { osc1, osc2, gain } = droneNodesRef.current;
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.5);
        setTimeout(() => {
          try {
            osc1.stop();
            osc2.stop();
          } catch {}
          droneNodesRef.current = null;
        }, 500);
      }
      setIsPlaying(false);
    }
  };

  return (
    <div className="fixed bottom-6 left-6 z-40 hidden md:block">
      <button
        onClick={toggleSound}
        onMouseEnter={() => setCursorState({ type: 'button' })}
        onMouseLeave={() => setCursorState({ type: 'default' })}
        className="flex items-center gap-2 text-[10px] font-mono tracking-[0.2em] uppercase text-neutral-500 hover:text-black transition-colors"
      >
        <span className={`w-1.5 h-1.5 rounded-full ${isPlaying ? 'bg-black animate-pulse' : 'bg-neutral-400'}`} />
        <span>SOUND: {isPlaying ? 'ON' : 'OFF'}</span>
      </button>
    </div>
  );
};
