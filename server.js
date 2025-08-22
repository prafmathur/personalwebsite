import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { readdir, readFile } from 'fs/promises';
import helmet from 'helmet';
import compression from 'compression';
import cors from 'cors';
import { marked } from 'marked';

// Configure marked to preserve HTML and handle styling
marked.setOptions({
  breaks: true,        // Convert \n to <br>
  gfm: true,          // GitHub Flavored Markdown
  sanitize: false,    // Allow raw HTML (like your class="small-note")
  smartypants: true   // Smart quotes and dashes
});

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

app.get('/visiting-sf', (req, res) => {
  res.sendFile(join(__dirname, 'views', 'visiting-sf.html'));
});

app.get('/pursuit-of-imperfection', (req, res) => {
  res.sendFile(join(__dirname, 'views', 'pursuit-of-imperfection.html'));
});

// API endpoint to get writings data
app.get('/api/writings', async (req, res) => {
  try {
    const metaPath = join(__dirname, 'data', 'writings-meta.json');
    const metaData = await readFile(metaPath, 'utf8');
    const writingsMeta = JSON.parse(metaData);
    
    const writings = await Promise.all(
      writingsMeta.map(async (meta) => {
        const contentPath = join(__dirname, 'data', 'writings', meta.file);
        const markdown = await readFile(contentPath, 'utf8');
        const html = marked(markdown);
        
        return {
          id: meta.id,
          title: meta.title,
          date: meta.date,
          content: html
        };
      })
    );
    
    res.json(writings);
  } catch (error) {
    console.error('Error reading writings data:', error);
    res.status(500).json({ error: 'Failed to load writings' });
  }
});

// API endpoint to get a specific writing
app.get('/api/writings/:id', async (req, res) => {
  try {
    const metaPath = join(__dirname, 'data', 'writings-meta.json');
    const metaData = await readFile(metaPath, 'utf8');
    const writingsMeta = JSON.parse(metaData);
    const meta = writingsMeta.find(w => w.id === req.params.id);
    
    if (!meta) {
      return res.status(404).json({ error: 'Writing not found' });
    }
    
    const contentPath = join(__dirname, 'data', 'writings', meta.file);
    const markdown = await readFile(contentPath, 'utf8');
    const html = marked(markdown);
    
    const writing = {
      id: meta.id,
      title: meta.title,
      date: meta.date,
      content: html
    };
    
    res.json(writing);
  } catch (error) {
    console.error('Error reading writing data:', error);
    res.status(500).json({ error: 'Failed to load writing' });
  }
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
