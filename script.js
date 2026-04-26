
// ══════════════════════════════════════════
//  COPY TO CLIPBOARD
// ══════════════════════════════════════════
let toastTimer = null;

function showToast(msg) {
  const toast = document.getElementById('copyToast');
  toast.textContent = msg || '✓ Copied to clipboard';
  toast.classList.add('show');
  if (toastTimer) clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2200);
}

function copyResult(resultId, btnId) {
  const el  = document.getElementById(resultId);
  const btn = document.getElementById(btnId);
  if (!el || el.textContent === '—') return;

  navigator.clipboard.writeText(el.textContent.trim()).then(() => {
    btn.textContent = '✓';
    btn.classList.add('copied');
    showToast('✓ Copied to clipboard');
    setTimeout(() => {
      btn.textContent = '⎘';
      btn.classList.remove('copied');
    }, 2000);
  }).catch(() => {
    const ta = document.createElement('textarea');
    ta.value = el.textContent.trim();
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
    btn.textContent = '✓';
    btn.classList.add('copied');
    showToast('✓ Copied to clipboard');
    setTimeout(() => { btn.textContent = '⎘'; btn.classList.remove('copied'); }, 2000);
  });
}

function copyTimeResult(btnId) {
  const timeEl = document.getElementById('timeResult');
  const subEl  = document.getElementById('timeResultSub');
  const btn    = document.getElementById(btnId);
  if (!timeEl || timeEl.textContent === '—') return;

  const text = `${timeEl.textContent.trim()} — ${subEl.textContent.trim()}`;
  navigator.clipboard.writeText(text).then(() => {
    btn.textContent = '✓';
    btn.classList.add('copied');
    showToast('✓ Copied to clipboard');
    setTimeout(() => { btn.textContent = '⎘'; btn.classList.remove('copied'); }, 2000);
  }).catch(() => {
    const ta = document.createElement('textarea');
    ta.value = text;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
    btn.textContent = '✓';
    btn.classList.add('copied');
    showToast('✓ Copied to clipboard');
    setTimeout(() => { btn.textContent = '⎘'; btn.classList.remove('copied'); }, 2000);
  });
}

// ══════════════════════════════════════════
//  REGION CONFIG
// ══════════════════════════════════════════
const REGIONS = {
  US: { flag:'🇺🇸', currency:'USD', system:'imperial', tz:'America/New_York',       tzLabel:'New York' },
  GB: { flag:'🇬🇧', currency:'GBP', system:'metric',   tz:'Europe/London',           tzLabel:'London' },
  EU: { flag:'🇪🇺', currency:'EUR', system:'metric',   tz:'Europe/Paris',            tzLabel:'Paris' },
  CA: { flag:'🇨🇦', currency:'CAD', system:'metric',   tz:'America/Toronto',         tzLabel:'Toronto' },
  AU: { flag:'🇦🇺', currency:'AUD', system:'metric',   tz:'Australia/Sydney',        tzLabel:'Sydney' },
  IN: { flag:'🇮🇳', currency:'INR', system:'metric',   tz:'Asia/Kolkata',            tzLabel:'Mumbai' },
  JP: { flag:'🇯🇵', currency:'JPY', system:'metric',   tz:'Asia/Tokyo',              tzLabel:'Tokyo' },
  CN: { flag:'🇨🇳', currency:'CNY', system:'metric',   tz:'Asia/Shanghai',           tzLabel:'Shanghai' },
  BR: { flag:'🇧🇷', currency:'BRL', system:'metric',   tz:'America/Sao_Paulo',       tzLabel:'São Paulo' },
  MX: { flag:'🇲🇽', currency:'MXN', system:'metric',   tz:'America/Mexico_City',     tzLabel:'Mexico City' },
  AE: { flag:'🇦🇪', currency:'AED', system:'metric',   tz:'Asia/Dubai',              tzLabel:'Dubai' },
  SG: { flag:'🇸🇬', currency:'SGD', system:'metric',   tz:'Asia/Singapore',          tzLabel:'Singapore' },
  ZA: { flag:'🇿🇦', currency:'ZAR', system:'metric',   tz:'Africa/Johannesburg',     tzLabel:'Johannesburg' },
  KR: { flag:'🇰🇷', currency:'KRW', system:'metric',   tz:'Asia/Seoul',              tzLabel:'Seoul' },
  NG: { flag:'🇳🇬', currency:'NGN', system:'metric',   tz:'Africa/Lagos',            tzLabel:'Lagos' },
  PK: { flag:'🇵🇰', currency:'PKR', system:'metric',   tz:'Asia/Karachi',            tzLabel:'Karachi' },
  BD: { flag:'🇧🇩', currency:'BDT', system:'metric',   tz:'Asia/Dhaka',              tzLabel:'Dhaka' },
  TR: { flag:'🇹🇷', currency:'TRY', system:'metric',   tz:'Europe/Istanbul',         tzLabel:'Istanbul' },
  ID: { flag:'🇮🇩', currency:'IDR', system:'metric',   tz:'Asia/Jakarta',            tzLabel:'Jakarta' },
  SA: { flag:'🇸🇦', currency:'SAR', system:'metric',   tz:'Asia/Riyadh',             tzLabel:'Riyadh' },
  AR: { flag:'🇦🇷', currency:'ARS', system:'metric',   tz:'America/Argentina/Buenos_Aires', tzLabel:'Buenos Aires' },
  EG: { flag:'🇪🇬', currency:'EGP', system:'metric',   tz:'Africa/Cairo',            tzLabel:'Cairo' },
  TH: { flag:'🇹🇭', currency:'THB', system:'metric',   tz:'Asia/Bangkok',            tzLabel:'Bangkok' },
  MY: { flag:'🇲🇾', currency:'MYR', system:'metric',   tz:'Asia/Kuala_Lumpur',       tzLabel:'Kuala Lumpur' },
  PH: { flag:'🇵🇭', currency:'PHP', system:'metric',   tz:'Asia/Manila',             tzLabel:'Manila' },
  KE: { flag:'🇰🇪', currency:'KES', system:'metric',   tz:'Africa/Nairobi',          tzLabel:'Nairobi' },
  GH: { flag:'🇬🇭', currency:'GHS', system:'metric',   tz:'Africa/Accra',            tzLabel:'Accra' },
  MA: { flag:'🇲🇦', currency:'MAD', system:'metric',   tz:'Africa/Casablanca',       tzLabel:'Casablanca' },
  PE: { flag:'🇵🇪', currency:'PEN', system:'metric',   tz:'America/Lima',            tzLabel:'Lima' },
  VN: { flag:'🇻🇳', currency:'VND', system:'metric',   tz:'Asia/Ho_Chi_Minh',        tzLabel:'Ho Chi Minh' },
};

let currentRegion = 'US';

function applyRegion() {
  const code = document.getElementById('regionSelect').value;
  currentRegion = code;
  const r = REGIONS[code];
  document.getElementById('regionFlag').textContent = r.flag;
  const toSel = document.getElementById('currTo');
  if (toSel) {
    if (toSel.querySelector(`option[value="${r.currency}"]`)) toSel.value = r.currency;
    convertCurrency();
  }
  const systemLabel = document.getElementById('unitSystemLabel');
  if (systemLabel) systemLabel.textContent = `System: ${r.system === 'metric' ? 'Metric (SI)' : 'Imperial / US Customary'}`;
  if (document.getElementById('unitCategories')) buildUnitSelects(r.system);
  if (document.getElementById('worldClock')) updateWorldClock();
}

// ══════════════════════════════════════════
//  TAB SWITCHING — ✅ FIX 8: Updates aria-selected on all tabs
// ══════════════════════════════════════════
function switchTab(name) {
  document.querySelectorAll('.panel').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.tab-btn').forEach(b => {
    b.classList.remove('active');
    b.setAttribute('aria-selected', 'false');
  });
  document.getElementById('panel-' + name).classList.add('active');
  const activeBtn = document.getElementById('tab-' + name);
  activeBtn.classList.add('active');
  activeBtn.setAttribute('aria-selected', 'true');
  if (name === 'time') updateWorldClock();
}

// ══════════════════════════════════════════
//  CURRENCY DATA
// ══════════════════════════════════════════
const CURRENCY_LIST = [
  ['AED', 'UAE Dirham',                 'د.إ'],
  ['AFN', 'Afghan Afghani',             '؋'],
  ['ALL', 'Albanian Lek',               'L'],
  ['AMD', 'Armenian Dram',              '֏'],
  ['ANG', 'Netherlands Antillean Guilder','ƒ'],
  ['AOA', 'Angolan Kwanza',             'Kz'],
  ['ARS', 'Argentine Peso',             '$'],
  ['AUD', 'Australian Dollar',          'A$'],
  ['AZN', 'Azerbaijani Manat',          '₼'],
  ['BAM', 'Bosnia-Herzegovina Mark',    'KM'],
  ['BBD', 'Barbadian Dollar',           'Bds$'],
  ['BDT', 'Bangladeshi Taka',           '৳'],
  ['BGN', 'Bulgarian Lev',              'лв'],
  ['BHD', 'Bahraini Dinar',             'BD'],
  ['BIF', 'Burundian Franc',            'Fr'],
  ['BMD', 'Bermudan Dollar',            '$'],
  ['BND', 'Brunei Dollar',              'B$'],
  ['BOB', 'Bolivian Boliviano',         'Bs.'],
  ['BRL', 'Brazilian Real',             'R$'],
  ['BSD', 'Bahamian Dollar',            'B$'],
  ['BTN', 'Bhutanese Ngultrum',         'Nu'],
  ['BWP', 'Botswanan Pula',             'P'],
  ['BYN', 'Belarusian Ruble',           'Br'],
  ['BZD', 'Belize Dollar',              'BZ$'],
  ['CAD', 'Canadian Dollar',            'C$'],
  ['CDF', 'Congolese Franc',            'FC'],
  ['CHF', 'Swiss Franc',                'Fr'],
  ['CLP', 'Chilean Peso',               '$'],
  ['CNY', 'Chinese Yuan',               '¥'],
  ['COP', 'Colombian Peso',             '$'],
  ['CRC', 'Costa Rican Colón',          '₡'],
  ['CUP', 'Cuban Peso',                 '$'],
  ['CVE', 'Cape Verdean Escudo',        'Esc'],
  ['CZK', 'Czech Koruna',               'Kč'],
  ['DJF', 'Djiboutian Franc',           'Fr'],
  ['DKK', 'Danish Krone',               'kr'],
  ['DOP', 'Dominican Peso',             'RD$'],
  ['DZD', 'Algerian Dinar',             'دج'],
  ['EGP', 'Egyptian Pound',             'E£'],
  ['ERN', 'Eritrean Nakfa',             'Nfk'],
  ['ETB', 'Ethiopian Birr',             'Br'],
  ['EUR', 'Euro',                        '€'],
  ['FJD', 'Fijian Dollar',              'FJ$'],
  ['FKP', 'Falkland Islands Pound',     '£'],
  ['GBP', 'British Pound',              '£'],
  ['GEL', 'Georgian Lari',              '₾'],
  ['GHS', 'Ghanaian Cedi',              '₵'],
  ['GMD', 'Gambian Dalasi',             'D'],
  ['GNF', 'Guinean Franc',              'Fr'],
  ['GTQ', 'Guatemalan Quetzal',         'Q'],
  ['GYD', 'Guyanese Dollar',            'G$'],
  ['HKD', 'Hong Kong Dollar',           'HK$'],
  ['HNL', 'Honduran Lempira',           'L'],
  ['HTG', 'Haitian Gourde',             'G'],
  ['HUF', 'Hungarian Forint',           'Ft'],
  ['IDR', 'Indonesian Rupiah',          'Rp'],
  ['ILS', 'Israeli Shekel',             '₪'],
  ['INR', 'Indian Rupee',               '₹'],
  ['IQD', 'Iraqi Dinar',                'ع.د'],
  ['IRR', 'Iranian Rial',               '﷼'],
  ['ISK', 'Icelandic Króna',            'kr'],
  ['JMD', 'Jamaican Dollar',            'J$'],
  ['JOD', 'Jordanian Dinar',            'JD'],
  ['JPY', 'Japanese Yen',               '¥'],
  ['KES', 'Kenyan Shilling',            'KSh'],
  ['KGS', 'Kyrgystani Som',             'лв'],
  ['KHR', 'Cambodian Riel',             '៛'],
  ['KMF', 'Comorian Franc',             'CF'],
  ['KRW', 'South Korean Won',           '₩'],
  ['KWD', 'Kuwaiti Dinar',              'KD'],
  ['KYD', 'Cayman Islands Dollar',      'CI$'],
  ['KZT', 'Kazakhstani Tenge',          '₸'],
  ['LAK', 'Laotian Kip',               '₭'],
  ['LBP', 'Lebanese Pound',             'ل.ل'],
  ['LKR', 'Sri Lankan Rupee',           'Rs'],
  ['LRD', 'Liberian Dollar',            'L$'],
  ['LSL', 'Lesotho Loti',              'L'],
  ['LYD', 'Libyan Dinar',               'LD'],
  ['MAD', 'Moroccan Dirham',            'MAD'],
  ['MDL', 'Moldovan Leu',               'L'],
  ['MGA', 'Malagasy Ariary',            'Ar'],
  ['MKD', 'Macedonian Denar',           'ден'],
  ['MMK', 'Myanmar Kyat',               'K'],
  ['MNT', 'Mongolian Tugrik',           '₮'],
  ['MOP', 'Macanese Pataca',            'P'],
  ['MRU', 'Mauritanian Ouguiya',        'UM'],
  ['MUR', 'Mauritian Rupee',            '₨'],
  ['MVR', 'Maldivian Rufiyaa',          'Rf'],
  ['MWK', 'Malawian Kwacha',            'MK'],
  ['MXN', 'Mexican Peso',               '$'],
  ['MYR', 'Malaysian Ringgit',          'RM'],
  ['MZN', 'Mozambican Metical',         'MT'],
  ['NAD', 'Namibian Dollar',            'N$'],
  ['NGN', 'Nigerian Naira',             '₦'],
  ['NIO', 'Nicaraguan Córdoba',         'C$'],
  ['NOK', 'Norwegian Krone',            'kr'],
  ['NPR', 'Nepali Rupee',               '₨'],
  ['NZD', 'New Zealand Dollar',         'NZ$'],
  ['OMR', 'Omani Rial',                 'ر.ع.'],
  ['PAB', 'Panamanian Balboa',          'B/.'],
  ['PEN', 'Peruvian Sol',               'S/.'],
  ['PGK', 'Papua New Guinean Kina',     'K'],
  ['PHP', 'Philippine Peso',            '₱'],
  ['PKR', 'Pakistani Rupee',            '₨'],
  ['PLN', 'Polish Złoty',               'zł'],
  ['PYG', 'Paraguayan Guaraní',         'Gs'],
  ['QAR', 'Qatari Riyal',               'ر.ق'],
  ['RON', 'Romanian Leu',               'lei'],
  ['RSD', 'Serbian Dinar',              'din'],
  ['RUB', 'Russian Ruble',              '₽'],
  ['RWF', 'Rwandan Franc',              'Fr'],
  ['SAR', 'Saudi Riyal',                'ر.س'],
  ['SBD', 'Solomon Islands Dollar',     'SI$'],
  ['SCR', 'Seychellois Rupee',          '₨'],
  ['SDG', 'Sudanese Pound',             'ج.س.'],
  ['SEK', 'Swedish Krona',              'kr'],
  ['SGD', 'Singapore Dollar',           'S$'],
  ['SLL', 'Sierra Leonean Leone',       'Le'],
  ['SOS', 'Somali Shilling',            'Sh'],
  ['SRD', 'Surinamese Dollar',          '$'],
  ['STN', 'São Tomé & Príncipe Dobra',  'Db'],
  ['SVC', 'Salvadoran Colón',           '₡'],
  ['SZL', 'Swazi Lilangeni',            'L'],
  ['THB', 'Thai Baht',                  '฿'],
  ['TJS', 'Tajikistani Somoni',         'SM'],
  ['TMT', 'Turkmenistani Manat',        'T'],
  ['TND', 'Tunisian Dinar',             'DT'],
  ['TOP', 'Tongan Paʻanga',             'T$'],
  ['TRY', 'Turkish Lira',               '₺'],
  ['TTD', 'Trinidad & Tobago Dollar',   'TT$'],
  ['TWD', 'Taiwan Dollar',              'NT$'],
  ['TZS', 'Tanzanian Shilling',         'Sh'],
  ['UAH', 'Ukrainian Hryvnia',          '₴'],
  ['UGX', 'Ugandan Shilling',           'USh'],
  ['USD', 'US Dollar',                  '$'],
  ['UYU', 'Uruguayan Peso',             '$U'],
  ['UZS', 'Uzbekistani Som',            'so\'m'],
  ['VES', 'Venezuelan Bolívar',         'Bs.'],
  ['VND', 'Vietnamese Dong',            '₫'],
  ['VUV', 'Vanuatu Vatu',               'Vt'],
  ['WST', 'Samoan Tala',                'WS$'],
  ['XAF', 'Central African CFA Franc',  'FCFA'],
  ['XCD', 'East Caribbean Dollar',      'EC$'],
  ['XOF', 'West African CFA Franc',     'CFA'],
  ['XPF', 'CFP Franc',                  'Fr'],
  ['YER', 'Yemeni Rial',                '﷼'],
  ['ZAR', 'South African Rand',         'R'],
  ['ZMW', 'Zambian Kwacha',             'ZK'],
  ['ZWL', 'Zimbabwean Dollar',          'Z$'],
];

const CURRENCY_NAMES   = {};
const CURRENCY_SYMBOLS = {};
CURRENCY_LIST.forEach(([code, name, sym]) => {
  CURRENCY_NAMES[code]   = name;
  CURRENCY_SYMBOLS[code] = sym;
});

const ALL_CURRENCIES = CURRENCY_LIST.map(([code]) => code);

const FALLBACK_RATES = {
  usd:1,      aed:3.673,  afn:71.3,   all:93.2,   amd:389,    ang:1.79,
  aoa:830,    ars:900,    aud:1.528,  azn:1.70,   bam:1.80,   bbd:2.00,
  bdt:110,    bgn:1.797,  bhd:0.376,  bif:2880,   bmd:1.00,   bnd:1.338,
  bob:6.91,   brl:4.972,  bsd:1.00,   btn:83.12,  bwp:13.5,   byn:3.27,
  bzd:2.01,   cad:1.363,  cdf:2760,   chf:0.898,  clp:906,    cny:7.241,
  cop:3920,   crc:518,    cup:24.0,   cve:101.5,  czk:22.91,  djf:177.7,
  dkk:6.887,  dop:58.5,   dzd:134.5,  egp:30.9,   ern:15.0,   etb:57.5,
  eur:0.922,  fjd:2.24,   fkp:0.787,  gbp:0.787,  gel:2.66,   ghs:14.5,
  gmd:64.5,   gnf:8600,   gtq:7.77,   gyd:209,    hkd:7.824,  hnl:24.7,
  htg:132,    huf:357.2,  idr:15680,  ils:3.652,  inr:83.12,  iqd:1310,
  irr:42050,  isk:137.5,  jmd:156,    jod:0.709,  jpy:149.8,  kes:129.5,
  kgs:89.3,   khr:4090,   kmf:453,    krw:1325,   kwd:0.308,  kyd:0.833,
  kzt:448,    lak:21600,  lbp:89500,  lkr:304,    lrd:194,    lsl:18.63,
  lyd:4.82,   mad:10.02,  mdl:17.8,   mga:4550,   mkd:56.8,   mmk:2098,
  mnt:3400,   mop:8.05,   mru:39.8,   mur:44.5,   mvr:15.4,   mwk:1732,
  mxn:17.15,  myr:4.721,  mzn:63.7,   nad:18.63,  ngn:1540,   nio:36.8,
  nok:10.56,  npr:133,    nzd:1.628,  omr:0.385,  pab:1.00,   pen:3.73,
  pgk:3.76,   php:55.7,   pkr:278,    pln:3.944,  pyg:7320,   qar:3.641,
  ron:4.587,  rsd:107.5,  rub:91.5,   rwf:1290,   sar:3.751,  sbd:8.44,
  scr:13.8,   sdg:601,    sek:10.42,  sgd:1.338,  sll:19750,  sos:571,
  srd:36.5,   stn:22.6,   svc:8.75,   szl:18.63,  thb:35.1,   tjs:10.92,
  tmt:3.50,   tnd:3.09,   top:2.36,   try:32.15,  ttd:6.78,   twd:31.9,
  tzs:2530,   uah:37.2,   ugx:3740,   uyu:39.2,   uzs:12450,  ves:36.5,
  vnd:24600,  vuv:118,    wst:2.73,   xaf:605,    xcd:2.70,   xof:605,
  xpf:110,    yer:250,    zar:18.63,  zmw:25.8,   zwl:360,
};

let ratesCache = {};
let ratesDate  = '';

function buildCurrencyOption(code) {
  const name = CURRENCY_NAMES[code] || code;
  const sym  = CURRENCY_SYMBOLS[code] || '';
  return `<option value="${code}">${code} — ${name} (${sym})</option>`;
}

function populateCurrencySelects() {
  const fromSel = document.getElementById('currFrom');
  const toSel   = document.getElementById('currTo');
  const html = ALL_CURRENCIES.map(buildCurrencyOption).join('');
  fromSel.innerHTML = html;
  toSel.innerHTML   = html;
  fromSel.value = 'USD';
  toSel.value   = 'EUR';
  document.getElementById('currencyCountBadge').textContent = `${ALL_CURRENCIES.length} currencies`;
}

function filterCurrencies(side) {
  const query  = document.getElementById(side === 'from' ? 'searchFrom' : 'searchTo').value.trim().toLowerCase();
  const selId  = side === 'from' ? 'currFrom' : 'currTo';
  const sel    = document.getElementById(selId);
  const current = sel.value;

  const filtered = query === ''
    ? ALL_CURRENCIES
    : ALL_CURRENCIES.filter(code => {
        const name = CURRENCY_NAMES[code] || '';
        return code.toLowerCase().includes(query) || name.toLowerCase().includes(query);
      });

  sel.innerHTML = filtered.map(buildCurrencyOption).join('');
  if (filtered.includes(current)) sel.value = current;
  else if (filtered.length > 0) sel.value = filtered[0];
  convertCurrency();
}

function syncSearchFromSelect() { document.getElementById('searchFrom').value = ''; filterCurrencies('from'); }
function syncSearchToSelect()   { document.getElementById('searchTo').value = '';   filterCurrencies('to'); }

function getRate(from, to) {
  const fromKey = from.toLowerCase();
  const toKey   = to.toLowerCase();
  const fromUSD = fromKey === 'usd' ? 1 : (ratesCache[fromKey] ?? FALLBACK_RATES[fromKey] ?? 1);
  const toUSD   = toKey   === 'usd' ? 1 : (ratesCache[toKey]   ?? FALLBACK_RATES[toKey]   ?? 1);
  return toUSD / fromUSD;
}

async function tryFetch(url) {
  const res = await fetch(url, { mode:'cors' });
  if (!res.ok) throw new Error('HTTP ' + res.status);
  return res.json();
}

async function fetchRates() {
  const statusEl    = document.getElementById('rateStatus');
  const timestampEl = document.getElementById('rateTimestamp');
  statusEl.textContent = 'Fetching live exchange rates…';

  try {
    const data = await tryFetch('https://open.er-api.com/v6/latest/USD');
    if (data && data.rates) {
      ratesCache = {};
      Object.entries(data.rates).forEach(([k, v]) => ratesCache[k.toLowerCase()] = v);
      ratesCache['usd'] = 1;
      ratesDate = data.time_last_update_utc
        ? new Date(data.time_last_update_utc).toLocaleString('en-US', { dateStyle:'medium', timeStyle:'short' })
        : 'today';
      timestampEl.textContent = `Mid-market rates · Updated ${ratesDate} · ${ALL_CURRENCIES.length} currencies`;
      statusEl.textContent    = '✓ Live mid-market rates';
      convertCurrency(); buildPopularRates(); return;
    }
  } catch(e) {}

  try {
    const data = await tryFetch('https://api.frankfurter.app/latest?base=USD');
    if (data && data.rates) {
      ratesCache = {};
      Object.entries(data.rates).forEach(([k, v]) => ratesCache[k.toLowerCase()] = v);
      ratesCache['usd'] = 1;
      ratesDate = data.date || 'today';
      timestampEl.textContent = `ECB mid-market rates · ${ratesDate} · ${ALL_CURRENCIES.length} currencies`;
      statusEl.textContent    = '✓ Live rates (European Central Bank daily fix)';
      convertCurrency(); buildPopularRates(); return;
    }
  } catch(e) {}

  try {
    const data = await tryFetch('https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/usd.json');
    if (data && data.usd) {
      ratesCache = data.usd;
      ratesCache['usd'] = 1;
      ratesDate = data.date || 'today';
      timestampEl.textContent = `Rates as of ${ratesDate} · ${ALL_CURRENCIES.length} currencies`;
      statusEl.textContent    = '✓ Live rates loaded (community CDN)';
      convertCurrency(); buildPopularRates(); return;
    }
  } catch(e) {}

  ratesCache = { ...FALLBACK_RATES };
  statusEl.textContent    = '⚠ Live rates unavailable — using recent estimates';
  timestampEl.textContent = `Estimated rates · ${ALL_CURRENCIES.length} currencies`;
  convertCurrency(); buildPopularRates();
}

function convertCurrency() {
  const from   = document.getElementById('currFrom').value;
  const to     = document.getElementById('currTo').value;
  const amount = parseFloat(document.getElementById('currAmount').value) || 0;
  const rate   = getRate(from, to);
  const result = amount * rate;

  const fmt = n => {
    if (n === 0) return '0.00';
    if (Math.abs(n) >= 1e6) return n.toLocaleString('en-US', { maximumFractionDigits: 0 });
    if (Math.abs(n) < 0.001) return n.toFixed(6);
    if (Math.abs(n) < 1) return n.toFixed(4);
    if (Math.abs(n) < 100) return n.toFixed(4);
    return n.toFixed(2);
  };

  const sym = CURRENCY_SYMBOLS[to] || '';
  document.getElementById('currResult').value = fmt(result);
  document.getElementById('currResultBox').style.display = 'block';
  document.getElementById('currResultLarge').textContent = `${sym}${fmt(result)} ${to}`;
  document.getElementById('currResultSub').textContent   =
    `1 ${from} = ${fmt(rate)} ${to}  ·  ${CURRENCY_NAMES[from]||from} → ${CURRENCY_NAMES[to]||to}`;
}

function swapCurrency() {
  const f = document.getElementById('currFrom');
  const t = document.getElementById('currTo');
  [f.value, t.value] = [t.value, f.value];
  convertCurrency();
}

function buildPopularRates() {
  const pairs = [['USD','EUR'],['USD','GBP'],['USD','JPY'],['EUR','GBP'],['GBP','USD'],['USD','INR'],['USD','CNY'],['USD','AUD']];
  const strip = document.getElementById('popularRates');
  strip.innerHTML = pairs.map(([f,t]) => {
    const r = getRate(f,t);
    const fmt = n => n < 10 ? n.toFixed(4) : n.toFixed(2);
    return `<div class="rate-chip">1 ${f} = <strong>${fmt(r)} ${t}</strong></div>`;
  }).join('');
}


// ══════════════════════════════════════════
//  UNIT CONVERTER
// ══════════════════════════════════════════
const UNIT_DATA = {
  Length: {
    icon:'📏',
    units:{
      Meter:        {factor:1,         symbol:'m'},
      Kilometer:    {factor:1000,      symbol:'km'},
      Centimeter:   {factor:0.01,      symbol:'cm'},
      Millimeter:   {factor:0.001,     symbol:'mm'},
      Micrometer:   {factor:0.000001,  symbol:'μm'},
      Mile:         {factor:1609.344,  symbol:'mi'},
      Yard:         {factor:0.9144,    symbol:'yd'},
      Foot:         {factor:0.3048,    symbol:'ft'},
      Inch:         {factor:0.0254,    symbol:'in'},
      'Nautical Mile':{factor:1852,    symbol:'nmi'},
      Furlong:      {factor:201.168,   symbol:'fur'},
      'Light Year': {factor:9.461e15,  symbol:'ly'},
    },
    imperial:['Mile','Yard','Foot','Inch'],
    metric:  ['Meter','Kilometer','Centimeter','Millimeter'],
    refs:[['1 Mile','1.609 km'],['1 Foot','30.48 cm'],['1 Inch','2.54 cm'],['1 km','0.621 mi']],
  },
  Weight: {
    icon:'⚖️',
    units:{
      Kilogram:  {factor:1,        symbol:'kg'},
      Gram:      {factor:0.001,    symbol:'g'},
      Tonne:     {factor:1000,     symbol:'t'},
      Pound:     {factor:0.453592, symbol:'lb'},
      Ounce:     {factor:0.028349, symbol:'oz'},
      Stone:     {factor:6.35029,  symbol:'st'},
      Milligram: {factor:0.000001, symbol:'mg'},
      Carat:     {factor:0.0002,   symbol:'ct'},
      'US Ton':  {factor:907.185,  symbol:'ton'},
    },
    imperial:['Pound','Ounce','Stone','US Ton'],
    metric:  ['Kilogram','Gram','Tonne','Milligram'],
    refs:[['1 kg','2.205 lb'],['1 lb','0.454 kg'],['1 oz','28.35 g'],['1 Stone','6.35 kg']],
  },
  Temperature: {
    icon:'🌡️',
    units:{Celsius:{},Fahrenheit:{},Kelvin:{},Rankine:{}},
    imperial:['Fahrenheit','Rankine'],
    metric:  ['Celsius','Kelvin'],
    refs:[['0 °C','32 °F'],['100 °C','212 °F'],['37 °C','98.6 °F'],['0 K','−273.15 °C']],
    special:true,
  },
  Volume: {
    icon:'🧊',
    units:{
      Liter:        {factor:1,         symbol:'L'},
      Milliliter:   {factor:0.001,     symbol:'mL'},
      'Cubic Meter':{factor:1000,      symbol:'m³'},
      Gallon:       {factor:3.78541,   symbol:'gal'},
      Quart:        {factor:0.946353,  symbol:'qt'},
      Pint:         {factor:0.473176,  symbol:'pt'},
      Cup:          {factor:0.236588,  symbol:'cup'},
      'Fluid Oz':   {factor:0.029573,  symbol:'fl oz'},
      'UK Gallon':  {factor:4.54609,   symbol:'UK gal'},
      Tablespoon:   {factor:0.014787,  symbol:'tbsp'},
      Teaspoon:     {factor:0.004929,  symbol:'tsp'},
    },
    imperial:['Gallon','Quart','Pint','Cup','Fluid Oz','Tablespoon','Teaspoon'],
    metric:  ['Liter','Milliliter','Cubic Meter'],
    refs:[['1 L','0.264 gal'],['1 gal','3.785 L'],['1 cup','236.6 mL'],['1 pint','473.2 mL']],
  },
  Speed: {
    icon:'💨',
    units:{
      'm/s':  {factor:1,       symbol:'m/s'},
      'km/h': {factor:0.27778, symbol:'km/h'},
      'mph':  {factor:0.44704, symbol:'mph'},
      'knot': {factor:0.51444, symbol:'kn'},
      'ft/s': {factor:0.3048,  symbol:'ft/s'},
      'Mach': {factor:343,     symbol:'Ma'},
    },
    imperial:['mph','ft/s','knot'],
    metric:  ['km/h','m/s'],
    refs:[['100 km/h','62.1 mph'],['1 mph','1.609 km/h'],['1 knot','1.852 km/h'],['Mach 1','343 m/s']],
  },
  Area: {
    icon:'🗺️',
    units:{
      'm²':   {factor:1,       symbol:'m²'},
      'km²':  {factor:1e6,     symbol:'km²'},
      'cm²':  {factor:0.0001,  symbol:'cm²'},
      Hectare:{factor:10000,   symbol:'ha'},
      Acre:   {factor:4046.86, symbol:'ac'},
      'ft²':  {factor:0.09290, symbol:'ft²'},
      'yd²':  {factor:0.83613, symbol:'yd²'},
      'mi²':  {factor:2.59e6,  symbol:'mi²'},
    },
    imperial:['Acre','ft²','yd²','mi²'],
    metric:  ['m²','km²','Hectare','cm²'],
    refs:[['1 Acre','4047 m²'],['1 ha','2.471 ac'],['1 km²','247 ac'],['1 mi²','640 ac']],
  },
  Data: {
    icon:'💾',
    units:{
      Bit:      {factor:1,             symbol:'b'},
      Byte:     {factor:8,             symbol:'B'},
      Kilobyte: {factor:8192,          symbol:'KB'},
      Megabyte: {factor:8388608,       symbol:'MB'},
      Gigabyte: {factor:8589934592,    symbol:'GB'},
      Terabyte: {factor:8796093022208, symbol:'TB'},
      Petabyte: {factor:8796093022208*1024, symbol:'PB'},
    },
    imperial:[],
    metric:['Byte','Kilobyte','Megabyte','Gigabyte','Terabyte','Petabyte'],
    refs:[['1 KB','1024 B'],['1 MB','1024 KB'],['1 GB','1024 MB'],['1 TB','1024 GB']],
  },
  Pressure: {
    icon:'🔩',
    units:{
      Pascal:      {factor:1,          symbol:'Pa'},
      Kilopascal:  {factor:1000,       symbol:'kPa'},
      Bar:         {factor:100000,     symbol:'bar'},
      Atmosphere:  {factor:101325,     symbol:'atm'},
      PSI:         {factor:6894.76,    symbol:'psi'},
      Torr:        {factor:133.322,    symbol:'Torr'},
      mmHg:        {factor:133.322,    symbol:'mmHg'},
    },
    imperial:['PSI'],
    metric:  ['Pascal','Kilopascal','Bar','Atmosphere'],
    refs:[['1 atm','101.325 kPa'],['1 bar','14.504 psi'],['1 psi','6.895 kPa'],['1 atm','760 mmHg']],
  },
  Energy: {
    icon:'⚡',
    units:{
      Joule:        {factor:1,          symbol:'J'},
      Kilojoule:    {factor:1000,       symbol:'kJ'},
      Calorie:      {factor:4.184,      symbol:'cal'},
      Kilocalorie:  {factor:4184,       symbol:'kcal'},
      'Watt-hour':  {factor:3600,       symbol:'Wh'},
      'kWh':        {factor:3600000,    symbol:'kWh'},
      BTU:          {factor:1055.06,    symbol:'BTU'},
      'Foot-pound': {factor:1.35582,    symbol:'ft·lb'},
    },
    imperial:['BTU','Foot-pound','Kilocalorie'],
    metric:  ['Joule','Kilojoule','Calorie','kWh'],
    refs:[['1 kWh','3600 kJ'],['1 kcal','4.184 kJ'],['1 BTU','1.055 kJ'],['1 kJ','0.278 Wh']],
  },
};

let currentCategory = 'Length';

function buildCategoryTabs() {
  const el = document.getElementById('unitCategories');
  // ✅ FIX 9: Category buttons inside role="group" get aria-pressed to indicate current selection
  el.innerHTML = Object.entries(UNIT_DATA).map(([name,d]) =>
    `<button class="cat-btn ${name===currentCategory?'active':''}" aria-pressed="${name===currentCategory}" onclick="selectCategory('${name}')">${d.icon} ${name}</button>`
  ).join('');
}

function selectCategory(cat) {
  currentCategory = cat;
  buildCategoryTabs();
  buildUnitSelects(REGIONS[currentRegion].system);
}

function buildUnitSelects(system) {
  const data  = UNIT_DATA[currentCategory];
  const units = Object.keys(data.units);
  const preferred = system === 'imperial' ? data.imperial : data.metric;
  const ordered = [...preferred.filter(u=>units.includes(u)), ...units.filter(u=>!preferred.includes(u))];

  const fromSel = document.getElementById('unitFromSel');
  const toSel   = document.getElementById('unitToSel');
  fromSel.innerHTML = ordered.map(u=>`<option value="${u}">${u}</option>`).join('');
  toSel.innerHTML   = ordered.map(u=>`<option value="${u}">${u}</option>`).join('');
  if (ordered.length >= 2) { fromSel.value = ordered[0]; toSel.value = ordered[1]; }
  buildQuickRefs();
  convertUnit();
}

function convertUnit() {
  const cat   = UNIT_DATA[currentCategory];
  const fromU = document.getElementById('unitFromSel').value;
  const toU   = document.getElementById('unitToSel').value;
  const val   = parseFloat(document.getElementById('unitFrom').value);
  if (isNaN(val)) return;

  let result;
  if (cat.special) {
    result = convertTemp(val, fromU, toU);
  } else {
    const fF = cat.units[fromU]?.factor || 1;
    const tF = cat.units[toU]?.factor   || 1;
    result = val * fF / tF;
  }

  const fmt = n => {
    if (Math.abs(n) > 1e9 || (Math.abs(n) < 1e-4 && n !== 0)) return n.toExponential(4);
    return parseFloat(n.toPrecision(7)).toString();
  };

  document.getElementById('unitTo').value = fmt(result);
  document.getElementById('unitResultBox').style.display = 'block';
  document.getElementById('unitResultLarge').textContent = `${fmt(result)} ${toU}`;
  document.getElementById('unitResultSub').textContent   = `${val} ${fromU} = ${fmt(result)} ${toU}`;
}

function convertTemp(val, from, to) {
  let c;
  switch(from) {
    case 'Celsius':    c = val; break;
    case 'Fahrenheit': c = (val - 32) * 5/9; break;
    case 'Kelvin':     c = val - 273.15; break;
    case 'Rankine':    c = (val - 491.67) * 5/9; break;
    default: c = val;
  }
  switch(to) {
    case 'Celsius':    return c;
    case 'Fahrenheit': return c * 9/5 + 32;
    case 'Kelvin':     return c + 273.15;
    case 'Rankine':    return (c + 273.15) * 9/5;
    default: return c;
  }
}

function swapUnit() {
  const f = document.getElementById('unitFromSel');
  const t = document.getElementById('unitToSel');
  [f.value, t.value] = [t.value, f.value];
  convertUnit();
}

function buildQuickRefs() {
  const refs = UNIT_DATA[currentCategory].refs || [];
  document.getElementById('quickRefs').innerHTML = refs.map(([from,to]) =>
    `<div class="ref-item"><div class="ref-from">${from}</div><div class="ref-to">${to}</div></div>`
  ).join('');
}

// ══════════════════════════════════════════
//  TIME CONVERTER
// ══════════════════════════════════════════
const TIMEZONES = [
  {label:'UTC',                    tz:'UTC'},
  {label:'New York (ET)',          tz:'America/New_York'},
  {label:'Los Angeles (PT)',       tz:'America/Los_Angeles'},
  {label:'Chicago (CT)',           tz:'America/Chicago'},
  {label:'Denver (MT)',            tz:'America/Denver'},
  {label:'Phoenix (MST)',          tz:'America/Phoenix'},
  {label:'Anchorage (AKT)',        tz:'America/Anchorage'},
  {label:'Honolulu (HST)',         tz:'Pacific/Honolulu'},
  {label:'Toronto (ET)',           tz:'America/Toronto'},
  {label:'Vancouver (PT)',         tz:'America/Vancouver'},
  {label:'São Paulo (BRT)',        tz:'America/Sao_Paulo'},
  {label:'Buenos Aires (ART)',     tz:'America/Argentina/Buenos_Aires'},
  {label:'Lima (PET)',             tz:'America/Lima'},
  {label:'Bogotá (COT)',           tz:'America/Bogota'},
  {label:'Mexico City (CST)',      tz:'America/Mexico_City'},
  {label:'London (GMT/BST)',       tz:'Europe/London'},
  {label:'Paris (CET/CEST)',       tz:'Europe/Paris'},
  {label:'Berlin (CET/CEST)',      tz:'Europe/Berlin'},
  {label:'Madrid (CET/CEST)',      tz:'Europe/Madrid'},
  {label:'Rome (CET/CEST)',        tz:'Europe/Rome'},
  {label:'Amsterdam (CET/CEST)',   tz:'Europe/Amsterdam'},
  {label:'Stockholm (CET/CEST)',   tz:'Europe/Stockholm'},
  {label:'Warsaw (CET/CEST)',      tz:'Europe/Warsaw'},
  {label:'Istanbul (TRT)',         tz:'Europe/Istanbul'},
  {label:'Moscow (MSK)',           tz:'Europe/Moscow'},
  {label:'Athens (EET)',           tz:'Europe/Athens'},
  {label:'Helsinki (EET)',         tz:'Europe/Helsinki'},
  {label:'Bucharest (EET)',        tz:'Europe/Bucharest'},
  {label:'Cairo (EET)',            tz:'Africa/Cairo'},
  {label:'Nairobi (EAT)',          tz:'Africa/Nairobi'},
  {label:'Lagos (WAT)',            tz:'Africa/Lagos'},
  {label:'Johannesburg (SAST)',    tz:'Africa/Johannesburg'},
  {label:'Casablanca (WET)',       tz:'Africa/Casablanca'},
  {label:'Accra (GMT)',            tz:'Africa/Accra'},
  {label:'Addis Ababa (EAT)',      tz:'Africa/Addis_Ababa'},
  {label:'Dubai (GST)',            tz:'Asia/Dubai'},
  {label:'Riyadh (AST)',           tz:'Asia/Riyadh'},
  {label:'Kolkata (IST)',          tz:'Asia/Kolkata'},
  {label:'Karachi (PKT)',          tz:'Asia/Karachi'},
  {label:'Dhaka (BST)',            tz:'Asia/Dhaka'},
  {label:'Colombo (SLST)',         tz:'Asia/Colombo'},
  {label:'Kathmandu (NPT)',        tz:'Asia/Kathmandu'},
  {label:'Singapore (SGT)',        tz:'Asia/Singapore'},
  {label:'Kuala Lumpur (MYT)',     tz:'Asia/Kuala_Lumpur'},
  {label:'Manila (PHT)',           tz:'Asia/Manila'},
  {label:'Bangkok (ICT)',          tz:'Asia/Bangkok'},
  {label:'Jakarta (WIB)',          tz:'Asia/Jakarta'},
  {label:'Ho Chi Minh (ICT)',      tz:'Asia/Ho_Chi_Minh'},
  {label:'Shanghai (CST)',         tz:'Asia/Shanghai'},
  {label:'Hong Kong (HKT)',        tz:'Asia/Hong_Kong'},
  {label:'Taipei (CST)',           tz:'Asia/Taipei'},
  {label:'Seoul (KST)',            tz:'Asia/Seoul'},
  {label:'Tokyo (JST)',            tz:'Asia/Tokyo'},
  {label:'Almaty (ALMT)',          tz:'Asia/Almaty'},
  {label:'Tashkent (UZT)',         tz:'Asia/Tashkent'},
  {label:'Tbilisi (GET)',          tz:'Asia/Tbilisi'},
  {label:'Baghdad (AST)',          tz:'Asia/Baghdad'},
  {label:'Tehran (IRST)',          tz:'Asia/Tehran'},
  {label:'Kabul (AFT)',            tz:'Asia/Kabul'},
  {label:'Ulaanbaatar (ULAT)',     tz:'Asia/Ulaanbaatar'},
  {label:'Sydney (AEST/AEDT)',     tz:'Australia/Sydney'},
  {label:'Melbourne (AEST/AEDT)', tz:'Australia/Melbourne'},
  {label:'Brisbane (AEST)',        tz:'Australia/Brisbane'},
  {label:'Perth (AWST)',           tz:'Australia/Perth'},
  {label:'Adelaide (ACST/ACDT)',   tz:'Australia/Adelaide'},
  {label:'Auckland (NZST/NZDT)',   tz:'Pacific/Auckland'},
  {label:'Fiji (FJT)',             tz:'Pacific/Fiji'},
];

const WORLD_CLOCK_TZS = [
  {city:'New York',    tz:'America/New_York'},
  {city:'London',      tz:'Europe/London'},
  {city:'Paris',       tz:'Europe/Paris'},
  {city:'Dubai',       tz:'Asia/Dubai'},
  {city:'Mumbai',      tz:'Asia/Kolkata'},
  {city:'Singapore',   tz:'Asia/Singapore'},
  {city:'Tokyo',       tz:'Asia/Tokyo'},
  {city:'Sydney',      tz:'Australia/Sydney'},
  {city:'São Paulo',   tz:'America/Sao_Paulo'},
  {city:'Los Angeles', tz:'America/Los_Angeles'},
  {city:'Moscow',      tz:'Europe/Moscow'},
  {city:'Johannesburg',tz:'Africa/Johannesburg'},
];

function populateTzSelects() {
  const from = document.getElementById('tzFrom');
  const to   = document.getElementById('tzTo');
  TIMEZONES.forEach(tz => {
    const opt = `<option value="${tz.tz}">${tz.label}</option>`;
    from.innerHTML += opt;
    to.innerHTML   += opt;
  });
  const r = REGIONS[currentRegion];
  const matchFrom = TIMEZONES.find(t => t.tz === r.tz);
  from.value = matchFrom ? matchFrom.tz : 'UTC';
  to.value   = 'UTC';

  const now = new Date();
  document.getElementById('timeDate').value  = now.toLocaleDateString('en-CA');
  document.getElementById('timeInput').value = now.toTimeString().slice(0,5);
  convertTime();
}

function convertTime() {
  const fromTz  = document.getElementById('tzFrom').value;
  const toTz    = document.getElementById('tzTo').value;
  const dateStr = document.getElementById('timeDate').value;
  const timeStr = document.getElementById('timeInput').value;
  if (!dateStr || !timeStr) return;

  const sourceDate = new Date(`${dateStr}T${timeStr}:00`);
  const toOpts  = {timeZone:toTz,   hour:'2-digit', minute:'2-digit', hour12:true};
  const datOpts = {weekday:'long', year:'numeric', month:'long', day:'numeric'};

  const resultTime = sourceDate.toLocaleTimeString('en-US', toOpts);
  const resultDate = sourceDate.toLocaleDateString('en-US', {...datOpts, timeZone:toTz});
  const fromLabel  = TIMEZONES.find(t=>t.tz===fromTz)?.label || fromTz;
  const toLabel    = TIMEZONES.find(t=>t.tz===toTz)?.label   || toTz;

  document.getElementById('timeResult').textContent    = resultTime;
  document.getElementById('timeResultSub').textContent = `${resultDate} · ${fromLabel} → ${toLabel}`;
}

function updateWorldClock() {
  const clockEl = document.getElementById('worldClock');
  if (!clockEl) return;                          // safe to call from any page
  const now = new Date();
  clockEl.innerHTML = WORLD_CLOCK_TZS.map(({city,tz}) => {
    const time = now.toLocaleTimeString('en-US', {timeZone:tz, hour:'2-digit', minute:'2-digit', second:'2-digit', hour12:false});
    const date = now.toLocaleDateString('en-GB',  {timeZone:tz, weekday:'short', day:'numeric', month:'short'});
    const offsetDate = new Date(now.toLocaleString('en-US', {timeZone:tz}));
    const utcDate    = new Date(now.toLocaleString('en-US', {timeZone:'UTC'}));
    const diffH      = Math.round((offsetDate - utcDate) / 3600000);
    const offsetStr  = diffH === 0 ? 'UTC' : (diffH > 0 ? `UTC+${diffH}` : `UTC${diffH}`);
    return `<div class="tz-card">
      <div class="tz-offset" aria-hidden="true">${offsetStr}</div>
      <div class="tz-city">${city}</div>
      <div class="tz-time" aria-label="${city} time: ${time}">${time}</div>
      <div class="tz-date">${date} <span class="sr-only">(${offsetStr})</span></div>
    </div>`;
  }).join('');
  const tickEl = document.getElementById('clockTick');
  if (tickEl) tickEl.textContent =
    `· ${now.toLocaleTimeString('en-US',{hour:'2-digit',minute:'2-digit',second:'2-digit'})} local`;
}

// Currency Dashboard //

document.addEventListener("DOMContentLoaded", () => {

  const CURRENCY_LIST = [
    ["USD", "US Dollar", "$"],
    ["AUD", "Australian Dollar", "A$"],
    ["EUR", "Euro", "€"],
    ["JPY", "Japanese Yen", "¥"],
    ["GBP", "British Pound", "£"],
    ["INR", "Indian Rupee", "₹"],
  ];

  let rates = {};
  let chart = null;

  const baseSelect = document.getElementById("base");
  const amountInput = document.getElementById("amount");
  const tableBody = document.getElementById("tableBody");

  // 🚨 HARD SAFETY CHECK (prevents blank page crash)
  if (!baseSelect || !amountInput || !tableBody) {
    console.error("Missing required DOM elements:", {
      baseSelect,
      amountInput,
      tableBody
    });
    return;
  }

  // Populate dropdown safely
  CURRENCY_LIST.forEach(([code]) => {
    const option = document.createElement("option");
    option.value = code;
    option.textContent = code;
    baseSelect.appendChild(option);
  });

  baseSelect.value = "USD";

  async function fetchRates() {
    try {
      const base = baseSelect.value;

      const res = await fetch(`https://api.exchangerate-api.com/v4/latest/${base}`);
      const data = await res.json();

      rates = data.rates || {};
      updateUI();

    } catch (err) {
      console.error("Fetch failed:", err);
    }
  }

  function updateUI() {
    const amount = Number(amountInput.value) || 0;

    tableBody.innerHTML = "";

    const labels = [];
    const values = [];

    CURRENCY_LIST.forEach(([code, name, symbol]) => {
      const rate = rates[code] || 0;
      const converted = rate * amount;

      tableBody.innerHTML += `
        <tr>
          <td>${code} - ${name}</td>
          <td>${symbol} ${converted.toFixed(2)}</td>
        </tr>
      `;

      labels.push(code);
      values.push(converted);
    });

    if (typeof Chart === "undefined") {
      console.warn("Chart.js not loaded");
      return;
    }

    const ctx = document.getElementById("chart");
    if (!ctx) return;

    if (!chart) {
      chart = new Chart(ctx, {
        type: "bar",
        data: {
          labels,
          datasets: [{
            label: "Converted Values",
            data: values
          }]
        }
      });
    } else {
      chart.data.labels = labels;
      chart.data.datasets[0].data = values;
      chart.update();
    }
  }

  baseSelect.addEventListener("change", fetchRates);
  amountInput.addEventListener("input", updateUI);

  fetchRates();
});



// ══════════════════════════════════════════
//  INIT
// ══════════════════════════════════════════
document.addEventListener('DOMContentLoaded', () => {
  // Currency — only on pages that have the currency UI
  if (document.getElementById('currFrom')) {
    populateCurrencySelects();
    fetchRates();
  }

  // Units — units.html and the main index tab
  if (document.getElementById('unitCategories')) {
    buildCategoryTabs();
    buildUnitSelects(REGIONS[currentRegion]?.system || 'imperial');
  }

  // Time — time.html and the main index tab
  if (document.getElementById('tzFrom')) populateTzSelects();
  if (document.getElementById('worldClock')) updateWorldClock();

  // World-clock ticker — updateWorldClock() is self-guarding (no-ops when
  // #worldClock is absent), so it's safe to call unconditionally.
  // On the tabbed main page we still honour the active-panel check to avoid
  // off-screen reflows; on standalone pages (no panel-time) it always ticks.
  setInterval(() => {
    const timePanel = document.getElementById('panel-time');
    if (!timePanel || timePanel.classList.contains('active')) updateWorldClock();
  }, 1000);
});

document.addEventListener('change', e => {
  if (e.target.id === 'currFrom' || e.target.id === 'currTo') convertCurrency();
});

// ══════════════════════════════════════════
//  TYPEWRITER LOGO
// ══════════════════════════════════════════
(function () {
  const el     = document.getElementById('logoText');
  const cursor = document.getElementById('logoCursor');
  const words  = [
    {plain:'Convertersolution', accent:'S'},
    {plain:'Currenc', accent:'Y'},
    {plain:'Unit',    accent:'S'},
    {plain:'Tim',     accent:'E'},
    {plain:'Convert', accent:'X'},
  ];

  let wIndex = 0, cIndex = 0, deleting = false;
  const TYPE_SPEED=105, DELETE_SPEED=60, HOLD_TYPED=1600, HOLD_DELETED=280;
  const jitter = (b,r) => b + (Math.random()*r*2-r);

  function fullText() { const w=words[wIndex]; return w.plain+w.accent; }

  function renderAt(len) {
    const w=words[wIndex]; const full=w.plain+w.accent; const text=full.slice(0,len);
    const pLen=w.plain.length;
    if (len<=pLen) {
      el.innerHTML=`<span style="-webkit-text-fill-color:var(--text);color:var(--text)">${text}</span>`;
    } else {
      el.innerHTML=
        `<span style="-webkit-text-fill-color:var(--text);color:var(--text)">${text.slice(0,pLen)}</span>`+
        `<span style="background:linear-gradient(135deg,var(--accent),var(--accent2));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text">${text.slice(pLen)}</span>`;
    }
  }

  function setCursorTyping()   { cursor.classList.remove('blinking'); cursor.classList.add('typing'); }
  function setCursorBlinking() { cursor.classList.remove('typing');   cursor.classList.add('blinking'); }

  function typeChar() {
    setCursorTyping(); cIndex++; renderAt(cIndex);
    if (cIndex===fullText().length) {
      if (wIndex===words.length-1) { setTimeout(()=>cursor.style.display='none',400); return; }
      setCursorBlinking();
      setTimeout(()=>{ deleting=true; deleteChar(); }, HOLD_TYPED);
    } else setTimeout(typeChar, jitter(TYPE_SPEED,30));
  }

  function deleteChar() {
    setCursorTyping(); cIndex--; renderAt(cIndex);
    if (cIndex===0) {
      setCursorBlinking();
      setTimeout(()=>{ deleting=false; wIndex++; setTimeout(typeChar, jitter(120,40)); }, HOLD_DELETED);
    } else setTimeout(deleteChar, jitter(DELETE_SPEED,18));
  }

  setTimeout(typeChar, 700);
})();


// ══════════════════════════════════════════
//  HONORABLE MENTIONS
// ══════════════════════════════════════════
const HM_TOOLS = [
  { rank:1,  name:'Google Translate', url:'https://translate.google.com',      cat:'Text & writing', catClass:'hm-cat-text', catColor:'#639922', desc:'Instant translation across 130+ languages powered by neural machine learning.', users:500 },
  { rank:2,  name:'Canva',            url:'https://www.canva.com',              cat:'Image & media',  catClass:'hm-cat-img',  catColor:'#EF9F27', desc:'Drag-and-drop design platform for graphics, presentations, and social media assets.', users:180 },
  { rank:3,  name:'WolframAlpha',     url:'https://www.wolframalpha.com',       cat:'Data & files',   catClass:'hm-cat-data', catColor:'#7F77DD', desc:'Computational knowledge engine — answers maths, science, and data queries directly.', users:150 },
  { rank:4,  name:'Grammarly',        url:'https://www.grammarly.com',          cat:'Text & writing', catClass:'hm-cat-text', catColor:'#639922', desc:'Real-time grammar, spelling, and style checker with tone and clarity suggestions.', users:140 },
  { rank:5,  name:'Smallpdf',         url:'https://smallpdf.com',               cat:'Data & files',   catClass:'hm-cat-data', catColor:'#7F77DD', desc:'Compress, convert, merge, split, and edit PDF files entirely in the browser.', users:80 },
  { rank:6,  name:'Regex101',         url:'https://regex101.com',               cat:'Developer',      catClass:'hm-cat-dev',  catColor:'#378ADD', desc:'Interactive regex builder and debugger with plain-English explanation of each expression.', users:60 },
  { rank:7,  name:'TinyPNG',          url:'https://tinypng.com',                cat:'Image & media',  catClass:'hm-cat-img',  catColor:'#EF9F27', desc:'Smart lossy compression for PNG and JPEG images — no visible quality loss.', users:55 },
  { rank:8,  name:'JSONLint',         url:'https://jsonlint.com',               cat:'Developer',      catClass:'hm-cat-dev',  catColor:'#378ADD', desc:'Paste JSON to instantly validate, format, and pretty-print it online.', users:50 },
  { rank:9,  name:'Remove.bg',        url:'https://www.remove.bg',              cat:'Image & media',  catClass:'hm-cat-img',  catColor:'#EF9F27', desc:'AI-powered background remover for photos — one click delivers a clean cutout.', users:45 },
  { rank:10, name:'Epoch Converter',  url:'https://www.epochconverter.com',     cat:'Utility',        catClass:'hm-cat-util', catColor:'#1D9E75', desc:'Convert Unix timestamps to human-readable dates and vice versa instantly.', users:40 },
  { rank:11, name:'Squoosh',          url:'https://squoosh.app',                cat:'Image & media',  catClass:'hm-cat-img',  catColor:'#EF9F27', desc:'Browser-based image compression with side-by-side comparison and format conversion.', users:35 },
  { rank:12, name:'Base64 Decode',    url:'https://www.base64decode.org',       cat:'Developer',      catClass:'hm-cat-dev',  catColor:'#378ADD', desc:'Encode and decode Base64 strings instantly with no server round-trip.', users:30 },
  { rank:13, name:'Carbon',           url:'https://carbon.now.sh',              cat:'Developer',      catClass:'hm-cat-dev',  catColor:'#378ADD', desc:'Create beautiful, shareable images of source code snippets for documentation or social.', users:28 },
  { rank:14, name:'ILoveIMG',         url:'https://www.iloveimg.com',           cat:'Image & media',  catClass:'hm-cat-img',  catColor:'#EF9F27', desc:'Resize, crop, compress, and convert images in bulk — all in one place online.', users:25 },
  { rank:15, name:'Pastebin',         url:'https://pastebin.com',               cat:'Utility',        catClass:'hm-cat-util', catColor:'#1D9E75', desc:'Share plain text, code snippets, and logs via short, shareable public links.', users:22 },
  { rank:16, name:'Crontab Guru',     url:'https://crontab.guru',               cat:'Developer',      catClass:'hm-cat-dev',  catColor:'#378ADD', desc:'Interactive cron schedule expression editor with human-readable plain-English preview.', users:18 },
  { rank:17, name:'Hemingway Editor', url:'https://hemingwayapp.com',           cat:'Text & writing', catClass:'hm-cat-text', catColor:'#639922', desc:'Highlights overly complex sentences and passive voice to improve writing readability.', users:15 },
  { rank:18, name:'Wordcounter',      url:'https://wordcounter.net',            cat:'Text & writing', catClass:'hm-cat-text', catColor:'#639922', desc:'Live word and character counter with readability grade, keyword density, and speaking time.', users:12 },
  { rank:19, name:'ScreenToGif',      url:'https://www.screentogif.com',        cat:'Utility',        catClass:'hm-cat-util', catColor:'#1D9E75', desc:'Record, edit, and export screen captures as animated GIF, video, or WebP.', users:8  },
  { rank:20, name:'HaveIBeenPwned',   url:'https://haveibeenpwned.com',         cat:'Security',       catClass:'hm-cat-sec',  catColor:'#E24B4A', desc:'Check if your email address or password appeared in any known data breach.', users:5  },
];

function buildHMTable() {
  const tbody = document.getElementById('hmTableBody');
  if (!tbody) return;
  const maxU = 500;
  tbody.innerHTML = HM_TOOLS.map(t => {
    const barW = Math.round((t.users / maxU) * 130);
    const label = t.users >= 1000 ? (t.users/1000).toFixed(1)+'B' : t.users+'M';
    return `<tr>
      <td class="hm-rank">${t.rank}</td>
      <td><a class="hm-tool-link" href="${t.url}" target="_blank" rel="noopener noreferrer">${t.name}</a></td>
      <td><span class="hm-cat-badge ${t.catClass}">${t.cat}</span></td>
      <td class="hm-desc">${t.desc}</td>
      <td>
        <div class="hm-users-wrap">
          <div class="hm-users-bar" style="width:${barW}px;background:${t.catColor};" role="presentation" aria-hidden="true"></div>
          <span class="hm-users-val">~${label}</span>
        </div>
      </td>
    </tr>`;
  }).join('');
}

function buildHMChart() {
  const canvas = document.getElementById('hmChart');
  if (!canvas || !window.Chart) return;
  const reversed = [...HM_TOOLS].reverse();
  new Chart(canvas, {
    type: 'bar',
    data: {
      labels: reversed.map(t => t.name),
      datasets: [{
        label: 'Monthly users (M)',
        data: reversed.map(t => t.users),
        backgroundColor: reversed.map(t => t.catColor + 'BB'),
        borderColor: reversed.map(t => t.catColor),
        borderWidth: 1,
        borderRadius: 4,
      }]
    },
    options: {
      indexAxis: 'y',
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: ctx => {
              const v = ctx.raw;
              return ' ~' + (v >= 1000 ? (v/1000).toFixed(1)+'B' : v+'M') + ' monthly users';
            }
          }
        }
      },
      scales: {
        x: {
          grid: { color: 'rgba(200,200,200,0.08)' },
          ticks: { color: '#8885a0', font: { size: 11 }, callback: v => v + 'M' },
          border: { display: false }
        },
        y: {
          grid: { display: false },
          ticks: { color: '#8885a0', font: { size: 11 } },
          border: { display: false }
        }
      }
    }
  });
}

const _origSwitchTab = switchTab;
let hmChartBuilt = false;
switchTab = function(name) {
  _origSwitchTab(name);
  if (name === 'mentions' && !hmChartBuilt) {
    buildHMTable();
    setTimeout(() => { buildHMChart(); hmChartBuilt = true; }, 80);
  }
};

//  Termns of use

  const sections = document.querySelectorAll('.section');
  const tocLinks = document.querySelectorAll('.toc a');

  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const id = e.target.id;
        tocLinks.forEach(l => l.classList.toggle('toc-active', l.getAttribute('href') === '#' + id));
      }
    });
  }, { rootMargin: '-88px 0px -60% 0px', threshold: 0 });

  sections.forEach(s => io.observe(s));