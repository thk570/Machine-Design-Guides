// Machine Design Guides — index of shared driveshaft libraries (see structure-and-conventions.md, "Shared component libraries").
// One entry per maker file in data/. Pages that use driveshafts load this, then each file listed; every file pushes
// its library onto window.MDG_DRIVESHAFT_LIBS. To add a maker: add data/driveshafts_<maker>.js, then its name here.
window.MDG_DRIVESHAFT_FILES = [
  "driveshafts_gwb.js"
];
