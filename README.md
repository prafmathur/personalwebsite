# Praful's Personal Website

A modern, responsive personal portfolio website showcasing projects and professional information.

## 🚀 Tech Stack

- **Backend**: Node.js with Express.js
- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **CSS Framework**: Skeleton CSS (responsive grid)
- **Icons**: Font Awesome 6
- **Analytics**: Google Analytics 4
- **Security**: Helmet.js for security headers
- **Performance**: Compression middleware

## 📋 Prerequisites

- Node.js 18.0.0 or higher
- npm (comes with Node.js)

## 🛠️ Installation & Setup

1. **Clone the repository**:

   ```bash
   git clone https://github.com/prafmathur/personalwebsite.git
   cd personalwebsite
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

## 🚀 Running the Application

### Development Mode (with auto-restart)

```bash
npm run dev
```

This starts the server with nodemon, which automatically restarts when files change.

### Production Mode

```bash
npm start
```

The server will start on port 5000 by default. Visit `http://localhost:5000` to view the website.

## 🧪 Development Scripts

- `npm run dev` - Start development server with hot reload
- `npm start` - Start production server
- `npm run lint` - Run ESLint to check code quality
- `npm run lint:fix` - Automatically fix ESLint issues
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check if code is properly formatted

## 📁 Project Structure

```
/
├── server.js           # Main Express server
├── package.json        # Dependencies and scripts
├── Procfile           # Heroku deployment config
├── views/             # HTML templates
│   ├── index.html     # Homepage
│   ├── about.html     # About page
│   └── projects.html  # Projects showcase
├── public/            # Static assets
│   ├── style.css     # Custom styles
│   ├── script.js     # Client-side JavaScript
│   └── [images]      # Project images and assets
└── config files       # ESLint, Prettier, nodemon configs
```

## 🌐 Pages

- **Home** (`/`) - Landing page with navigation and social links
- **About** (`/about`) - Personal information and background
- **Projects** (`/projects`) - Portfolio of development projects

## 🔧 Configuration

### Environment Variables

- `PORT` - Server port (default: 5000)

### Development Tools

- **ESLint**: Code linting with modern JavaScript rules
- **Prettier**: Code formatting for consistent style
- **Nodemon**: Auto-restart server during development

## 🚀 Deployment

This application is configured for Heroku deployment:

1. The `Procfile` specifies the start command
2. The app uses `process.env.PORT` for dynamic port assignment
3. All dependencies are in `dependencies` (not `devDependencies`)

For other platforms, ensure Node.js 18+ is available and run `npm start`.

## 🔒 Security Features

- Helmet.js for security headers
- Content Security Policy (CSP) configuration
- CORS handling
- Input validation and sanitization

## ⚡ Performance Optimizations

- Gzip compression for all responses
- Static file caching with proper headers
- Minified CSS and JavaScript from CDNs
- Optimized images and assets

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run linting and formatting: `npm run lint:fix && npm run format`
5. Test the application: `npm run dev`
6. Submit a pull request

## 📄 License

ISC License - see package.json for details.
