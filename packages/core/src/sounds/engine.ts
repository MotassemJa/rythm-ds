import { rythmConfig } from '../store/config.store';

let _ctx: AudioContext | null = null;

function ctx(): AudioContext | null {
  if (typeof AudioContext === 'undefined') return null;
  if (!_ctx || _ctx.state === 'closed') _ctx = new AudioContext();
  if (_ctx.state === 'suspended') _ctx.resume();
  return _ctx;
}

export function isEnabled(): boolean {
  if (typeof window === 'undefined') return false;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
  return rythmConfig.sound;
}

interface Note {
  freq: number;
  startAt: number;
  duration: number;
  gain?: number;
  type?: OscillatorType;
}

export function playSynth(notes: Note[]): void {
  const c = ctx();
  if (!c) return;

  notes.forEach(({ freq, startAt, duration, gain = 0.35, type = 'sine' }) => {
    const osc = c.createOscillator();
    const gainNode = c.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, c.currentTime + startAt);

    gainNode.gain.setValueAtTime(0, c.currentTime + startAt);
    gainNode.gain.linearRampToValueAtTime(gain, c.currentTime + startAt + 0.01);
    gainNode.gain.exponentialRampToValueAtTime(0.001, c.currentTime + startAt + duration);

    osc.connect(gainNode);
    gainNode.connect(c.destination);

    osc.start(c.currentTime + startAt);
    osc.stop(c.currentTime + startAt + duration + 0.05);
  });
}
