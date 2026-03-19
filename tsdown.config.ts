import { defineConfig } from 'tsdown';
import pkg from './package.json' with { type: 'json' };

export default defineConfig({
  entry: ['src/index.ts'],
  platform: 'neutral',
  external: Object.keys(pkg.dependencies),
  clean: true,
  dts: true,
  shims: true,
  sourcemap: false,
  minify: true
});
