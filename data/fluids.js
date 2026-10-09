// Machine Design Guides — shared fluid property library (liquids), temperature-dependent.
// Same shared-data exception as data/materials.js (see docs/00-structure-and-conventions.md): pages load it with
// <script src="../../data/fluids.js"> instead of holding their own fluid tables. Used by
// calculators/thermal/pipe-pressure-drop.html.
//
// Two property models:
//   "table"   — tabulated points. Density interpolated linearly, dynamic viscosity log-linearly (ln μ linear in T);
//               end segments are extrapolated. rho: [[T °C, kg/m³], ...], mu: [[T °C, cP], ...].
//   "walther" — oils. Kinematic viscosity from the ASTM D341 (Walther) relation
//               log10 log10(ν + 0.7) = A − B·log10(T [K]), fitted through the datasheet ν at 40 and 100 °C;
//               density ρ = ρ15 / (1 + β(T − 15)) with β = oil_beta_per_K.
// range_C is the span the data supports; outside it, values are extrapolated and pages should warn.
// Units: °C, kg/m³, cP (= mPa·s), mm²/s (= cSt).
// Don't hand-edit numbers without re-checking the cited source; add a new fluid as a new entry with its own refs.
window.MDG_FLUIDS = {
  "updated": "2026-10-07",
  "oil_beta_per_K": 0.0007,
  "oil_beta_ref": { "label": "Volumetric (Cubical) Expansion Coefficients", "url": "https://www.engineeringtoolbox.com/cubical-expansion-coefficients-d_1262.html", "domain": "engineeringtoolbox.com", "backs": "engine oil β = 0.00070 1/K" },
  "types": [
    { "slug": "aqueous", "title": "Water & glycol mixes" },
    { "slug": "oil", "title": "Oils" }
  ],
  "fluids": [
    {
      "id": "water", "type": "aqueous", "name": "Water", "model": "table", "range_C": [0, 100],
      "rho": [[0,999.85],[10,999.70],[20,998.21],[30,995.65],[40,992.22],[50,988.04],[60,983.20],[70,977.76],[80,971.79],[90,965.31],[100,958.35]],
      "mu":  [[0,1.79],[10,1.31],[20,1.00],[30,0.80],[40,0.65],[50,0.55],[60,0.47],[70,0.40],[80,0.35],[90,0.31],[100,0.28]],
      "refs": [
        { "label": "Water — Dynamic and Kinematic Viscosity", "url": "https://www.engineeringtoolbox.com/water-dynamic-kinematic-viscosity-d_596.html", "domain": "engineeringtoolbox.com", "backs": "viscosity 0–100 °C" },
        { "label": "Water — Density, Specific Weight", "url": "https://www.engineeringtoolbox.com/water-density-specific-weight-d_595.html", "domain": "engineeringtoolbox.com", "backs": "density 0–100 °C" }
      ]
    },
    {
      "id": "eg50", "type": "aqueous", "name": "Water / ethylene glycol 50/50", "model": "table", "range_C": [-17.8, 93.3],
      "rho": [[-35,1103],[-25,1100],[-14,1096],[-8,1093],[-4,1092],[0,1090],[20,1079],[40,1067],[60,1055],[80,1042],[100,1030]],
      "mu":  [[-17.8,22],[4.4,6.5],[26.7,2.8],[48.9,1.5],[71.1,0.95],[93.3,0.7]],
      "notes": "Viscosity at 50 % by volume; density at mass fraction 0.5 (≈ 52 % mass for 50 % vol, density difference ≈ 0.3 %).",
      "refs": [
        { "label": "Ethylene Glycol Heat-Transfer Fluid", "url": "https://www.engineeringtoolbox.com/ethylene-glycol-d_146.html", "domain": "engineeringtoolbox.com", "backs": "viscosity by vol %, density by mass fraction" }
      ]
    },
    {
      "id": "eg30", "type": "aqueous", "name": "Water / ethylene glycol 30/70", "model": "table", "range_C": [4.4, 93.3],
      "rho": [[-14,1058],[-8,1056],[-4,1055],[0,1054],[20,1046],[40,1037],[60,1027],[80,1017],[100,1007]],
      "mu":  [[4.4,3.5],[26.7,1.7],[48.9,1.0],[71.1,0.7],[93.3,0.5]],
      "notes": "Viscosity at 30 % by volume (source gives none below freezing at −17.8 °C); density at mass fraction 0.3.",
      "refs": [
        { "label": "Ethylene Glycol Heat-Transfer Fluid", "url": "https://www.engineeringtoolbox.com/ethylene-glycol-d_146.html", "domain": "engineeringtoolbox.com", "backs": "viscosity by vol %, density by mass fraction" }
      ]
    },
    {
      "id": "vg32", "type": "oil", "name": "Hydraulic oil ISO VG 32", "model": "walther", "range_C": [0, 120],
      "nu40": 32, "nu100": 5.4, "rho15": 875,
      "check": { "T": 0, "nu": 338 },
      "notes": "Shell Tellus S2 M 32 typical values. Walther fit gives 336 mm²/s at 0 °C vs datasheet 338.",
      "refs": [
        { "label": "Shell Tellus S2 M 32 TDS", "url": "https://perma-tec.com/_Resources/Lubricants/Shell/Shell_Tellus_S2_M_32_TDS_de.pdf", "domain": "perma-tec.com", "backs": "ν 0/40/100 °C, ρ15" }
      ]
    },
    {
      "id": "vg46", "type": "oil", "name": "Hydraulic oil ISO VG 46", "model": "walther", "range_C": [0, 120],
      "nu40": 46, "nu100": 6.8, "rho15": 879,
      "check": { "T": 0, "nu": 580 },
      "notes": "Shell Tellus S2 M 46 typical values. Walther fit gives 577 mm²/s at 0 °C vs datasheet 580.",
      "refs": [
        { "label": "Shell Tellus S2 M 46 TDS", "url": "https://pdf4pro.com/view/shell-tellus-s2-m-46-shell-livedocs-com-5751db.html", "domain": "pdf4pro.com", "backs": "ν 0/40/100 °C, ρ15" }
      ]
    },
    {
      "id": "atf", "type": "oil", "name": "ATF (Dexron VI type)", "model": "walther", "range_C": [20, 120],
      "nu40": 29.5, "nu100": 5.83, "rho15": 829,
      "notes": "Mobil DEXRON-VI ATF typical values. Multigrade (VI-improved), so the cold-end range is limited to 20 °C.",
      "refs": [
        { "label": "Mobil DEXRON-VI ATF", "url": "https://mobil.com/en-CA/Passenger-Vehicle-Lube/pds/io-ca-Mobil-DexronVI-ATF", "domain": "mobil.com", "backs": "ν 40/100 °C, ρ15" }
      ]
    },
    {
      "id": "gear-75w90", "type": "oil", "name": "Gear oil SAE 75W-90", "model": "walther", "range_C": [20, 120],
      "nu40": 101, "nu100": 16, "rho15": 880,
      "notes": "Mobilube HD 75W-90 typical values. Multigrade (VI 170), so the cold-end range is limited to 20 °C.",
      "refs": [
        { "label": "Mobilube HD 75W-90", "url": "https://www.mobil.com/en-gb/commercial-vehicle-lube/pds/eu-xx-mobilube-hd-75w-90", "domain": "mobil.com", "backs": "ν 40/100 °C, ρ15" }
      ]
    }
  ]
};

// Property lookup shared by every page that uses this library.
// Returns { rho: kg/m³, mu: cP, nu: mm²/s, inRange: bool } at temperature T (°C), or null for an unknown id.
window.MDG_FLUIDS.props = function (id, T) {
  var lib = window.MDG_FLUIDS;
  var f = lib.fluids.filter(function (x) { return x.id === id; })[0];
  if (!f) return null;
  function interp(tab, t, log) {
    var i = 0;
    if (t <= tab[0][0]) i = 0; else if (t >= tab[tab.length - 1][0]) i = tab.length - 2;
    else while (tab[i + 1][0] < t) i++;
    var a = tab[i], b = tab[i + 1], u = (t - a[0]) / (b[0] - a[0]);
    return log ? Math.exp(Math.log(a[1]) + u * (Math.log(b[1]) - Math.log(a[1]))) : a[1] + u * (b[1] - a[1]);
  }
  var rho, mu, nu;
  if (f.model === 'walther') {
    var T1 = 313.15, T2 = 373.15;
    var y1 = Math.log10(Math.log10(f.nu40 + 0.7)), y2 = Math.log10(Math.log10(f.nu100 + 0.7));
    var B = (y1 - y2) / (Math.log10(T2) - Math.log10(T1)), A = y1 + B * Math.log10(T1);
    nu = Math.pow(10, Math.pow(10, A - B * Math.log10(T + 273.15))) - 0.7;
    rho = f.rho15 / (1 + lib.oil_beta_per_K * (T - 15));
    mu = nu * rho / 1000;
  } else {
    rho = interp(f.rho, T, false);
    mu = interp(f.mu, T, true);
    nu = mu / rho * 1000;
  }
  return { rho: rho, mu: mu, nu: nu, inRange: T >= f.range_C[0] && T <= f.range_C[1] };
};
