/** @type {import('@commitlint/types').UserConfig} */
export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    // Scopes tied to our monorepo packages and cross-cutting concerns
    'scope-enum': [
      2,
      'always',
      [
        'tokens',   // packages/tokens
        'core',     // packages/core (StencilJS components)
        'react',    // packages/react
        'vue',      // packages/vue
        'angular',  // packages/angular
        'atoms',    // cross-atom work inside core
        'sounds',   // sound engine
        'icons',    // icon registry
        'docs',     // apps/docs (Storybook)
        'ci',       // GitHub Actions / tooling
        'deps',     // dependency updates
        'release',  // release commits from changesets
      ],
    ],
    'scope-case': [2, 'always', 'lower-case'],
    'subject-case': [2, 'never', ['sentence-case', 'start-case', 'pascal-case', 'upper-case']],
    'subject-full-stop': [2, 'never', '.'],
    'header-max-length': [2, 'always', 100],
    'body-max-line-length': [2, 'always', 120],
  },
};
