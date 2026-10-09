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
// Submitting opens the Smartsheet form in a new tab with every field pre-filled; the user presses Submit
// there and Smartsheet assigns the REQ-#### log number. If this file fails to load, nothing is added.
(function () {
  var FORM_URL = 'https://app.smartsheet.eu/b/form/01a115818b987b9cae771b2b768a9a09';
  var LOG_URL = 'https://app.smartsheet.eu/sheets/8vf9jxW9CMWWXPm4PXhMV788W7mQ49Qmmj7CV2V1';
  var NAME_KEY = 'mdg-request-name';

  var script = document.currentScript;
  var mode = (script && script.getAttribute('data-mdg-request')) || 'change';

  // ---------- page context ----------
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

  // ---------- styles (use the page's own tokens) ----------
  var css =
    '.mdg-req-pill{border:1px solid var(--mdg-border,#dcdcd6);border-radius:999px;padding:0.3rem 0.75rem;font-size:0.78rem;' +
      'cursor:pointer;background:var(--mdg-surface,#fff);color:var(--mdg-text-muted,#6b6b64);font-family:inherit;text-decoration:none;display:inline-block;line-height:normal}' +
    '.mdg-req-pill:hover{border-color:var(--mdg-accent,#3b6ea5);color:var(--mdg-text,#1c1c1a)}' +
    '.mdg-req-dlg{border:1px solid var(--mdg-border,#dcdcd6);border-radius:10px;padding:0;width:min(520px,calc(100vw - 32px));' +
      'background:var(--mdg-surface,#fff);color:var(--mdg-text,#1c1c1a);font-family:var(--mdg-font,sans-serif)}' +
    '.mdg-req-dlg::backdrop{background:rgba(20,20,18,0.45)}' +
    '.mdg-req-dlg .rq-head{padding:0.9rem 1.1rem 0.6rem;border-bottom:1px solid var(--mdg-border,#dcdcd6)}' +
    '.mdg-req-dlg h3{margin:0;font-size:1rem}' +
    '.mdg-req-dlg .rq-ctx{display:flex;flex-wrap:wrap;gap:0.35rem;margin-top:0.5rem}' +
    '.mdg-req-dlg .rq-chip{font-size:0.72rem;color:var(--mdg-text-muted,#6b6b64);background:var(--mdg-bg,#f7f7f5);' +
      'border:1px solid var(--mdg-border,#dcdcd6);border-radius:999px;padding:0.1rem 0.5rem}' +
    '.mdg-req-dlg .rq-body{padding:0.9rem 1.1rem;display:grid;gap:0.8rem}' +
    '.mdg-req-dlg .rq-field{display:flex;flex-direction:column;gap:0.3rem}' +
    '.mdg-req-dlg label{font-size:0.82rem;font-weight:600}' +
    '.mdg-req-dlg label span{font-weight:400;color:var(--mdg-text-muted,#6b6b64)}' +
    '.mdg-req-dlg input,.mdg-req-dlg textarea{font:inherit;font-size:0.88rem;padding:0.45rem 0.6rem;width:100%;box-sizing:border-box;' +
      'border:1px solid var(--mdg-border,#dcdcd6);border-radius:6px;background:var(--mdg-bg,#f7f7f5);color:var(--mdg-text,#1c1c1a)}' +
    '.mdg-req-dlg textarea{min-height:7rem;resize:vertical;line-height:1.4}' +
    '.mdg-req-dlg .rq-count{font-size:0.72rem;color:var(--mdg-text-muted,#6b6b64);text-align:right;font-variant-numeric:tabular-nums}' +
    '.mdg-req-dlg .rq-err{font-size:0.78rem;color:#b5484d}' +
    '.mdg-req-dlg .rq-foot{padding:0.7rem 1.1rem 0.9rem;display:flex;justify-content:flex-end;gap:0.5rem;border-top:1px solid var(--mdg-border,#dcdcd6)}' +
    '.mdg-req-dlg .rq-btn{font:inherit;font-size:0.85rem;border-radius:6px;padding:0.4rem 0.9rem;cursor:pointer;' +
      'border:1px solid var(--mdg-border,#dcdcd6);background:var(--mdg-surface,#fff);color:var(--mdg-text,#1c1c1a)}' +
    '.mdg-req-dlg .rq-btn.primary{background:var(--mdg-accent,#3b6ea5);border-color:var(--mdg-accent,#3b6ea5);color:#fff;font-weight:600}' +
    '.mdg-req-dlg .rq-done{padding:1.3rem 1.1rem 0.6rem;text-align:center}' +
    '.mdg-req-dlg .rq-done p{margin:0.4rem 0 0;font-size:0.84rem;color:var(--mdg-text-muted,#6b6b64);line-height:1.45}' +
    '.mdg-req-dlg .rq-done a{color:var(--mdg-accent,#3b6ea5)}' +
    '@media print{.mdg-req-pill,.mdg-req-dlg{display:none!important}}';
  var style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);

  // ---------- dialog ----------
  var dlg, ctx = null, reqType = 'Change';
  function el(id) { return document.getElementById(id); }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }

  function buildDialog() {
    dlg = document.createElement('dialog');
    dlg.className = 'mdg-req-dlg';
    dlg.setAttribute('aria-labelledby', 'mdg-rq-title');
    dlg.innerHTML =
      '<form id="mdg-rq-form" novalidate>' +
      '<div id="mdg-rq-formview">' +
        '<div class="rq-head"><h3 id="mdg-rq-title"></h3><div class="rq-ctx" id="mdg-rq-ctx"></div></div>' +
        '<div class="rq-body">' +
          '<div class="rq-field"><label for="mdg-rq-t">Title</label>' +
            '<input id="mdg-rq-t" maxlength="80" autocomplete="off" placeholder="Short summary">' +
            '<div class="rq-count" id="mdg-rq-tc">0 / 80</div></div>' +
          '<div class="rq-field"><label for="mdg-rq-d">Description</label>' +
            '<textarea id="mdg-rq-d" maxlength="2000"></textarea>' +
            '<div class="rq-count" id="mdg-rq-dc">0 / 2000</div></div>' +
          '<div class="rq-field"><label for="mdg-rq-n">Name <span>(optional)</span></label>' +
            '<input id="mdg-rq-n" maxlength="60" autocomplete="name" placeholder="So you can be asked about it"></div>' +
          '<div class="rq-err" id="mdg-rq-err" hidden>Add a title and a description to continue.</div>' +
        '</div>' +
        '<div class="rq-foot"><button type="button" class="rq-btn" id="mdg-rq-cancel">Cancel</button>' +
          '<button type="submit" class="rq-btn primary">Continue to form &#8599;</button></div>' +
      '</div>' +
      '<div id="mdg-rq-doneview" hidden>' +
        '<div class="rq-done"><strong>Smartsheet form opened in a new tab</strong>' +
          '<p>Check the details and press <b>Submit</b> there. Your REQ number appears in the request log.</p>' +
          '<p>Nothing opened? <a id="mdg-rq-link" href="#" target="_blank" rel="noopener">Open the form</a></p></div>' +
        '<div class="rq-foot"><button type="button" class="rq-btn primary" id="mdg-rq-close">Close</button></div>' +
      '</div>' +
      '</form>';
    document.body.appendChild(dlg);

    function counts() {
      el('mdg-rq-tc').textContent = el('mdg-rq-t').value.length + ' / 80';
      el('mdg-rq-dc').textContent = el('mdg-rq-d').value.length + ' / 2000';
    }
    el('mdg-rq-t').addEventListener('input', counts);
    el('mdg-rq-d').addEventListener('input', counts);
    el('mdg-rq-cancel').addEventListener('click', closeDialog);
    el('mdg-rq-close').addEventListener('click', closeDialog);
    el('mdg-rq-form').addEventListener('submit', function (e) {
      e.preventDefault();
      var t = el('mdg-rq-t').value.trim(), d = el('mdg-rq-d').value.trim(), n = el('mdg-rq-n').value.trim();
      if (!t || !d) { el('mdg-rq-err').hidden = false; return; }
      try { if (n) localStorage.setItem(NAME_KEY, n); else localStorage.removeItem(NAME_KEY); } catch (err) {}
      var url = formUrl(t, d, n);
      var w = window.open(url, '_blank');
      if (w) { try { w.opener = null; } catch (err) {} }
      el('mdg-rq-link').href = url;
      el('mdg-rq-t').value = ''; el('mdg-rq-d').value = ''; counts();
      el('mdg-rq-formview').hidden = true;
      el('mdg-rq-doneview').hidden = false;
    });
    dlg.counts = counts;
  }

  function formUrl(title, desc, name) {
    var f = [['Type', reqType], ['Title', title], ['Description', desc], ['Status', 'New']];
    if (name) f.push(['Name', name]);
    if (ctx) f.push(['Page ID', ctx.id], ['Page Title', ctx.title], ['Page Rev', ctx.rev]);
    return FORM_URL + '?' + f.map(function (p) { return encodeURIComponent(p[0]) + '=' + encodeURIComponent(p[1]); }).join('&');
  }

  function openDialog() {
    if (!dlg) buildDialog();
    var today = new Date().toISOString().slice(0, 10);
    el('mdg-rq-title').textContent = reqType === 'Change' ? 'Change request' : 'Page request';
    var chips = reqType === 'Change'
      ? [ctx.title, ctx.id, ctx.rev ? 'Rev ' + ctx.rev : 'Rev ?', today]
      : ['New page', today];
    el('mdg-rq-ctx').innerHTML = chips.map(function (c) { return '<span class="rq-chip">' + esc(c) + '</span>'; }).join('');
    el('mdg-rq-d').placeholder = reqType === 'Change'
      ? 'What should change on this page, and why?'
      : 'What should the page do? Any standard or source to base it on?';
    var saved = ''; try { saved = localStorage.getItem(NAME_KEY) || ''; } catch (err) {}
    if (!el('mdg-rq-n').value) el('mdg-rq-n').value = saved;
    el('mdg-rq-err').hidden = true;
    el('mdg-rq-formview').hidden = false;
    el('mdg-rq-doneview').hidden = true;
    dlg.counts();
    if (typeof dlg.showModal === 'function') dlg.showModal(); else dlg.setAttribute('open', '');
    el('mdg-rq-t').focus();
  }
  function closeDialog() { if (typeof dlg.close === 'function') dlg.close(); else dlg.removeAttribute('open'); }

  // ---------- wire up ----------
  if (mode === 'page') {
    reqType = 'New page';
    var pb = el('mdg-page-request'), lg = el('mdg-request-log');
    if (pb) { pb.hidden = false; pb.addEventListener('click', openDialog); }
    if (lg) { lg.href = LOG_URL; lg.hidden = false; }
  } else {
    reqType = 'Change';
    ctx = pageContext();
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.id = 'mdg-change-request';
    btn.className = 'mdg-theme-toggle mdg-req-pill mdg-no-print';
    btn.textContent = 'Change request';
    btn.setAttribute('aria-label', 'Suggest a change to this page');
    btn.addEventListener('click', openDialog);
    var pdf = el('mdg-save-pdf');
    if (pdf && pdf.parentNode) pdf.parentNode.insertBefore(btn, pdf);
    else { var hdr = document.querySelector('.mdg-header'); if (hdr) hdr.appendChild(btn); }
  }
})();
