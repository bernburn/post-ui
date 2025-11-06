import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // This is the key for connecting in dev mode
    port: 5173,
    proxy: {
      "/api": {
        target: "https://post-api-fiyx.onrender.com", // Address of your Spring Boot server
        changeOrigin: true,
        // (Optional) Remove the /api prefix if your Spring Controller @RequestMapping doesn't have it
        // rewrite: (path) => path.replace(/^\/api/, '')
        secure: true,
        rewrite: (path) => path,
      },
    },
    preview: {
      host: "0.0.0.0", // Ensure it binds to the external interface
      port: 10000, // Ensure it uses the required port
      allowedHosts: [
        ".onrender.com", // Allows all Render subdomains (best practice)
        "post-ui-9f32.onrender.com", // Explicitly allows your service URL (good for clarity)
        "localhost",
      ],
    },
  },
});
