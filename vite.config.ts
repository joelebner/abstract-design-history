import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  server: {
    /** Design System uses 3000; Design History runs on http://localhost:3001 */
    port: 3001,
    strictPort: true,
    /** Avoid stale CSS/JS when embedded browsers or aggressive caches hit localhost */
    headers: {
      "Cache-Control": "no-store",
    },
  },
});
