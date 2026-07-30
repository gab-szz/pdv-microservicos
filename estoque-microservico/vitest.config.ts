import { defineConfig } from 'vitest/config';

export default defineConfig({
  resolve: {
    tsconfigPaths: true,
  },
  test: {
    environment: 'node',
    typecheck: {
      tsconfig: './tsconfig.test.json',
    },
  },
});
