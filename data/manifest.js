// Machine Design Guides — registry of every calculator/page, source of truth for the hub's nav.
// Plain JS (not .json) loaded via a <script> tag rather than fetch(), specifically so index.html
// works by double-clicking it (file://) with no local server — <script src> isn't subject to the
// same-origin/CORS block that fetch() hits under file://. Edit this file to add/update a page.
//
// Keep each page's "description" to about 3 lines on a homepage card (~110-140 characters) — it's
// meant to be a short summary, fully visible, not the page's full feature list. Longer detail belongs
// on the page itself.
window.MDG_MANIFEST = {
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
      "rev": 1
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
      "rev": 2
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
      "rev": 1
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
      "rev": 3
    },
    {
      "id": "screw-torque",
      "title": "Screw Torques",
      "category": "fasteners",
      "path": "calculators/fasteners/screw-torque.html",
      "standard": "ISO 898-1 / ISO 3506-1 / NASA/TM-2017-219475",
      "description": "Tightening torque for bolted joints and tapped-hole joints, sized from proof stress or thread-pullout capacity.",
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
        "pullout",
        "thread stripping",
        "NASA"
      ],
      "status": "done",
      "rev": 1
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
      "rev": 4
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
      "rev": 2
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
      "rev": 4
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
      "rev": 3
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
      "rev": 2
    }
  ]
};
