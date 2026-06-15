import { Config } from '@stencil/core';
import { reactOutputTarget } from '@stencil/react-output-target';
import { vueOutputTarget } from '@stencil/vue-output-target';
import { angularOutputTarget } from '@stencil/angular-output-target';

export const config: Config = {
  namespace: 'rythm',
  globalScript: 'src/global/app.ts',
  outputTargets: [
    {
      type: 'www',
      serviceWorker: null,
      copy: [
        { src: '../../tokens/dist/tokens.css', dest: 'tokens.css' },
      ],
    },
    {
      type: 'dist',
      esmLoaderPath: '../loader',
    },
    {
      type: 'dist-custom-elements',
      customElementsExportBehavior: 'auto-define-custom-elements',
    },
    {
      type: 'docs-readme',
    },
    reactOutputTarget({
      componentCorePackage: '@rythm-ds/core',
      proxiesFile: '../react/src/components/index.ts',
      includeDefineCustomElements: true,
    }),
    vueOutputTarget({
      componentCorePackage: '@rythm-ds/core',
      proxiesFile: '../vue/src/components.ts',
    }),
    angularOutputTarget({
      componentCorePackage: '@rythm-ds/core',
      outputType: 'component',
      directivesProxyFile: '../angular/src/directives/proxies.ts',
      directivesArrayFile: '../angular/src/directives/index.ts',
    }),
  ],
  testing: {
    browserHeadless: true,
  },
};
