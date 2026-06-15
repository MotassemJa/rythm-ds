import { rythmConfig } from '../store/config.store';

export default function (): void {
  (window as any).RythmSound = {
    enable()  { rythmConfig.sound = true; },
    disable() { rythmConfig.sound = false; },
    toggle()  { rythmConfig.sound = !rythmConfig.sound; },
    get enabled(): boolean { return rythmConfig.sound; },
  };
}
