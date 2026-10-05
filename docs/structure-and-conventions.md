# Machine Design Guides — Structure & Conventions

This document is the reference for how the whole suite is organised, so that every future calculator or reference page — whether built in this session or a separate one — slots in the same way without needing to reinvent layout, navigation, or styling each time.

## Goal

A growing library of single-purpose machine design reference tools (dimension lookups, materials tables, quick calculators), mostly derived from industry standards, that can eventually be wrapped into one standalone app with a home screen for picking a topic/standard and jumping to the relevant page. New pages should be addable by dropping in a file and registering it — no restructuring required.

## Folder layout

```
Machine Design Guides/
  index.html                     Hub / launcher page — the "home screen"
  assets/
    css/style.css                Shared design tokens + component styles
    js/app.js                    Shared hub logic (reads the manifest, builds nav)
  data/
    manifest.js                  Registry of every calculator/page — source of truth for the hub's nav
    materials.js                 Shared material property library (see below)
  calculators/
    <category-slug>/
      <page-slug>.html           One self-contained page per calculator/reference tool
  templates/
    calculator-template.html     Starting point to copy for a new page
  docs/
    00-structure-and-conventions.md   This document
    99-notes-ideas.md                Quick-capture backlog of future topics
```

Everything under `calculators/` is grouped by category folder (see taxonomy below). Each page is a single, self-contained `.html` file — no separate JS/CSS per page — so it can be opened directly, copied, or handed off individually without broken references, and so a future desktop/Electron wrapper can just point at the file.

## Naming conventions

- Files and folders: lower-case kebab-case (`hole-basis-fits.html`, `screw-torque-values.html`).
- Category folders match the category `slug` used in the manifest (see below).
- No spaces, no version numbers in filenames — revision history belongs in the page's own "last updated" note and in git/file history, not the filename.

## The manifest (`data/manifest.js`)

The manifest is the single place that lists every page that exists. The hub (`index.html`) reads it to build categories and links — adding a calculator means adding one entry here plus the page itself, nothing else changes.

It's plain JS, not JSON — the file just assigns `window.MDG_MANIFEST = { ... }` and is loaded with a normal `<script src="data/manifest.js">` tag, on purpose (see "The hub" below for why). Editing it means editing the object literal; the shape is otherwise exactly what you'd expect from JSON.

Schema per entry:

```js
{
  "id": "hole-basis-fits",
  "title": "Fits (Hole Basis)",
  "category": "fits-tolerances",
  "path": "calculators/fits-tolerances/hole-basis-fits.html",
  "standard": "ISO 286-2",
  "description": "Hole-basis fit classes, tolerance grades and limits lookup.",
  "tags": ["tolerance", "fit", "ISO 286"],
  "status": "planned",
  "rev": 1
}
```

`status` is one of `planned`, `draft`, `done` — lets the hub (optionally) show what's actually usable yet vs. still a placeholder. `category` must match a slug from the taxonomy below (or a new one added there first). `rev` is the page's revision number — see "Revision control" below; it's the source of truth checked against each page's own footer marker before export.

## Category taxonomy (starting set)

Kept intentionally short — extend it as real topics arrive rather than pre-guessing the whole tree. Categories
are deliberately **general** rather than one-per-standard: related topics share a category (and its colour) so
the hub doesn't fragment into a long list of near-empty groups as pages are added.

- `fits` — Fits (ISO 286 hole-basis fits/tolerances, and shaft-connection topics like keyways/splines — anything about how two mating parts locate or transmit load relative to each other)
- `fasteners` — Fasteners & Torque (screw torques, thread standards, washers)
- `seals` — Seals & O-Rings (sizing, material/compound selection, groove design)
- `electrical` — Electrical (creepage/clearance per IEC 60664, HV/LV cable sizing and current rating, and future electrical topics — busbars, connectors, etc.)
- `materials` — Materials reference (properties, equivalence tables)

New categories get added to this list in this doc (and mirrored in `style.css` if they carry a colour tag) before the first page in them is built, so the taxonomy stays a deliberate decision rather than drifting. Prefer folding a new narrow topic into an existing general category over minting a new one, unless it's genuinely a different subject area.

## Page conventions (every calculator page)

Every page in `calculators/` copies `templates/calculator-template.html` and keeps this structure so the suite feels like one product:

1. **Header** — page title, category tag, and the governing standard/reference (e.g. "ISO 286-2"), plus a link back to the hub.
2. **Body** — the actual tool: inputs/lookup on the left or top, results/table below or right. Free layout beyond that — a dimension table looks nothing like a torque calculator and shouldn't be forced to. Each section's explanatory note stays short — see "Section notes" below.
3. **Citations & references footer** — see the dedicated section below; every number on the page needs a traceable source.
4. **Revision line** — "Last updated: YYYY-MM-DD &middot; Rev N" at the end of the references card. See "Revision control" below for what bumps `N` and where else it's tracked.

Each page is self-contained HTML/CSS/JS (a `<style>` and `<script>` block in the file itself) but pulls its visual language — colours, spacing, type — from the same tokens defined in `assets/css/style.css`, copied inline. This keeps pages independently portable while looking consistent.

## Citations & references

This is a reference tool, so every figure that isn't a deliberate design choice (a UI default, a round number picked for convenience) needs a traceable source — and the reader needs to be able to tell the two apart. The pattern, established on the O-ring Design page and expected on every page after it:

**In-body superscript citations.** Where a specific claim or figure in a section's body text or note comes from an external source, mark it with a small superscript number linking down to its entry in the References list: `<sup><a href="#ref3">3</a></sup>`. Numbers are assigned **page-sequential** — in the order sources are first cited reading top to bottom, not reset per section — and a source cited again later in the page reuses its original number rather than getting a new one. A design decision that's just this tool's own choice (a rounded default value, a UI convenience) gets no superscript; only externally-sourced facts do.

**Two lists at the bottom of the page**, inside the closing card (styled like the rest of the footer, class `mdg-footer` on a `mdg-card`):

1. **"Applicable design standards"** — a plain (unordered) list naming every real governing standard for the page's topic, even ones whose full text was never opened (most ISO/ASTM/SAE/IEC standards are paywalled). Format each entry as `**<designation>** — <official title>`, e.g. "ISO 3601-1 — Fluid power systems — O-rings — Part 1: Inside diameters, cross-sections, tolerances and designation codes", linking to the standards body's own catalog/landing page (iso.org, store.astm.org, bsigroup.com, …) — that landing page is the legitimate reference even when the standard itself sits behind a paywall. Close with a one- or two-sentence caveat that the page doesn't reproduce the standard's own tables/codes and that conformance-critical work should go to the actual standard.
2. **"References"** — an ordered list (`<ol>`), one `<li id="refN">` per source actually fetched and checked, in the same order as the in-body superscripts. Each entry: a link to the real page (title as the link text), the domain, and a short note on what figure(s) it backs (e.g. "— engineeringtoolbox.com (metal CTE values)"). Only list a source that was genuinely opened and read — a standard's name recalled from memory, or a page that failed to load useful content, does not belong here (a standard goes in the "Applicable design standards" list instead; a failed fetch just doesn't get cited). When a page is derived from an internal (non-public) source — a company spreadsheet, an in-house test report — cite it the same way (title, and what it backs) even though there's no URL to link.

Shared styling for both lists (`.ref-list`, `sup a` link colour) lives in `assets/css/style.css` under its own block — copy it into the page's inline `<style>` along with the other shared tokens, same as everything else on this page.

## Section notes

The small `<p class="note">` under each section explains the figures above it — it is not the place to think out loud. Keep each one to **one to three short sentences**: what the number is, and the one caveat that actually changes how someone uses it. Cite the source with a superscript rather than describing it in prose ("see ref 3", not a sentence explaining what ref 3 says). Don't restate what a label, unit, or table header already shows, and don't stack every edge case a figure could have — one caveat well-chosen beats five hedged ones. If a note is explaining the same thing from two angles or has grown past three sentences, that's the signal to cut it back, not to reorganise it. These notes get revisited and re-trimmed as a page evolves (new sections, new data sources) — a note that was two sentences when written can quietly bloat over several edits, so tighten it back down rather than letting it accrete.

## Design language

- **Units**: metric only (mm, N·m, MPa, °C), by default, on every page. Do not add an imperial toggle or an imperial lookup table as a matter of course — only include imperial values where the specific topic makes that unavoidable (e.g. a standard that is itself defined in inches, like AS568), and say so explicitly on that page rather than presenting it as the norm. State the unit next to every input/output, always.
- **Unit placement on inputs**: the unit label for a user input box goes to the **right of the box, on the same line** — never underneath it. Don't put a bare unit as trailing text straight after an `<input>` inside a `.field` (a `flex-direction: column` container) — the browser wraps that trailing text onto its own line below the box, which is exactly the layout this rule forbids. Instead wrap the input and its unit in a row: `<div class="input-row"><input ...><span class="unit">mm</span></div>` inside the `.field`. Copy `.input-row`/`.unit` from `assets/css/style.css` alongside the other shared component classes. A unit already folded into the label text itself (e.g. a label reading "Operating temp — minimum (°C)") satisfies the rule without needing `.input-row` — the "to the right, not underneath" requirement is about where the unit lands relative to the box, not that every input must have a separate unit span.
- **Theme**: light and dark variants using CSS custom properties (tokens defined once in `assets/css/style.css`), so pages behave in either without per-page work. See "Dark mode toggle" below for how the user actually switches between them.
- **Diagrams**: draw them as inline SVG using the shared CSS tokens (`var(--mdg-text)`, `var(--mdg-accent)`, etc.), never as an embedded base64 raster image. See "Diagrams: inline SVG, not embedded raster" below.
- **Colour by category**: each category in the taxonomy gets one accent colour, used consistently for its tag/badge across the hub and its pages, so the eye learns "this colour = fasteners" etc.
- **Typography**: one system font stack, no per-page font choices.
- **Print-friendly**: pages should print sensibly (results table visible, nav/chrome hidden) since these often get printed and pinned up or dropped into a drawing pack. See also "Save as PDF" below for the dedicated one-click export.

## Shared material library (`data/materials.js`)

A second shared data file, alongside the manifest, for material properties (density, E/G/ν, yield/ultimate
strength, CTE, thermal conductivity, melting range) — arranged MMPDS-style: material **type**, then
**grade/condition**. It exists so a calculator that needs material data (an interference-fit force estimate,
a thermal-fit size check, a structural sanity check) can pull from one consistent library instead of each
page hard-coding its own material table.

This is a deliberate, narrow exception to "every calculator page is self-contained" (see "Page conventions"
above): a page that needs material properties loads it the same way `index.html` loads the manifest —
`<script src="../../data/materials.js">` — rather than copying material data inline. Everything else about
the page (styling, layout, its own calculation logic) stays self-contained as normal; only material *data*
is shared. A page taking this dependency should say so plainly near its inputs (e.g. "materials from the
shared library") so it's obvious why the page won't run standalone if `data/materials.js` goes missing.

The library itself has a browsable reference page, `calculators/materials/material-library.html` — open it
to see the current grade list, its citation convention (every value traces to a real datasheet, or is
flagged as a typical/generic value with its own source), and the caveat that this is *not* a reproduction
of MMPDS (the real handbook is a paywalled, statistically-derived allowables reference — this is a much
smaller, typical-properties starting set modelled on its type→grade layout).

## Collapsible reference tables

A page can accumulate tables that are genuinely useful but not what the user is scanning for on every
visit — a full parameter-definitions table, an extended tolerance/limits table, a per-grade properties
table duplicated elsewhere. Left fully expanded, these bury the primary result (the numbers the page
exists to compute) under rows of reference detail. The rule: any table that is **reference/lookup detail
rather than the primary result**, and that runs long enough to dominate the section (rule of thumb: more
than about 8 rows, or a table someone consults occasionally rather than reads every time), is collapsed
by default behind a disclosure triangle. A short table (a handful of rows) or the page's actual output —
the numbers the calculator was opened to produce — stays visible; don't hide the answer itself.

**Implementation is standardised** — the same markup, icon and animation everywhere, so the interaction
is instantly familiar from one page to the next:

```html
<details class="mdg-collapsible">
  <summary>Table title <span class="hint">short description of what's inside</span></summary>
  <div class="mdg-collapsible-body">
    <table class="mdg-table">...</table>
  </div>
</details>
```

- **Element**: native `<details>`/`<summary>` — no bespoke JS, works offline, keyboard- and
  screen-reader-accessible for free, and the closed state is the HTML's actual default (no
  flash-of-expanded-content before script runs).
- **Icon**: a single right-pointing triangle before the summary text (drawn in CSS, not an emoji or an
  image, so it inherits `--mdg-text-muted` and looks identical in light/dark).
- **Animation**: only the triangle animates — it rotates 90° over 0.18s ease when opened. The table
  itself shows/hides instantly via the native `<details>` toggle; don't add a height/opacity transition
  for the body, and don't swap in a different icon (a chevron, a plus/minus, etc.) on a new page.
- **Default state**: closed (no `open` attribute) for any table meeting the threshold above.
- Copy the whole `.mdg-collapsible` block from `assets/css/style.css` into the page's inline `<style>`,
  same as every other shared component — don't redefine the icon or timing per page.
- `@media print` forces every collapsible open (see `style.css`) so a printed copy shows the full
  reference table regardless of its on-screen state. **Save as PDF** (below) is the one exception: it
  hides collapsibles entirely rather than forcing them open, to keep the export compact.

## Dark mode toggle

Every page (including `index.html`) carries a small **Auto / Light / Dark** toggle button (`.mdg-theme-toggle`,
styles in `assets/css/style.css`) placed in the header next to the standard-reference text (on `index.html`
it sits top-right of the masthead). Clicking it cycles through the three states and persists the choice
under the `mdg-theme` key in `localStorage`, which is shared by every page (they're all served from the
same origin), so picking "Dark" on one page carries across the whole site rather than needing to be set
per page.

Mechanically, each page needs three pieces, all copy-paste from any already-patched page (or
`templates/calculator-template.html`, which has them):

1. A **synchronous inline script right after the `<meta name="viewport">` tag**, before the page's own
   `<style>` block, that reads `localStorage.mdg-theme` and sets `data-theme` on `<html>` immediately if
   it's `"light"` or `"dark"`. This has to run before the stylesheet is parsed so there's no flash of the
   wrong theme on load — don't move it later in `<head>` or defer it.
2. The **toggle button** itself in the header (`id="mdg-theme-toggle" class="mdg-theme-toggle"`), and the
   `.mdg-theme-toggle` CSS rule copied into the page's inline `<style>` alongside the other shared tokens.
3. A **wiring script right before `</body>`** that cycles Auto → Light → Dark on click, applying/removing
   `data-theme` on `<html>` and writing/clearing `localStorage.mdg-theme` to match. "Auto" means no
   `data-theme` attribute at all — the existing `prefers-color-scheme` media query in each page's `:root`
   block takes over, same as before this toggle existed.

A new page copied from the template inherits all three automatically; don't invent a different toggle
control or storage key on a one-off basis.

## Save as PDF

Every page (including the template) carries a **"Save PDF"** button (`#mdg-save-pdf`, styled like the
theme toggle) in the header, next to it. Clicking it produces a browser-generated PDF — via the browser's
native "Save as PDF" print destination, no external PDF library, consistent with the project's
self-contained/no-build-step philosophy — that captures the page's current inputs and results as a durable,
printable record of a design decision. This is deliberately a one-click export, not a settings dialog: the
button just triggers the browser's own print flow with the page pre-arranged to look right on paper.

The mechanism is a temporary `mdg-pdf-mode` class applied to `<html>` just before `window.print()` and
removed again on `afterprint` (and, as a safety net, on window `focus`, in case `afterprint` doesn't fire —
e.g. the print dialog was cancelled in a way the browser doesn't report). While that class is present:

- The normal header/nav (`.mdg-header`), anything marked `.mdg-no-print`, and every collapsible reference
  table are hidden outright (not just forced open, as ordinary `@media print` does) — collapsibles hold
  lookup/reference detail rather than the primary result (see "Collapsible reference tables" above), so
  dropping them keeps the export focused and compact.
- A `.mdg-print-header` block — hidden on-screen, shown only in PDF mode — takes the header's place: the
  page title, category tag, and standard-reference text (duplicated from the on-screen header, since that
  header itself is hidden), plus today's date, filled in by the wiring script at export time.
- Colours are forced to a fixed light palette (`:root.mdg-pdf-mode` overrides the same custom properties
  the dark-mode toggle uses) regardless of the page's current theme, so a PDF saved from a dark-themed
  session still prints on white paper with dark text, rather than dark background with light text.
- `@page { size: A4; margin: 12mm; }` fixes the paper size/margins so the export doesn't depend on
  whatever the browser's print dialog last had set.

**Auto-fit, with a legibility floor.** Pages vary hugely in length — a short calculator vs. the O-ring
Design or Material Library pages — so a fixed font size would either waste a page's-worth of margin on
short pages or badly overflow long ones. Instead, the wiring script measures the page's actual content
height at the print width, and computes a zoom factor (CSS `zoom`, not `transform: scale` — `zoom` is what
actually changes the layout size Chromium uses for print pagination, whereas `transform` only changes the
rendered appearance and is ignored when the browser decides where to break pages) that would make it fit
one A4 sheet: `scale = min(1, availableHeightPx / measuredHeightPx)`. That scale is clamped to a
**minimum of 0.65** — below that, text becomes too small to read on paper, and a "1-page" PDF nobody can
actually read is worse than a legible 2- or 3-page one. Most pages comfortably fit on a single sheet at or
above that floor; a handful of the longest pages (Material Library's full grade table, O-Ring Design,
Screw Torques) hit the floor and spill onto a second (or, for Material Library, a few more) page instead of
shrinking further — that's expected, not a bug to chase.

Mechanically, each page needs four pieces (all present in `templates/calculator-template.html` — copy from
there for a new page, same as the dark-mode toggle):

1. The **`#mdg-save-pdf` button** in the header, immediately before the theme-toggle button:
   `<button type="button" id="mdg-save-pdf" class="mdg-theme-toggle mdg-no-print" aria-label="Save this page as a one-page PDF">Save PDF</button>`.
2. A **`.mdg-print-header`** block as the very first child of `<main>`, containing the page's title,
   category tag, standard-reference text, and a `<span id="mdg-print-date">` (filled in at export time).
3. The **CSS block** (`@page`, `.mdg-print-header`, `:root.mdg-pdf-mode` and its descendant rules) —
   copied from `assets/css/style.css`, appended after the page's existing `@media print` rule.
4. The **wiring script**, appended as a new `<script>` block right after the dark-mode toggle's own
   wiring script, before `</body>`. It exposes `window.__mdgEnterPdfMode()` / `window.__mdgExitPdfMode()`
   on `window` (so the mechanism can be triggered and inspected directly — from a test, or from the
   console — without needing to drive the real print dialog), wires the button to call
   `enterPdfMode()` then `window.print()`, and cleans up on `afterprint`/`focus`.

A new page copied from the template inherits all four automatically; don't invent a different export
mechanism or button on a one-off basis.

## Revision control

Every page (including the template) carries a simple **"Rev N"** marker next to its existing
"Last updated" line in the footer: `Last updated: YYYY-MM-DD &middot; Rev N`. It exists so a
stale copy of a page — e.g. one bundled into an export zip alongside a newer shared data file —
is instantly recognisable by eye, and so an automated check can catch the mismatch before that
export ships.

- **Bump on every content change.** Whenever a page's markup, calculation logic, or displayed
  data changes, increment its `Rev N` footer marker by 1 and update its "Last updated" date to
  match. A change to shared files it merely depends on (`data/materials.js`, `assets/css/style.css`)
  doesn't by itself bump a page's own Rev — only an edit to the page itself does.
- **`data/manifest.js` is the source of truth.** Each page's entry carries a matching `"rev": N`
  field (see "The manifest" above). When you bump a page's footer Rev, bump its manifest entry
  to the same number in the same edit — the two must never be changed independently.
- **Checked at export time**, not just by eye: `scripts/check-revisions.py` reads every page
  listed in the manifest, extracts its footer `Rev N`, and compares it against that entry's
  `rev` field. It exits non-zero (and prints exactly which page(s) disagree) on any mismatch, a
  missing marker, or a missing manifest entry. Run it before building/delivering an export zip —
  it's what catches a locally-stale page (or a locally-stale `manifest.js`) before it silently
  ships, which is the exact failure that motivated adding revision tracking in the first place.
- **New pages start at Rev 1** (matching `"rev": 1` in the manifest) the moment they're added,
  not left unset — there's no "Rev 0" or missing-marker state once a page is registered.

A new page copied from `templates/calculator-template.html` inherits the `Rev 1` marker as
part of the template's own footer; just remember to also add `"rev": 1` to its new manifest
entry in the same edit.

## Diagrams: inline SVG, not embedded raster

Reference diagrams (a parameter figure, a gland cross-section, anything that isn't a live chart) are drawn
as **inline `<svg>` markup**, styled with the shared CSS tokens (`var(--mdg-text)`, `var(--mdg-text-muted)`,
`var(--mdg-accent)`, `var(--mdg-border)`, `var(--mdg-surface)`) so they re-theme for free in dark mode —
never embedded as a `data:image/png;base64,...` raster image. Three reasons this is now a hard rule, not a
preference:

1. **Size.** A hand-drawn schematic redraws at roughly a tenth the byte weight of an embedded PNG of the
   same diagram (a large base64 blob is often 30–45% of an otherwise all-text page).
2. **Theming.** A raster image is baked into one fixed background/line colour; an inline SVG using the
   page's own custom properties looks correct in light and dark automatically, with no separate dark-mode
   asset to maintain.
3. **Robustness.** A giant unbroken base64 string is the most fragile thing in an otherwise plain-text page.
   One was found corrupted (a broken PNG chunk, likely from some byte-buffer boundary in a prior
   read/write/round-trip) sitting undetected in a stored page until it was finally opened and decoded —
   plain SVG markup doesn't have that failure mode.

Keep each diagram's SVG a fixed, labelled schematic (not to scale, same as the old raster figures were) —
its purpose is to define the parameters, not to visualise the specific numbers entered above it.

## The hub (`index.html`)

Reads `window.MDG_MANIFEST`, groups entries by category, and renders a card/list per category with links to each page. Includes a simple text filter across title/tags. This is the "select a topic or standard, land on the right page" entry point the project brief asks for.

The manifest is deliberately `data/manifest.js` (loaded via `<script src="data/manifest.js">`) rather than `data/manifest.json` (loaded via `fetch()`), specifically so `index.html` works by double-clicking it straight off the filesystem — a `<script src>` tag isn't subject to the same same-origin/CORS block that `fetch()` hits under `file://`. Don't reintroduce a `fetch()`-based JSON load for the manifest; it would bring that failure back. (A future app/Electron wrapper can still read `data/manifest.js` just as easily — this isn't a workaround that needs undoing later.)

## Workflow for adding a new calculator (future sessions)

1. Pick — or add — a category from the taxonomy above.
2. Copy `templates/calculator-template.html` into `calculators/<category>/<page-slug>.html`.
3. Build the page, citing the source standard in the footer.
4. Add one entry to `data/manifest.js`.
5. Open `index.html` directly (double-click, no server needed) to confirm it appears and links correctly.

Individual topic sessions (e.g. "build the O-ring sizing calculator") should follow this document rather than restating layout/styling decisions from scratch — link back to this file if in doubt.

## Open feature requirements (captured, not yet built)

Small scope additions to a *planned* page, noted here so they aren't lost before that page gets built — remove the line once it's implemented and reflected on the page itself:

(none currently open — the interference-fit force estimate for Fits (Hole Basis) was implemented in section 3 of that page.)
