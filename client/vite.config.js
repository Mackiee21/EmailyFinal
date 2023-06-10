import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/auth/google': {
        target: 'http://localhost:5174',
      },
      "/data": {
        target: "http://localhost:5174"
      },
      "/logout": {
        target: "http://localhost:5174"
      },
      "/survey/data/temp": {
        target: "http://localhost:5174"
      },
      "/getSurveys": {
        target: "http://localhost:5174"
      }
    },
  },
})
