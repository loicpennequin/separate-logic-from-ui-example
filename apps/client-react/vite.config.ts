import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';
import AutoImport from 'unplugin-auto-import/vite';
import Icons from 'unplugin-icons/vite';
import { defineConfig } from 'vite';
import checker from 'vite-plugin-checker';
import Pages from 'vite-plugin-pages';

const devAliases = {
  '@': fileURLToPath(new URL('./src', import.meta.url)),
  '@daria/shared': fileURLToPath(
    new URL('../../libs/shared/src', import.meta.url)
  ),
  '@daria/sdk': fileURLToPath(new URL('../../libs/sdk/src', import.meta.url))
};

export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
    Pages(),
    Icons({ compiler: 'jsx', jsx: 'react' }),
    checker({
      typescript: { tsconfigPath: './tsconfig.dev.json' }
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
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      ...(mode === 'development' ? devAliases : {})
    }
  },

  server: {
    port: 5174
  }
}));
