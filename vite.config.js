import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import dotenv from 'dotenv';

// Load biến môi trường từ file `.env`
dotenv.config();
export default defineConfig({
  plugins: [react()],
  server: {
    port: parseInt(process.env.VITE_PORT, 10) || 3000
  }
})
