// Components (auto-registered as custom elements when imported)
export * from './components/atoms/rythm-button/rythm-button';
export * from './components/atoms/rythm-icon/rythm-icon';
export * from './components/atoms/rythm-badge/rythm-badge';
export * from './components/atoms/rythm-input/rythm-input';
export * from './components/atoms/rythm-checkbox/rythm-checkbox';
export * from './components/atoms/rythm-radio/rythm-radio';
export * from './components/atoms/rythm-radio/rythm-radio-group';
export * from './components/atoms/rythm-toggle/rythm-toggle';
export * from './components/atoms/rythm-spinner/rythm-spinner';
export * from './components/atoms/rythm-avatar/rythm-avatar';
export * from './components/atoms/rythm-tag/rythm-tag';
export * from './components/atoms/rythm-divider/rythm-divider';
export * from './components/atoms/rythm-text/rythm-text';

// Sound system public API
export { RythmSounds, playSound } from './sounds';
export type { SoundType } from './sounds';

// Theme utility
export const RythmTheme = {
  set(theme: 'light' | 'dark'): void {
    document.documentElement.setAttribute('data-theme', theme);
  },
  get(): 'light' | 'dark' {
    return (document.documentElement.getAttribute('data-theme') as 'light' | 'dark') ?? 'light';
  },
  toggle(): void {
    const current = RythmTheme.get();
    RythmTheme.set(current === 'dark' ? 'light' : 'dark');
  },
};
