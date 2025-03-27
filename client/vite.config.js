import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        // target: process.env.VITE_API_BASE_URL,
        secure: false,
      },
    },
  },

  plugins: [react()],
});

// export default defineConfig({
//   plugins: [react()],
//   define: {
//     "process.env.VITE_API_BASE_URL": JSON.stringify(
//       process.env.VITE_API_BASE_URL || "http://localhost:3000"
//     ),
//   },
// });
