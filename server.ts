import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;
const isProduction = process.env.NODE_ENV === 'production' || !process.env.VITE_DEV_SERVER;

app.use(express.json());

// Basic health check endpoint
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', service: 'Crumb & Sizzle' });
});

async function startServer() {
  const distPath = path.resolve(__dirname, 'dist');
  const distExists = fs.existsSync(distPath);

  if (isProduction && distExists) {
    // Serve production static assets from dist
    app.use(express.static(distPath));
    
    // SPA fallback
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  } else {
    // In development mode, dynamically load Vite development server
    try {
      const { createServer } = await import('vite');
      const vite = await createServer({
        server: { middlewareMode: true },
        appType: 'spa',
      });
      app.use(vite.middlewares);
    } catch {
      // Fallback if vite middleware cannot be attached
      if (distExists) {
        app.use(express.static(distPath));
        app.get('*', (_req, res) => {
          res.sendFile(path.resolve(distPath, 'index.html'));
        });
      }
    }
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on port ${PORT} (host 0.0.0.0)`);
  });
}

startServer();
