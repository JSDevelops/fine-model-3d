import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// เปลี่ยน 'your-repo-name' เป็นชื่อ GitHub repo จริง เช่น '/fineverse/'
export default defineConfig({
  plugins: [react()],
  base: '/',
  server: { host: '127.0.0.1', port: 5174 },
})
