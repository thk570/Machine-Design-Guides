// Machine Design Guides — TT electronics (Welwyn) fixed resistors commonly used for capacitor bleed.
// Shared component library, <item type>_<supplier>.js convention (see structure-and-conventions.md).
// Imported from the supplier's "Capacitor Discharge Calculator" workbook (Design Tool #4, S J Oxley, Mar 2005),
// "Data" sheet. Not scraped; re-import from the workbook rather than hand-editing values.
// Series/technology/description are filled down from the first row of each series group in the workbook.
// Smallest/largest resistance per series is blank in the workbook, so it is not held here.
window.MDG_RESISTORS_TT = {
  "supplier": "TT electronics (Welwyn)",
  "imported": "2026-10-19",
  "range": "38 fixed resistor types, 0.125-165 W, 50 V-50 kV",
  "fields": {
    "type": ["Type", "", ""],
    "series": ["Series", "", ""],
    "technology": ["Technology", "", ""],
    "description": ["Description", "", ""],
    "rated_power_W": ["Rated power at 70 °C", "P", "W"],
    "limiting_voltage_V": ["Limiting element voltage", "U", "V"]
  },
  "columns": ["type", "series", "technology", "description", "rated_power_W", "limiting_voltage_V"],
  "rows": [
    ["1601", "1600/1900", "Wirewound", "Vitreous enamel coated", 11, 250],
    ["1609", "1600/1900", "Wirewound", "Power wirewound tubular", 165, 3000],
    ["4501", "4500", "Thick-film", "Thick-film on ceramic", 1, 10000],
    ["4507", "4500", "Thick-film", "SIL leadframe", 4.5, 20000],
    ["BHV10", "BHV", "Thick-film", "HV thick-film on ceramic", 1, 10000],
    ["BHV30", "BHV", "Thick-film", "SIL leadframe", 3, 30000],
    ["BPC3", "BPC", "Thick-film", "Thick-film on ceramic", 3, 500],
    ["BPC10", "BPC", "Thick-film", "SIL leadframe", 10, 500],
    ["BPR3", "BPR", "Thick-film", "Thick-film on ceramic", 3, 500],
    ["BPR50", "BPR", "Thick-film", "SIL leadframe", 50, 500],
    ["F43", "F", "Thick-film", "HV thick-film leaded axial", 0.28, 4000],
    ["F44", "F", "Thick-film", "HV thick-film leaded axial", 0.52, 14000],
    ["GC55", "GC", "Thick-film", "HV thick-film leaded axial", 0.25, 1700],
    ["GC70", "GC", "Thick-film", "HV thick-film leaded axial", 1, 10000],
    ["HVC1206", "HVC", "Thick-film", "HV thick-film chip", 0.3, 1000],
    ["HVC2512", "HVC", "Thick-film", "HV thick-film chip", 1, 3000],
    ["MF0.5S", "MF-S", "Metal film", "Metal film leaded axial", 0.5, 350],
    ["MF3S", "MF-S", "Metal film", "Metal film leaded axial", 3, 350],
    ["MFP1", "MFP", "Metal film", "Metal film leaded axial", 1, 350],
    ["MFP2", "MFP", "Metal film", "Metal film leaded axial", 2, 350],
    ["MH25", "MH", "HV metal film", "HV metal film leaded axial", 0.25, 1600],
    ["MH37", "MH", "HV metal film", "HV metal film leaded axial", 0.5, 3500],
    ["MO0.5S", "MO-S", "Oxide", "Metal oxide film leaded axial", 0.5, 250],
    ["MO5S", "MO-S", "Oxide", "Metal oxide film leaded axial", 5, 500],
    ["PW-2", "PW", "Wirewound", "Ceramic cased power", 2, 150],
    ["PW-25", "PW", "Wirewound", "Wirewound leaded axial", 18.8, 671],
    ["PWC0805", "PWC", "Thick-film", "Pulse withstanding", 0.125, 150],
    ["PWC2512", "PWC", "Thick-film", "Thick-film chip", 1.5, 500],
    ["T43", "T", "Thick-film", "HV thick-film leaded axial", 1.5, 4000],
    ["T48", "T", "Thick-film", "HV thick-film leaded axial", 10, 50000],
    ["TFP", "TFP", "Thick-film", "TO220 heatsinked package", 13, 150],
    ["W21", "W20", "Wirewound", "Vitreous enamel coated", 2.6, 100],
    ["W24", "W20", "Wirewound", "Wirewound leaded axial", 12, 750],
    ["W31", "W30", "Wirewound", "Cement coated leaded axial", 2.5, 100],
    ["WA82", "WA80", "Wirewound", "Cement coated leaded axial", 0.86, 50],
    ["WA87", "WA80", "Wirewound", "Cement coated leaded axial", 6, 150],
    ["WH5", "WH", "Wirewound", "Aluminium clad heatsinked", 7.4, 150],
    ["WH50", "WH", "Wirewound", "Power wirewound", 37.1, 1250]
  ],
  "notes": [
    "Rated power is the continuous rating at 70 °C ambient.",
    "Resistance range per series is not in the source workbook."
  ],
  "refs": [
    { "label": "Capacitor Discharge Calculator, Design Tool #4 (Excel workbook, S J Oxley, Mar 2005)", "url": null, "domain": "TT electronics (Welwyn), internal copy", "backs": "all values in this file" }
  ],
  "sources": [
    { "label": "TT electronics capacitor discharge calculator workbook, Data sheet", "url": null, "domain": "TT electronics", "backs": "rated power, limiting element voltage, series, technology, description" }
  ]
};
