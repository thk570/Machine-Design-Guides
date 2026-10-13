// Machine Design Guides — change / page requests.
//
// Shared script (same narrow exception as data/materials.js) so the Smartsheet links live in one place.
// Load it at the end of <body>:
//   calculator page:  <script src="../../assets/js/requests.js" data-mdg-request="change"></script>
//   hub (index.html): <script src="assets/js/requests.js" data-mdg-request="page"></script>
//
// "change" adds a "Change request" button to the page header (before Save PDF). The page id comes from
// the file name, the title from the header <strong>, and the rev from the footer "Rev N" — no per-page config.
// "page" wires the hub's #mdg-page-request button and #mdg-request-log link (hidden until this runs).
//
// Clicking opens the Smartsheet form directly in a new tab, with the hidden context fields pre-filled
// (Type, Page ID, Page Title, Page Rev). Query keys must match the form's field names exactly.
// The user fills in title/description/name there and submits; Smartsheet assigns the REQ-#### number.
(function () {
  var FORM_URL = 'https://app.smartsheet.eu/b/form/01a115818b987b9cae771b2b768a9a09';
  var LOG_URL = 'https://app.smartsheet.eu/sheets/8vf9jxW9CMWWXPm4PXhMV788W7mQ49Qmmj7CV2V1';

  var script = document.currentScript;
  var mode = (script && script.getAttribute('data-mdg-request')) || 'change';
  function el(id) { return document.getElementById(id); }

  function pageContext() {
    var file = location.pathname.split('/').pop() || '';
    var id = decodeURIComponent(file.replace(/\.html?$/i, ''));
    var strong = document.querySelector('.mdg-header strong');
    var title = strong ? strong.textContent.trim() : document.title.split(' — ')[0];
    var footers = document.querySelectorAll('.mdg-footer');
    var text = footers.length ? footers[footers.length - 1].textContent : document.body.textContent;
    var revs = text.match(/Rev\s+(\d+)/g);
    var rev = revs ? revs[revs.length - 1].replace(/\D/g, '') : '';
    return { id: id, title: title, rev: rev };
  }

  function formUrl(type, ctx) {
    var f = [['Type', type], ['Status', 'New']];
    if (ctx) f.push(['Page ID', ctx.id], ['Page Title', ctx.title], ['Page Rev', ctx.rev]);
    return FORM_URL + '?' + f.map(function (p) { return encodeURIComponent(p[0]) + '=' + encodeURIComponent(p[1]); }).join('&');
  }

  function openForm(type, ctx) {
    var w = window.open(formUrl(type, ctx), '_blank', 'noopener');
    if (!w) location.href = formUrl(type, ctx); // popup blocked: open in this tab instead
  }

  var css =
    '.mdg-req-pill{border:1px solid var(--mdg-border,#dcdcd6);border-radius:999px;padding:0.3rem 0.75rem;font-size:0.78rem;' +
      'cursor:pointer;background:var(--mdg-surface,#fff);color:var(--mdg-text-muted,#6b6b64);font-family:inherit;text-decoration:none;display:inline-block;line-height:normal}' +
    '.mdg-req-pill:hover{border-color:var(--mdg-accent,#3b6ea5);color:var(--mdg-text,#1c1c1a)}' +
    '@media print{.mdg-req-pill{display:none!important}}';
  var style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);

  if (mode === 'page') {
    var pb = el('mdg-page-request'), lg = el('mdg-request-log');
    if (pb) { pb.hidden = false; pb.addEventListener('click', function () { openForm('New page', null); }); }
    if (lg) { lg.href = LOG_URL; lg.hidden = false; }
  } else {
    var ctx = pageContext();
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.id = 'mdg-change-request';
    btn.className = 'mdg-theme-toggle mdg-req-pill mdg-no-print';
    btn.textContent = 'Change request';
    btn.setAttribute('aria-label', 'Suggest a change to this page (opens the request form)');
    btn.addEventListener('click', function () { openForm('Change', ctx); });
    var pdf = el('mdg-save-pdf');
    if (pdf && pdf.parentNode) pdf.parentNode.insertBefore(btn, pdf);
    else { var hdr = document.querySelector('.mdg-header'); if (hdr) hdr.appendChild(btn); }
  }
})();
