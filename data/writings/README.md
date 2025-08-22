# Writing Blog Posts

This directory contains the refactored blog posting system that makes writing much more ergonomic and readable.

## Structure

- **`writings-meta.json`**: Contains metadata for all posts (id, title, date, filename)
- **`writings/`**: Directory containing individual Markdown files for each post
- **`writings/README.md`**: This file

## How to add a new blog post

1. Create a new Markdown file in the `writings/` directory (e.g., `my-new-post.md`)
2. Write your content in Markdown (much easier than HTML!)
3. Add an entry to `writings-meta.json` with the metadata:

```json
{
  "id": "my-new-post",
  "title": "My New Post Title",
  "date": "September 2025",
  "file": "my-new-post.md"
}
```

4. Add a route in `server.js` if you want individual pages:

```javascript
app.get('/my-new-post', (req, res) => {
  res.sendFile(join(__dirname, 'views', 'my-new-post.html'));
});
```

## Benefits of this approach

- **Easy editing**: Write in Markdown instead of HTML strings
- **Better maintainability**: Separate content from metadata
- **Syntax highlighting**: Your editor will highlight Markdown properly
- **Version control friendly**: Each post is its own file
- **No escaping**: No need to escape quotes or worry about JSON formatting

## Original structure (deprecated)

The old `writings.json` file contained HTML content directly in JSON strings, which was cumbersome to edit and maintain.