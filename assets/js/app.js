// Machine Design Guides — hub logic. Reads the registry from window.MDG_MANIFEST (populated by
// data/manifest.js, loaded via a <script> tag before this file — see that file's own comment for
// why it's JS and not JSON), renders category sections of cards, and wires up the text filter.
// Used by index.html only (calculator pages are self-contained, see MDG/structure-and-conventions.md).
//
// Categories and the cards within them are always rendered in alphabetical order (by title),
// regardless of the order they're listed in manifest.js — that file's ordering doesn't matter.
// The one exception is the 'libraries' category, which is always pinned last (bottom of the page).
//
// The header shows "Last updated: <date>" from manifest.updated (YYYY-MM-DD), set at each export.

function mdgInit() {
  const manifest = window.MDG_MANIFEST;
  if (!manifest) {
    document.getElementById('content').innerHTML =
      '<div class="empty">Could not find the page registry — data/manifest.js did not load. Check that ' +
      '<code>&lt;script src="data/manifest.js"&gt;</code> appears before app.js in index.html, and that the ' +
      '<code>data/</code> folder is still alongside this file.</div>';
    return;
  }
  mdgShowUpdated(manifest.updated);
  mdgRender(manifest, '');
  document.getElementById('filter').addEventListener('input', (e) => mdgRender(manifest, e.target.value.toLowerCase()));
}

function mdgShowUpdated(iso) {
  const el = document.getElementById('mdg-updated');
  if (!el || !iso) return;
  const d = new Date(iso + 'T00:00:00');
  el.textContent = 'Last updated: ' + (isNaN(d) ? iso :
    d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }));
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

  const PINNED_LAST = 'libraries';
  const sortedCategories = [...manifest.categories].sort((a, b) =>
    (a.slug === PINNED_LAST) - (b.slug === PINNED_LAST) || a.title.localeCompare(b.title));

  for (const cat of sortedCategories) {
    const pages = byCat[cat.slug];
    if (!pages || pages.length === 0) continue;
    const sortedPages = [...pages].sort((a, b) => a.title.localeCompare(b.title));
    const section = document.createElement('div');
    section.className = 'category' + (cat.slug === PINNED_LAST ? ' libraries' : '');
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
