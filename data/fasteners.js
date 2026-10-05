// Machine Design Guides — shared fastener library.
// Plain JS (not .json) loaded via <script src>, same reasoning as data/manifest.js and data/materials.js
// (works under file:// with no server). Browsable at calculators/fasteners/fastener-library.html; other
// calculators (e.g. Screw Torques) can read window.MDG_FASTENERS instead of hard-coding thread/head data.
//
// Conventions:
//  - All lengths in mm, stresses in MPa. Head dimensions are the standard's max values unless the key
//    says otherwise (_min / _act).
//  - Every table carries `refs`: keys into MDG_FASTENERS.sources. Only sources actually fetched and read
//    are listed. Values that were computed rather than read are flagged at the point of use.
//  - Sizes a standard does not cover are simply absent — never interpolated.
window.MDG_FASTENERS = {

  // ---------------------------------------------------------------- threads (ISO 261 / 262)
  // coarse pitch + fine pitches. ISO 262 lists fine pitches for M8 and up; M3–M6 fine pitches are
  // ISO 261-only (and fall outside the ISO 898-1 / ISO 3506-1 fine-thread scope, which starts at M8×1).
  threads: {
    refs: ['iso262', 'bbest', 'modulus'],
    sizes: [
      { size: 'M3',  d: 3,  coarse: 0.5,  fine: [0.35],     fineStd: 'ISO 261' },
      { size: 'M4',  d: 4,  coarse: 0.7,  fine: [0.5],      fineStd: 'ISO 261' },
      { size: 'M5',  d: 5,  coarse: 0.8,  fine: [0.5],      fineStd: 'ISO 261' },
      { size: 'M6',  d: 6,  coarse: 1.0,  fine: [0.75],     fineStd: 'ISO 261' },
      { size: 'M8',  d: 8,  coarse: 1.25, fine: [1.0],      fineStd: 'ISO 262' },
      { size: 'M10', d: 10, coarse: 1.5,  fine: [1.25, 1.0], fineStd: 'ISO 262' },
      { size: 'M12', d: 12, coarse: 1.75, fine: [1.5, 1.25], fineStd: 'ISO 262' },
      { size: 'M14', d: 14, coarse: 2.0,  fine: [1.5],      fineStd: 'ISO 262' },
      { size: 'M16', d: 16, coarse: 2.0,  fine: [1.5],      fineStd: 'ISO 262' },
      { size: 'M18', d: 18, coarse: 2.5,  fine: [2.0, 1.5], fineStd: 'ISO 262' },
      { size: 'M20', d: 20, coarse: 2.5,  fine: [2.0, 1.5], fineStd: 'ISO 262' },
      { size: 'M22', d: 22, coarse: 2.5,  fine: [2.0, 1.5], fineStd: 'ISO 262' },
      { size: 'M24', d: 24, coarse: 3.0,  fine: [2.0],      fineStd: 'ISO 262' },
      { size: 'M27', d: 27, coarse: 3.0,  fine: [2.0],      fineStd: 'ISO 262' },
      { size: 'M30', d: 30, coarse: 3.5,  fine: [2.0],      fineStd: 'ISO 262' }
    ],
    // Tabulated tap drills, keyed "d×P". Anything missing is computed as d − P and flagged as such.
    tapDrill: {
      refs: ['amesweb_tap', 'fractory_tap'],
      values: {
        '3x0.5': 2.5, '4x0.7': 3.3, '5x0.8': 4.2, '6x1': 5.0, '8x1.25': 6.8, '10x1.5': 8.5,
        '12x1.75': 10.2, '14x2': 12.0, '16x2': 14.0, '18x2.5': 15.5, '20x2.5': 17.5, '22x2.5': 19.5,
        '24x3': 21.0, '27x3': 24.0, '30x3.5': 26.5,
        '8x1': 7.0, '10x1': 9.0, '10x1.25': 8.8, '12x1.5': 10.5, '14x1.5': 12.5, '16x1.5': 14.5,
        '18x1.5': 16.5, '20x1.5': 18.5, '22x1.5': 20.5, '24x2': 22.0, '27x2': 25.0, '30x2': 28.0
      }
    },
    // Geometry formulas (ISO 724 / ISO 898-1 forms).
    formulaRefs: { d2: ['mechcalc'], d3: ['mechcalc'], As: ['machinemfg', 'mechcalc'] }
  },

  // ---------------------------------------------------------------- mating holes
  clearance: {  // ISO 273 fine / medium / coarse
    refs: ['mechcodex273', 'ekinsun273'],
    values: {
      M3: [3.2, 3.4, 3.6], M4: [4.3, 4.5, 4.8], M5: [5.3, 5.5, 5.8], M6: [6.4, 6.6, 7.0],
      M8: [8.4, 9.0, 10.0], M10: [10.5, 11, 12], M12: [13, 13.5, 14.5], M14: [15, 15.5, 16.5],
      M16: [17, 17.5, 18.5], M18: [19, 20, 21], M20: [21, 22, 24], M22: [23, 24, 26],
      M24: [25, 26, 28], M27: [28, 30, 32], M30: [31, 33, 35]
    }
  },
  counterbore: {  // DIN 974-1, series for ISO 4762 / ISO 1207 / DIN 7984 heads
    refs: ['schraube974', 'neuephysik'],
    d1: { M3: 6.5, M4: 8, M5: 10, M6: 11, M8: 15, M10: 18, M12: 20, M14: 24, M16: 26, M18: 30,
          M20: 33, M22: 36, M24: 40, M27: 46, M30: 50 },
    // depth for ISO 4762-height heads. M27/M30 are as tabulated by both sources but break the
    // k + 0.6–0.8 pattern of the smaller sizes — flagged on the page.
    t_iso4762: { M3: 3.4, M4: 4.4, M5: 5.4, M6: 6.4, M8: 8.6, M10: 10.6, M12: 12.6, M14: 14.6,
                 M16: 16.6, M18: 18.6, M20: 20.6, M22: 22.8, M24: 24.8, M27: 31.0, M30: 34.0 },
    t_flag: ['M27', 'M30']
  },
  countersink: {
    // 90° countersink for ISO 10642 heads — DIN 74 recommended diameter (with clearance)
    iso10642: { refs: ['neuephysik', 'engbible_csk'],
      values: { M3: 6.9, M4: 9.2, M5: 11.5, M6: 13.7, M8: 18.3, M10: 22.7, M12: 27.2, M16: 34.0, M20: 40.7 } },
    // ISO 15065 countersink Dc min/max — applies to ISO 7721-form heads, which ISO 14581 uses
    iso14581: { refs: ['iso15065'],
      values: { M3: [6.3, 6.5], M4: [9.4, 9.6], M5: [10.40, 10.65], M6: [12.60, 12.85], M8: [17.30, 17.55], M10: [20.0, 20.3] } }
  },

  // ---------------------------------------------------------------- drives
  torx: {  // ISO 10664 hexalobular internal driving feature, nominal A (point-to-point) / B (across lobes)
    refs: ['iso10664', 'willrich10664'],
    values: {
      T10: [2.80, 2.05], T15: [3.35, 2.40], T20: [3.95, 2.85], T25: [4.50, 3.25], T27: [5.10, 3.68],
      T30: [5.60, 4.05], T40: [6.75, 4.85], T45: [7.93, 5.64], T50: [8.95, 6.45], T55: [11.35, 8.05],
      T60: [13.45, 9.60], T70: [15.70, 11.20], T80: [17.75, 12.80], T90: [20.20, 14.40], T100: [22.40, 16.00]
    }
  },

  // ---------------------------------------------------------------- heads
  // drive: 'hex' = hexagon socket (s = key size), 'torx' = hexalobular socket (T = size),
  //        'ext' = external hexagon (s = spanner size).
  heads: [
    {
      id: 'socket-cap', title: 'Socket cap', counterbore: 't_iso4762',
      variants: {
        hex: {
          std: 'ISO 4762', name: 'Hexagon socket head cap screw', refs: ['iso4762_2004', 'iso4762_1997', 'fuller912'],
          sizes: {
            M3:  { dk: 5.50, dk_min: 5.32, k: 3.00, s: 2.5, e: 2.873, t: 1.3, da: 3.6, b: 18 },
            M4:  { dk: 7.00, dk_min: 6.78, k: 4.00, s: 3, e: 3.443, t: 2, da: 4.7, b: 20 },
            M5:  { dk: 8.50, dk_min: 8.28, k: 5.00, s: 4, e: 4.583, t: 2.5, da: 5.7, b: 22 },
            M6:  { dk: 10.00, dk_min: 9.78, k: 6.00, s: 5, e: 5.723, t: 3, da: 6.8, b: 24 },
            M8:  { dk: 13.00, dk_min: 12.73, k: 8.00, s: 6, e: 6.863, t: 4, da: 9.2, b: 28 },
            M10: { dk: 16.00, dk_min: 15.73, k: 10.00, s: 8, e: 9.149, t: 5, da: 11.2, b: 32 },
            M12: { dk: 18.00, dk_min: 17.73, k: 12.00, s: 10, e: 11.429, t: 6, da: 13.7, b: 36 },
            M14: { dk: 21.00, dk_min: 20.67, k: 14.00, s: 12, e: 13.72, t: 7, da: 15.7, b: 40, avoid: true },
            M16: { dk: 24.00, dk_min: 23.67, k: 16.00, s: 14, e: 16.00, t: 8, da: 17.7, b: 44 },
            M18: { dk: 27.33, k: 18, s: 14, t: 9, din912: true },
            M20: { dk: 30.00, dk_min: 29.67, k: 20.00, s: 17, e: 19.44, t: 10, da: 22.4, b: 52 },
            M22: { dk: 33.39, k: 22, s: 17, t: 11, din912: true },
            M24: { dk: 36.00, dk_min: 35.61, k: 24.00, s: 19, e: 21.73, t: 12, da: 26.4, b: 60 },
            M27: { dk: 40.39, k: 27, s: 19, t: 13.5, din912: true },
            M30: { dk: 45.00, dk_min: 44.61, k: 30.00, s: 22, e: 25.15, t: 15.5, da: 33.4, b: 72 }
          },
          din912Refs: ['boltport912']
        },
        torx: {
          std: 'ISO 14579', name: 'Hexalobular socket head cap screw', refs: ['iso14579', 'inoxmare14579'],
          sizes: {
            M3:  { dk: 5.50, k: 3.00, T: 'T10', t: 1.01, da: 3.6, b: 18 },
            M4:  { dk: 7.00, k: 4.00, T: 'T20', t: 1.42, da: 4.7, b: 20 },
            M5:  { dk: 8.50, k: 5.00, T: 'T25', t: 1.65, da: 5.7, b: 22 },
            M6:  { dk: 10.00, k: 6.00, T: 'T30', t: 2.02, da: 6.8, b: 24 },
            M8:  { dk: 13.00, k: 8.00, T: 'T45', t: 2.92, da: 9.2, b: 28 },
            M10: { dk: 16.00, k: 10.00, T: 'T50', t: 3.62, da: 11.2, b: 32 },
            M12: { dk: 18.00, k: 12.00, T: 'T55', t: 4.82, da: 13.7, b: 36 },
            M14: { dk: 21.00, k: 14.00, T: 'T60', t: 5.62, da: 15.7, b: 40, avoid: true },
            M16: { dk: 24.00, k: 16.00, T: 'T70', t: 6.62, da: 17.7, b: 44 },
            M18: { dk: 27.00, k: 18.00, T: 'T80', t: 7.50, da: 20.2, b: 48, avoid: true },
            M20: { dk: 30.00, k: 20.00, T: 'T90', t: 8.69, da: 22.4, b: 52 }
          }
        }
      }
    },
    {
      id: 'button', title: 'Button head', counterbore: null,
      variants: {
        hex: {
          std: 'ISO 7380-1', name: 'Hexagon socket button head screw', refs: ['iso7380', 'fuller7380'],
          sizes: {
            M3:  { dk: 5.70, dk_min: 5.40, k: 1.65, s: 2, e: 2.303, t: 1.04, da: 3.6 },
            M4:  { dk: 7.60, dk_min: 7.24, k: 2.20, s: 2.5, e: 2.873, t: 1.30, da: 4.7 },
            M5:  { dk: 9.50, dk_min: 9.14, k: 2.75, s: 3, e: 3.443, t: 1.56, da: 5.7 },
            M6:  { dk: 10.50, dk_min: 10.07, k: 3.30, s: 4, e: 4.583, t: 2.08, da: 6.8 },
            M8:  { dk: 14.00, dk_min: 13.57, k: 4.40, s: 5, e: 5.723, t: 2.60, da: 9.2 },
            M10: { dk: 17.50, dk_min: 17.07, k: 5.50, s: 6, e: 6.863, t: 3.12, da: 11.2 },
            M12: { dk: 21.00, dk_min: 20.48, k: 6.60, s: 8, e: 9.149, t: 4.16, da: 13.7 },
            M16: { dk: 28.00, dk_min: 27.48, k: 8.80, s: 10, e: 11.429, t: 5.20, da: 17.7 }
          }
        },
        torx: {
          // ISO 7380-1:2022 has no hexalobular variant (now ISO 7380-3, not accessed) — distributor data.
          std: 'ISO 7380 TX', name: 'Hexalobular socket button head screw', distributor: true,
          refs: ['accu7380tx', 'westfield7380_2'],
          sizes: {
            M3:  { dk: 5.70, k: 1.65, T: 'T10', t: 1.01 },
            M4:  { dk: 7.60, k: 2.20, T: 'T20', t: 1.42 },
            M5:  { dk: 9.50, k: 2.75, T: 'T25', t: 1.65 },
            M6:  { dk: 10.50, k: 3.30, T: 'T30', t: 2.02 },
            M8:  { dk: 14.00, k: 4.40, T: 'T40', t: 2.8 },
            M10: { dk: 17.50, k: 5.50, T: 'T50', t: 3.62 },
            M12: { dk: 21.00, k: 6.60, T: 'T55', t: 4.16 }
          }
        }
      }
    },
    {
      id: 'countersunk', title: 'Countersunk', counterbore: null,
      variants: {
        hex: {
          std: 'ISO 10642', name: 'Hexagon socket countersunk head screw', countersink: 'iso10642',
          refs: ['iso10642', 'fuller10642'],
          sizes: {
            M3:  { dk: 6.72, dk_act: 5.54, k: 1.86, s: 2, e: 2.303, t: 1.1, da: 3.3, b: 18 },
            M4:  { dk: 8.96, dk_act: 7.53, k: 2.48, s: 2.5, e: 2.873, t: 1.5, da: 4.4, b: 20 },
            M5:  { dk: 11.20, dk_act: 9.43, k: 3.1, s: 3, e: 3.443, t: 1.9, da: 5.5, b: 22 },
            M6:  { dk: 13.44, dk_act: 11.34, k: 3.72, s: 4, e: 4.583, t: 2.2, da: 6.6, b: 24 },
            M8:  { dk: 17.92, dk_act: 15.24, k: 4.96, s: 5, e: 5.723, t: 3.0, da: 8.54, b: 28 },
            M10: { dk: 22.40, dk_act: 19.22, k: 6.2, s: 6, e: 6.863, t: 3.6, da: 10.62, b: 32 },
            M12: { dk: 26.88, dk_act: 23.12, k: 7.44, s: 8, e: 9.149, t: 4.3, da: 13.5, b: 36 },
            M14: { dk: 30.8, dk_act: 26.52, k: 8.4, s: 10, e: 11.429, t: 4.5, da: 15.5, b: 40, avoid: true },
            M16: { dk: 33.60, dk_act: 29.01, k: 8.8, s: 10, e: 11.429, t: 4.8, da: 17.5, b: 44 },
            M20: { dk: 40.32, dk_act: 36.05, k: 10.16, s: 12, e: 13.716, t: 5.6, da: 22, b: 52 }
          }
        },
        torx: {
          std: 'ISO 14581', name: 'Hexalobular socket countersunk flat head screw', countersink: 'iso14581',
          refs: ['iso14581', 'fasteners_eu14581'],
          sizes: {
            M3:  { dk: 6.3, dk_act: 5.5, k: 1.65, T: 'T10', t: 0.70 },
            M4:  { dk: 9.4, dk_act: 8.4, k: 2.70, T: 'T20', t: 1.14 },
            M5:  { dk: 10.4, dk_act: 9.3, k: 2.70, T: 'T25', t: 1.12 },
            M6:  { dk: 12.6, dk_act: 11.3, k: 3.30, T: 'T30', t: 1.39 },
            M8:  { dk: 17.3, dk_act: 15.8, k: 4.65, T: 'T45', t: 2.15 },
            M10: { dk: 20, dk_act: 18.3, k: 5.00, T: 'T50', t: 2.41 }
          }
        }
      }
    },
    {
      id: 'low-head', title: 'Low head cap', counterbore: 'd1_only',
      variants: {
        hex: {
          std: 'DIN 7984', name: 'Hexagon socket head cap screw with low head', refs: ['fuller7984', 'westfield7984'],
          sizes: {
            M3:  { dk: 5.5, dk_min: 5.32, k: 2.0, s: 2, e: 2.3, t: 1.38, b: 12 },
            M4:  { dk: 7, dk_min: 6.78, k: 2.8, s: 2.5, e: 2.87, t: 2.18, b: 14 },
            M5:  { dk: 8.5, dk_min: 8.28, k: 3.5, s: 3, e: 3.44, t: 2.58, b: 16 },
            M6:  { dk: 10, dk_min: 9.78, k: 4.0, s: 4, e: 4.58, t: 2.88, b: 18 },
            M8:  { dk: 13, dk_min: 12.73, k: 5.0, s: 5, e: 5.72, t: 3.65, b: 22 },
            M10: { dk: 16, dk_min: 15.73, k: 6.0, s: 7, e: 8.01, t: 4.35, b: 26 },
            M12: { dk: 18, dk_min: 17.73, k: 7, s: 8, e: 9.15, t: 4.85, b: 30 },
            M14: { dk: 21, k: 8, s: 10, t: 5.15, b: 34 },
            M16: { dk: 24, dk_min: 23.67, k: 9, s: 12, e: 13.72, t: 5.35, b: 38 },
            M18: { dk: 27, k: 10, s: 12, t: 6.32, b: 42 },
            M20: { dk: 30, dk_min: 29.67, k: 11, s: 14, e: 16, t: 7.32, b: 46 },
            M22: { dk: 33, k: 12, s: 14, t: 7.82, b: 50 },
            M24: { dk: 36, dk_min: 35.61, k: 13, s: 17, e: 19.44, t: 7.82, b: 54 }
          }
        },
        torx: {
          // ISO 14580 is formally a hexalobular socket *cheese head* screw (M2–M10), commonly sold as the
          // Torx equivalent of DIN 7984. Its head height sits between DIN 7984 and ISO 4762.
          std: 'ISO 14580', name: 'Hexalobular socket cheese head screw', cheese: true,
          refs: ['iso14580', 'fuller14580'],
          sizes: {
            M3:  { dk: 5.50, dk_min: 5.32, k: 2.40, T: 'T10', t: 1.01, b: 25 },
            M4:  { dk: 7.00, dk_min: 6.78, k: 3.10, T: 'T20', t: 1.27, b: 38 },
            M5:  { dk: 8.50, dk_min: 8.28, k: 3.65, T: 'T25', t: 1.52, b: 38 },
            M6:  { dk: 10.00, dk_min: 9.78, k: 4.40, T: 'T30', t: 1.90, b: 38 },
            M8:  { dk: 13.00, dk_min: 12.73, k: 5.80, T: 'T45', t: 2.66, b: 38 },
            M10: { dk: 16.00, dk_min: 15.73, k: 6.90, T: 'T50', t: 3.04, b: 38 }
          }
        }
      }
    },
    {
      id: 'hex-head', title: 'Hex head', counterbore: null,
      variants: {
        ext: {
          std: 'ISO 4017 / 4014', name: 'Hexagon head screw (4017, full thread) / bolt (4014, part thread)',
          refs: ['fasteners_eu4017', 'westfield4017', 'andrews4017'],
          sizes: {
            M3:  { s: 5.5, k: 2, e: 6.01, dw: 4.57 },
            M4:  { s: 7, k: 2.8, e: 7.66, dw: 5.88 },
            M5:  { s: 8, k: 3.5, e: 8.79, dw: 6.88 },
            M6:  { s: 10, k: 4, e: 11.05, dw: 8.88 },
            M8:  { s: 13, k: 5.3, e: 14.38, dw: 11.63 },
            M10: { s: 16, k: 6.4, e: 17.77, dw: 14.63 },
            M12: { s: 18, k: 7.5, e: 20.03, dw: 16.63 },
            M14: { s: 21, k: 8.8, e: 23.36, dw: 19.64 },
            M16: { s: 24, k: 10, e: 26.75, dw: 22.49 },
            M18: { s: 27, k: 11.5, e: 30.14, dw: 25.34 },
            M20: { s: 30, k: 12.5, e: 33.53, dw: 28.19 },
            M22: { s: 34, k: 14, e: 37.72, dw: 31.71 },
            M24: { s: 36, k: 15, e: 39.98, dw: 33.61 },
            M27: { s: 41, k: 17, e: 45.2, dw: 38, gradeB: true },
            M30: { s: 46, k: 18.7, e: 50.85, dw: 42.75, gradeB: true }
          }
        }
      }
    },
    {
      id: 'flange', title: 'Hex flange', counterbore: null,
      variants: {
        ext: {
          std: 'ISO 4162', name: 'Hexagon flange bolt — small series', refs: ['aft4162', 'jignesh4162', 'globalfastener4162'],
          sizes: {
            M5:  { s: 7, k: 5.6, dc: 11.4, c: 1.0, e: 7.44 },
            M6:  { s: 8, k: 6.8, dc: 13.6, c: 1.1, e: 8.56 },
            M8:  { s: 10, k: 8.5, dc: 17.0, c: 1.2, e: 10.80 },
            M10: { s: 13, k: 9.7, dc: 20.8, c: 1.5, e: 14.08 },
            M12: { s: 15, k: 11.9, dc: 24.7, c: 1.8, e: 16.32 },
            M14: { s: 18, k: 12.9, dc: 28.6, c: 2.1, e: 19.68, avoid: true },
            M16: { s: 21, k: 15.1, dc: 32.8, c: 2.4, e: 22.58 }
          }
        }
      }
    }
  ],

  // ---------------------------------------------------------------- property classes
  // Steel per ISO 898-1:2013, stainless per ISO 3506-1:2020. Both cover coarse M1.6–M39 and fine
  // M8×1–M39×3. Sp = proof stress (steel only). Stainless: no proof-load test stress; Rp0.2 shown instead.
  classes: [
    { id: '8.8',  group: 'steel', std: 'ISO 898-1', refs: ['bossard898', 'kova898'],
      bySize: [
        { maxD: 16, Rm: 800, Rp: 640, Sp: 580, HV: '250–320', HRC: '22–32', A: '12 %' },
        { maxD: 39, Rm: 830, Rp: 660, Sp: 600, HV: '255–335', HRC: '23–34', A: '12 %' }
      ] },
    { id: '10.9', group: 'steel', std: 'ISO 898-1', refs: ['bossard898', 'kova898'],
      bySize: [ { maxD: 39, Rm: 1040, Rp: 940, Sp: 830, HV: '320–380', HRC: '32–39', A: '9 %' } ] },
    { id: '12.9', group: 'steel', std: 'ISO 898-1', refs: ['bossard898', 'kova898'],
      bySize: [ { maxD: 39, Rm: 1220, Rp: 1100, Sp: 970, HV: '385–435', HRC: '39–44', A: '8 %' } ] },
    { id: 'A2-70', group: 'stainless', std: 'ISO 3506-1', refs: ['bssa3506', 'wuerth3506'],
      bySize: [ { maxD: 39, Rm: 700, Rp: 450, Sp: null, HV: null, HRC: null, A: '0.4·d' } ] },
    { id: 'A4-80', group: 'stainless', std: 'ISO 3506-1', refs: ['bssa3506', 'wuerth3506'],
      bySize: [ { maxD: 39, Rm: 800, Rp: 600, Sp: null, HV: null, HRC: null, A: '0.3·d' } ] }
  ],

  // ---------------------------------------------------------------- sources (all fetched and read)
  sources: {
    iso262:        { label: 'ISO 262:2023 (sample)', url: 'https://cdn.standards.iteh.ai/samples/85105/41945f5384e447fe8c9492f4e23251a3/ISO-262-2023.pdf', domain: 'standards.iteh.ai', backs: 'selected coarse and fine pitches, M8–M30' },
    bbest:         { label: 'ISO 262, ISO 724, ISO 965 Thread Profile and Pitch', url: 'https://www.brightonbest.com/download/pds/PDS_Thread_Details_Metric_Series.pdf', domain: 'brightonbest.com', backs: 'coarse/fine pitch cross-check' },
    modulus:       { label: 'Complete Metric Thread Size Table (ISO 261)', url: 'https://www.modulusmetal.com/complete-metric-thread-size-table-and-selection-manual/', domain: 'modulusmetal.com', backs: 'ISO 261 fine pitches for M3–M6' },
    mechcalc:      { label: 'Fastener Size Tables', url: 'https://mechanicalc.com/reference/fastener-size-tables', domain: 'mechanicalc.com', backs: 'pitch and minor diameter formulas; stress-area cross-check' },
    machinemfg:    { label: 'Cross-Sectional Area Table for Metric Threads', url: 'https://www.machinemfg.com/cross-sectional-area-table-for-metric-threads/', domain: 'machinemfg.com', backs: 'tensile stress area formula' },
    amesweb_tap:   { label: 'Metric Tap Drill Chart (ISO)', url: 'https://amesweb.info/Screws/metric-tap-drill-chart.aspx', domain: 'amesweb.info', backs: 'coarse and fine tap drills; d − P rule' },
    fractory_tap:  { label: 'ISO Metric Tap Drill Sizes', url: 'https://fractory.com/metric-tap-drill-chart/', domain: 'fractory.com', backs: 'coarse and fine tap drills incl. M10×1.25, M22×1.5' },
    mechcodex273:  { label: 'Metric Clearance Hole Sizes (ISO 273)', url: 'https://mechcodex.com/reference/metric-clearance-hole-sizes', domain: 'mechcodex.com', backs: 'ISO 273 fine/medium/coarse clearance holes' },
    ekinsun273:    { label: 'ISO 273 Clearance Hole Chart', url: 'https://www.ekinsun.com/custom-fasteners/clearance-hole-chart/', domain: 'ekinsun.com', backs: 'clearance hole cross-check' },
    schraube974:   { label: 'Bohrtabelle für Zylinderschrauben — Senkungen nach DIN 974', url: 'https://schraube-mutter.de/bohrtabelle-fuer-zylinderschrauben/', domain: 'schraube-mutter.de', backs: 'DIN 974-1 counterbore diameter and depth' },
    neuephysik:    { label: 'Senkungen — Tabellen', url: 'https://www.neue-physik.de/353.9_Senkungen.php', domain: 'neue-physik.de', backs: 'DIN 974-1 cross-check (incl. M3 Ø6.5); DIN 74 countersink diameters' },
    engbible_csk:  { label: 'Countersunk Hole Size for Flat Head Screws (ISO)', url: 'https://engineersbible.com/countersunk-iso/', domain: 'engineersbible.com', backs: '90° countersink diameter cross-check' },
    iso15065:      { label: 'ISO 15065:2005 (sample)', url: 'https://cdn.standards.iteh.ai/samples/37365/57c8c6dac6864ac5a6f7bfa6fdd06111/ISO-15065-2005.pdf', domain: 'standards.iteh.ai', backs: 'countersink Dc for ISO 7721-form heads (ISO 14581)' },
    iso10664:      { label: 'ISO 10664:2014 (sample)', url: 'https://cdn.standards.iteh.ai/samples/63207/f79670cf0a214881aa40b4822580cce3/ISO-10664-2014.pdf', domain: 'standards.iteh.ai', backs: 'hexalobular A/B dimensions T10–T100' },
    willrich10664: { label: 'ISO 10664:1999(E)', url: 'https://willrich.com/wp-content/uploads/2017/11/ISO-10664_.pdf', domain: 'willrich.com', backs: 'hexalobular A/B cross-check' },
    iso4762_2004:  { label: 'ISO 4762:2004 (sample)', url: 'https://cdn.standards.iteh.ai/samples/34460/06335046afaf46fb8e84d91a3eda001d/ISO-4762-2004.pdf', domain: 'standards.iteh.ai', backs: 'ISO 4762 M3–M12' },
    iso4762_1997:  { label: 'ISO 4762:1997 (sample)', url: 'https://cdn.standards.iteh.ai/samples/24643/ff479778e7af4f3eb742ad5ca38881f2/ISO-4762-1997.pdf', domain: 'standards.iteh.ai', backs: 'ISO 4762 M14–M30' },
    fuller912:     { label: 'DIN 912 Specifications — Hex Socket Head Cap Screws', url: 'https://fullerfasteners.com/tech/din-912-specifications-hex-socket-head-cap-screws/', domain: 'fullerfasteners.com', backs: 'ISO 4762 / DIN 912 cross-check' },
    boltport912:   { label: 'DIN 912 Hexagon Socket Cap Screw', url: 'https://a193gradeb7.com/socket-head-cap-screws-din-912/', domain: 'a193gradeb7.com', backs: 'DIN 912-only sizes M18, M22, M27' },
    iso14579:      { label: 'ISO 14579:2011 (sample)', url: 'https://cdn.standards.iteh.ai/samples/56455/12ad7960b6da426593b3a6a783c47b84/ISO-14579-2011.pdf', domain: 'standards.iteh.ai', backs: 'ISO 14579 Torx sizes, depths and head dimensions' },
    inoxmare14579: { label: 'ISO 14579 datasheet', url: 'https://www.inoxmare.com/media/wysiwyg/schede_tecniche/14579.pdf', domain: 'inoxmare.com', backs: 'ISO 14579 cross-check M3–M8' },
    iso7380:       { label: 'ISO 7380-1:2022 (sample)', url: 'https://cdn.standards.iteh.ai/samples/78699/a175805085534f98983d6c8aa583a5b0/ISO-7380-1-2022.pdf', domain: 'standards.iteh.ai', backs: 'ISO 7380-1 button head dimensions and size range' },
    fuller7380:    { label: 'ISO 7380-1 Specifications', url: 'https://fullerfasteners.com/tech/iso-7380-1-specifications-hex-socket-button-head-screws/', domain: 'fullerfasteners.com', backs: 'ISO 7380-1 cross-check' },
    accu7380tx:    { label: 'Torx Button Screws (ISO 7380) — product pages M3–M12', url: 'https://accu-components.com/us/torx-button-screws/14533-SHB-M6-30-A2', domain: 'accu-components.com', backs: 'Torx button head T-size and recess depth (distributor data)' },
    westfield7380_2: { label: 'ISO 7380-2 Torx Drive Button Head Screws with Flange', url: 'https://www.westfieldfasteners.co.uk/Standards/ScrewBolt-TXBtnFlg-M.pdf', domain: 'westfieldfasteners.co.uk', backs: 'button head T-size cross-check M3–M10' },
    iso10642:      { label: 'ISO 10642:2004 (sample)', url: 'https://cdn.standards.iteh.ai/samples/34454/32dec7e84d974361b85f744935ab2175/ISO-10642-2004.pdf', domain: 'standards.iteh.ai', backs: 'ISO 10642 countersunk dimensions, 90° head angle' },
    fuller10642:   { label: 'ISO 10642 Specifications', url: 'https://fullerfasteners.com/tech/iso-10642-specifications-hex-socket-countersunk-head-screws/', domain: 'fullerfasteners.com', backs: 'ISO 10642 cross-check' },
    iso14581:      { label: 'ISO 14581:2013 (sample)', url: 'https://cdn.standards.iteh.ai/samples/56219/1ae60f07e2a24bb691e8e71ff0a064f4/ISO-14581-2013.pdf', domain: 'standards.iteh.ai', backs: 'ISO 14581 Torx countersunk dimensions' },
    fasteners_eu14581: { label: 'ISO 14581 — Hexalobular socket countersunk flat head screws', url: 'https://www.fasteners.eu/standards/iso/14581/', domain: 'fasteners.eu', backs: 'ISO 14581 cross-check' },
    fuller7984:    { label: 'DIN 7984 Specifications', url: 'https://fullerfasteners.com/tech/din-7984-specifications-hex-socket-head-cap-screws-with-low-head/', domain: 'fullerfasteners.com', backs: 'DIN 7984 M3–M12, M16, M20, M24' },
    westfield7984: { label: 'DIN 7984 — Hexagon Socket Head Cap Screws with Low Head', url: 'https://www.westfieldfasteners.co.uk/Standards/ScrewBolt-SHCapLow-M.pdf', domain: 'westfieldfasteners.co.uk', backs: 'DIN 7984 incl. M14, M18, M22' },
    iso14580:      { label: 'ISO 14580:2011 (sample)', url: 'https://cdn.standards.iteh.ai/samples/56456/88025f720d57423b9e2c1ceb78304eec/ISO-14580-2011.pdf', domain: 'standards.iteh.ai', backs: 'ISO 14580 dimensions and M2–M10 scope' },
    fuller14580:   { label: 'ISO 14580 Specifications', url: 'https://fullerfasteners.com/tech/iso-14580-specifications-hexalobular-socket-cheese-head-screws/', domain: 'fullerfasteners.com', backs: 'ISO 14580 cross-check' },
    fasteners_eu4017: { label: 'ISO 4017 — Hexagon head bolts with thread up to head', url: 'https://www.fasteners.eu/standards/ISO/4017/', domain: 'fasteners.eu', backs: 'ISO 4017 s, k, e, dw' },
    westfield4017: { label: 'ISO 4017 Hex Head Set Screw', url: 'https://www.westfieldfasteners.co.uk/Standards/ScrewBolt-HexHd4017-M-THRfull.pdf', domain: 'westfieldfasteners.co.uk', backs: 'ISO 4017 cross-check incl. M27/M30 grade B' },
    andrews4017:   { label: 'ISO 4017 Hexagon head screws — Basic dimensions', url: 'https://andrewsfasteners.uk/standards/iso-4017-hexagon-head-screws-basic-dimensions/', domain: 'andrewsfasteners.uk', backs: 'ISO 4017 cross-check M12–M30' },
    aft4162:       { label: 'Metric Hex Flange Bolt ISO 4162 Size Chart', url: 'https://www.aftfasteners.com/metric-hex-flange-bolt-iso-4162-mechanical-technical-information/', domain: 'aftfasteners.com', backs: 'ISO 4162 s, k, dc, e' },
    jignesh4162:   { label: 'ISO 4162 Flange Bolts — Dimensions', url: 'https://www.jigneshsteel.com/din-6921-iso-4162-flange-bolts.html', domain: 'jigneshsteel.com', backs: 'ISO 4162 cross-check' },
    globalfastener4162: { label: 'ISO 4162-1990 Hexagon Flange Bolts — Small Series', url: 'https://www.globalfastener.com/standards/detail_151.html', domain: 'globalfastener.com', backs: 'ISO 4162 flange thickness c; M5–M16 scope' },
    bossard898:    { label: 'Screws property class 4.6 to 12.9 (01-2025)', url: 'https://assets.eu.ctfassets.net/0vp0u5uh75zd/1VPwGxSRcAQdDRArMtTqeY/8fe01cf6ef692e134b45f895fb69fe97/012_016_Screws_property_class46_Fastening_EN_01_2025.pdf', domain: 'Bossard (assets.eu.ctfassets.net)', backs: 'ISO 898-1 Rm, Rp0.2, Sp, elongation, hardness' },
    kova898:       { label: 'ISO 898 Part 1 – 2013 (Extract)', url: 'https://www.kova.in/technical-information/iso898-1/', domain: 'kova.in', backs: 'ISO 898-1 cross-check' },
    bssa3506:      { label: 'Stainless Steel Fasteners to BS EN ISO 3506', url: 'https://bssa.org.uk/wp-content/uploads/2022/08/Microsoft-Word-SSAS2.31-Fastener-Grades-A1A2_A3_-A4_A5_-to-BS-EN-ISO-3506-1.pdf', domain: 'bssa.org.uk', backs: 'A2-70 / A4-80 Rm, Rp0.2, elongation' },
    wuerth3506:    { label: 'Rust and acid-resistant fasteners (technical section)', url: 'https://www.wuerth-industrie.com/web/media/en/pictures/wuerthindustrie/technikportal/dinokapitel/Kapitel_02_DINO_techn_Teil.pdf', domain: 'wuerth-industrie.com', backs: 'A2-70 / A4-80 cross-check' },
    iso3506abs:    { label: 'ISO 3506-1:2020 — abstract', url: 'https://www.iso.org/standard/70045.html', domain: 'iso.org', backs: 'stainless scope: coarse M1.6–M39, fine M8×1–M39×3' },
    iso898abs:     { label: 'ISO 898-1:2013 — abstract', url: 'https://www.iso.org/standard/60610.html', domain: 'iso.org', backs: 'steel scope: coarse M1.6–M39, fine M8×1–M39×3' }
  }
};
