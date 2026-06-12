import { playSynth } from './engine';

export type SoundType =
  | 'click'
  | 'toggle-on'
  | 'toggle-off'
  | 'success'
  | 'error'
  | 'warning'
  | 'open'
  | 'close'
  | 'hover';

// Note frequencies (Hz)
const NOTE = {
  C4: 261.63, D4: 293.66, E4: 329.63, F4: 349.23,
  G4: 392.00, A4: 440.00, B4: 493.88,
  C5: 523.25, D5: 587.33, E5: 659.25, G5: 783.99,
  A3: 220.00, F3: 174.61,
};

export const sounds: Record<SoundType, () => void> = {
  click: () =>
    playSynth([{ freq: NOTE.G4, startAt: 0, duration: 0.07, gain: 0.28 }]),

  'toggle-on': () =>
    playSynth([
      { freq: NOTE.C4, startAt: 0,    duration: 0.07, gain: 0.25 },
      { freq: NOTE.E4, startAt: 0.07, duration: 0.09, gain: 0.28 },
    ]),

  'toggle-off': () =>
    playSynth([
      { freq: NOTE.E4, startAt: 0,    duration: 0.07, gain: 0.28 },
      { freq: NOTE.C4, startAt: 0.07, duration: 0.09, gain: 0.22 },
    ]),

  success: () =>
    playSynth([
      { freq: NOTE.C4, startAt: 0,    duration: 0.08, gain: 0.25 },
      { freq: NOTE.E4, startAt: 0.08, duration: 0.08, gain: 0.28 },
      { freq: NOTE.G4, startAt: 0.16, duration: 0.14, gain: 0.32 },
    ]),

  error: () =>
    playSynth([
      { freq: NOTE.A3, startAt: 0,    duration: 0.12, gain: 0.30, type: 'sawtooth' },
      { freq: NOTE.F3, startAt: 0.12, duration: 0.14, gain: 0.25, type: 'sawtooth' },
    ]),

  warning: () =>
    playSynth([
      { freq: NOTE.A4, startAt: 0,    duration: 0.08, gain: 0.25 },
      { freq: NOTE.F4, startAt: 0.12, duration: 0.10, gain: 0.22 },
    ]),

  open: () =>
    playSynth([
      { freq: NOTE.C4, startAt: 0,    duration: 0.06, gain: 0.2 },
      { freq: NOTE.G4, startAt: 0.06, duration: 0.10, gain: 0.22 },
    ]),

  close: () =>
    playSynth([
      { freq: NOTE.G4, startAt: 0,    duration: 0.06, gain: 0.22 },
      { freq: NOTE.C4, startAt: 0.06, duration: 0.10, gain: 0.18 },
    ]),

  hover: () =>
    playSynth([{ freq: NOTE.C5, startAt: 0, duration: 0.04, gain: 0.08 }]),
};
