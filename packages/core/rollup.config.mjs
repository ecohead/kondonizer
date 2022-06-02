import resolve from '@rollup/plugin-node-resolve';
import { defineConfig } from 'rollup';
import minifyHTML from 'rollup-plugin-minify-html-literals';
import summary from 'rollup-plugin-summary';
import { terser } from 'rollup-plugin-terser';

export default defineConfig({
  input: ['lib/index.js'],
  plugins: [
    resolve({
      browser: true,
      preferBuiltins: true,
    }),
    minifyHTML,
    terser({
      ecma: 2020,
      module: true,
      warnings: false,
      format: {
        comments: false,
      }
    }),
    summary,
  ],
  output: {
    file: 'lib/index.bundle.js',
    format: 'esm'
  },
  preserveEntrySignatures: 'strict',
});
