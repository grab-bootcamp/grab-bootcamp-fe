import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: true, // needed for the Docker Container port mapping to work
    strictPort: true,
    port: 5173,
  },
  plugins: [react()],
})
