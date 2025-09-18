import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  sourcemap: false,
  clean: true,
  // minify: true,
  target: 'es2020',
  tsconfig: 'tsconfig.json',
  external: ['tslib'],
  loader: {
    '.css': 'copy',
  },
})
