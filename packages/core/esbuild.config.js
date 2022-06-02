import { build } from 'esbuild';
import { nodeExternalsPlugin } from 'esbuild-node-externals';
import glob from 'tiny-glob';

const entryPoints = await glob('src/**/*.{ts}');

build({
  entryPoints,
  target: 'es2020',
  format: 'esm',
  outdir: 'lib',
  bundle: false,
  logLevel: 'debug',
  plugins: [nodeExternalsPlugin()],
}).then(console.log, console.error)
