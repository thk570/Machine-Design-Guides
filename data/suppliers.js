// Machine Design Guides — shared supplier library (see structure-and-conventions.md, "Shared supplier library").
// Plain JS loaded by calculators/components/supplier-library.html via <script src="../../data/suppliers.js">.
// To add a supplier: append one record to "suppliers". To add a supply type: append one entry to "categories" first.
//   category : id of the one primary category; the supplier is listed once, under it.
//   also     : optional ids of secondary categories; shown as tags and matched by the type filters.
//   tags     : optional free-text tags (shown on the card, searchable).
//   url      : supplier homepage. Links are checked by hand; a broken link is fixed here.
window.MDG_SUPPLIERS = {
  "updated": "2026-11-12",
  "categories": [
    { "id": "elec", "title": "Electrical Components", "desc": "Connectors, wiring and electronic components." },
    { "id": "fasteners", "title": "Fasteners", "desc": "Specialist and standard fasteners." },
    { "id": "fluid", "title": "Hydraulic & Pneumatic", "desc": "Fluid power and pneumatic automation components, and seals." },
    { "id": "mech", "title": "Mechanical Components", "desc": "Standard and configurable parts: gears, drives, springs, linear motion, hardware." },
    { "id": "raw", "title": "Raw Materials", "desc": "Bar, plate, sheet and tube stock cut to size." },
    { "id": "finish", "title": "Surface Finishing", "desc": "Plating, anodising and coating services." },
    { "id": "tooling", "title": "Tooling & Workshop Supplies", "desc": "Cutting tools, workholding, PPE and general workshop consumables." }
  ],
  "suppliers": [
    { "name": "Aalco", "category": "raw", "also": [], "tags": [], "desc": "Aluminium, stainless and other metals stockholder, with datasheets.", "url": "https://aalco.co.uk" },
    { "name": "Accu", "category": "fasteners", "also": ["mech"], "tags": [], "desc": "Standard mechanical components: bearings, linear motion, handles, hinges, springs.", "url": "https://www.accu.co.uk" },
    { "name": "Aluminium Warehouse", "category": "raw", "also": [], "tags": [], "desc": "Aluminium sheet, plate, bar and tube cut to size.", "url": "https://www.aluminium-warehouse.co.uk" },
    { "name": "Barnwell", "category": "fluid", "also": [], "tags": ["Seals"], "desc": "O-rings, back-up rings and sealing products.", "url": "https://barnwell.co.uk" },
    { "name": "Ceratizit", "category": "tooling", "also": [], "tags": ["Hard materials"], "desc": "Carbide cutting tools and inserts for milling, turning and drilling.", "url": "https://www.ceratizit.com" },
    { "name": "CIS Tools", "category": "tooling", "also": [], "tags": [], "desc": "Cutting tools and workshop supplies. Range to be confirmed.", "url": "https://www.cistools.co.uk" },
    { "name": "Clarendon Speciality Fasteners", "category": "fasteners", "also": [], "tags": [], "desc": "Specialist fasteners and components for machinery and aerospace.", "url": "https://www.clarendonfasteners.co.uk" },
    { "name": "Cromwell Tools", "category": "tooling", "also": [], "tags": ["PPE","Machine tools"], "desc": "Industrial tools, PPE and equipment specialists.", "url": "https://www.cromwell.co.uk" },
    { "name": "Cutwel", "category": "tooling", "also": [], "tags": [], "desc": "Cutting tools and tooling with next-day delivery.", "url": "https://www.cutwel.co.uk" },
    { "name": "Digi-Key", "category": "elec", "also": [], "tags": [], "desc": "Global electronic components distributor.", "url": "https://www.digikey.co.uk" },
    { "name": "Eastern Seals (O-rings)", "category": "fluid", "also": [], "tags": ["Seals"], "desc": "O-rings, O-ring cord, back-up rings, bonded seals, oil seals and moulded parts.", "url": "https://www.easternseals.co.uk" },
    { "name": "Farnell", "category": "elec", "also": [], "tags": [], "desc": "Electronic and electrical components, connectors and test equipment.", "url": "https://uk.farnell.com" },
    { "name": "Festo", "category": "fluid", "also": [], "tags": ["Automation"], "desc": "Pneumatic and electric automation: cylinders, valves, grippers, drives.", "url": "https://www.festo.com/gb/en/" },
    { "name": "Lee Springs", "category": "mech", "also": [], "tags": ["Springs"], "desc": "Stock compression, extension and torsion springs, plus wire forms.", "url": "https://www.leespring.co.uk" },
    { "name": "Materials Direct", "category": "raw", "also": [], "tags": [], "desc": "Engineering materials stock. Range to be confirmed.", "url": "https://www.materialsdirect.co.uk" },
    { "name": "Metals4U", "category": "raw", "also": [], "tags": [], "desc": "Steel, stainless, aluminium, brass and copper cut to size online.", "url": "https://www.metals4u.co.uk" },
    { "name": "MISUMI", "category": "mech", "also": ["fasteners"], "tags": [], "desc": "Configurable mechanical components with CAD downloads.", "url": "https://uk.misumi-ec.com" },
    { "name": "Mouser", "category": "elec", "also": [], "tags": [], "desc": "Global electronic components distributor.", "url": "https://www.mouser.co.uk" },
    { "name": "MP Eastern", "category": "finish", "also": [], "tags": [], "desc": "Electroplating and anodising for precision engineering.", "url": "https://www.mpeastern.co.uk" },
    { "name": "Ondrives Precision Gears", "category": "mech", "also": [], "tags": ["Gears"], "desc": "Precision gears, racks, worm sets and gear components.", "url": "https://www.ondrives.com" },
    { "name": "Parker Steel", "category": "raw", "also": [], "tags": [], "desc": "Steel, stainless and aluminium stockholder, cut to size.", "url": "https://www.parkersteel.com" },
    { "name": "Polymax", "category": "fluid", "also": [], "tags": ["Seals"], "desc": "O-rings, seals and elastomer products.", "url": "https://www.polymax.co.uk" },
    { "name": "RS", "category": "mech", "also": ["elec","fasteners","tooling"], "tags": [], "desc": "Broad-range distributor: electronics, electrical, mechanical, tooling and workshop supplies.", "url": "https://uk.rs-online.com" },
    { "name": "Safety Lifting Gear", "category": "tooling", "also": [], "tags": [], "desc": "Lifting points, hoist rings and lifting equipment.", "url": "https://www.safetyliftingear.com" },
    { "name": "Simply Bearings", "category": "mech", "also": [], "tags": [], "desc": "Bearings and bearing accessories, large online catalogue.", "url": "https://simplybearings.co.uk" },
    { "name": "SKF", "category": "mech", "also": [], "tags": [], "desc": "Bearings, lock nuts, shaft seals and lubrication.", "url": "https://www.skf.com/gb" },
    { "name": "SMC UK", "category": "fluid", "also": [], "tags": [], "desc": "Pneumatic cylinders, valves, fittings and vacuum components.", "url": "https://www.smc.eu/en-gb" },
    { "name": "Spring Masters", "category": "mech", "also": [], "tags": ["Springs"], "desc": "Stock and custom compression, extension and torsion springs.", "url": "https://www.springmasters.com" },
    { "name": "TE Connectivity", "category": "elec", "also": [], "tags": [], "desc": "Connectors, sensors and interconnect components.", "url": "https://www.te.com" }
  ]
};
