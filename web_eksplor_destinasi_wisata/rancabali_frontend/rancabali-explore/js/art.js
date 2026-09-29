/* =========================================================
   ART — ilustrasi SVG buatan sebagai pengganti foto.
   Dipakai selama foto asli belum diisi di js/data.js.
   Art.src(jenis, seed, potret)  -> data URI gambar
   Art.peta()                    -> markup SVG peta ilustrasi
   ========================================================= */
const Art = (() => {
  const cache = new Map();

  function rng(seed) {
    let a = seed >>> 0;
    return () => {
      a = (a + 0x6D2B79F5) | 0;
      let t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  const MOOD = {
    kabut: { sky: ['#b8c7cf', '#eef3f4'], h: ['#a8b9bb', '#86a09b', '#5f7f74'], lake: ['#8fe0d5', '#4fbdb2'], glow: '#ffffff' },
    pagi:  { sky: ['#f2b48c', '#fde9cc'], h: ['#c7a99f', '#8fa08d', '#5d7a64'], lake: ['#7fd0c9', '#43a3a3'], glow: '#fff0c9' },
    siang: { sky: ['#7db5e4', '#e3f1fd'], h: ['#9db9c9', '#6f9a8a', '#4a7a5e'], lake: ['#6bd0c8', '#2fa3a0'], glow: '#ffffff' },
    senja: { sky: ['#3b4a86', '#f5a962'], h: ['#6a638f', '#44506e', '#26393f'], lake: ['#e6a066', '#3b4f78'], glow: '#ffd08a' }
  };
  const MOODS_PER_JENIS = {
    kawah: ['kabut', 'kabut', 'siang', 'pagi'],
    situ: ['siang', 'pagi', 'kabut', 'senja'],
    glamping: ['senja', 'pagi', 'senja', 'kabut'],
    teh: ['siang', 'pagi', 'kabut', 'siang'],
    kuliner: ['pagi'],
    edukasi: ['siang', 'pagi', 'kabut', 'siang'],
    religi: ['senja', 'pagi', 'senja', 'kabut']
  };

  // Punggung bukit sebagai path tertutup ke bawah
  function ridge(r, W, y, amp, n) {
    const p = [];
    for (let i = 0; i <= n; i++) p.push([(i * W) / n, y - r() * amp]);
    let d = `M0,2000 L0,${p[0][1].toFixed(1)}`;
    for (let i = 1; i < p.length; i++) {
      const [x0, y0] = p[i - 1], [x1, y1] = p[i];
      d += ` Q${x0.toFixed(1)},${y0.toFixed(1)} ${((x0 + x1) / 2).toFixed(1)},${((y0 + y1) / 2).toFixed(1)}`;
    }
    return d + ` L${W},${p[n][1].toFixed(1)} L${W},2000Z`;
  }

  function pine(x, y, h, c) {
    const w = h * 0.42;
    return `<path d="M${x},${y - h} L${x - w * .55},${y - h * .5} L${x - w * .25},${y - h * .5} L${x - w * .8},${y - h * .12} L${x - w * .1},${y - h * .12} L${x - w * .1},${y} L${x + w * .1},${y} L${x + w * .1},${y - h * .12} L${x + w * .8},${y - h * .12} L${x + w * .25},${y - h * .5} L${x + w * .55},${y - h * .5}Z" fill="${c}"/>`;
  }

  function branch(r, x, y, len, ang, depth, out) {
    const x2 = x + Math.cos(ang) * len, y2 = y - Math.sin(ang) * len;
    out.push(`<line x1="${x.toFixed(1)}" y1="${y.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" stroke="#7a766d" stroke-width="${depth + 0.8}" stroke-linecap="round"/>`);
    if (depth > 0) {
      branch(r, x2, y2, len * .72, ang + .45 + r() * .4, depth - 1, out);
      branch(r, x2, y2, len * .66, ang - .45 - r() * .4, depth - 1, out);
    }
  }

  function cabin(x, y, w) {
    const h = w * .9;
    return `<path d="M${x},${y - h} L${x + w / 2},${y} L${x - w / 2},${y}Z" fill="#2b2a3d"/><path d="M${x},${y - h * .62} L${x + w * .16},${y} L${x - w * .16},${y}Z" fill="#ffd48a"/>`;
  }

  function build(jenis, seed, potret) {
    const W = potret ? 600 : 900, H = potret ? 800 : 500;
    const r = rng(seed * 7919 + jenis.length * 131);
    const list = MOODS_PER_JENIS[jenis] || ['siang'];
    const m = MOOD[list[seed % list.length]];
    let s = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMid slice">`;
    s += `<defs>
      <linearGradient id="sk" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${m.sky[0]}"/><stop offset="1" stop-color="${m.sky[1]}"/></linearGradient>
      <linearGradient id="lk" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${m.lake[0]}"/><stop offset="1" stop-color="${m.lake[1]}"/></linearGradient>
      <linearGradient id="fog" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#fff" stop-opacity=".78"/></linearGradient>
    </defs>`;
    s += `<rect width="${W}" height="${H}" fill="url(#sk)"/>`;
    if (m !== MOOD.kabut) s += `<circle cx="${W * (.2 + r() * .6)}" cy="${H * .3}" r="${H * .07}" fill="${m.glow}" opacity=".75"/>`;

    if (jenis === 'kawah') {
      s += `<path d="${ridge(r, W, H * .40, H * .16, 9)}" fill="${m.h[0]}"/>`;
      s += `<path d="${ridge(r, W, H * .48, H * .14, 8)}" fill="${m.h[1]}"/>`;
      s += `<rect y="${H * .38}" width="${W}" height="${H * .18}" fill="url(#fog)"/>`;
      s += `<path d="${ridge(r, W, H * .60, H * .06, 10)}" fill="#e6e9e8"/>`;
      s += `<ellipse cx="${W * .5}" cy="${H * .70}" rx="${W * .38}" ry="${H * .085}" fill="url(#lk)"/>`;
      s += `<ellipse cx="${W * .5}" cy="${H * .69}" rx="${W * .2}" ry="${H * .03}" fill="#fff" opacity=".2"/>`;
      for (let i = 0; i < 8; i++) {
        const x = W * r(), y = H * (.82 + r() * .16), a = W * (.04 + r() * .05), b = H * (.03 + r() * .04);
        s += `<path d="M${x},${y} l${a * .4},${-b} l${a * .6},${b * .3} l${-a * .1},${b * .7}Z" fill="#cfd4d2"/>`;
      }
      const t = [];
      for (let i = 0; i < 5; i++) branch(r, W * (.05 + r() * .9), H * (.80 + r() * .14), H * (.05 + r() * .05), Math.PI / 2 + (r() - .5) * .3, 3, t);
      s += t.join('');
    }

    if (jenis === 'situ' || jenis === 'glamping') {
      s += `<path d="${ridge(r, W, H * .38, H * .14, 9)}" fill="${m.h[0]}"/>`;
      s += `<path d="${ridge(r, W, H * .46, H * .10, 8)}" fill="${m.h[1]}"/>`;
      s += `<path d="${ridge(r, W, H * .57, H * .05, 14)}" fill="${m.h[2]}"/>`;
      for (let i = 0; i < 24; i++) s += pine(W * (i / 23), H * (.59 + r() * .02), H * (.06 + r() * .05), jenis === 'glamping' ? '#1f3037' : '#2c5a45');
      s += `<rect y="${H * .6}" width="${W}" height="${H}" fill="url(#lk)"/>`;
      for (let i = 0; i < 9; i++) s += `<rect x="${W * r()}" y="${H * (.63 + r() * .28)}" width="${W * (.06 + r() * .12)}" height="2" rx="1" fill="#fff" opacity=".28"/>`;
      if (jenis === 'glamping') {
        for (let i = 0; i < 4; i++) s += cabin(W * (.48 + i * .09), H * (.615 + (i % 2) * .012), W * (.06 + (i % 2) * .01));
        s += `<rect x="${W * .46}" y="${H * .64}" width="${W * .3}" height="3" fill="#3a2f2a" opacity=".6"/>`;
      }
      s += `<path d="${ridge(r, W, H * .93, H * .03, 8)}" fill="${jenis === 'glamping' ? '#1a2a30' : '#264d3b'}"/>`;
      s += pine(W * .06, H * 1.02, H * .58, jenis === 'glamping' ? '#121f25' : '#173d31');
      s += pine(W * .94, H * 1.02, H * .46, jenis === 'glamping' ? '#121f25' : '#173d31');
    }

    if (jenis === 'teh') {
      s += `<path d="${ridge(r, W, H * .34, H * .13, 9)}" fill="${m.h[0]}"/>`;
      s += `<rect y="${H * .30}" width="${W}" height="${H * .16}" fill="url(#fog)"/>`;
      const n = 13;
      for (let i = 0; i < n; i++) {
        const y0 = H * (.40 + i * .052), amp = H * (.02 + i * .004);
        const l = 50 - i * 2.2 + (i % 2 ? -5 : 4);
        const c = `hsl(${100 + r() * 16},${40 + i * 1.6}%,${l}%)`;
        const d = `M0,${y0} C${W * .25},${y0 - amp * (1 + r())} ${W * .55},${y0 + amp * (r() - .2)} ${W},${y0 - amp * .8}`;
        s += `<path d="${d} L${W},2000 L0,2000Z" fill="${c}"/>`;
        s += `<path d="${d}" fill="none" stroke="#1d3a1a" stroke-opacity=".22" stroke-width="3"/>`;
        s += `<path d="${d}" transform="translate(0,-3)" fill="none" stroke="#fff" stroke-opacity=".2" stroke-width="2"/>`;
      }
      for (let i = 0; i < 5; i++) s += pine(W * (.08 + r() * .84), H * (.72 + r() * .1), H * (.08 + r() * .05), '#2f5b3e');
    }

    if (jenis === 'kuliner') {
      const cx = W / 2, cy = H * .60, w = W * (potret ? .34 : .22);
      s += `<rect y="${H * .62}" width="${W}" height="${H}" fill="#b5764a"/>`;
      for (let i = 0; i < 6; i++) s += `<rect y="${H * (.66 + i * .07)}" width="${W}" height="2" fill="#9b6238" opacity=".5"/>`;
      s += `<ellipse cx="${cx}" cy="${H * .78}" rx="${w * 1.3}" ry="${w * .16}" fill="#000" opacity=".16"/>`;
      s += `<path d="M${cx - w},${cy} A${w},${w * .78} 0 0 0 ${cx + w},${cy}Z" fill="#fffaf2"/>`;
      s += `<ellipse cx="${cx}" cy="${cy}" rx="${w}" ry="${w * .16}" fill="#e58a3c"/>`;
      const tp = ['#5aa469', '#d9483b', '#f2c94c', '#fff3d9'];
      for (let i = 0; i < 14; i++) s += `<circle cx="${cx + (r() - .5) * w * 1.6}" cy="${cy + (r() - .5) * w * .18}" r="${5 + r() * 6}" fill="${tp[i % 4]}"/>`;
      for (let i = 0; i < 3; i++) {
        const x = cx + (i - 1) * w * .5;
        s += `<path d="M${x},${cy - 14} q-16,-30 0,-56 q16,-26 0,-56" fill="none" stroke="#fff" stroke-opacity=".75" stroke-width="7" stroke-linecap="round"/>`;
      }
      s += `<line x1="${cx + w * .2}" y1="${cy - w * .9}" x2="${cx + w * 1.05}" y2="${cy + w * .05}" stroke="#7a4a26" stroke-width="6" stroke-linecap="round"/>`;
      s += `<line x1="${cx + w * .4}" y1="${cy - w * .95}" x2="${cx + w * 1.2}" y2="${cy - w * .05}" stroke="#7a4a26" stroke-width="6" stroke-linecap="round"/>`;
    }

    if (jenis === 'edukasi') {
      s += `<path d="${ridge(r, W, H * .44, H * .14, 8)}" fill="${m.h[0]}"/>`;
      s += `<path d="${ridge(r, W, H * .54, H * .08, 10)}" fill="${m.h[1]}"/>`;
      for (let i = 0; i < 20; i++) s += pine(W * (i / 19), H * (.58 + r() * .03), H * (.08 + r() * .07), '#2c5a45');
      s += `<path d="${ridge(r, W, H * .66, H * .05, 8)}" fill="#7fae6b"/>`;
      s += `<path d="${ridge(r, W, H * .80, H * .04, 8)}" fill="#6a9a58"/>`;
      for (let i = 0; i < 9; i++) {
        const x = W * (.04 + i * .115);
        s += `<rect x="${x}" y="${H * .70}" width="7" height="${H * .1}" fill="#6b4a2f"/>`;
      }
      s += `<rect x="0" y="${H * .725}" width="${W}" height="6" fill="#7d5a3a"/><rect x="0" y="${H * .765}" width="${W}" height="6" fill="#7d5a3a"/>`;
      const k = H * .0021, dx = W * (.32 + r() * .36), dy = H * .9;
      s += `<g transform="translate(${dx},${dy}) scale(${k})" fill="#7a5230">
        <ellipse cx="0" cy="-70" rx="66" ry="30"/>
        <rect x="-52" y="-52" width="10" height="52"/><rect x="-30" y="-52" width="10" height="52"/>
        <rect x="26" y="-52" width="10" height="52"/><rect x="48" y="-52" width="10" height="52"/>
        <path d="M46,-84 L74,-136 L92,-128 L66,-70Z"/>
        <ellipse cx="88" cy="-134" rx="19" ry="12" transform="rotate(-20 88 -134)"/>
        <ellipse cx="-66" cy="-76" rx="9" ry="6" fill="#fff" opacity=".8"/>
        <g stroke="#5b3b20" stroke-width="4" fill="none" stroke-linecap="round"><path d="M84,-144 L78,-176 M78,-176 L66,-190 M78,-176 L92,-190"/><path d="M94,-142 L104,-172 M104,-172 L116,-184"/></g>
      </g>`;
    }

    if (jenis === 'religi') {
      s += `<path d="${ridge(r, W, H * .5, H * .12, 8)}" fill="${m.h[0]}"/>`;
      s += `<path d="${ridge(r, W, H * .62, H * .06, 10)}" fill="${m.h[1]}"/>`;
      const cx = W / 2, base = H * .70, w = W * (potret ? .7 : .36), h = H * .11;
      s += `<rect x="${cx - w / 2}" y="${base - h}" width="${w}" height="${h}" fill="#eae3d2"/>`;
      s += `<path d="M${cx - w * .24},${base - h} A${w * .24},${w * .24} 0 0 1 ${cx + w * .24},${base - h}Z" fill="#1d6e6a"/>`;
      s += `<rect x="${cx - 2}" y="${base - h - w * .24 - 22}" width="4" height="22" fill="#d9b95b"/>`;
      for (const sx of [-1, 1]) {
        const mx = cx + sx * w * .56;
        s += `<rect x="${mx - w * .025}" y="${base - h - H * .13}" width="${w * .05}" height="${h + H * .13}" fill="#f2ecdd"/>`;
        s += `<path d="M${mx - w * .04},${base - h - H * .13} A${w * .04},${w * .04} 0 0 1 ${mx + w * .04},${base - h - H * .13}Z" fill="#1d6e6a"/>`;
      }
      for (let i = 0; i < 5; i++) s += `<path d="M${cx - w * .4 + i * w * .2 - 7},${base} v-${h * .55} a7,7 0 0 1 14,0 v${h * .55}Z" fill="#ffd48a"/>`;
      s += `<path d="${ridge(r, W, H * .78, H * .05, 9)}" fill="${m.h[2]}"/>`;
      for (let i = 0; i < 9; i++) s += pine(W * (i / 8), H * .84, H * (.1 + r() * .08), '#172a2f');
    }

    s += '</svg>';
    return s;
  }

  function src(jenis, seed = 1, potret = false) {
    const key = `${jenis}|${seed}|${potret}`;
    if (!cache.has(key)) cache.set(key, 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(build(jenis, seed, potret)));
    return cache.get(key);
  }

  // ---------- Peta ilustrasi (1200 x 520) ----------
  function blob(r, cx, cy, rx, ry, n = 14) {
    const p = [];
    for (let i = 0; i < n; i++) {
      const a = (i / n) * Math.PI * 2, k = .82 + r() * .36;
      p.push([cx + Math.cos(a) * rx * k, cy + Math.sin(a) * ry * k]);
    }
    let d = '';
    for (let i = 0; i < n; i++) {
      const a = p[i], b = p[(i + 1) % n], mx = (a[0] + b[0]) / 2, my = (a[1] + b[1]) / 2;
      d += i === 0 ? `M${mx.toFixed(1)},${my.toFixed(1)}` : '';
      const c = p[(i + 1) % n], nx = (c[0] + p[(i + 2) % n][0]) / 2, ny = (c[1] + p[(i + 2) % n][1]) / 2;
      d += ` Q${c[0].toFixed(1)},${c[1].toFixed(1)} ${nx.toFixed(1)},${ny.toFixed(1)}`;
    }
    return d + 'Z';
  }

  let petaCache = '';
  function peta() {
    if (petaCache) return petaCache;
    const r = rng(2026), BG = '#e9e3d1';
    let s = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 520" preserveAspectRatio="xMidYMid slice" role="img" aria-label="Peta ilustrasi kawasan Rancabali, Bandung">`;
    s += `<defs><pattern id="hatch" width="9" height="9" patternUnits="userSpaceOnUse" patternTransform="rotate(35)"><rect width="9" height="9" fill="#dfe8c6"/><line x1="0" y1="0" x2="0" y2="9" stroke="#9db67a" stroke-width="2.2"/></pattern></defs>`;
    s += `<rect width="1200" height="520" fill="${BG}"/>`;
    for (let x = 100; x < 1200; x += 100) s += `<line x1="${x}" y1="0" x2="${x}" y2="520" stroke="#b9b19a" stroke-opacity=".28"/>`;
    for (let y = 100; y < 520; y += 100) s += `<line x1="0" y1="${y}" x2="1200" y2="${y}" stroke="#b9b19a" stroke-opacity=".28"/>`;
    // kontur
    for (const [cx, cy, rx, ry] of [[170, 125, 120, 80], [1010, 115, 190, 100], [760, 450, 170, 90]]) {
      for (let i = 1; i <= 8; i++) s += `<path d="${blob(rng(cx + i * 13), cx, cy, rx * i / 8, ry * i / 8)}" fill="none" stroke="${i % 4 === 0 ? '#b8a37c' : '#cdbb9a'}" stroke-width="${i % 4 === 0 ? 1.6 : 1}"/>`;
    }
    // hutan
    for (const [cx, cy, rx, ry] of [[330, 120, 110, 55], [880, 300, 90, 60], [140, 380, 100, 70], [1080, 440, 90, 50]]) {
      s += `<path d="${blob(r, cx, cy, rx, ry)}" fill="#cfd9b9" opacity=".9"/>`;
      for (let i = 0; i < 26; i++) s += `<circle cx="${cx + (r() - .5) * rx * 1.6}" cy="${cy + (r() - .5) * ry * 1.6}" r="${2 + r() * 2}" fill="#9db47f"/>`;
    }
    // kebun teh
    s += `<path d="${blob(r, 760, 340, 130, 62)}" fill="url(#hatch)" stroke="#9db67a"/>`;
    s += `<path d="${blob(r, 450, 445, 110, 50)}" fill="url(#hatch)" stroke="#9db67a"/>`;
    // sungai + danau
    s += `<path d="M1010,190 C900,230 760,215 640,275" fill="none" stroke="#8db8cf" stroke-width="3"/>`;
    s += `<path d="M480,305 C400,380 300,420 210,505" fill="none" stroke="#8db8cf" stroke-width="3"/>`;
    s += `<path d="${blob(r, 560, 292, 108, 52, 12)}" fill="#a8cddd" stroke="#7fb0c6" stroke-width="2"/>`;
    // jalan
    const jalan = 'M0,345 C200,330 300,365 420,335 S700,250 900,272 S1100,335 1200,300';
    s += `<path d="${jalan}" fill="none" stroke="#9a9a9a" stroke-width="10" stroke-linecap="round"/><path d="${jalan}" fill="none" stroke="#fff" stroke-width="6" stroke-linecap="round"/>`;
    const jalan2 = 'M420,335 C470,410 560,440 640,425 S780,400 860,455';
    s += `<path d="${jalan2}" fill="none" stroke="#9a9a9a" stroke-width="7" stroke-linecap="round"/><path d="${jalan2}" fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round"/>`;
    s += `<path d="M300,338 C260,280 215,200 175,130" fill="none" stroke="#b5533a" stroke-width="1.6" stroke-dasharray="5 4"/>`;
    // penanda tempat
    const T = 'font:600 13px Inter,system-ui,sans-serif;fill:#3b3a35;paint-order:stroke;stroke:#e9e3d1;stroke-width:4px;stroke-linejoin:round';
    s += `<g style="${T}">
      <circle cx="170" cy="125" r="5" fill="#fff" stroke="#3b3a35" stroke-width="2"/><text x="182" y="120">Kawah Putih</text><text x="182" y="136" style="font-weight:400;font-size:11px">Kawah belerang</text>
      <rect x="296" y="334" width="9" height="9" fill="#fff" stroke="#3b3a35" stroke-width="2"/><text x="240" y="366">Rancabali</text>
      <text x="505" y="296" style="font-size:12px">Situ Patenggang</text>
      <text x="612" y="398">Glamping Lakeside</text>
      <text x="724" y="344" style="font-weight:400">Kebun teh</text>
      <path d="M1010,88 l12,20 h-24z" fill="#fff" stroke="#3b3a35" stroke-width="2"/><text x="1030" y="104">Gunung Patuha</text>
      <text x="740" y="500" style="font-weight:400">Kebun stroberi</text>
    </g>`;
    // judul, kompas, legenda
    s += `<rect width="1200" height="30" fill="#d8d0bb"/><line y1="30" x2="1200" y2="30" stroke="#8d846c"/>`;
    s += `<text x="600" y="20" text-anchor="middle" style="font:700 13px Outfit,Inter,sans-serif;fill:#3b3a35;letter-spacing:.14em">PETA ILUSTRASI | RANCABALI, BANDUNG</text>`;
    s += `<g transform="translate(46,470)"><circle r="16" fill="#fff" stroke="#3b3a35"/><path d="M0,-12 l5,14 l-5,-3 l-5,3z" fill="#3b3a35"/><text y="-22" text-anchor="middle" style="font:700 11px Inter,sans-serif;fill:#3b3a35">U</text></g>`;
    s += `<g transform="translate(886,395)"><rect width="230" height="108" rx="6" fill="#f4efe0" stroke="#8d846c"/>
      <g style="font:500 11px Inter,sans-serif;fill:#3b3a35">
      <line x1="14" y1="20" x2="44" y2="20" stroke="#b5533a" stroke-width="1.6" stroke-dasharray="5 4"/><text x="54" y="24">Jalur setapak</text>
      <line x1="14" y1="40" x2="44" y2="40" stroke="#9a9a9a" stroke-width="7"/><line x1="14" y1="40" x2="44" y2="40" stroke="#fff" stroke-width="4"/><text x="54" y="44">Jalan</text>
      <rect x="14" y="54" width="30" height="12" fill="#cfd9b9"/><text x="54" y="64">Hutan</text>
      <rect x="14" y="72" width="30" height="12" fill="url(#hatch)"/><text x="54" y="82">Kebun teh</text>
      <rect x="14" y="90" width="30" height="10" fill="#a8cddd"/><text x="54" y="99">Danau</text></g></g>`;
    s += '</svg>';
    petaCache = s;
    return s;
  }

  return { src, peta, rng };
})();
