(() => {
  'use strict';

  const GH = 'https://github.com/Eesterlein/';
  const PAGES = 'https://eesterlein.github.io/';

  // status: live | code | dev. img: screenshot in /img, otherwise a generated contour map.
  const PROJECTS = [
    {
      id: 'assessor-map', title: 'Assessor Map Platform', featured: true, status: 'live', img: 'assessormap.jpg', cats: ['gis', 'apps', 'auto'],
      blurb: 'A production GIS platform where non-technical staff configure maps, upload shapefiles, and create “virtual layers” that join any Excel or CSV dataset to parcels by account number, with no GIS software needed. Includes live NASA FIRMS wildfire detections every 30 minutes, deployed with Docker, nginx, firewall hardening, and daily backups.',
      stack: ['React', 'TypeScript', 'Node.js', 'MapLibre', 'PostGIS', 'GDAL', 'OGC APIs', 'Docker', 'nginx'],
      live: 'http://165.232.147.15', repo: 'assessor-map', glyph: 'Parcels + live wildfire layers'
    },
    {
      id: 'building', title: 'The Shape of Gunnison’s Building Stock', status: 'live', cats: ['dash', 'analysis'], img: 'building.jpg',
      blurb: 'A data story built from 18,312 assessor building records: what got built, when, how big, and how it’s graded.',
      stack: ['JavaScript', 'SVG', 'Data viz'],
      live: PAGES + 'gunnison-building-stock/', repo: 'gunnison-building-stock'
    },
    {
      id: 'photo', title: 'Appraiser Photo Processor', featured: true, status: 'code', cats: ['ai', 'auto', 'apps'],
      blurb: 'Multimodal AI used in daily work. The app reads each field photo’s GPS and compass data, matches it to the nearest parcel, classifies the shot with Claude Vision, and renames it to the office’s standard. It replaced a manual sorting step for appraisers at about $0.002 per photo and runs on staff Windows machines.',
      stack: ['Python', 'Claude API', 'Vision AI', 'CLIP', 'Prompt engineering', 'PyInstaller'],
      repo: 'Appraiser-Photo-Processor', glyph: 'GPS + vision AI → filed photos'
    },
    {
      id: 'llm', title: 'Private RAG Chatbot', status: 'code', cats: ['ai'],
      blurb: 'A retrieval-augmented chatbot that answers questions from internal policy documents, plus an on-device coding assistant. Both run entirely on local open-source models, so sensitive data never leaves the machine.',
      stack: ['Python', 'RAG', 'LlamaIndex', 'Ollama', 'Vector indexing'],
      repo: 'Building-Local-LLMs-for-Private-Workflows', glyph: 'Ask your documents'
    },
    {
      id: 'land', title: 'Land Attributes Dashboard', featured: true, status: 'live', img: 'land.jpg', cats: ['gis', 'dash', 'auto'],
      blurb: 'A parcel map and review tool covering every tax parcel in the county (about 17,500 parcels and 21,000 accounts). It flags missing attributes, parcels that don’t match their neighbors, and data-entry errors, then exports review lists. Uploading a new export triggers a GitHub Actions pipeline that cleans the data and republishes the site in about two minutes.',
      stack: ['MapLibre', 'JavaScript', 'Python', 'Pandas', 'GeoPandas', 'GitHub Actions'],
      live: PAGES + 'gunnison-land-attributes-demo/', repo: 'gunnison-land-attributes-demo', glyph: '17,500 parcels, one map'
    },
    {
      id: 'audit', title: 'Assessor Website Audit', status: 'live', img: 'audit.jpg', cats: ['ai', 'analysis'],
      blurb: 'Ran the same research prompt and scoring rubric through ChatGPT, Gemini, and Claude, compared 24 Colorado counties, and merged the three reviews into one ranked action plan. One model caught a new state deadline change the other two missed.',
      stack: ['Prompt engineering', 'OpenAI API', 'Claude API', 'Gemini'],
      live: PAGES + 'gunnison-assessor-audit/', repo: 'gunnison-assessor-audit', glyph: '3 models, 24 counties'
    },
    {
      id: 'permit', title: 'Gunnison Permit Portal', featured: true, status: 'code', img: 'permit.jpg', cats: ['apps'],
      blurb: 'Public building-permit search plus a staff portal for four jurisdictions. Staff upload CSV or Excel exports from their existing systems, and the app learns each jurisdiction’s column layout and remembers it for next time. Includes JWT authentication, inspection tracking, and document attachments on AWS.',
      stack: ['React', 'Tailwind', 'Node.js', 'PostgreSQL', 'Prisma', 'AWS', 'REST APIs'],
      repo: 'gunnison-permit-portal', glyph: '4 jurisdictions, 1 search'
    },
    {
      id: 'housing', title: 'Pre/Post-COVID Housing Snapshots', status: 'live', cats: ['analysis', 'dash'], img: 'housing.jpg',
      blurb: 'Gunnison’s typical sale price went from $305K to $575K, and the share of U.S. households that could afford it fell from 42% to 14%.',
      stack: ['JavaScript', 'Data viz', 'Excel'],
      live: PAGES + 'gunnison-housing-snapshots/', repo: 'gunnison-housing-snapshots'
    },
    {
      id: 'condition', title: 'Residential Condition Dashboard', status: 'live', cats: ['dash', 'analysis'], img: 'condition.jpg',
      blurb: 'Condition, quality, and value of 10,885 principal residential structures across economic areas, representing over $9.4B in residential improvement value.',
      stack: ['Plotly', 'JavaScript', 'Data viz'],
      live: PAGES + 'gunnison-residential-condition/', repo: 'gunnison-residential-condition'
    },
    {
      id: 'eye', title: 'Property Eye', status: 'dev', cats: ['gis', 'ai'],
      blurb: 'Satellite change detection that flags parcels with likely new construction from a Sentinel-2 built-up index, so appraisers know where to look first.',
      stack: ['Python', 'FastAPI', 'Earth Engine', 'PostGIS', 'React'],
      repo: 'gunnison-property-eye', glyph: 'New construction, from orbit'
    },
    {
      id: 'staticmap', title: 'Parcel Value Map', status: 'live', cats: ['gis'], img: 'staticmap.jpg',
      blurb: 'A lightweight Leaflet map that joins assessment CSVs to parcel boundaries at 97% coverage, so appraisers can style parcels by view, condition, or value and spot gaps and outliers.',
      stack: ['Leaflet', 'JavaScript', 'GeoJSON', 'ETL & QA'],
      live: PAGES + 'gunnison_gis_mapping_static_demo/', repo: 'gunnison_gis_mapping_static_demo'
    },
    {
      id: 'explorer', title: 'Gunnison County Map Explorer', status: 'code', cats: ['gis', 'apps'],
      blurb: 'Turns legacy county shapefiles into a modern web map: PostGIS serves parcels, jurisdictions, and towns through a standards-based OGC API, and a React front end lets staff toggle layers, switch street, satellite, and terrain base maps, and fly between towns.',
      stack: ['React', 'TypeScript', 'MapLibre', 'PostGIS', 'OGC APIs', 'Docker'],
      repo: 'Gunnison-County-Map-Explorer', glyph: 'Shapefiles → OGC API → web map'
    },
    {
      id: 'ownership', title: 'Who Owns Colorado?', featured: true, status: 'live', img: 'ownership.jpg', cats: ['gis', 'analysis'],
      blurb: 'Who owns the state? 62.6% of Colorado land is private, but in Gunnison County over 76% is public, and private parcels show growing out-of-county ownership.',
      stack: ['Python', 'GeoPandas', 'Pandas', 'PostGIS'],
      live: PAGES + 'colorado-land-ownership/', repo: 'colorado-land-ownership', glyph: 'Public vs. private land'
    },
    {
      id: 'tax', title: 'Property Tax Calculator', status: 'live', cats: ['apps'],
      blurb: 'An educational estimator that shows how actual value, assessment rates, and mill levies turn into a tax bill.',
      stack: ['JavaScript'],
      live: PAGES + 'gunnison-county-property-tax-calculator/', repo: 'gunnison-county-property-tax-calculator', glyph: 'Value × rate × mills'
    },
    {
      id: 'airport', title: 'Gunnison Airport Tracker', status: 'code', cats: ['apps', 'auto'],
      blurb: 'An automated flight tracker for KGUC that pulls OpenSky REST API data every hour, logs repeat private aircraft to PostgreSQL, and was deployed on Heroku.',
      stack: ['Node.js', 'PostgreSQL', 'REST APIs'],
      repo: 'gunnison-airport-tracker', glyph: 'KGUC, in real time'
    },
    {
      id: 'acs', title: 'U.S. Demographics in SQL', status: 'live', cats: ['analysis'],
      blurb: 'Ranked every U.S. state on poverty, income, unemployment, education, and rent burden from 2019 Census data using CTEs and window functions, then built an interactive Looker Studio dashboard.',
      stack: ['SQL', 'BigQuery', 'Looker Studio'],
      live: 'https://lookerstudio.google.com/s/mNjbN_gsXoQ', repo: 'us-state-demographics-sql-acs2019', glyph: 'ACS 2019 × SQL'
    }
  ];

  const SKILLS = [
    { group: 'Data & analysis', items: ['SQL', 'SQL Server', 'PostgreSQL', 'BigQuery', 'Access', 'Python', 'Pandas', 'R', 'SAS', 'Excel', 'ETL & QA'] },
    { group: 'GIS & spatial', items: ['PostGIS', 'MapLibre', 'Leaflet', 'GDAL', 'GeoPandas', 'OGC APIs', 'Earth Engine', 'GeoJSON'] },
    { group: 'Visualization', items: ['Data viz', 'Tableau', 'Power BI', 'Looker Studio', 'Plotly', 'SVG'] },
    { group: 'Development', items: ['JavaScript', 'TypeScript', 'React', 'Node.js', 'FastAPI', 'REST APIs', 'Docker', 'nginx', 'AWS'] },
    { group: 'AI & automation', items: ['Claude API', 'OpenAI API', 'Gemini', 'Vision AI', 'CLIP', 'RAG', 'Vector indexing', 'Prompt engineering', 'LlamaIndex', 'Ollama', 'GitHub Actions'] },
    { group: 'Assessment', items: ['Mass appraisal', 'Ad valorem assessment', 'Certification of value', 'Sales analysis', 'USPAP'] }
  ];
  // Skills that live under a broader stack label on project cards.
  const ALIAS = { SQL: ['SQL', 'PostgreSQL', 'PostGIS'] };

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

  /* ---------- hero terrain ---------- */
  function hero() {
    const canvas = $('#topo');
    const ctx = canvas.getContext('2d');
    const noise = makeNoise(7703);
    const ro = { lat: $('#ro-lat'), lon: $('#ro-lon'), elev: $('#ro-elev') };
    let w, h, dpr, t = 0, visible = true, raf = 0;
    const mouse = { x: -9999, y: -9999, tx: -9999, ty: -9999, amp: 0, tamp: 0 };

    const field = (x, y) => {
      const s = 1 / 340;
      let v = noise(x * s + t, y * s - t * 0.6);
      const dx = x - mouse.x, dy = y - mouse.y;
      v += mouse.amp * Math.exp(-(dx * dx + dy * dy) / (2 * 120 * 120));
      return v;
    };
    const resize = () => {
      dpr = Math.min(devicePixelRatio || 1, 2);
      w = canvas.clientWidth; h = canvas.clientHeight;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    const draw = () => {
      drawContours(ctx, w, h, field, {
        cell: w < 700 ? 12 : 9, levels: 26, range: [0.05, 1.45], color: css('--topo'), index: css('--topo-index'), lw: 1, alpha: 0.32
      });
    };
    const frame = () => {
      mouse.x += (mouse.tx - mouse.x) * 0.12;
      mouse.y += (mouse.ty - mouse.y) * 0.12;
      mouse.amp += (mouse.tamp - mouse.amp) * 0.06;
      if (!reduceMotion) t += 0.0009;
      draw();
      raf = visible && !reduceMotion ? requestAnimationFrame(frame) : 0;
    };
    const kick = () => { if (!raf) raf = requestAnimationFrame(frame); };

    const hero = canvas.parentElement;
    hero.addEventListener('pointermove', (e) => {
      const r = canvas.getBoundingClientRect();
      mouse.tx = e.clientX - r.left; mouse.ty = e.clientY - r.top; mouse.tamp = 0.38;
      if (mouse.x < -999) { mouse.x = mouse.tx; mouse.y = mouse.ty; }
      // Map the hero onto a ~0.3° box centered on Gunnison.
      const lat = 38.5458 + (0.5 - mouse.ty / h) * 0.3;
      const lon = 106.9253 - (mouse.tx / w - 0.5) * 0.5;
      const v = field(mouse.tx, mouse.ty);
      const elev = 7700 + Math.max(0, (v - 0.1) / 0.9) * 4600;
      ro.lat.textContent = lat.toFixed(4) + '° N';
      ro.lon.textContent = lon.toFixed(4) + '° W';
      ro.elev.textContent = Math.round(elev).toLocaleString() + ' ft';
      if (reduceMotion) { mouse.x = mouse.tx; mouse.y = mouse.ty; mouse.amp = 0.38; draw(); }
    });
    hero.addEventListener('pointerleave', () => { mouse.tamp = 0; kick(); });

    new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible) kick(); }).observe(canvas);
    addEventListener('resize', () => { resize(); draw(); });
    resize(); draw(); kick();
    return draw;
  }

  /* ---------- project cards ---------- */
  const STATUS = { live: 'Live', code: 'Code', dev: 'In development' };

  function renderCards() {
    const grid = $('#grid');
    grid.innerHTML = PROJECTS.map((p) => `
      <article class="card reveal${p.featured ? ' featured' : ''}" data-id="${p.id}">
        <div class="thumb">
          ${p.img ? `<img src="img/${p.img}" alt="Screenshot of ${p.title}" loading="lazy">`
                  : `<canvas data-seed="${p.id}" aria-hidden="true"></canvas><div class="glyph"><span>${p.glyph}</span></div>`}
          <span class="badge ${p.status}"><i></i>${STATUS[p.status]}</span>
        </div>
        <div class="body">
          <h3>${p.title}</h3>
          <p>${p.blurb}</p>
          <div class="stack">${p.stack.map((s) => `<span data-skill="${s}">${s}</span>`).join('')}</div>
          <div class="card-links">
            ${p.live ? `<a href="${p.live}" target="_blank" rel="noopener">Open live ↗</a>` : ''}
            <a href="${GH + p.repo}" target="_blank" rel="noopener">Code ↗</a>
          </div>
        </div>
      </article>`).join('');
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
  let state = { cat: 'all', skill: null };
  const matchesSkill = (p, s) => p.stack.some((x) => (ALIAS[s] || [s]).includes(x));

  function applyFilter() {
    const note = $('#filter-note');
    let shown = 0;
    PROJECTS.forEach((p) => {
      const card = $(`.card[data-id="${p.id}"]`);
      const inCat = state.cat === 'all' || p.cats.includes(state.cat);
      const inSkill = !state.skill || matchesSkill(p, state.skill);
      card.classList.toggle('hidden', !inCat);
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
  }

  function renderSkills() {
    $('#skills-list').innerHTML = SKILLS.map((g) => `
      <div class="skill-group reveal">
        <h3>${g.group}</h3>
        <div>${g.items.map((s) => {
          const n = PROJECTS.filter((p) => matchesSkill(p, s)).length;
          return n ? `<button class="skill" data-skill="${s}" title="Show ${n} project${n === 1 ? '' : 's'} using ${s}">${s}<sup>${n}</sup></button>`
                   : `<span class="skill">${s}</span>`;
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
    renderSkills();
    $$('.section-head, .timeline > li, .license, .contact > *').forEach((el) => el.classList.add('reveal'));
    observe();
    const redrawHero = hero();

    $$('.chip').forEach((c) => c.addEventListener('click', () => { state.cat = c.dataset.cat; applyFilter(); }));
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
    $('#print-btn').addEventListener('click', () => print());

    const copy = $('#copy-email');
    copy.addEventListener('click', async () => {
      try { await navigator.clipboard.writeText(copy.dataset.email); copy.textContent = 'Copied ✓'; }
      catch (e) { copy.textContent = 'Press ⌘C'; }
      setTimeout(() => { copy.textContent = 'Copy'; }, 1800);
    });
    $('#year').textContent = new Date().getFullYear();

    let rt; addEventListener('resize', () => { clearTimeout(rt); rt = setTimeout(paintThumbs, 200); });
  }

  init();
})();
