// Machine Design Guides — shared material property library, source of truth for any calculator
// that needs material properties (interference-fit force estimates, thermal-fit sizing, structural
// checks, creepage/clearance material-group lookups, ...). Plain JS (not .json), loaded via
// <script src="../../data/materials.js"> from a page that needs it — same reasoning as
// data/manifest.js: a <script src> tag isn't subject to the same-origin/CORS block that fetch()
// hits under file://, so this still works by double-clicking index.html or any calculator page
// straight off the filesystem. See docs/00-structure-and-conventions.md ("Shared material library")
// for the convention this file follows and how a page should consume it.
//
// Arranged MMPDS-style: material type (class) -> grade/condition. This is a small starting set, not
// a reproduction of MMPDS itself (MMPDS is a paywalled, statistically-derived allowables handbook —
// see the citation on the material-library page). Every numeric value here traces to a real
// datasheet, cited per-grade in `refs`; values that are typical/generic engineering constants rather
// than grade-specific test data are marked `"typical": true` in that property's citation.
//
// `conductivity_pct_IACS` (present on the copper/aluminium conductor grades) is what the Busbar
// Sizing calculator uses to pick which grades count as "conductor grade" — it filters the material
// select to grades that have this field rather than hard-coding a grade-id list, so a future grade
// added here with a conductivity value is picked up automatically. `specific_heat_J_per_kgK` is
// present on those same conductor grades and is what that calculator's transient-overload check
// uses for the adiabatic heating calculation — like conductivity, it's simply omitted on grades
// nothing here needs it for.
//
// The `insulating-materials` type is a different kind of entry: dielectrics (polymers, laminates,
// ceramics) used for creepage/clearance insulation design, not load-bearing structure. They carry
// `cti_V` / `cti_range` (Comparative Tracking Index, IEC 60112) and `cti_group` (the IEC 60664-1
// material group — I/II/IIIa/IIIb — that CTI falls into) instead of the mechanical properties above;
// the mechanical fields are simply omitted on these grades. The Creepage & Clearance calculator's
// substrate-material lookup filters this library to grades with `cti_group` set, rather than
// hard-coding its own material list, the same way the Busbar calculator filters on
// `conductivity_pct_IACS`.
window.MDG_MATERIALS = {
  "types": [
    { "slug": "steel-carbon-alloy", "title": "Steel (Carbon & Alloy)" },
    { "slug": "stainless-steel", "title": "Stainless Steel" },
    { "slug": "aluminum", "title": "Aluminum Alloys" },
    { "slug": "titanium", "title": "Titanium Alloys" },
    { "slug": "copper-alloy", "title": "Copper Alloys" },
    { "slug": "insulating-materials", "title": "Insulating Materials (CTI)" }
  ],
  "grades": [
    {
      "id": "steel-1045-cd",
      "type": "steel-carbon-alloy",
      "grade": "AISI 1045",
      "condition": "Cold drawn",
      "designation": "UNS G10450",
      "density_kg_m3": 7850,
      "E_GPa": 205,
      "G_GPa": 80,
      "poisson": 0.29,
      "yield_MPa": 530,
      "ultimate_MPa": 625,
      "cte_um_per_mK": 13.4,
      "k_W_per_mK": 50.8,
      "melting_C": [1420, 1460],
      "notes": "Elastic constants (E, G, ν) are typical carbon-steel values, not measured for this specific grade/condition — they vary little (a few percent) across plain carbon and low-alloy steel grades and tempers.",
      "refs": [
        { "label": "theworldmaterial.com — AISI 1045 mechanical/thermal properties", "url": "https://www.theworldmaterial.com/astm-sae-aisi-1045-carbon-steel-material/" },
        { "label": "Engineering ToolBox — typical elastic modulus/Poisson's ratio for carbon steel", "url": "https://www.engineeringtoolbox.com/young-modulus-d_417.html", "typical": true }
      ]
    },
    {
      "id": "steel-4130-norm",
      "type": "steel-carbon-alloy",
      "grade": "AISI 4130",
      "condition": "Normalized at 870°C",
      "designation": "UNS G41300",
      "density_kg_m3": 7850,
      "E_GPa": 205,
      "G_GPa": 80,
      "poisson": 0.29,
      "yield_MPa": 435,
      "ultimate_MPa": 670,
      "cte_um_per_mK": 12.2,
      "k_W_per_mK": 42.7,
      "melting_C": [1420, 1460],
      "notes": "CTE and melting range are typical low-alloy-steel values (not given on the source datasheet for this specific grade).",
      "refs": [
        { "label": "ASM Material Data Sheet (via quickparts.com) — AISI 4130 Steel, normalized 870°C", "url": "https://quickparts.com/wp-content/uploads/2024/05/Steel-4130.pdf" }
      ]
    },
    {
      "id": "steel-4340-norm",
      "type": "steel-carbon-alloy",
      "grade": "AISI 4340",
      "condition": "Normalized, 25mm round",
      "designation": "UNS G43400",
      "density_kg_m3": 7850,
      "E_GPa": 200,
      "G_GPa": 78,
      "poisson": 0.29,
      "yield_MPa": 862,
      "ultimate_MPa": 1282,
      "cte_um_per_mK": 12.3,
      "k_W_per_mK": 44.5,
      "melting_C": [1420, 1460],
      "notes": "This is the normalized condition — 4340 is commonly used oil-quenched and tempered to much higher strength (Ftu approaching 1900 MPa); pick a condition to match the actual heat treatment on the drawing.",
      "refs": [
        { "label": "ASM Material Data Sheet (via quickparts.com) — AISI 4340 Steel, normalized, 25mm round", "url": "https://quickparts.com/wp-content/uploads/2024/05/Steel-4340.pdf" }
      ]
    },
    {
      "id": "ss-304-ann",
      "type": "stainless-steel",
      "grade": "AISI 304",
      "condition": "Annealed",
      "designation": "UNS S30400",
      "density_kg_m3": 8000,
      "E_GPa": 193,
      "G_GPa": 86,
      "poisson": 0.29,
      "yield_MPa": 215,
      "ultimate_MPa": 505,
      "cte_um_per_mK": 17.3,
      "k_W_per_mK": 16.2,
      "melting_C": [1400, 1455],
      "notes": "",
      "refs": [
        { "label": "ASM Material Data Sheet (via matweb.com) — AISI Type 304 Stainless Steel", "url": "https://asm.matweb.com/search/SpecificMaterial.asp?bassnum=mq304a" }
      ]
    },
    {
      "id": "ss-17-4ph-h900",
      "type": "stainless-steel",
      "grade": "17-4PH",
      "condition": "H900 (aged 482°C/1hr)",
      "designation": "UNS S17400",
      "density_kg_m3": 7750,
      "E_GPa": 196,
      "G_GPa": 77,
      "poisson": 0.27,
      "yield_MPa": 1170,
      "ultimate_MPa": 1310,
      "cte_um_per_mK": 11.3,
      "k_W_per_mK": 18.3,
      "melting_C": [1404, 1440],
      "notes": "Strength falls off above ~315°C service — don't use H900 room-temperature allowables for a hot application. Shear modulus and Poisson's ratio are typical precipitation-hardening-stainless values, not measured for this grade.",
      "refs": [
        { "label": "Sandmeyer Steel — 17-4PH (UNS S17400) spec sheet", "url": "https://www.sandmeyersteel.com/wp-content/uploads/17-4PH-Spec-Sheet.pdf" },
        { "label": "Nifty Alloys — 17-4PH properties overview (H900 yield/UTS cross-check)", "url": "https://niftyalloys.com/blogs/17-4ph" }
      ]
    },
    {
      "id": "ti-6al-4v-ann",
      "type": "titanium",
      "grade": "Ti-6Al-4V",
      "condition": "Annealed",
      "designation": "UNS R56400 / Grade 5",
      "density_kg_m3": 4430,
      "E_GPa": 113.8,
      "G_GPa": 44,
      "poisson": 0.342,
      "yield_MPa": 880,
      "ultimate_MPa": 950,
      "cte_um_per_mK": 8.6,
      "k_W_per_mK": 6.7,
      "melting_C": [1604, 1660],
      "notes": "Beta-transus temperature (~980°C) is a more meaningful practical upper limit than the melting range for anything mechanical.",
      "refs": [
        { "label": "ASM Material Data Sheet (via matweb.com) — Titanium Ti-6Al-4V, annealed", "url": "https://asm.matweb.com/search/specificmaterial.asp?bassnum=mtp641" }
      ]
    },
    {
      "id": "al-6061-t6",
      "type": "aluminum",
      "grade": "6061",
      "condition": "T6",
      "designation": "UNS A96061",
      "density_kg_m3": 2700,
      "E_GPa": 68.9,
      "G_GPa": 26.0,
      "poisson": 0.33,
      "yield_MPa": 276,
      "ultimate_MPa": 310,
      "cte_um_per_mK": 23.6,
      "k_W_per_mK": 167,
      "melting_C": [582, 652],
      "notes": "",
      "refs": [
        { "label": "ASM Material Data Sheet (via matweb.com) — Aluminum 6061-T6; 6061-T651", "url": "https://www.matweb.com/search/DataSheet.aspx?MatGUID=b8d536e0b9b54bd7b69e4124d8f1d20a" }
      ]
    },
    {
      "id": "al-7075-t6",
      "type": "aluminum",
      "grade": "7075",
      "condition": "T6",
      "designation": "UNS A97075",
      "density_kg_m3": 2810,
      "E_GPa": 71.7,
      "G_GPa": 26.9,
      "poisson": 0.33,
      "yield_MPa": 503,
      "ultimate_MPa": 572,
      "cte_um_per_mK": 23.6,
      "k_W_per_mK": 130,
      "melting_C": [477, 635],
      "notes": "",
      "refs": [
        { "label": "ASM Material Data Sheet (via matweb.com) — Aluminum 7075-T6", "url": "https://asm.matweb.com/search/specificmaterial.asp?bassnum=ma7075t6" }
      ]
    },
    {
      "id": "al-2024-t3",
      "type": "aluminum",
      "grade": "2024",
      "condition": "T3",
      "designation": "UNS A92024",
      "density_kg_m3": 2780,
      "E_GPa": 73.1,
      "G_GPa": 28.0,
      "poisson": 0.33,
      "yield_MPa": 345,
      "ultimate_MPa": 483,
      "cte_um_per_mK": 23.2,
      "k_W_per_mK": 121,
      "melting_C": [502, 638],
      "notes": "",
      "refs": [
        { "label": "ASM Material Data Sheet (via aerospacemetals.com) — Aluminum 2024-T3", "url": "https://www.aerospacemetals.com/wp-content/uploads/2023/06/Aluminum-2024-T3.pdf" }
      ]
    },
    {
      "id": "al-1350-h19",
      "type": "aluminum",
      "grade": "1350",
      "condition": "H19 (hard drawn)",
      "designation": "UNS A91350 / EC grade",
      "density_kg_m3": 2705,
      "E_GPa": 68.9,
      "G_GPa": 26.0,
      "poisson": 0.33,
      "yield_MPa": 165,
      "ultimate_MPa": 186,
      "cte_um_per_mK": 23.5,
      "k_W_per_mK": 230,
      "melting_C": [646, 657],
      "conductivity_pct_IACS": 61,
      "specific_heat_J_per_kgK": 900,
      "notes": "1350 (\"EC grade\", 99.5%+ pure) is the standard electrical-conductor aluminium alloy — H19 (hard-drawn) is the common busbar/wire temper; the softer O temper reaches slightly higher conductivity (61.8% IACS) at much lower strength (~28 MPa yield). Shear modulus, Poisson's ratio, CTE, thermal conductivity and specific heat are typical aluminium values, not measured for this specific temper.",
      "refs": [
        { "label": "1350 Aluminium Alloy datasheet (wire/conductor grade) — density, elastic modulus, conductivity, melting range, tensile strength by temper", "url": "https://static1.squarespace.com/static/63741929ecb4563d4b2ef274/t/6418df7bb4c39c620a623dfc/1679351686032/TDS-+Aluminium+Wire+-1350-alloy" },
        { "label": "HSH Aluminium — 1350 vs 6101 Aluminum for Electrical Conductors (H19 yield/UTS/conductivity cross-check)", "url": "https://www.hshaluc.com/1350-vs-6101-aluminum-for-electrical-conductors.html" },
        { "label": "Wikipedia — 1350 aluminium alloy (typical thermal conductivity)", "url": "https://en.wikipedia.org/wiki/1350_aluminium_alloy", "typical": true },
        { "label": "Aluminum-Busbar.com — 6101 Aluminum Properties (typical aluminium specific heat, cross-referenced from the sibling 6101 grade below)", "url": "https://www.aluminum-busbar.com/blog/6101-aluminum-properties/", "typical": true }
      ]
    },
    {
      "id": "al-6101-t6",
      "type": "aluminum",
      "grade": "6101",
      "condition": "T6",
      "designation": "UNS A96101",
      "density_kg_m3": 2700,
      "E_GPa": 68,
      "G_GPa": 26.0,
      "poisson": 0.33,
      "yield_MPa": 170,
      "ultimate_MPa": 200,
      "cte_um_per_mK": 23.4,
      "k_W_per_mK": 218,
      "melting_C": [620, 655],
      "conductivity_pct_IACS": 55,
      "specific_heat_J_per_kgK": 920,
      "notes": "6101 is the standard heat-treatable busbar/bus-pipe aluminium alloy — T6 trades some conductivity for higher strength than 1350; T61 reaches 57% IACS at lower strength (~100 MPa yield). Reported T6 yield/UTS varies by source and section size (up to ~193 MPa yield elsewhere) — treat as typical and verify against the specific extrusion's mill cert. Shear modulus and Poisson's ratio are typical aluminium values, not measured for this grade.",
      "refs": [
        { "label": "Aluminum-Busbar.com — 6101 Aluminum Properties (T6/T61)", "url": "https://www.aluminum-busbar.com/blog/6101-aluminum-properties/" },
        { "label": "HSH Aluminium — 1350 vs 6101 Aluminum for Electrical Conductors (T6 yield/UTS cross-check)", "url": "https://www.hshaluc.com/1350-vs-6101-aluminum-for-electrical-conductors.html" }
      ]
    },
    {
      "id": "cu-c101-etp",
      "type": "copper-alloy",
      "grade": "C101 (ETP copper)",
      "condition": "As supplied (properties independent of temper except strength)",
      "designation": "BS EN 1978 C101 / CW004A — equivalent to UNS C11000 (ETP copper)",
      "density_kg_m3": 8940,
      "E_GPa": 118,
      "G_GPa": 44,
      "poisson": 0.355,
      "yield_MPa": 69,
      "ultimate_MPa": 220,
      "cte_um_per_mK": 17.3,
      "k_W_per_mK": 393,
      "melting_C": [1083, 1083],
      "conductivity_pct_IACS": 100,
      "specific_heat_J_per_kgK": 385,
      "notes": "C101/CW004A is the UK/BS designation for electrolytic tough pitch (ETP) copper — materially the same alloy as UNS C11000 already in this library (see that entry), added here under its UK designation as the default busbar-calculator grade since Equipmake drawings commonly reference C101. Yield/UTS reused from the C11000 soft/annealed entry since the C101 datasheet used here doesn't break out mechanical properties by temper; shear modulus and Poisson's ratio are typical copper values.",
      "refs": [
        { "label": "Metelec — Data Sheet ETP Copper C101/CW004A (density, elastic modulus, conductivity, resistivity, thermal conductivity, specific heat, CTE, melting point)", "url": "https://www.metelec.com/wp-content/uploads/2023/05/Metelec_Data_Sheet_C101_CW004A_1.pdf" },
        { "label": "Copper Development Association — Alloy C11000 (soft/annealed yield/UTS cross-reference)", "url": "https://alloys.copper.org/alloy/C11000" }
      ]
    },
    {
      "id": "cu-c11000-soft",
      "type": "copper-alloy",
      "grade": "C11000 (ETP copper)",
      "condition": "Soft/annealed",
      "designation": "UNS C11000",
      "density_kg_m3": 8910,
      "E_GPa": 117,
      "G_GPa": 44,
      "poisson": 0.355,
      "yield_MPa": 69,
      "ultimate_MPa": 220,
      "cte_um_per_mK": 17.6,
      "k_W_per_mK": 391,
      "melting_C": [1065, 1083],
      "conductivity_pct_IACS": 101,
      "specific_heat_J_per_kgK": 385,
      "notes": "Yield/UTS are for the soft (annealed) temper — the condition relevant to flexible cable conductors; C11000 is also supplied hard-drawn at 2-3x this strength. Poisson's ratio is a typical copper value, not measured for this grade. Specific heat is cross-referenced from the C101/CW004A entry above (the same base metal under its UK designation).",
      "refs": [
        { "label": "Copper Development Association — Alloy C11000 (mechanical/physical/electrical properties)", "url": "https://alloys.copper.org/alloy/C11000" },
        { "label": "Metelec — Data Sheet ETP Copper C101/CW004A (specific heat, same base metal)", "url": "https://www.metelec.com/wp-content/uploads/2023/05/Metelec_Data_Sheet_C101_CW004A_1.pdf", "typical": true }
      ]
    },
    {
      "id": "cu-c36000-h02",
      "type": "copper-alloy",
      "grade": "C36000 (free-cutting brass)",
      "condition": "H02 (half-hard)",
      "designation": "UNS C36000",
      "density_kg_m3": 8200,
      "E_GPa": 100,
      "G_GPa": 39,
      "poisson": 0.31,
      "yield_MPa": 290,
      "ultimate_MPa": 448,
      "cte_um_per_mK": 20.5,
      "k_W_per_mK": 120,
      "melting_C": [890, 900],
      "notes": "Yield/UTS (typical, half-hard rod <0.5in) from the Copper Development Association; physical properties (density, elastic constants, conductivity, melting range) from MakeItFrom's H02 C36000 datasheet since CDA's page doesn't list them.",
      "refs": [
        { "label": "Copper Development Association — C36000 free-cutting brass for automatic screw machine products", "url": "https://www.copper.org/applications/rodbar/alloy360/free_cutting.html" },
        { "label": "MakeItFrom.com — Half-Hard (H02) C36000 Brass", "url": "https://www.makeitfrom.com/material-properties/Half-Hard-H02-C36000-Brass" }
      ]
    },
    {
      "id": "ins-ptfe",
      "type": "insulating-materials",
      "grade": "PTFE (Teflon)",
      "condition": "Typical, unfilled",
      "designation": "Fluoropolymer",
      "cti_V": 600,
      "cti_range": "≥600",
      "cti_group": "I",
      "notes": "",
      "refs": [
        { "label": "cmc.de — CTI (Kriechstromfestigkeit) by polymer family", "url": "https://www.cmc.de/en/cti-kriechstromfestigkeit" }
      ]
    },
    {
      "id": "ins-pfa-fep",
      "type": "insulating-materials",
      "grade": "PFA / FEP",
      "condition": "Typical, unfilled",
      "designation": "Fluoropolymer",
      "cti_V": 600,
      "cti_range": "≥600",
      "cti_group": "I",
      "notes": "",
      "refs": [
        { "label": "cmc.de — CTI (Kriechstromfestigkeit) by polymer family", "url": "https://www.cmc.de/en/cti-kriechstromfestigkeit" }
      ]
    },
    {
      "id": "ins-pe",
      "type": "insulating-materials",
      "grade": "Polyethylene (PE)",
      "condition": "Typical, unfilled",
      "designation": "Polyolefin",
      "cti_V": 600,
      "cti_range": "≥600",
      "cti_group": "I",
      "notes": "",
      "refs": [
        { "label": "cmc.de — CTI (Kriechstromfestigkeit) by polymer family", "url": "https://www.cmc.de/en/cti-kriechstromfestigkeit" },
        { "label": "Mueller Ahlhorn — Comparative Tracking Index (CTI), typical values by material", "url": "https://www.mueller-ahlhorn.com/en/comparative-tracking-index-cti/" }
      ]
    },
    {
      "id": "ins-pa-unfilled",
      "type": "insulating-materials",
      "grade": "Unfilled polyamide / nylon (PA6, PA66)",
      "condition": "Typical, unfilled",
      "designation": "Polyamide",
      "cti_V": 600,
      "cti_range": "≥600",
      "cti_group": "I",
      "notes": "Glass-filled and flame-retardant nylon grades drop well below this — see the general filler caveat above.",
      "refs": [
        { "label": "cmc.de — CTI (Kriechstromfestigkeit) by polymer family", "url": "https://www.cmc.de/en/cti-kriechstromfestigkeit" }
      ]
    },
    {
      "id": "ins-silicone",
      "type": "insulating-materials",
      "grade": "Silicone rubber",
      "condition": "Typical",
      "designation": "Elastomer",
      "cti_V": 600,
      "cti_range": "≥600",
      "cti_group": "I",
      "notes": "General engineering figure — not read from either cited datasheet table directly; verify against the specific compound's own CTI test data.",
      "refs": [
        { "label": "cmc.de — CTI (Kriechstromfestigkeit) by polymer family", "url": "https://www.cmc.de/en/cti-kriechstromfestigkeit", "typical": true }
      ]
    },
    {
      "id": "ins-glass",
      "type": "insulating-materials",
      "grade": "Glass",
      "condition": "Typical",
      "designation": "Inorganic",
      "cti_V": 600,
      "cti_range": "≥600",
      "cti_group": "I",
      "notes": "General engineering figure for inorganic glass — not read from either cited datasheet table directly; verify against the specific glass's own CTI test data.",
      "refs": [
        { "label": "cmc.de — CTI (Kriechstromfestigkeit) by polymer family", "url": "https://www.cmc.de/en/cti-kriechstromfestigkeit", "typical": true }
      ]
    },
    {
      "id": "ins-ceramic",
      "type": "insulating-materials",
      "grade": "Ceramic (alumina, steatite)",
      "condition": "Typical",
      "designation": "Inorganic",
      "cti_V": 600,
      "cti_range": "≥600",
      "cti_group": "I",
      "notes": "General engineering figure for technical ceramics — not read from either cited datasheet table directly; verify against the specific ceramic's own CTI test data.",
      "refs": [
        { "label": "cmc.de — CTI (Kriechstromfestigkeit) by polymer family", "url": "https://www.cmc.de/en/cti-kriechstromfestigkeit", "typical": true }
      ]
    },
    {
      "id": "ins-pet",
      "type": "insulating-materials",
      "grade": "Polyester (PET)",
      "condition": "Typical, unfilled",
      "designation": "Thermoplastic polyester",
      "cti_V": 500,
      "cti_range": "400–599",
      "cti_group": "II",
      "notes": "",
      "refs": [
        { "label": "cmc.de — CTI (Kriechstromfestigkeit) by polymer family", "url": "https://www.cmc.de/en/cti-kriechstromfestigkeit" }
      ]
    },
    {
      "id": "ins-pbt-unfilled",
      "type": "insulating-materials",
      "grade": "Unfilled PBT",
      "condition": "Typical, unfilled",
      "designation": "Thermoplastic polyester",
      "cti_V": 500,
      "cti_range": "400–599",
      "cti_group": "II",
      "notes": "Glass-filled and flame-retardant PBT grades (the common connector-housing material) drop well below this, often into Group IIIa/IIIb — check the specific grade's datasheet rather than assuming unfilled PBT.",
      "refs": [
        { "label": "Mueller Ahlhorn — Comparative Tracking Index (CTI), typical values by material", "url": "https://www.mueller-ahlhorn.com/en/comparative-tracking-index-cti/" }
      ]
    },
    {
      "id": "ins-fr4-high-cti",
      "type": "insulating-materials",
      "grade": "High-CTI FR-4 laminate",
      "condition": "Typical, high-CTI grade",
      "designation": "Glass-epoxy laminate",
      "cti_V": 500,
      "cti_range": "400–599",
      "cti_group": "II",
      "notes": "A special high-CTI resin system, not standard FR-4 (see that separate entry below) — confirm the laminate's actual CTI on its own datasheet before relying on this.",
      "refs": [
        { "label": "JLCPCB — Choosing the Right CTI Value for Safer High-Voltage PCBs", "url": "https://jlcpcb.com/blog/cti-value-high-voltage-pcb" }
      ]
    },
    {
      "id": "ins-fr4-standard",
      "type": "insulating-materials",
      "grade": "Standard FR-4 glass-epoxy laminate",
      "condition": "Typical, standard grade",
      "designation": "Glass-epoxy laminate",
      "cti_V": 200,
      "cti_range": "175–399",
      "cti_group": "IIIa",
      "notes": "Most standard FR-4 sits around CTI 175, at the bottom of this group — not adequate for a mains-voltage, Pollution-Degree-3 PCB design without checking the laminate's actual CTI.",
      "refs": [
        { "label": "JLCPCB — Choosing the Right CTI Value for Safer High-Voltage PCBs", "url": "https://jlcpcb.com/blog/cti-value-high-voltage-pcb" },
        { "label": "Mueller Ahlhorn — Comparative Tracking Index (CTI), typical values by material", "url": "https://www.mueller-ahlhorn.com/en/comparative-tracking-index-cti/" }
      ]
    },
    {
      "id": "ins-pc",
      "type": "insulating-materials",
      "grade": "Polycarbonate (PC)",
      "condition": "Typical, unfilled",
      "designation": "Thermoplastic",
      "cti_V": 200,
      "cti_range": "175–250",
      "cti_group": "IIIa",
      "notes": "",
      "refs": [
        { "label": "Battery Design — Comparative Tracking Index", "url": "https://www.batterydesign.net/comparative-tracking-index/" }
      ]
    },
    {
      "id": "ins-pps",
      "type": "insulating-materials",
      "grade": "PPS (polyphenylene sulfide)",
      "condition": "Typical, unfilled",
      "designation": "High-performance thermoplastic",
      "cti_V": 200,
      "cti_range": "175–249",
      "cti_group": "IIIa",
      "notes": "",
      "refs": [
        { "label": "cmc.de — CTI (Kriechstromfestigkeit) by polymer family", "url": "https://www.cmc.de/en/cti-kriechstromfestigkeit" }
      ]
    },
    {
      "id": "ins-pen",
      "type": "insulating-materials",
      "grade": "PEN (polyethylene naphthalate)",
      "condition": "Typical, unfilled",
      "designation": "Thermoplastic polyester film",
      "cti_V": 200,
      "cti_range": "175–249",
      "cti_group": "IIIa",
      "notes": "",
      "refs": [
        { "label": "cmc.de — CTI (Kriechstromfestigkeit) by polymer family", "url": "https://www.cmc.de/en/cti-kriechstromfestigkeit" }
      ]
    },
    {
      "id": "ins-phenolic",
      "type": "insulating-materials",
      "grade": "Phenolic resin (paper-phenolic)",
      "condition": "Typical",
      "designation": "Thermoset",
      "cti_V": 125,
      "cti_range": "100–174",
      "cti_group": "IIIb",
      "notes": "",
      "refs": [
        { "label": "Mueller Ahlhorn — Comparative Tracking Index (CTI), typical values by material", "url": "https://www.mueller-ahlhorn.com/en/comparative-tracking-index-cti/" }
      ]
    },
    {
      "id": "ins-polyimide-film",
      "type": "insulating-materials",
      "grade": "Polyimide film (Kapton)",
      "condition": "Typical",
      "designation": "High-temperature polymer film",
      "cti_V": 150,
      "cti_range": "100–174",
      "cti_group": "IIIb",
      "notes": "",
      "refs": [
        { "label": "Mueller Ahlhorn — Comparative Tracking Index (CTI), typical values by material", "url": "https://www.mueller-ahlhorn.com/en/comparative-tracking-index-cti/" }
      ]
    },
    {
      "id": "ins-peek",
      "type": "insulating-materials",
      "grade": "PEEK",
      "condition": "Typical, unfilled",
      "designation": "High-performance thermoplastic",
      "cti_V": 140,
      "cti_range": "100–174",
      "cti_group": "IIIb",
      "notes": "",
      "refs": [
        { "label": "cmc.de — CTI (Kriechstromfestigkeit) by polymer family", "url": "https://www.cmc.de/en/cti-kriechstromfestigkeit" }
      ]
    },
    {
      "id": "ins-pei",
      "type": "insulating-materials",
      "grade": "PEI (polyetherimide, e.g. Ultem)",
      "condition": "Typical, unfilled",
      "designation": "High-performance thermoplastic",
      "cti_V": 140,
      "cti_range": "100–174",
      "cti_group": "IIIb",
      "notes": "",
      "refs": [
        { "label": "cmc.de — CTI (Kriechstromfestigkeit) by polymer family", "url": "https://www.cmc.de/en/cti-kriechstromfestigkeit" }
      ]
    },
    {
      "id": "ins-psu",
      "type": "insulating-materials",
      "grade": "PSU (polysulfone)",
      "condition": "Typical, unfilled",
      "designation": "High-performance thermoplastic",
      "cti_V": 140,
      "cti_range": "100–174",
      "cti_group": "IIIb",
      "notes": "",
      "refs": [
        { "label": "cmc.de — CTI (Kriechstromfestigkeit) by polymer family", "url": "https://www.cmc.de/en/cti-kriechstromfestigkeit" }
      ]
    }
  ]
};
