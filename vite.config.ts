import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    // cors: true,
    // proxy: {
    //   '^/api': {
    //     target: 'http://dev.tmbiz.info',
    //   },
    // },
  },
})
