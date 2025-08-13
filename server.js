import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { readdir } from 'fs/promises';
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

app.get('/writings', (req, res) => {
  res.sendFile(join(__dirname, 'views', 'writings.html'));
});

app.get('/latte-art', (req, res) => {
  res.sendFile(join(__dirname, 'views', 'latte-art.html'));
});

// API endpoint to get latte art images
app.get('/api/latte-art-images', async (req, res) => {
  try {
    const imagesDir = join(__dirname, 'public', 'images', 'latte-art');
    const files = await readdir(imagesDir);
    
    // Filter for JPEG files with date format
    const imageFiles = files
      .filter(file => file.match(/^\d{4}-\d{2}-\d{2}_latte-art\.jpeg$/))
      .map(filename => {
        const dateStr = filename.split('_')[0];
        const [year, month, day] = dateStr.split('-');
        const date = new Date(year, month - 1, day);
        
        return {
          filename,
          date: dateStr,
          dateObj: date,
          displayDate: date.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })
        };
      })
      .sort((a, b) => b.dateObj - a.dateObj); // Sort newest first
    
    res.json(imageFiles);
  } catch (error) {
    console.error('Error reading latte art images:', error);
    res.status(500).json({ error: 'Failed to load images' });
  }
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
