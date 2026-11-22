(() => {
  'use strict';

  const GH = 'https://github.com/Eesterlein/';
  const PAGES = 'https://eesterlein.github.io/';

  // status: live | code | dev. img: screenshot in /img, otherwise a generated contour map.
  const PROJECTS = [
    {
      id: 'flowers', title: 'Gunnison Flower Atlas', featured: true, status: 'live', img: 'flowers.jpg', cats: ['dash'],
      blurb: 'Explore 140 Gunnison County wildflowers through a photo knowledge graph built from 35,056 iNaturalist observations. Follow 340 shared-area connections, filter by plant community or flower color, and select a species to see its seasonal observation pattern and approximate observation map. Connections show species recorded in the same 1-km areas, not proven ecological interactions.',
      stack: ['JavaScript', 'D3.js', 'Leaflet', 'SVG', 'Data viz'],
      live: PAGES + 'gunnison-flower-atlas/', repo: 'gunnison-flower-atlas', glyph: '140 flowers, 340 connections'
    },
    {
      id: 'covid', title: 'COVID Trials AI', featured: true, status: 'live', img: 'covid.jpg', cats: ['ai', 'apps'],
      blurb: 'Ask a question about COVID-19 and get an answer drawn from 10,269 ClinicalTrials.gov records and 1,630 open-access papers, with every claim linked to its source. Claude searches the trials (vector and keyword search with a medical reranker), reads posted results, and runs statistics such as pooled risk ratios in a code sandbox. A 20-question eval compared three Claude models and caught two real bugs before launch; spend caps, rate limits and a bot check keep the public demo cheap to run.',
      stack: ['Python', 'Claude API', 'RAG', 'Tool use', 'Evals', 'LanceDB', 'FastAPI', 'Hugging Face'],
      live: 'https://huggingface.co/spaces/Eesterlein/covid-trials-ai', repo: 'covid-trials-ai', glyph: '10,269 trials, every claim cited'
    },
    {
      id: 'assessor-map', title: 'Assessor Map Platform', featured: true, status: 'live', demoTag: 'Public demo built on public data · not an official county system', img: 'assessormap.jpg', cats: ['gis', 'apps'],
      blurb: 'A full-stack GIS platform where non-technical users configure maps, upload shapefiles, and create “virtual layers” that join any Excel or CSV dataset to parcels by account number, with no GIS software needed. Includes live NASA FIRMS wildfire detections every 30 minutes, deployed with Docker, nginx, firewall hardening, and daily backups.',
      stack: ['React', 'TypeScript', 'Node.js', 'MapLibre', 'PostGIS', 'GDAL', 'OGC APIs', 'Docker', 'nginx'],
      live: 'http://165.232.147.15', repo: 'assessor-map', glyph: 'Parcels + live wildfire layers',
      demo: { url: 'http://165.232.147.15/admin/', login: 'demo / gunnison-demo' }
    },
    {
      id: 'building', title: 'The Shape of Gunnison’s Building Stock', status: 'live', cats: ['dash'], img: 'building.jpg',
      blurb: 'A data story built from 18,312 assessor building records: what got built, when, how big, and how it’s graded.',
      stack: ['JavaScript', 'SVG', 'Data viz'],
      live: PAGES + 'gunnison-building-stock/', repo: 'gunnison-building-stock'
    },
    {
      id: 'photo', title: 'Appraiser Photo Processor', featured: true, status: 'code', daily: 'Replaced manual photo sorting · ~$0.002 a photo', img: 'photo.jpg', cats: ['ai', 'apps'],
      blurb: 'Multimodal AI used in daily work. The app reads each field photo’s GPS and compass data, matches it to the nearest parcel, classifies the shot with Claude Vision, and renames it to the office’s standard. It replaced a manual sorting step for appraisers at about $0.002 per photo and runs on staff Windows machines.',
      stack: ['Python', 'Claude API', 'Vision AI', 'CLIP', 'Prompt engineering', 'PyInstaller'],
      repo: 'Appraiser-Photo-Processor', glyph: 'GPS + vision AI → filed photos'
    },
    {
      id: 'fieldguide', title: 'AI Field Guide', featured: true, status: 'live', img: 'aifield.jpg', cats: ['ai', 'apps'],
      blurb: 'An interactive guide to the AI words programmers keep hearing (agent, harness, context window, MCP, RAG), from the history and math behind attention to a typo-friendly prompt playground. A Quick start walks through what to do once a chat is open: ask, give context, plan with clear rules and a stop point, review the plan, implement, stay in the loop, and record specs and decisions for the next agent. 21 hands-on demos: play the Turing test, overflow a context window, run an agent loop, plug in MCP servers, do king − man + woman, and spot the made-up claims in an AI answer. Every term has a plain-English and a developer explanation.',
      stack: ['JavaScript', 'SVG', 'Data viz', 'RAG', 'Prompt engineering'],
      live: PAGES + 'ai-field-guide/', repo: 'ai-field-guide', glyph: 'AI vocabulary, animated'
    },
    {
      id: 'gitguide', title: 'GitHub Field Guide', featured: true, status: 'live', img: 'gitfield.jpg', cats: ['apps'],
      blurb: 'An interactive Git and GitHub course built around a practice terminal. Learners type real commands, the terminal answers the way Git would, and each step is graded with a hint when it is wrong. 19 lessons go from clone, branches and merge conflicts to SHA hashes, SSH keys, pull requests, GitHub Actions and push protection, while a live panel shows where every change sits and redraws the commit graph.',
      stack: ['JavaScript', 'SVG', 'Git', 'GitHub Actions'],
      live: PAGES + 'github-field-guide/', repo: 'github-field-guide', glyph: 'Git, one command at a time'
    },
    {
      id: 'llm', title: 'Private RAG Chatbot', status: 'code', img: 'llm.jpg', cats: ['ai'],
      blurb: 'A retrieval-augmented chatbot that answers questions from internal policy documents, plus an on-device coding assistant. Both run entirely on local open-source models, so sensitive data never leaves the machine.',
      stack: ['Python', 'RAG', 'LlamaIndex', 'Ollama', 'Vector indexing'],
      repo: 'Building-Local-LLMs-for-Private-Workflows', glyph: 'Ask your documents'
    },
    {
      id: 'land', title: 'Land Attributes Dashboard', featured: true, status: 'live', daily: 'Republishes ~2 min after each export · staff use the internal edition; this is the public-data demo', img: 'land.jpg', cats: ['gis', 'apps'],
      blurb: 'A parcel map and review tool covering every tax parcel in the county (about 17,500 parcels and 21,000 accounts). It flags missing attributes, parcels that don’t match their neighbors, and data-entry errors, then exports review lists. Uploading a new export triggers a GitHub Actions pipeline that cleans the data and republishes the site in about two minutes.',
      stack: ['MapLibre', 'JavaScript', 'Python', 'Pandas', 'GeoPandas', 'GeoJSON', 'GitHub Actions'],
      live: PAGES + 'gunnison-land-attributes-demo/', repo: 'gunnison-land-attributes-demo', glyph: '17,500 parcels, one map'
    },
    {
      id: 'str', title: 'Gunnison STR Monitor', featured: true, status: 'private', daily: 'Updates itself every Monday · staff use an internal edition', img: 'str.jpg', cats: ['gis', 'apps'],
      blurb: 'A self-updating dashboard of short-term rentals in unincorporated Gunnison County, built ahead of the county\u2019s 2027 STR licensing program. Every Monday a GitHub Action searches about 300 map tiles across four date windows, filters out hotels, campsites and in-town listings, matches each listing to the nearest parcel with a confidence rating, and tracks new and delisted rentals week to week. The code and data are private: each source is public, but a list matching owners to rentals is not something to publish.',
      stack: ['Python', 'GeoPandas', 'Web scraping', 'GitHub Actions', 'Leaflet', 'GeoJSON', 'JavaScript'],
      glyph: 'Every rental, matched to a parcel'
    },
    {
      id: 'bluemesa', title: 'Blue Mesa Water Report', featured: true, status: 'live', img: 'bluemesa.jpg', cats: ['dash'],
      blurb: 'How full is Colorado’s largest lake, and how much is the dam letting out? Built from every daily Bureau of Reclamation reading since 1968, it shows the reservoir hitting an all-time low in October 2026. Charts are titled as the questions they answer: has the lake ever been this low, how this year compares with all 58 others, and which years released the most and least water. One script re-downloads the data and rebuilds the page.',
      stack: ['Python', 'JavaScript', 'D3.js', 'Data viz'],
      live: PAGES + 'blue-mesa-water-report/', repo: 'blue-mesa-water-report', glyph: '58 years of lake levels'
    },
    {
      id: 'audit', title: 'Assessor Website Audit', featured: true, status: 'live', img: 'audit.jpg', cats: ['dash'],
      blurb: 'Ran the same research prompt and scoring rubric through ChatGPT, Gemini, and Claude, compared 24 Colorado counties, and merged the three reviews into one ranked action plan. One model caught a new state deadline change the other two missed.',
      stack: ['Prompt engineering', 'OpenAI API', 'Claude API', 'Gemini'],
      live: PAGES + 'gunnison-assessor-audit/', repo: 'gunnison-assessor-audit', glyph: '3 models, 24 counties'
    },
    {
      id: 'housing', title: 'Pre/Post-COVID Housing Snapshots', status: 'live', cats: ['dash'], img: 'housing.jpg',
      blurb: 'Gunnison’s typical sale price went from $305K to $575K, and the share of U.S. households that could afford it fell from 42% to 14%.',
      stack: ['JavaScript', 'Data viz', 'Excel'],
      live: PAGES + 'gunnison-housing-snapshots/', repo: 'gunnison-housing-snapshots'
    },
    {
      id: 'eye', title: 'Property Eye', featured: true, status: 'live', img: 'eye.jpg', cats: ['ai', 'gis'],
      blurb: 'Satellite change detection across 20,201 tax parcels that flags likely new construction while ignoring change on neighboring lots. Checked against aerial photos, 6 of the 8 strongest flags were real. Reviewers swipe between dated aerial photos back to 2005.',
      stack: ['Python', 'FastAPI', 'Earth Engine', 'PostGIS', 'React', 'MapLibre', 'Docker'],
      live: 'https://64.23.133.119.sslip.io', repo: 'gunnison-property-eye', glyph: 'New construction, from orbit'
    },
    {
      id: 'ownership', title: 'Who Owns Colorado?', featured: true, status: 'live', img: 'ownership.jpg', cats: ['gis'],
      blurb: 'Who owns the state? 62.6% of Colorado land is private, but in Gunnison County over 76% is public, and private parcels show growing out-of-county ownership.',
      stack: ['Python', 'GeoPandas', 'Pandas', 'PostGIS'],
      live: PAGES + 'colorado-land-ownership/', repo: 'colorado-land-ownership', glyph: 'Public vs. private land'
    },
    {
      id: 'assessoryear', title: 'The Assessor’s Year', status: 'live', img: 'assessoryear.jpg', cats: ['dash'],
      blurb: 'An unofficial interactive guide to Colorado’s two-year property tax cycle. Pick the year you pay your bill and it shows which home-sale date and which January 1 your bill is based on, then walks through each step from valuation to tax bill, with upcoming deadlines counted down automatically.',
      stack: ['JavaScript', 'SVG'],
      live: PAGES + 'gunnison-assessor-year/', repo: 'gunnison-assessor-year', glyph: 'Which year am I paying for?'
    },

    {
      id: 'condition', title: 'Residential Condition Dashboard', status: 'live', cats: ['dash'], img: 'condition.jpg',
      blurb: 'Condition, quality, and value of 10,885 principal residential structures across economic areas, representing over $9.4B in residential improvement value.',
      stack: ['Plotly', 'JavaScript', 'Data viz'],
      live: PAGES + 'gunnison-residential-condition/', repo: 'gunnison-residential-condition'
    },
    {
      id: 'traffic', title: 'Repo Traffic Dashboard', status: 'live', cats: ['dash'], img: 'traffic.jpg',
      blurb: 'GitHub keeps only 14 days of traffic per repository. A daily GitHub Action pulls views, visitors, clones and referrers for every public repo, plus visits to the live project sites, and builds up the full history in one dashboard. A weekly summary arrives by email every Monday.',
      stack: ['Python', 'GitHub Actions', 'JavaScript', 'Data viz', 'REST APIs'],
      live: PAGES + 'repo-traffic-dashboard/', repo: 'repo-traffic-dashboard'
    },
    {
      id: 'tax', title: 'Property Tax Calculator', status: 'live', img: 'tax.jpg', cats: ['apps'],
      blurb: 'An educational estimator that shows how actual value, assessment rates, and mill levies turn into a tax bill.',
      stack: ['JavaScript'],
      live: PAGES + 'gunnison-county-property-tax-calculator/', repo: 'gunnison-county-property-tax-calculator', glyph: 'Value × rate × mills'
    },
    {
      id: 'permit', title: 'Gunnison Permit Portal', status: 'code', demoTag: 'Not in use · offline to save hosting costs', img: 'permit.jpg', cats: ['apps'],
      blurb: 'Public building-permit search plus a staff portal for four jurisdictions. Staff upload CSV or Excel exports from their existing systems, and the app learns each jurisdiction’s column layout and remembers it for next time. Includes JWT authentication, inspection tracking, and document attachments on AWS.',
      stack: ['React', 'Tailwind', 'Node.js', 'PostgreSQL', 'Prisma', 'AWS', 'REST APIs'],
      repo: 'gunnison-permit-portal', glyph: '4 jurisdictions, 1 search'
    },
    {
      id: 'airport', title: 'Gunnison Airport Tracker', status: 'code', img: 'airport.jpg', cats: ['apps', 'dash'],
      blurb: 'A scheduled data pipeline for Gunnison–Crested Butte Regional Airport (KGUC). It pulled live OpenSky REST API data, sorted flights into commercial, private and military by callsign, worked out landing status from altitude and vertical rate, and stored results in PostgreSQL on Heroku. Retired when API limits and hosting costs outgrew a hobby project; the code is still available.',
      stack: ['Node.js', 'PostgreSQL', 'REST APIs'],
      repo: 'gunnison-airport-tracker', glyph: 'Scheduled API ingestion'
    },
  ];

  const SKILLS = [
    { group: 'Data & analysis', items: ['SQL', 'SQL Server', 'PostgreSQL', 'BigQuery', 'Access', 'Python', 'Pandas', 'Excel', 'ETL & QA'] },
    { group: 'GIS & spatial', items: ['PostGIS', 'MapLibre', 'Leaflet', 'GDAL', 'GeoPandas', 'OGC APIs', 'Earth Engine', 'GeoJSON'] },
    { group: 'Visualization', items: ['Data viz', 'Tableau', 'Power BI', 'Looker Studio', 'Plotly', 'SVG'] },
    { group: 'Development', items: ['JavaScript', 'TypeScript', 'React', 'Node.js', 'FastAPI', 'REST APIs', 'Docker', 'nginx', 'AWS'] },
    { group: 'AI & automation', items: ['Claude API', 'OpenAI API', 'Gemini', 'Vision AI', 'CLIP', 'RAG', 'Vector indexing', 'Prompt engineering', 'LlamaIndex', 'Ollama', 'GitHub Actions'] },
    { group: 'Assessment', items: ['Mass appraisal', 'Ad valorem assessment', 'Certification of value', 'Sales analysis', 'USPAP'] }
  ];
  // Skills backed by my job or coursework rather than a public project: shown with a "work" tag.
  const AT_WORK = new Set(['SQL Server', 'Access', 'BigQuery', 'ETL & QA', 'Power BI', 'Looker Studio',
    'Mass appraisal', 'Ad valorem assessment', 'Certification of value', 'Sales analysis', 'USPAP']);
  // Skills that live under a broader stack label on project cards.
  const ALIAS = { SQL: ['SQL', 'PostgreSQL', 'PostGIS'] };

  // Card order in every tab (a project shows in each tab listed in its cats).
  // Apps in daily office use come first, then the rest.
  const ORDER = ['photo', 'land', 'str', 'assessor-map', 'covid', 'eye', 'fieldguide', 'flowers', 'bluemesa', 'ownership',
                 'audit', 'llm', 'gitguide', 'assessoryear', 'tax', 'permit', 'airport', 'building', 'housing',
                 'condition', 'traffic'];
  const BY_ID = Object.fromEntries(PROJECTS.map((p) => [p.id, p]));
  const ORDERED = ORDER.map((id) => BY_ID[id]);
  const TAG_LIMIT = 4;

  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const css = (name) => getComputedStyle(document.documentElement).getPropertyValue(name).trim();

  /* ---------- seeded value noise ---------- */
  function makeNoise(seed) {
    let s = seed >>> 0 || 1;
    const rand = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
    const perm = new Uint8Array(512), vals = new Float32Array(256);
    const p = [...Array(256).keys()];
    for (let i = 255; i > 0; i--) { const j = Math.floor(rand() * (i + 1)); [p[i], p[j]] = [p[j], p[i]]; }
    for (let i = 0; i < 512; i++) perm[i] = p[i & 255];
    for (let i = 0; i < 256; i++) vals[i] = rand();
    const fade = (t) => t * t * (3 - 2 * t);
    const n2 = (x, y) => {
      const xi = Math.floor(x), yi = Math.floor(y), xf = x - xi, yf = y - yi;
      const X = xi & 255, Y = yi & 255;
      const a = vals[perm[X + perm[Y]]], b = vals[perm[X + 1 + perm[Y]]];
      const c = vals[perm[X + perm[Y + 1]]], d = vals[perm[X + 1 + perm[Y + 1]]];
      const u = fade(xf), v = fade(yf);
      return a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v;
    };
    return (x, y) => n2(x, y) * 0.55 + n2(x * 2.1 + 17, y * 2.1 + 3) * 0.3 + n2(x * 4.3 + 41, y * 4.3 + 11) * 0.15;
  }

  /* ---------- marching-squares contours ---------- */
  function drawContours(ctx, w, h, field, { cell = 10, levels = 14, color, index, lw = 1, alpha = 0.55, range }) {
    const cols = Math.ceil(w / cell) + 1, rows = Math.ceil(h / cell) + 1;
    const g = new Float32Array(cols * rows);
    let min = Infinity, max = -Infinity;
    for (let j = 0; j < rows; j++) for (let i = 0; i < cols; i++) {
      const v = field(i * cell, j * cell);
      g[j * cols + i] = v; if (v < min) min = v; if (v > max) max = v;
    }
    ctx.clearRect(0, 0, w, h);
    ctx.lineCap = 'round';
    if (range) [min, max] = range;
    const span = max - min || 1;
    for (let L = 1; L < levels; L++) {
      const t = min + (span * L) / levels;
      const isIndex = L % 5 === 0;
      ctx.beginPath();
      for (let j = 0; j < rows - 1; j++) for (let i = 0; i < cols - 1; i++) {
        const a = g[j * cols + i], b = g[j * cols + i + 1], c = g[(j + 1) * cols + i + 1], d = g[(j + 1) * cols + i];
        const k = (a > t) | ((b > t) << 1) | ((c > t) << 2) | ((d > t) << 3);
        if (k === 0 || k === 15) continue;
        const x = i * cell, y = j * cell;
        const top = [x + cell * (t - a) / (b - a), y];
        const right = [x + cell, y + cell * (t - b) / (c - b)];
        const bottom = [x + cell * (t - d) / (c - d), y + cell];
        const left = [x, y + cell * (t - a) / (d - a)];
        const seg = (p, q) => { ctx.moveTo(p[0], p[1]); ctx.lineTo(q[0], q[1]); };
        switch (k) {
          case 1: case 14: seg(left, top); break;
          case 2: case 13: seg(top, right); break;
          case 3: case 12: seg(left, right); break;
          case 4: case 11: seg(right, bottom); break;
          case 6: case 9: seg(top, bottom); break;
          case 7: case 8: seg(left, bottom); break;
          case 5: seg(left, top); seg(right, bottom); break;
          case 10: seg(top, right); seg(left, bottom); break;
        }
      }
      ctx.strokeStyle = `rgba(${isIndex ? index : color},${isIndex ? alpha + 0.2 : alpha})`;
      ctx.lineWidth = isIndex ? lw * 1.8 : lw;
      ctx.stroke();
    }
    return { min, max };
  }

  /* ---------- hero flow field ---------- */
  // Particles stream along a slowly changing noise field, like wind or river current.
  // The cursor stirs an eddy; lines are fainter behind the intro text so it stays readable.
  function hero() {
    const canvas = $('#topo');
    const ctx = canvas.getContext('2d');
    const noise = makeNoise(7703);
    const ro = { lat: $('#ro-lat'), lon: $('#ro-lon'), flow: $('#ro-elev') };
    const text = $('.hero-inner');
    let w, h, dpr, t = 0, visible = true, raf = 0, parts = [], quiet = null, colors = {};
    const mouse = { x: -9999, y: -9999, tx: -9999, ty: -9999, amp: 0, tamp: 0 };
    const DIRS = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];

    const angleAt = (x, y) => {
      let a = noise(x / 260, y / 260 + t * 2) * Math.PI * 4;
      const dx = x - mouse.x, dy = y - mouse.y, d2 = dx * dx + dy * dy;
      if (mouse.amp > 0.02 && d2 < 160 * 160) a += (Math.atan2(dy, dx) + Math.PI / 2 - a) * (1 - Math.sqrt(d2) / 160) * 0.9 * (mouse.amp / 0.38);
      return a;
    };
    const spawn = (p) => {
      p.x = Math.random() * w; p.y = Math.random() * h; p.age = 0;
      p.life = 120 + Math.random() * 160; p.amber = Math.random() < 0.08;
      return p;
    };
    const readColors = () => { colors = { topo: css('--topo'), amber: css('--topo-index') }; };
    const resize = () => {
      dpr = Math.min(devicePixelRatio || 1, 2);
      w = canvas.clientWidth; h = canvas.clientHeight;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.min(4000, Math.round(w * h / (w < 700 ? 900 : 320)));
      parts = Array.from({ length: count }, () => spawn({}));
      const c = canvas.getBoundingClientRect(), r = text.getBoundingClientRect();
      quiet = { x0: r.left - c.left - 24, y0: r.top - c.top - 24, x1: r.right - c.left + 24, y1: r.bottom - c.top + 24 };
      readColors();
      ctx.clearRect(0, 0, w, h);
    };
    const step = (fade) => {
      if (fade) {
        ctx.globalCompositeOperation = 'destination-out';
        ctx.fillStyle = 'rgba(0,0,0,0.06)'; ctx.fillRect(0, 0, w, h);
        ctx.globalCompositeOperation = 'source-over';
      }
      ctx.lineWidth = 1.1;
      const q = quiet, normal = `rgba(${colors.topo},0.4)`, soft = `rgba(${colors.topo},0.16)`;
      const amber = `rgba(${colors.amber},0.55)`, amberSoft = `rgba(${colors.amber},0.22)`;
      for (const p of parts) {
        const a = angleAt(p.x, p.y);
        const nx = p.x + Math.cos(a) * 1.6, ny = p.y + Math.sin(a) * 1.6;
        const behindText = q && p.x > q.x0 && p.x < q.x1 && p.y > q.y0 && p.y < q.y1;
        ctx.strokeStyle = p.amber ? (behindText ? amberSoft : amber) : (behindText ? soft : normal);
        ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(nx, ny); ctx.stroke();
        p.x = nx; p.y = ny;
        if (++p.age > p.life || p.x < 0 || p.x > w || p.y < 0 || p.y > h) spawn(p);
      }
    };
    // Still image for reduced motion: trace short streamlines once, no animation.
    const still = () => {
      ctx.clearRect(0, 0, w, h);
      for (let i = 0; i < 60; i++) step(false);
    };
    const frame = () => {
      mouse.x += (mouse.tx - mouse.x) * 0.12;
      mouse.y += (mouse.ty - mouse.y) * 0.12;
      mouse.amp += (mouse.tamp - mouse.amp) * 0.06;
      t += 0.0009;
      step(true);
      raf = visible && !document.hidden ? requestAnimationFrame(frame) : 0;
    };
    const kick = () => { if (!reduceMotion && !raf) raf = requestAnimationFrame(frame); };

    const heroEl = canvas.parentElement;
    heroEl.addEventListener('pointermove', (e) => {
      const r = canvas.getBoundingClientRect();
      mouse.tx = e.clientX - r.left; mouse.ty = e.clientY - r.top; mouse.tamp = 0.38;
      if (mouse.x < -999) { mouse.x = mouse.tx; mouse.y = mouse.ty; }
      // Map the hero onto a ~0.3° box centered on Gunnison.
      const lat = 38.5458 + (0.5 - mouse.ty / h) * 0.3;
      const lon = 106.9253 - (mouse.tx / w - 0.5) * 0.5;
      const deg = Math.round(((angleAt(mouse.tx, mouse.ty) * 180 / Math.PI + 90) % 360 + 360) % 360);
      ro.lat.textContent = lat.toFixed(4) + '° N';
      ro.lon.textContent = lon.toFixed(4) + '° W';
      ro.flow.textContent = deg + '° ' + DIRS[Math.round(deg / 45) % 8];
    });
    heroEl.addEventListener('pointerleave', () => { mouse.tamp = 0; });

    new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible) kick(); }).observe(canvas);
    document.addEventListener('visibilitychange', () => { if (!document.hidden) kick(); });
    addEventListener('resize', () => { resize(); if (reduceMotion) still(); });
    resize();
    if (reduceMotion) still(); else kick();
    // Called after a theme switch: pick up the new colors and start fresh.
    return () => { readColors(); ctx.clearRect(0, 0, w, h); if (reduceMotion) still(); };
  }

  /* ---------- project cards ---------- */
  const STATUS = { live: 'Live', code: 'Code', dev: 'In development', private: 'Private' };

  function renderCards() {
    const grid = $('#grid');
    const card = (p) => `
      <article class="card reveal" data-id="${p.id}">
        <div class="thumb">
          ${p.img ? `<img src="img/${p.img}" alt="Screenshot of ${p.title}" loading="lazy">`
                  : `<canvas data-seed="${p.id}" aria-hidden="true"></canvas><div class="glyph"><span>${p.glyph}</span></div>`}
          <span class="badge ${p.status}"><i></i>${STATUS[p.status]}</span>
        </div>
        <div class="body">
          ${p.daily ? `<p class="daily mono"><b>Used daily by staff</b> ${p.daily}</p>` : ''}
          ${p.demoTag ? `<p class="daily mono"><b>Demo</b> ${p.demoTag}</p>` : ''}
          <h3>${p.title}</h3>
          <p>${p.blurb}</p>
          <div class="stack">${p.stack.map((s, i) => `<span data-skill="${s}"${i >= TAG_LIMIT ? ' class="extra"' : ''}>${s}</span>`).join('')}${
            p.stack.length > TAG_LIMIT ? `<em class="more">+${p.stack.length - TAG_LIMIT}</em>` : ''}</div>
          ${p.demo ? `<p class="demo-note mono">${p.demo.label || 'Admin demo login'}: <b>${p.demo.login}</b>${p.demo.note === undefined ? ' · resets nightly, so explore freely' : p.demo.note}</p>` : ''}
          <div class="card-links">
            ${p.live ? `<a href="${p.live}" target="_blank" rel="noopener">Open live ↗</a>` : ''}
            ${p.demo && p.demo.url ? `<a href="${p.demo.url}" target="_blank" rel="noopener">Try the admin ↗</a>` : ''}
            ${p.repo ? `<a href="${GH + p.repo}" target="_blank" rel="noopener">Code ↗</a>` : '<span class="private-note mono">Code and data private</span>'}
          </div>
        </div>
      </article>`;
    grid.innerHTML = ORDERED.map(card).join('');
    paintThumbs();
    if (!reduceMotion && matchMedia('(hover: hover)').matches) $$('.card', grid).forEach(tilt);
  }

  function paintThumbs() {
    $$('canvas[data-seed]').forEach((c) => {
      const w = c.clientWidth || 400, h = c.clientHeight || 225, dpr = Math.min(devicePixelRatio || 1, 2);
      c.width = w * dpr; c.height = h * dpr;
      const ctx = c.getContext('2d'); ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const seed = [...c.dataset.seed].reduce((a, ch) => a * 31 + ch.charCodeAt(0), 7);
      const n = makeNoise(seed);
      drawContours(ctx, w, h, (x, y) => n(x / 210, y / 210), {
        cell: 6, levels: 14, color: css('--topo'), index: css('--topo-index'), lw: 0.9, alpha: 0.5
      });
    });
  }

  function tilt(card) {
    card.addEventListener('pointermove', (e) => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
      card.style.transform = `perspective(900px) rotateX(${-y * 4}deg) rotateY(${x * 4}deg) translateY(-4px)`;
    });
    card.addEventListener('pointerleave', () => { card.style.transform = ''; });
  }

  /* ---------- filtering ---------- */
  // cat: a tab ('ai', 'gis', 'apps', 'dash'), 'live' (from the hero stat), or 'all' (only while a skill filter is on)
  let state = { cat: 'ai', skill: null };
  const matchesSkill = (p, s) => p.stack.some((x) => (ALIAS[s] || [s]).includes(x));

  // Filtered views: mix big (2-column) and small cards so every row is full.
  // 3 columns: rows are big+small or small×3. 2 columns: big alone or small×2.
  function pack() {
    const grid = $('#grid');
    const cards = ORDERED.map((p) => ({ p, el: $(`.card[data-id="${p.id}"]`) }));
    const cols = getComputedStyle(grid).gridTemplateColumns.split(' ').length;
    const shown = cards.filter(({ el }) => !el.classList.contains('hidden'));
    const n = shown.length;
    const cand = shown.filter(({ p }) => p.featured);
    const fits = (f) => cols === 3 ? f <= n - f && (n - 2 * f) % 3 === 0
                      : cols === 2 ? (n - f) % 2 === 0 : f === 0;
    let f = cols === 1 ? 0 : cand.length;
    while (f > 0 && !fits(f)) f--;
    const bigs = new Set(cand.slice(0, f).map(({ p }) => p.id));
    cards.forEach(({ p, el }) => el.classList.toggle('big', bigs.has(p.id)));

    // Build the rows in reading order, alternating which side the big card sits on.
    const queue = shown.slice();
    const isBig = (c) => bigs.has(c.p.id);
    const take = (pred) => { const i = queue.findIndex(pred); return i < 0 ? null : queue.splice(i, 1)[0]; };
    let smallRows = cols === 3 ? (n - 2 * f) / 3 : 0;
    let order = 0, row = 0;
    const place = (...cs) => cs.forEach((c) => { if (c) c.el.style.order = order++; });
    while (queue.length) {
      const first = queue.shift();
      if (cols !== 3) { place(first, isBig(first) ? null : take((c) => !isBig(c))); continue; }
      if (isBig(first) || !smallRows) {
        const big = isBig(first) ? first : take(isBig);
        const small = isBig(first) ? take((c) => !isBig(c)) : first;
        row % 2 ? place(small, big) : place(big, small);
      } else {
        place(first, take((c) => !isBig(c)), take((c) => !isBig(c)));
        smallRows--;
      }
      row++;
    }
  }

  function applyFilter() {
    const note = $('#filter-note');
    const grid = $('#grid');
    let shown = 0;
    PROJECTS.forEach((p) => {
      const card = $(`.card[data-id="${p.id}"]`);
      const inCat = state.cat === 'all' || (state.cat === 'live' ? p.status === 'live' : state.cat === 'staff' ? !!p.daily : p.cats.includes(state.cat));
      const inSkill = !state.skill || matchesSkill(p, state.skill);
      card.classList.toggle('hidden', !inCat);
      if (inCat && state.cat !== 'all') card.classList.add('in');
      card.classList.toggle('dim', inCat && !inSkill);
      if (inCat && inSkill) shown++;
      $$('.stack span', card).forEach((s) => s.classList.toggle('hit', !!state.skill && (ALIAS[state.skill] || [state.skill]).includes(s.dataset.skill)));
    });
    $$('.chip').forEach((c) => c.classList.toggle('on', c.dataset.cat === state.cat));
    $$('button.skill').forEach((b) => b.classList.toggle('on', b.dataset.skill === state.skill));
    note.innerHTML = state.skill
      ? `${shown} project${shown === 1 ? '' : 's'} using ${state.skill}<button type="button" id="clear-skill">clear</button>`
      : '';
    const clear = $('#clear-skill');
    if (clear) clear.onclick = () => { state.skill = null; applyFilter(); };
    pack();
  }

  function renderSkills() {
    $('#skills-list').innerHTML = SKILLS.map((g) => `
      <div class="skill-group reveal">
        <h3>${g.group}</h3>
        <div>${g.items.map((s) => {
          const n = PROJECTS.filter((p) => matchesSkill(p, s)).length;
          const tag = AT_WORK.has(s) ? '<i class="at-work">work</i>' : '';
          if (s === 'Tableau') return `<a class="skill" href="https://public.tableau.com/app/profile/elissa.esterlein/vizzes" target="_blank" rel="noopener" title="15 dashboards on Tableau Public">${s} ↗</a>`;
          return n ? `<button class="skill" data-skill="${s}" title="Show the projects that use ${s}">${s}${tag}</button>`
                   : `<span class="skill">${s}${tag}</span>`;
        }).join('')}</div>
      </div>`).join('');
  }

  /* ---------- misc interactions ---------- */
  function countUp(el) {
    const end = +el.dataset.count, pre = el.dataset.prefix || '', suf = el.dataset.suffix || '';
    if (reduceMotion) { el.textContent = pre + end.toLocaleString() + suf; return; }
    const t0 = performance.now(), dur = 1400;
    const step = (now) => {
      const k = Math.min(1, (now - t0) / dur), e = 1 - Math.pow(1 - k, 3);
      el.textContent = pre + Math.round(end * e).toLocaleString() + suf;
      if (k < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }

  function observe() {
    const io = new IntersectionObserver((entries) => entries.forEach((e) => {
      if (!e.isIntersecting) return;
      const el = e.target;
      el.classList.add('in', 'go');
      if (el.dataset.count) countUp(el);
      io.unobserve(el);
    }), { threshold: 0.08 });
    $$('.reveal, [data-count], #track').forEach((el) => io.observe(el));

    const links = $$('.nav nav a');
    const spy = new IntersectionObserver((entries) => entries.forEach((e) => {
      if (e.isIntersecting) links.forEach((a) => a.classList.toggle('active', a.getAttribute('href') === '#' + e.target.id));
    }), { rootMargin: '-45% 0px -50% 0px' });
    $$('main section[id]').forEach((s) => spy.observe(s));
  }

  function init() {
    renderCards();
    applyFilter();
    renderSkills();
    const live = $('#live-count'); if (live) live.dataset.count = PROJECTS.filter((p) => p.status === 'live').length;
    const staff = $('#staff-count'); if (staff) staff.dataset.count = PROJECTS.filter((p) => p.daily).length;
    $$('.section-head, .timeline > li, .license, .contact > *').forEach((el) => el.classList.add('reveal'));
    observe();
    const redrawHero = hero();

    // Tab counts, e.g. "AI 5"
    $$('.chip').forEach((c) => {
      const n = PROJECTS.filter((p) => c.dataset.cat === 'live' ? p.status === 'live' : p.cats.includes(c.dataset.cat)).length;
      c.insertAdjacentHTML('beforeend', `<span class="n">${n}</span>`);
    });
    $$('.chip').forEach((c) => c.addEventListener('click', () => {
      state.cat = c.dataset.cat; applyFilter();
      // If the tab bar is pinned mid-list, jump back to the top of the cards.
      // (Measure from the grid: while pinned, the bar's own position is its stuck spot, not its place in the page.)
      const bar = $('.filters'), gridTop = $('#grid').getBoundingClientRect().top;
      const headroom = 60 + bar.offsetHeight + 24;
      if (gridTop < headroom) {
        scrollTo({ top: gridTop + scrollY - headroom, behavior: reduceMotion ? 'auto' : 'smooth' });
      }
    }));
    $$('[data-filter]').forEach((el) => el.addEventListener('click', () => { state.skill = null; state.cat = el.dataset.filter; applyFilter(); }));
    $('#skills-list').addEventListener('click', (e) => {
      const b = e.target.closest('button.skill'); if (!b) return;
      state.skill = state.skill === b.dataset.skill ? null : b.dataset.skill;
      state.cat = 'all';
      applyFilter();
      if (state.skill) $('#work').scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });
    });

    const nav = $('#nav');
    const onScroll = () => nav.classList.toggle('scrolled', scrollY > 20);
    addEventListener('scroll', onScroll, { passive: true }); onScroll();

    $('#theme-btn').addEventListener('click', () => {
      const root = document.documentElement;
      const dark = root.dataset.theme ? root.dataset.theme === 'dark' : matchMedia('(prefers-color-scheme: dark)').matches;
      root.dataset.theme = dark ? 'light' : 'dark';
      try { localStorage.setItem('theme', root.dataset.theme); } catch (e) {}
      redrawHero(); paintThumbs();
    });

    const copy = $('#copy-email');
    copy.addEventListener('click', async () => {
      try { await navigator.clipboard.writeText(copy.dataset.email); copy.textContent = 'Copied ✓'; }
      catch (e) { copy.textContent = 'Press ⌘C'; }
      setTimeout(() => { copy.textContent = 'Copy'; }, 1800);
    });
    $('#year').textContent = new Date().getFullYear();

    let rt; addEventListener('resize', () => { clearTimeout(rt); rt = setTimeout(() => { pack(); paintThumbs(); }, 200); });
  }

  init();
})();
