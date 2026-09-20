import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';
import { 
  checkDatabaseHealth, 
  getAllStudents, 
  upsertStudent, 
  insertAssessment, 
  upsertTeacher, 
  upsertClass 
} from './src/server/supabaseDb.js';

function supabaseApiPlugin() {
  return {
    name: 'supabase-api-plugin',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (!req.url?.startsWith('/api/supabase')) {
          return next();
        }

        res.setHeader('Content-Type', 'application/json');

        // Parse JSON body if POST
        let body = {};
        if (req.method === 'POST') {
          try {
            const buffers = [];
            for await (const chunk of req) {
              buffers.push(chunk);
            }
            const dataStr = Buffer.concat(buffers).toString();
            if (dataStr) body = JSON.parse(dataStr);
          } catch (e) {
            console.error('Body parse error:', e);
          }
        }

        try {
          if (req.url === '/api/supabase/status' && req.method === 'GET') {
            const health = await checkDatabaseHealth();
            return res.end(JSON.stringify(health));
          }

          if (req.url === '/api/supabase/students' && req.method === 'GET') {
            const students = await getAllStudents();
            return res.end(JSON.stringify({ success: true, students }));
          }

          if (req.url === '/api/supabase/sync-student' && req.method === 'POST') {
            const saved = await upsertStudent(body);
            return res.end(JSON.stringify({ success: true, student: saved }));
          }

          if (req.url === '/api/supabase/sync-assessment' && req.method === 'POST') {
            const saved = await insertAssessment(body);
            return res.end(JSON.stringify({ success: true, assessment: saved }));
          }

          if (req.url === '/api/supabase/sync-teacher' && req.method === 'POST') {
            const saved = await upsertTeacher(body);
            return res.end(JSON.stringify({ success: true, teacher: saved }));
          }

          if (req.url === '/api/supabase/sync-class' && req.method === 'POST') {
            const saved = await upsertClass(body);
            return res.end(JSON.stringify({ success: true, class: saved }));
          }

          return next();
        } catch (err) {
          console.error('API Supabase error:', err);
          res.statusCode = 500;
          return res.end(JSON.stringify({ success: false, error: err.message }));
        }
      });
    }
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
    supabaseApiPlugin()
  ],
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname || '.', './src'),
    },
  },
});
