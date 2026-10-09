// Machine Design Guides — registry of every calculator/page, source of truth for the hub's nav.
// Plain JS (not .json) loaded via a <script> tag rather than fetch(), specifically so index.html
// works by double-clicking it (file://) with no local server — <script src> isn't subject to the
// same-origin/CORS block that fetch() hits under file://. Edit this file to add/update a page.
//
// Keep each page's "description" to about 3 lines on a homepage card (~110-140 characters) — it's
// meant to be a short summary, fully visible, not the page's full feature list. Longer detail belongs
// on the page itself.
window.MDG_MANIFEST = {
  "updated": "2026-10-07",
  "categories": [
    {
      "slug": "fits",
      "title": "Fits",
      "color": "#3b6ea5"
    },
    {
      "slug": "fasteners",
      "title": "Fasteners",
      "color": "#a5623b"
    },
    {
      "slug": "seals",
      "title": "Seals",
      "color": "#3ba573"
    },
    {
      "slug": "electrical",
      "title": "Electrical",
      "color": "#a53b8f"
    },
    {
      "slug": "materials",
      "title": "Materials",
      "color": "#5b5b5b"
    },
    {
      "slug": "components",
      "title": "Components",
      "color": "#7a6a2e"
    },
    {
      "slug": "thermal",
      "title": "Thermal & Fluids",
      "color": "#2b8799"
    }
  ],
  "pages": [
    {
      "id": "material-library",
      "title": "Material Library",
      "category": "materials",
      "path": "calculators/materials/material-library.html",
      "standard": "MMPDS-style (not MMPDS data)",
      "description": "Density, modulus, strength, CTE and thermal conductivity by material type and grade — the shared library other calculators pull from.",
      "tags": [
        "materials",
        "MMPDS",
        "properties",
        "density",
        "elastic modulus",
        "yield strength",
        "CTE",
        "thermal conductivity",
        "steel",
        "aluminum",
        "titanium",
        "copper"
      ],
      "status": "done",
      "rev": 2
    },
    {
      "id": "o-ring-sizing",
      "title": "O-Ring Design",
      "category": "seals",
      "path": "calculators/seals/o-ring-sizing.html",
      "standard": "Metric",
      "description": "Material and cross-section selection, Parker-style groove/gland design for four seal types, and thermal-fit sizing.",
      "tags": [
        "o-ring",
        "seal",
        "metric",
        "groove",
        "gland",
        "elastomer",
        "working fluid",
        "thermal expansion",
        "CTE",
        "cost"
      ],
      "status": "done",
      "rev": 6
    },
    {
      "id": "hole-basis-fits",
      "title": "Fits (Hole Basis)",
      "category": "fits",
      "path": "calculators/fits-tolerances/hole-basis-fits.html",
      "standard": "ISO 286",
      "description": "Hole-basis fit classes and limit dimensions, plus an interference-fit assembly/press-off force estimate.",
      "tags": [
        "fit",
        "tolerance",
        "ISO 286",
        "limits",
        "clearance",
        "interference",
        "press fit",
        "force estimate"
      ],
      "status": "done",
      "rev": 3
    },
    {
      "id": "creepage-clearance",
      "title": "Creepage & Clearance",
      "category": "electrical",
      "path": "calculators/electrical-clearance/creepage-clearance.html",
      "standard": "IEC 60664-1",
      "description": "Minimum clearance and creepage distance for equipment insulation, with altitude and pollution-degree correction.",
      "tags": [
        "creepage",
        "clearance",
        "IEC 60664",
        "insulation",
        "pollution degree",
        "CTI",
        "overvoltage category",
        "altitude correction",
        "substrate material"
      ],
      "status": "done",
      "rev": 2
    },
    {
      "id": "keyways",
      "title": "Keyways & Keys",
      "category": "fits",
      "path": "calculators/shaft-connections/keyways.html",
      "standard": "DIN 6885-1 / ISO/R 773",
      "description": "Parallel key and keyway sizing by shaft diameter, plus a torque-capacity check for minimum key length.",
      "tags": [
        "keyway",
        "key",
        "shaft",
        "DIN 6885",
        "ISO 773",
        "spline",
        "torque capacity",
        "shear stress",
        "bearing stress",
        "factor of safety"
      ],
      "status": "done",
      "rev": 4
    },
    {
      "id": "screw-torque",
      "title": "Screw Torques",
      "category": "fasteners",
      "path": "calculators/fasteners/screw-torque.html",
      "standard": "ISO 898-1 / ISO 3506-1 / NASA/TM-2017-219475 / PEM data",
      "description": "Tightening torque for bolted, PEM clinch-nut and tapped-hole joints, from proof stress, PEM tables or thread pullout.",
      "tags": [
        "screw",
        "bolt",
        "torque",
        "preload",
        "ISO 898",
        "ISO 3506",
        "nyloc",
        "rivnut",
        "self-clinching nut",
        "PEM",
        "clinch nut",
        "pullout",
        "thread stripping",
        "NASA",
        "fine pitch"
      ],
      "status": "done",
      "rev": 7
    },
    {
      "id": "fastener-library",
      "title": "Fastener Library",
      "category": "fasteners",
      "path": "calculators/fasteners/fastener-library.html",
      "standard": "ISO 898-1 / ISO 3506-1 / ISO 4762 / ISO 7380-1 / ISO 10642 / ISO 10664",
      "description": "Metric screw reference, M3–M30: head/drive dimensions, thread geometry, tap drills, clearance holes and strengths.",
      "tags": [
        "fastener",
        "screw",
        "bolt",
        "socket head cap screw",
        "button head",
        "countersunk",
        "low head",
        "hex head",
        "flange bolt",
        "Torx",
        "hexalobular",
        "hex key",
        "property class",
        "ISO 898",
        "ISO 3506",
        "ISO 4762",
        "ISO 7380",
        "ISO 10642",
        "DIN 7984",
        "ISO 4017",
        "ISO 4162",
        "ISO 10664",
        "clearance hole",
        "counterbore",
        "countersink",
        "tap drill",
        "fine pitch"
      ],
      "status": "done",
      "rev": 5
    },
    {
      "id": "din76-thread-undercuts",
      "title": "Thread Undercuts (DIN 76)",
      "category": "fasteners",
      "path": "calculators/fasteners/din76-thread-undercuts.html",
      "standard": "DIN 76-1",
      "description": "Thread run-out/undercut reference: pick a size, pitch and relief form for a diagram and standard dimensions.",
      "tags": [
        "DIN 76",
        "thread undercut",
        "thread relief",
        "thread run-out",
        "groove",
        "neck",
        "shaft end",
        "tapped hole"
      ],
      "status": "done",
      "rev": 3
    },
    {
      "id": "hv-cable-sizing",
      "title": "HV Cable Sizing",
      "category": "electrical",
      "path": "calculators/cabling/hv-cable-sizing.html",
      "standard": "IEC 60287-style (internal method)",
      "description": "Screened HV cable current rating with ambient, skin-effect and grouping derating, plus transient overload, conductor life and dimensions.",
      "tags": [
        "HV cable",
        "current rating",
        "ampacity",
        "derating",
        "IEC 60287",
        "traction",
        "skin effect",
        "conductor life",
        "Coroflex",
        "Radox",
        "transient overload",
        "short-circuit",
        "adiabatic",
        "IEC 60949"
      ],
      "status": "done",
      "rev": 5
    },
    {
      "id": "busbar-sizing",
      "title": "Busbar Sizing",
      "category": "electrical",
      "path": "calculators/busbars/busbar-sizing.html",
      "standard": "IEC 60943 / IEC 61439-1 (rule-of-thumb method)",
      "description": "Busbar cross-section from target current density, aspect-ratio options, a skin-depth check and a dimensioned diagram.",
      "tags": [
        "busbar",
        "current density",
        "cross section",
        "aspect ratio",
        "skin effect",
        "skin depth",
        "IEC 60943",
        "IEC 61439",
        "copper",
        "aluminium",
        "C101",
        "1350",
        "6101"
      ],
      "status": "done",
      "rev": 5
    },
    {
      "id": "gdt-tightness-guide",
      "title": "GD&T Tightness Guide",
      "category": "fits",
      "path": "calculators/gdt/gdt-tightness-guide.html",
      "standard": "ASME Y14.5-2018 / ISO 1101:2017",
      "description": "Achievability of each GD&T characteristic — enter a tolerance to see its band, typical processes and relative cost.",
      "tags": [
        "GD&T",
        "geometric tolerancing",
        "ASME Y14.5",
        "ISO 1101",
        "position",
        "flatness",
        "circularity",
        "cylindricity",
        "profile",
        "angularity",
        "perpendicularity",
        "parallelism",
        "concentricity",
        "symmetry",
        "runout",
        "achievability",
        "process capability"
      ],
      "status": "done",
      "rev": 3
    },
    {
      "id": "thermal-expansion",
      "title": "Thermal Expansion",
      "category": "thermal",
      "path": "calculators/thermal/thermal-expansion.html",
      "standard": "ASTM E228 (CTE basis)",
      "description": "X/Y dimensions at two target temperatures from a reference size, with an optional second material to compare growth.",
      "tags": [
        "thermal expansion",
        "CTE",
        "linear expansion",
        "temperature",
        "shrink fit",
        "differential expansion",
        "ASTM E228",
        "material comparison"
      ],
      "status": "done",
      "rev": 3
    },
    {
      "id": "pipe-pressure-drop",
      "title": "Pipe Pressure Drop",
      "category": "thermal",
      "path": "calculators/thermal/pipe-pressure-drop.html",
      "standard": "Darcy–Weisbach · Swamee–Jain",
      "description": "Pressure drop, velocity and Reynolds number for liquid flow in a round pipe, with water, glycol and oil properties by temperature.",
      "tags": [
        "pressure drop",
        "pipe flow",
        "Darcy-Weisbach",
        "Swamee-Jain",
        "friction factor",
        "Reynolds number",
        "head loss",
        "minor losses",
        "coolant",
        "ethylene glycol",
        "water",
        "hydraulic oil",
        "ATF",
        "gear oil",
        "viscosity",
        "ASTM D341"
      ],
      "status": "done",
      "rev": 2
    },
    {
      "id": "bearing-library",
      "title": "Bearing Library",
      "category": "components",
      "path": "calculators/components/bearing-library.html",
      "standard": "SKF catalogue data · ISO 15 / ISO 104 / ISO 281",
      "description": "SKF bearings d 10–130 mm: deep groove, cylindrical roller, angular contact, four-point and thrust — dimensions, ratings, speeds.",
      "tags": [
        "bearing",
        "rolling bearing",
        "SKF",
        "deep groove",
        "cylindrical roller",
        "angular contact",
        "four-point contact",
        "thrust bearing",
        "load rating",
        "limiting speed",
        "abutment",
        "2RS",
        "2Z",
        "COTS"
      ],
      "status": "done",
      "rev": 3
    },
    {
      "id": "wave-spring-library",
      "title": "Wave Spring Library",
      "category": "components",
      "path": "calculators/components/wave-spring-library.html",
      "standard": "Smalley catalogue data",
      "description": "Smalley metric wave springs by housing bore, with load at your installed height range and a linear-range check.",
      "tags": [
        "wave spring",
        "Smalley",
        "bearing preload",
        "crest-to-crest",
        "nested",
        "single turn",
        "spring rate",
        "work height",
        "COTS"
      ],
      "status": "done",
      "rev": 3
    },
    {
      "id": "locknut-library",
      "title": "Lock Nut Library",
      "category": "components",
      "path": "calculators/components/locknut-library.html",
      "standard": "SKF catalogue data · ISO 2982-2 / DIN 981",
      "description": "SKF KM, KMFE and KMT lock nuts M10–M60 with MB lock washers, shaft-slot size and axial load capacity.",
      "tags": [
        "lock nut",
        "locknut",
        "KM",
        "KMFE",
        "KMT",
        "MB",
        "lock washer",
        "SKF",
        "shaft nut",
        "bearing retention",
        "DIN 981",
        "COTS"
      ],
      "status": "done",
      "rev": 2
    },
    {
      "id": "shaft-seal-library",
      "title": "Shaft Seal Library",
      "category": "seals",
      "path": "calculators/seals/shaft-seal-library.html",
      "standard": "SKF catalogue data · ISO 6194-1 / DIN 3760",
      "description": "SKF radial shaft seals for 10–60 mm shafts, filtered by size, design, lip material, temperature and lip speed.",
      "tags": [
        "shaft seal",
        "radial shaft seal",
        "rotary seal",
        "oil seal",
        "lip seal",
        "SKF",
        "HMS5",
        "HMSA10",
        "CRW1",
        "NBR",
        "FKM",
        "DIN 3760",
        "ISO 6194",
        "COTS"
      ],
      "status": "done",
      "rev": 2
    }
  ]
};
