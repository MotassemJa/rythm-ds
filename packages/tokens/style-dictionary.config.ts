import StyleDictionary from 'style-dictionary';
import { readFileSync, copyFileSync, mkdirSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

const sd = new StyleDictionary({
  source: ['src/tokens/*.json'],
  platforms: {
    js: {
      transformGroup: 'js',
      prefix: 'rythm',
      buildPath: 'dist/',
      files: [
        {
          destination: 'tokens.js',
          format: 'javascript/es6',
        },
        {
          destination: 'tokens.d.ts',
          format: 'typescript/es6-declarations',
        },
      ],
    },
  },
});

await sd.buildAllPlatforms();

// Copy the hand-authored CSS (CSS relative colors + Utopia fluid values)
mkdirSync(resolve(__dirname, 'dist'), { recursive: true });
copyFileSync(
  resolve(__dirname, 'src/css/tokens.css'),
  resolve(__dirname, 'dist/tokens.css'),
);

console.log('\n✅  @rythm-ds/tokens built successfully\n');
