/// <reference types="vitest" />

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Icons from 'unplugin-icons/vite'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      imports: ['vue', 'vitest', 'vue-router', '@vueuse/core'],
      dts: './src/auto-imports.d.ts'
    }),
    Icons({ /* options */ }),
  ],
  css: {
   preprocessorOptions: {
      scss: {
         additionalData: '@import "./src/assets/styles/app.scss";'
      }
   }
  },
  resolve: {
   alias: {
      'src': resolve(__dirname, 'src'),
      'modules': resolve(__dirname, 'node_modules'),
      'fonts': resolve(__dirname, 'src', 'assets', 'fonts')
   }
  },
  server: {
    port: 3000
  },
  test: {
    globals: true,
    environment: 'jsdom'
  }
})
