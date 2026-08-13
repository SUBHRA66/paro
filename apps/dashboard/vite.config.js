import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/auth",
  build: {
	  outDir: "../../static/dashboard",
	  emptyOutDir: true,
  },
})
