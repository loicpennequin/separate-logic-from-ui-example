import { defineConfig } from 'tsup';

export default defineConfig({
  // entry: ['src/index.ts', 'src/client.ts'],
  entry: ['src/index.ts'],
  sourcemap: true,
  clean: true,
  dts: true,
  format: ['cjs', 'esm']
});
