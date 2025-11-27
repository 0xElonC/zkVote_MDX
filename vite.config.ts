import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import mdx from '@mdx-js/rollup'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    // MDX 插件要放在 React 插件之前
    mdx({
      providerImportSource: '@mdx-js/react',
    }),
    react(),
  ],
})
