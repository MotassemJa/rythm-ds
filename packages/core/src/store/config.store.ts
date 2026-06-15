import { createStore } from '@stencil/store';

interface RythmConfigState {
  sound: boolean;
}

const { state } = createStore<RythmConfigState>({
  sound: false,
});

export const rythmConfig = state;
