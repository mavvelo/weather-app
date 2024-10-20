import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: [
      // Add the path of the dependency to exclude here
      'react-icons_bi.js',
      // Add any other dependencies to exclude if needed
    ],
  },

})
