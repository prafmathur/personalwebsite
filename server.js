import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import helmet from 'helmet';
import compression from 'compression';
import cors from 'cors';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

// Security middleware
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: [
          "'self'",
          "'unsafe-inline'",
          'https://cdnjs.cloudflare.com',
          'https://maxcdn.bootstrapcdn.com',
        ],
        scriptSrc: [
          "'self'",
          "'unsafe-inline'",
          'https://www.google-analytics.com',
          'https://www.googletagmanager.com',
        ],
        imgSrc: ["'self'", 'data:', 'https:'],
        fontSrc: [
          "'self'",
          'https://cdnjs.cloudflare.com',
          'https://maxcdn.bootstrapcdn.com',
        ],
        connectSrc: ["'self'", 'https://www.google-analytics.com'],
      },
    },
  })
);

// Performance middleware
app.use(compression());
app.use(cors());

// Static file serving
app.use(
  express.static(join(__dirname, 'public'), {
    maxAge: '1y',
    etag: true,
  })
);

// Routes
app.get('/', (req, res) => {
  res.sendFile(join(__dirname, 'views', 'index.html'));
});

app.get('/about', (req, res) => {
  res.sendFile(join(__dirname, 'views', 'about.html'));
});

app.get('/projects', (req, res) => {
  res.sendFile(join(__dirname, 'views', 'projects.html'));
});

app.get('/latte-art', (req, res) => {
  res.sendFile(join(__dirname, 'views', 'latte-art.html'));
});

// Error handling
app.use((req, res) => {
  res.status(404).send('Page not found');
});

app.use((err, req, res) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  console.log(`Visit http://localhost:${port}`);
});
