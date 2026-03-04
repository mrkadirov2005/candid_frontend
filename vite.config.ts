import { cwd } from 'node:process';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { checker } from 'vite-plugin-checker';
import viteTsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig(({ mode }) => {
  const envPrefix = ['VITE_'];
  const viteEnv = loadEnv(mode, __dirname, envPrefix);
  process.env = Object.assign(process.env, viteEnv);

  const devPort = parseInt(process.env.VITE_APP_PORT ?? '', 10);

  return {
    build: {
      emptyOutDir: true,
    },
    server: {
      port: devPort,
      open: false,
      strictPort: true,
    },
    plugins: [
      react(),
      viteTsconfigPaths(),
      checker({
        enableBuild: true,
        typescript: true,
        eslint: false,
        overlay: {
          initialIsOpen: false,
          position: 'br',
        },
        root: cwd(),
      }),
      tailwindcss(),
    ],
  };
});
