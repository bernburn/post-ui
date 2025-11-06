import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // This is the key for connecting in dev mode
    port: 5173,
    proxy: {
      '/api/posts': {
        target: 'https://post-api-fiyx.onrender.com', // Address of your Spring Boot server
        changeOrigin: true,
        // (Optional) Remove the /api prefix if your Spring Controller @RequestMapping doesn't have it
        // rewrite: (path) => path.replace(/^\/api/, '')
        secure: true 
      },
    }
  }
})
