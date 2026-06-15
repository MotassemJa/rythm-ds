// Components (auto-registered as custom elements when imported)
export * from './components/atoms/button/button';
export * from './components/atoms/icon/icon';
export * from './components/atoms/badge/badge';
export * from './components/atoms/input/input';
export * from './components/atoms/checkbox/checkbox';
export * from './components/atoms/radio/radio';
export * from './components/atoms/radio/radio-group';
export * from './components/atoms/toggle/toggle';
export * from './components/atoms/spinner/spinner';
export * from './components/atoms/avatar/avatar';
export * from './components/atoms/tag/tag';
export * from './components/atoms/divider/divider';
export * from './components/atoms/text/text';

// Sound system public API
export { RythmSounds, playSound } from './sounds';
export type { SoundType } from './sounds';

// Shared types
export type { SizeStep } from './mixins/size.mixin';

// Global config store — controls shared runtime behaviour
import { rythmConfig } from './store/config.store';
export { rythmConfig };

export const RythmSound = {
  enable(): void   { rythmConfig.sound = true; },
  disable(): void  { rythmConfig.sound = false; },
  toggle(): void   { rythmConfig.sound = !rythmConfig.sound; },
  get enabled(): boolean { return rythmConfig.sound; },
};

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
