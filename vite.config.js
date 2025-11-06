import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // This is the key for connecting in dev mode
    proxy: {
      '/api/posts': {
        target: 'http://localhost:5173', // Address of your Spring Boot server
        changeOrigin: true,
        // (Optional) Remove the /api prefix if your Spring Controller @RequestMapping doesn't have it
        // rewrite: (path) => path.replace(/^\/api/, '')
        secure: true 
      },
    }
  }
})
