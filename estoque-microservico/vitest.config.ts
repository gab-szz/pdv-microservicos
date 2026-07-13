import { defineConfig } from 'vitest/config';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [
    tsconfigPaths({ projects: ['./tsconfig.test.json'] }), // Força o plugin a ler os paths do tsconfig de teste
  ],
  test: {
    environment: 'node',
    // Aponta o Vitest para usar a configuração de tipos de teste se necessário
    typecheck: {
      tsconfig: './tsconfig.test.json',
    },
  },
});
