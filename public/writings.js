async function loadWritings() {
  try {
    const response = await fetch('/api/writings');
    const writings = await response.json();
    
    const writingsContainer = document.querySelector('.writings');
    if (!writingsContainer) return;
    
    writingsContainer.innerHTML = writings.map(writing => `
      <article class="post">
        <div class="post-date">${writing.date}</div>
        <h3 class="post-title"><a href="/${writing.id}">${writing.title}</a></h3>
        <div class="post-content">
          ${writing.content}
        </div>
      </article>
    `).join('');
  } catch (error) {
    console.error('Error loading writings:', error);
  }
}

async function loadSingleWriting() {
  const path = window.location.pathname.substring(1);
  if (!path) return;
  
  try {
    const response = await fetch(`/api/writings/${path}`);
    if (!response.ok) return;
    
    const writing = await response.json();
    
    const writingsContainer = document.querySelector('.writings');
    if (!writingsContainer) return;
    
    document.title = `${writing.title} - Praful Mathur`;
    
    writingsContainer.innerHTML = `
      <article class="post">
        <div class="post-date">${writing.date}</div>
        <h3 class="post-title">${writing.title}</h3>
        <div class="post-content">
          ${writing.content}
        </div>
      </article>
    `;
  } catch (error) {
    console.error('Error loading writing:', error);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  if (window.location.pathname === '/writings') {
    loadWritings();
  } else {
    loadSingleWriting();
  }
});