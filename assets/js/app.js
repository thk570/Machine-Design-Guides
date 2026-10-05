// Machine Design Guides — hub logic. Reads the registry from window.MDG_MANIFEST (populated by
// data/manifest.js, loaded via a <script> tag before this file — see that file's own comment for
// why it's JS and not JSON), renders category sections of cards, and wires up the text filter.
// Used by index.html only (calculator pages are self-contained, see docs/00-structure-and-conventions.md).
//
// Categories and the cards within them are always rendered in alphabetical order (by title),
// regardless of the order they're listed in manifest.js — that file's ordering doesn't matter.

function mdgInit() {
  const manifest = window.MDG_MANIFEST;
  if (!manifest) {
    document.getElementById('content').innerHTML =
      '<div class="empty">Could not find the page registry — data/manifest.js did not load. Check that ' +
      '<code>&lt;script src="data/manifest.js"&gt;</code> appears before app.js in index.html, and that the ' +
      '<code>data/</code> folder is still alongside this file.</div>';
    return;
  }
  mdgRender(manifest, '');
  document.getElementById('filter').addEventListener('input', (e) => mdgRender(manifest, e.target.value.toLowerCase()));
}

function mdgRender(manifest, query) {
  const content = document.getElementById('content');
  content.innerHTML = '';

  const byCat = {};
  for (const p of manifest.pages) {
    const match = !query || p.title.toLowerCase().includes(query) ||
      (p.tags || []).some(t => t.toLowerCase().includes(query));
    if (!match) continue;
    (byCat[p.category] ||= []).push(p);
  }

  if (Object.keys(byCat).length === 0) {
    content.innerHTML = '<div class="empty">' +
      (manifest.pages.length === 0
        ? 'No calculators yet — add pages under calculators/ and register them in data/manifest.js.'
        : 'No matches.') +
      '</div>';
    return;
  }

  const sortedCategories = [...manifest.categories].sort((a, b) => a.title.localeCompare(b.title));

  for (const cat of sortedCategories) {
    const pages = byCat[cat.slug];
    if (!pages || pages.length === 0) continue;
    const sortedPages = [...pages].sort((a, b) => a.title.localeCompare(b.title));
    const section = document.createElement('div');
    section.className = 'category';
    section.innerHTML = `<h2><span class="dot" style="background:${cat.color}"></span>${cat.title}</h2>`;
    const cards = document.createElement('div');
    cards.className = 'cards';
    for (const p of sortedPages) {
      const a = document.createElement('a');
      a.className = 'card';
      a.href = p.path;
      a.innerHTML = `<div class="title">${p.title}</div>` +
        (p.standard ? `<div class="std">${p.standard}</div>` : '') +
        (p.description ? `<div class="desc">${p.description}</div>` : '') +
        (p.status && p.status !== 'done' ? `<div class="status">${p.status}</div>` : '');
      cards.appendChild(a);
    }
    section.appendChild(cards);
    content.appendChild(section);
  }
}

mdgInit();
