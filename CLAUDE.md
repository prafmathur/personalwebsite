# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A modern personal portfolio website built with Node.js and Express.js. The site serves static HTML pages with a clean three-page structure: home, about, and projects. Fully modernized with ES6+ modules, security middleware, and development tooling.

## Architecture

- **Backend**: Express.js server (`server.js`) with modern ES6+ modules
- **Frontend**: Static HTML5 pages with Skeleton CSS framework and Font Awesome 6 icons
- **Templates**: Static HTML files served directly (no template engine needed)
- **Static Assets**: Optimized CSS, JavaScript, images served from `public/` directory
- **Security**: Helmet.js with CSP, CORS handling, compression middleware
- **Development**: ESLint, Prettier, and Nodemon for modern development workflow

## Development Commands

- **Development server**: `npm run dev` (with auto-restart)
- **Production server**: `npm start`
- **Install dependencies**: `npm install`
- **Lint code**: `npm run lint` or `npm run lint:fix`
- **Format code**: `npm run format`

The server runs on port 5000 locally or uses `process.env.PORT` for deployment.

## Project Structure

```
/
├── server.js           # Modern Express server with ES6+ modules
├── package.json        # Dependencies and scripts (Node 18+, ES modules)
├── Procfile           # Heroku deployment config
├── .eslintrc.json     # ESLint configuration
├── .prettierrc        # Prettier formatting rules
├── .eslintignore      # Files to ignore during linting
├── nodemon.json       # Nodemon development configuration
├── views/             # Static HTML pages
│   ├── index.html     # Homepage (modernized HTML5)
│   ├── about.html     # About page (modernized HTML5)
│   └── projects.html  # Projects page (modernized HTML5)
└── public/            # Static assets (modernized)
    ├── style.css      # Custom styles (formatted)
    ├── script.js      # Client-side JavaScript (ES6+)
    ├── skeleton.css   # Responsive CSS framework
    └── [assets]       # Images, fonts, and other static files
```

## Routing

The Express app defines four routes:

- `/` → `index.html` (homepage)
- `/about` → `about.html`
- `/projects` → `projects.html`
- `/latte-art` → `latte-art.html`

## Dependencies

### Production
- `express`: Modern web framework (v4.18+)
- `helmet`: Security middleware with CSP
- `compression`: Gzip compression middleware
- `cors`: Cross-origin resource sharing handling

### Development
- `nodemon`: Auto-restart development server
- `eslint`: Code linting with modern JavaScript rules
- `prettier`: Code formatting for consistent style

### Frontend (CDN)
- Skeleton CSS framework for responsive layout
- Font Awesome 6 for modern social media icons
- Google Analytics 4 (gtag.js) for analytics
- Normalize.css 8.0+ for cross-browser consistency
- jQuery 3.7+ for DOM manipulation

## Modern Features

- **ES6+ Modules**: Full ES module support with `import/export`
- **Modern Node.js**: Requires Node.js 18.0.0+
- **Security**: Helmet.js with Content Security Policy
- **Performance**: Compression and static file caching
- **Code Quality**: ESLint + Prettier with pre-configured rules
- **Development**: Hot reload with nodemon
- **Accessibility**: Proper alt tags and semantic HTML5
- **CDN Assets**: Latest versions of external libraries

## Deployment

Configured for Heroku deployment with `Procfile` specifying `web: node server.js`. All modern features are production-ready with proper error handling and security headers.
