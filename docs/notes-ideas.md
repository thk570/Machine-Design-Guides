# Notes / Ideas — Quick Capture

Running backlog of things to turn into calculators or reference pages later. Add a line whenever an idea comes up; no need to categorise or flesh out here — triage into `data/manifest.js` when it's actually picked up.

Status key: ⚪ Concept · 🔵 Placeholder · 🟡 WIP · 🟢 Complete

| Sheet | Status | Comments |
|---|---|---|
| O-ring sizing and material selection | 🟢 Complete | Sets the layout/citation conventions for later pages |
| Shared material library | 🟢 Complete | Now includes C101/C11000 copper and 1350/6101 aluminium conductor grades, added for busbar sizing |
| HV cable sizing | 🟢 Complete | From Equipmake's internal PD1 tool |
| Screw torques | 🟢 Complete | Metric coarse, NASA/TM-2017-219475 pullout method, materials from the shared library |
| Creepage and clearance | 🟢 Complete | IEC 60664-1 |
| Fits (hole basis) | 🟢 Complete | ISO 286 limits/fit lookup plus interference-fit force estimate, materials from the shared library |
| Keyways | 🟢 Complete | DIN 6885-1 sizing plus torque-capacity check, materials from the shared library |
| Busbar sizing | 🟢 Complete | Current-density cross-section (IEC 60943/61439-1 rule of thumb) + aspect-ratio/skin-depth check, materials from the shared library, default C101 |
| GD&T tightness guide | 🟢 Complete | All 14 ASME Y14.5 characteristics, achievability scale with process-capability citations where they exist, locally-editable bands (per-browser, local storage) |
| Thread undercuts (DIN 76) | 🟢 Complete | DIN 76-1 external/internal relief forms (A/B/C/D), pitch-indexed dimensions with diagram |
| Fastener library | 🟢 Complete | M3–M30 coarse + fine. Six heads (socket cap, button, countersunk, low head, hex, hex flange) × hex socket / Torx / external hex, tool size, thread geometry, tap drill, ISO 273 / DIN 974-1 / countersink holes, 8.8/10.9/12.9/A2-70/A4-80. Backed by shared `data/fasteners.js`. Open items: Screw Torques doesn't yet read the `?size=&class=` hand-off link; DIN 7984 counterbore depths and M27/M30 ISO 4762 counterbore depths need checking against DIN 974-1; Torx button head is distributor data until ISO 7380-3 is reviewed; ISO 4162 only goes to M16 |
| Fastener comparison mode | ⚪ Concept | Side-by-side compare of 2–3 fasteners on the Fastener Library page (deferred at layout review) |
| Involute splines (DIN 5480) | ⚪ Concept | Sibling to keyways |
| Bearing fits | ⚪ Concept | Recommended shaft/housing tolerances by load case |
| BSP (P/T) thread calculator/dictionary | ⚪ Concept | BSPP/BSPT — select thread type then size (e.g. G 1/2") for pipe OD, TPI, pitch, major/pitch/minor dia, drill size. Starting reference: [machiningdoctor.com/charts/bsp](https://www.machiningdoctor.com/charts/bsp/#bspp-g-drawing-and-parameters) |
