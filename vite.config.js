import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000, // Specify the port for the development server
  },
  build: {
    outDir: 'dist', // Specify the output directory for the production build
    assetsDir: 'assets', // Specify the directory for assets like images and fonts
    sourcemap: true, // Enable source maps for debugging in production
  },
})
