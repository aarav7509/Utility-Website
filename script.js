/* ===================================================================
   Convertersolutions — Unit Converter engine
=================================================================== */

const CATEGORIES = {
  length: {
    label: "Length", icon: "📏", base: "m",
    units: {
      mm: { name: "Millimeters", factor: 0.001, system: "metric" },
      cm: { name: "Centimeters", factor: 0.01, system: "metric" },
      m:  { name: "Meters", factor: 1, system: "metric" },
      km: { name: "Kilometers", factor: 1000, system: "metric" },
      in: { name: "Inches", factor: 0.0254, system: "imperial" },
      ft: { name: "Feet", factor: 0.3048, system: "imperial" },
      yd: { name: "Yards", factor: 0.9144, system: "imperial" },
      mi: { name: "Miles", factor: 1609.344, system: "imperial" }
    },
    defaultMetric: ["m", "km"], defaultImperial: ["ft", "mi"]
  },
  weight: {
    label: "Weight", icon: "⚖️", base: "kg",
    units: {
      mg: { name: "Milligrams", factor: 0.000001, system: "metric" },
      g:  { name: "Grams", factor: 0.001, system: "metric" },
      kg: { name: "Kilograms", factor: 1, system: "metric" },
      t:  { name: "Metric tons", factor: 1000, system: "metric" },
      oz: { name: "Ounces", factor: 0.0283495231, system: "imperial" },
      lb: { name: "Pounds", factor: 0.45359237, system: "imperial" },
      st: { name: "Stone", factor: 6.35029318, system: "imperial" }
    },
    defaultMetric: ["kg", "g"], defaultImperial: ["lb", "oz"]
  },
  temperature: {
    label: "Temperature", icon: "🌡️", base: "c",
    units: {
      c: { name: "Celsius", system: "metric" },
      f: { name: "Fahrenheit", system: "imperial" },
      k: { name: "Kelvin", system: "metric" }
    },
    defaultMetric: ["c", "f"], defaultImperial: ["f", "c"]
  },
  volume: {
    label: "Volume", icon: "🧪", base: "l",
    units: {
      ml:   { name: "Milliliters", factor: 0.001, system: "metric" },
      l:    { name: "Liters", factor: 1, system: "metric" },
      m3:   { name: "Cubic meters", factor: 1000, system: "metric" },
      tsp:  { name: "Teaspoons", factor: 0.00492892, system: "imperial" },
      tbsp: { name: "Tablespoons", factor: 0.0147868, system: "imperial" },
      cup:  { name: "Cups", factor: 0.24, system: "imperial" },
      floz: { name: "Fluid ounces", factor: 0.0295735, system: "imperial" },
      pt:   { name: "Pints", factor: 0.473176, system: "imperial" },
      qt:   { name: "Quarts", factor: 0.946353, system: "imperial" },
      gal:  { name: "Gallons", factor: 3.78541, system: "imperial" }
    },
    defaultMetric: ["l", "ml"], defaultImperial: ["cup", "floz"]
  },
  speed: {
    label: "Speed", icon: "🚀", base: "ms",
    units: {
      ms:   { name: "Meters/second", factor: 1, system: "metric" },
      kmh:  { name: "Kilometers/hour", factor: 0.277778, system: "metric" },
      mph:  { name: "Miles/hour", factor: 0.44704, system: "imperial" },
      kn:   { name: "Knots", factor: 0.514444, system: "imperial" },
      fts:  { name: "Feet/second", factor: 0.3048, system: "imperial" }
    },
    defaultMetric: ["kmh", "ms"], defaultImperial: ["mph", "kn"]
  },
  area: {
    label: "Area", icon: "📐", base: "m2",
    units: {
      mm2: { name: "Sq. millimeters", factor: 0.000001, system: "metric" },
      cm2: { name: "Sq. centimeters", factor: 0.0001, system: "metric" },
      m2:  { name: "Sq. meters", factor: 1, system: "metric" },
      ha:  { name: "Hectares", factor: 10000, system: "metric" },
      km2: { name: "Sq. kilometers", factor: 1000000, system: "metric" },
      ft2: { name: "Sq. feet", factor: 0.092903, system: "imperial" },
      yd2: { name: "Sq. yards", factor: 0.836127, system: "imperial" },
      ac:  { name: "Acres", factor: 4046.86, system: "imperial" },
      mi2: { name: "Sq. miles", factor: 2589988.11, system: "imperial" }
    },
    defaultMetric: ["m2", "ha"], defaultImperial: ["ft2", "ac"]
  },
  data: {
    label: "Data", icon: "💾", base: "B",
    units: {
      b:  { name: "Bits", factor: 0.125, system: "metric" },
      B:  { name: "Bytes", factor: 1, system: "metric" },
      KB: { name: "Kilobytes", factor: 1024, system: "metric" },
      MB: { name: "Megabytes", factor: 1048576, system: "metric" },
      GB: { name: "Gigabytes", factor: 1073741824, system: "metric" },
      TB: { name: "Terabytes", factor: 1099511627776, system: "metric" }
    },
    defaultMetric: ["MB", "GB"], defaultImperial: ["MB", "GB"]
  },
  pressure: {
    label: "Pressure", icon: "🎚️", base: "pa",
    units: {
      pa:   { name: "Pascals", factor: 1, system: "metric" },
      kpa:  { name: "Kilopascals", factor: 1000, system: "metric" },
      bar:  { name: "Bar", factor: 100000, system: "metric" },
      psi:  { name: "PSI", factor: 6894.76, system: "imperial" },
      atm:  { name: "Atmospheres", factor: 101325, system: "metric" },
      mmhg: { name: "mmHg", factor: 133.322, system: "metric" }
    },
    defaultMetric: ["kpa", "bar"], defaultImperial: ["psi", "bar"]
  },
  energy: {
    label: "Energy", icon: "⚡", base: "j",
    units: {
      j:    { name: "Joules", factor: 1, system: "metric" },
      kj:   { name: "Kilojoules", factor: 1000, system: "metric" },
      cal:  { name: "Calories", factor: 4.184, system: "metric" },
      kcal: { name: "Kilocalories", factor: 4184, system: "metric" },
      wh:   { name: "Watt-hours", factor: 3600, system: "metric" },
      kwh:  { name: "Kilowatt-hours", factor: 3600000, system: "metric" },
      btu:  { name: "BTU", factor: 1055.06, system: "imperial" }
    },
    defaultMetric: ["kj", "kcal"], defaultImperial: ["btu", "kcal"]
  }
};

const currentCategory = document.body.dataset.category || "length";
let unitSystem = "metric"; // metric | imperial

/* ---------- temperature conversion (non-linear) ---------- */
function toCelsius(value, unit) {
  if (unit === "c") return value;
  if (unit === "f") return (value - 32) * (5 / 9);
  if (unit === "k") return value - 273.15;
}
function fromCelsius(value, unit) {
  if (unit === "c") return value;
  if (unit === "f") return value * (9 / 5) + 32;
  if (unit === "k") return value + 273.15;
}

/* ---------- core conversion ---------- */
function convertValue(category, value, fromUnit, toUnit) {
  if (category === "temperature") {
    return fromCelsius(toCelsius(value, fromUnit), toUnit);
  }
  const cat = CATEGORIES[category];
  const base = value * cat.units[fromUnit].factor;
  return base / cat.units[toUnit].factor;
}

function formatNumber(n) {
  if (!isFinite(n)) return "—";
  if (Math.abs(n) >= 1e9 || (Math.abs(n) < 0.0001 && n !== 0)) {
    return n.toExponential(4);
  }
  const decimals = Math.abs(n) >= 100 ? 2 : Math.abs(n) >= 1 ? 4 : 6;
  let s = n.toFixed(decimals);
  s = s.replace(/\.?0+$/, "");
  return s;
}

/* ---------- UI wiring ---------- */
function populateSelects() {
  const cat = CATEGORIES[currentCategory];
  const fromSel = document.getElementById("unitFromSel");
  const toSel = document.getElementById("unitToSel");
  fromSel.innerHTML = "";
  toSel.innerHTML = "";
  Object.entries(cat.units).forEach(([key, u]) => {
    fromSel.appendChild(new Option(u.name, key));
    toSel.appendChild(new Option(u.name, key));
  });
  const defaults = unitSystem === "metric" ? cat.defaultMetric : cat.defaultImperial;
  fromSel.value = defaults[0];
  toSel.value = defaults[1];
}

function setSystem(system) {
  unitSystem = system;
  document.querySelectorAll(".system-btn").forEach(b => {
    b.classList.toggle("active", b.dataset.system === system);
  });
  populateSelects();
  convertUnit();
}

function convertUnit() {
  const fromVal = parseFloat(document.getElementById("unitFrom").value);
  const fromUnit = document.getElementById("unitFromSel").value;
  const toUnit = document.getElementById("unitToSel").value;
  const resultInput = document.getElementById("unitTo");
  const readoutValue = document.getElementById("readoutValue");
  const readoutSub = document.getElementById("readoutSub");
  const cat = CATEGORIES[currentCategory];

  if (isNaN(fromVal)) {
    resultInput.value = "";
    readoutValue.textContent = "—";
    readoutSub.textContent = "Enter a value to convert";
    return;
  }

  const result = convertValue(currentCategory, fromVal, fromUnit, toUnit);
  const formatted = formatNumber(result);
  resultInput.value = formatted;
  readoutValue.textContent = formatted;
  readoutSub.textContent = `${formatNumber(fromVal)} ${cat.units[fromUnit].name} = ${formatted} ${cat.units[toUnit].name}`;
}

function swapUnit() {
  const fromSel = document.getElementById("unitFromSel");
  const toSel = document.getElementById("unitToSel");
  const tmp = fromSel.value;
  fromSel.value = toSel.value;
  toSel.value = tmp;
  convertUnit();
}

function copyResult() {
  const val = document.getElementById("unitTo").value;
  if (!val) return;
  navigator.clipboard?.writeText(val).then(() => {
    const toast = document.getElementById("copyToast");
    if (!toast) return;
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), 1600);
  });
}

/* ---------- header dropdown ---------- */
document.addEventListener("click", (e) => {
  document.querySelectorAll(".tools-menu[open]").forEach((menu) => {
    if (!menu.contains(e.target)) menu.removeAttribute("open");
  });
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    document.querySelectorAll(".tools-menu[open]").forEach((menu) => menu.removeAttribute("open"));
  }
});

/* ---------- init ---------- */
document.addEventListener("DOMContentLoaded", () => {
  if (!document.getElementById("unitFromSel")) return; // not a converter page
  populateSelects();
  convertUnit();

  document.getElementById("unitFrom").addEventListener("input", convertUnit);
  document.getElementById("unitFromSel").addEventListener("change", convertUnit);
  document.getElementById("unitToSel").addEventListener("change", convertUnit);
  document.getElementById("swapBtn").addEventListener("click", swapUnit);
  document.getElementById("copyBtn").addEventListener("click", copyResult);
  document.querySelectorAll(".system-btn").forEach(b => {
    b.addEventListener("click", () => setSystem(b.dataset.system));
  });
});
