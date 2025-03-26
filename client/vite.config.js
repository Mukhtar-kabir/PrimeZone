import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        secure: false,
      },
    },
  },

  plugins: [react()],
});

// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react-swc";

// export default defineConfig({
//   plugins: [react()],
//   base: "./", // Ensures correct asset paths in production
//   build: {
//     outDir: "dist",
//   },
//   server: {
//     historyApiFallback: true, // SPA routing support
//   },
// });
