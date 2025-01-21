/// <reference types="vitest" />
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  resolve: {
    alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }],
  },
  test: {
    // ... Specify options here.
    include: [
      '**/*.{test,spec}.?(c|m)[jt]s?(x)',
      '**/*.effect-{test,spec}.?(c|m)[jt]s?(x)',
    ],
  },
});
