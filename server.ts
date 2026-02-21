import express from 'express';
import { createServer as createViteServer } from 'vite';
import Database from 'better-sqlite3';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const db = new Database('signatures.db');
db.exec(`
  CREATE TABLE IF NOT EXISTS signatures (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

// Seed some initial data if empty
const count = db.prepare('SELECT count(*) as count FROM signatures').get() as { count: number };
if (count.count === 0) {
  const insert = db.prepare('INSERT INTO signatures (name) VALUES (?)');
  const initialNames = [
    "Carlos M.", "Sofia R.", "Javier T.", "Elena P.", "Marco D.", 
    "Valentina S.", "Andres L.", "Isabella G.", "Ricardo F.", "Camila B."
  ];
  initialNames.forEach(name => insert.run(name));
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.get('/api/signatures', (req, res) => {
    const signatures = db.prepare('SELECT * FROM signatures ORDER BY id DESC').all();
    res.json(signatures);
  });

  app.post('/api/signatures', (req, res) => {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ error: 'Name is required' });
    }
    const result = db.prepare('INSERT INTO signatures (name) VALUES (?)').run(name);
    res.json({ id: result.lastInsertRowid, name });
  });

  // Vite middleware
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true, hmr: { port: 3000 } },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // Production static serving (simplified for this environment)
    app.use(express.static('dist'));
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
