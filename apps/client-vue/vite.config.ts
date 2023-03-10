import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import checker from 'vite-plugin-checker';
import AutoImport from 'unplugin-auto-import/vite';
import VueRouter from 'unplugin-vue-router/vite';
import Icons from 'unplugin-icons/vite';
import { VueRouterAutoImports } from 'unplugin-vue-router';
// @ts-ignore smh
import Components from 'unplugin-vue-components/vite';
// @ts-ignore smh
import { HeadlessUiResolver } from 'unplugin-vue-components/resolvers';

export default defineConfig(() => ({
  plugins: [
    VueRouter({
      routesFolder: fileURLToPath(new URL('./src/pages', import.meta.url)),
      dts: './typed-router.d.ts'
    }),
    vue(),
    Icons({
      compiler: 'vue3'
    }),
    checker({
      vueTsc: { tsconfigPath: './tsconfig.app.json' }
    }),
    AutoImport({
      include: [/\.[tj]sx?$/, /\.vue$/, /\.vue\?vue/, /\.md$/],
      imports: [
        'vue',
        '@vueuse/core',
        'vee-validate',
        VueRouterAutoImports,
        {
          '@tanstack/vue-query': [
            'useQuery',
            'useMutation',
            'useInfinitequery',
            'useQueryClient'
          ]
        }
      ],
      dirs: ['./src/composables', './src/composables/**']
    }),

    Components({
      dts: true,
      resolvers: [HeadlessUiResolver()],
      directoryAsNamespace: true
    })
  ],

  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
}));
