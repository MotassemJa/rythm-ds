import stencil from '@stencil-community/eslint-plugin';

export default [
  {
    files: ['packages/core/src/**/*.tsx', 'packages/core/src/**/*.ts'],
    plugins: {
      '@stencil-community': stencil,
    },
    rules: {
      ...stencil.configs.recommended.rules,
      '@stencil-community/required-jsdoc': 'warn',
      '@stencil-community/decorators-style': [
        'error',
        {
          prop: 'inline',
          state: 'inline',
          element: 'inline',
          event: 'inline',
          method: 'multiline',
          watch: 'multiline',
          listen: 'multiline',
        },
      ],
    },
  },
];
