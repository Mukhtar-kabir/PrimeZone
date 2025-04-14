import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: process.env.VITE_API_BASE_URL || "http://localhost:3000",
        // target: process.env.VITE_API_BASE_URL,
        secure: false,
      },
    },
  },

  plugins: [react()],

  test: {
    environment: "jsdom", // ✅ This is necessary for testing React components
    globals: true, // ✅ This allows using `describe`, `it`, `expect` without imports
  },
});

// export default defineConfig({
//   plugins: [react()],
//   define: {
//     "process.env.VITE_API_BASE_URL": JSON.stringify(
//       process.env.VITE_API_BASE_URL || "http://localhost:3000"
//     ),
//   },
// });
