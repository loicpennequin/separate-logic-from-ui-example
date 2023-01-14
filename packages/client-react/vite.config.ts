import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';
import AutoImport from 'unplugin-auto-import/vite';
import Icons from 'unplugin-icons/vite';
import { defineConfig } from 'vite';
import checker from 'vite-plugin-checker';
import Pages from 'vite-plugin-pages';

export default defineConfig({
  plugins: [
    react(),
    Pages(),
    Icons({ compiler: 'jsx', jsx: 'react' }),
    checker({
      typescript: { tsconfigPath: './tsconfig.json' }
    }),
    AutoImport({
      include: [/\.[tj]sx?$/, /\.vue$/, /\.vue\?vue/, /\.md$/],
      imports: [
        'react',
        {
          '@tanstack/react-query': [
            'useQuery',
            'useMutation',
            'useInfinitequery',
            'useQueryClient'
          ]
        }
      ],
      dirs: ['./src/hooks', './src/hooks/**']
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    port: 5174
  }
});
