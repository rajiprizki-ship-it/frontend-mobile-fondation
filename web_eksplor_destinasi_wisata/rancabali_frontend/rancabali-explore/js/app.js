/* =========================================================
   RANCABALI EXPLORE — logika halaman
   Bergantung pada: data.js (KATEGORI, DESTINASI) dan art.js (Art)
   ========================================================= */
(() => {
  'use strict';

  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const params = new URLSearchParams(location.search);
  const page = document.body.dataset.page;

  /* ---------- Ikon ---------- */
  const svg = (body, extra = '') => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" ${extra}>${body}</svg>`;
  const ICON = {
    logo: `<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linejoin="round" aria-hidden="true"><path d="M3 28 8 6l8 12 5-8 8 18Z"/></svg>`,
    search: svg('<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>'),
    star: `<svg viewBox="0 0 24 24" fill="none" stroke="#f59e0b" stroke-width="2" stroke-linejoin="round" aria-hidden="true"><path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9Z"/></svg>`,
    pin: svg('<path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="3"/>'),
    chevron: svg('<path d="m6 9 6 6 6-6"/>'),
    back: svg('<path d="M19 12H5"/><path d="m12 19-7-7 7-7"/>'),
    user: svg('<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>'),
    lock: svg('<rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>'),
    mail: svg('<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>'),
    eye: svg('<path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/>'),
    eyeOff: svg('<path d="M3 3l18 18"/><path d="M10.6 5.1A10 10 0 0 1 12 5c6.4 0 10 7 10 7a17 17 0 0 1-3.2 4.1M6.6 6.6A17 17 0 0 0 2 12s3.6 7 10 7a9.7 9.7 0 0 0 4.4-1"/><path d="M9.9 9.9a3 3 0 0 0 4.2 4.2"/>'),
    clock: svg('<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>'),
    ticket: svg('<path d="M3 9a2 2 0 0 0 0 6v3a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1v-3a2 2 0 0 1 0-6V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1Z"/><path d="M13 5v14" stroke-dasharray="2 3"/>'),
    info: svg('<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/>'),
    menu: svg('<path d="M4 7h16M4 12h16M4 17h16"/>'),
    close: svg('<path d="M6 6l12 12M18 6 6 18"/>'),
    plus: svg('<path d="M12 5v14M5 12h14"/>'),
    minus: svg('<path d="M5 12h14"/>'),
    left: svg('<path d="m15 18-6-6 6-6"/>'),
    right: svg('<path d="m9 18 6-6-6-6"/>'),
    facebook: svg('<path d="M14 8h3V4h-3a4 4 0 0 0-4 4v3H7v4h3v6h4v-6h3l1-4h-4V8.5A.5.5 0 0 1 14 8Z"/>'),
    instagram: svg('<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><path d="M17.5 6.5h.01"/>'),
    twitter: svg('<path d="M22 5.9a8 8 0 0 1-2.4.7 4 4 0 0 0 1.8-2.3 8 8 0 0 1-2.6 1 4.1 4.1 0 0 0-7 3.7A11.6 11.6 0 0 1 3.4 4.8a4.1 4.1 0 0 0 1.3 5.5 4 4 0 0 1-1.9-.5 4.1 4.1 0 0 0 3.3 4.1 4 4 0 0 1-1.9.1 4.1 4.1 0 0 0 3.8 2.8A8.2 8.2 0 0 1 2 18.2 11.6 11.6 0 0 0 8.3 20c7.5 0 11.7-6.4 11.7-11.9v-.5A8.3 8.3 0 0 0 22 5.9Z"/>'),
    pohon: svg('<path d="m12 3-6 8h3l-4 6h14l-4-6h3Z"/><path d="M12 17v4"/>'),
    garpu: svg('<path d="M4 3v7a3 3 0 0 0 3 3v8M7 3v6M10 3v7a3 3 0 0 1-3 3"/><path d="M19 21V3c-3 1-4.5 4-4.5 8H19"/>'),
    topi: svg('<path d="m2 9 10-5 10 5-10 5Z"/><path d="M6 11.5V16c0 1.5 2.7 3 6 3s6-1.5 6-3v-4.5"/><path d="M22 9v6"/>'),
    masjid: svg('<rect x="5" y="3" width="14" height="18" rx="1"/><path d="M9 7h.01M12 7h.01M15 7h.01M9 11h.01M12 11h.01M15 11h.01M10 21v-4h4v4"/>')
  };

  /* ---------- Util data ---------- */
  const kat = (id) => KATEGORI.find((k) => k.id === id) || KATEGORI[0];
  const cari = (id) => DESTINASI.find((d) => d.id === id);
  const fmtUlasan = (n) => (n >= 1000 ? (n / 1000).toFixed(1).replace(/\.0$/, '') + 'k' : String(n));
  const fmtHarga = (d) => (d.harga ? `${d.mulai ? 'Mulai ' : ''}Rp ${d.harga.toLocaleString('id-ID')} / ${d.satuan}` : 'Gratis');
  const foto = (d, i) => (d.foto && d.foto[i]) || Art.src(d.seni, i + 1, false);
  const fotoGaleri = (d, i) => (d.galeri && d.galeri[i]) || Art.src(d.seni, i + 1, true);
  const jumlahGaleri = (d) => (d.galeri ? d.galeri.length : 24);
  const koordinat = (d) => `${Math.abs(d.lat).toFixed(4)}° ${d.lat < 0 ? 'S' : 'N'}, ${Math.abs(d.lng).toFixed(4)}° ${d.lng < 0 ? 'W' : 'E'}`;
  const urlMaps = (d) => `https://www.google.com/maps/search/?api=1&query=${d.lat},${d.lng}`;
  const HARI = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'];

  const ratingHTML = (d) => `<div class="rating">${ICON.star}<b>${d.rating.toFixed(1)}</b><small>(${fmtUlasan(d.ulasan)} ulasan)</small></div>`;
  const placeHTML = (d) => `<div class="place">${ICON.pin}<span>${esc(d.lokasi)}</span></div>`;

  const cardHTML = (d) => `
    <article class="card">
      <img class="card__img" src="${foto(d, 0)}" alt="Pemandangan ${esc(d.nama)}" width="900" height="500" loading="lazy">
      <div class="card__body">
        <h3 class="card__title">${esc(d.nama)}</h3>
        ${ratingHTML(d)}${placeHTML(d)}
        <div class="card__cta"><a class="btn btn--primary btn--block" href="detail.html?id=${d.id}">Lihat Detail<span class="sr-only"> ${esc(d.nama)}</span></a></div>
      </div>
    </article>`;

  const resultHTML = (d) => `
    <article class="result">
      <img class="result__img" src="${foto(d, 0)}" alt="Pemandangan ${esc(d.nama)}" width="96" height="96" loading="lazy">
      <div class="result__body">
        <h3 class="result__title">${esc(d.nama)}</h3>
        ${ratingHTML(d)}${placeHTML(d)}
        <a class="btn btn--outline btn--sm" href="detail.html?id=${d.id}">Lihat Detail<span class="sr-only"> ${esc(d.nama)}</span></a>
      </div>
    </article>`;

  const notFound = (root) => {
    root.innerHTML = `<div class="page"><div class="empty"><p><strong>Destinasi tidak ditemukan.</strong></p><p>Tautan yang Anda buka mungkin salah atau destinasinya sudah dihapus.</p><p style="margin-top:16px"><a class="btn btn--primary" href="pencarian.html">Lihat semua destinasi</a></p></div></div>`;
  };

  /* =========================================================
     AUTH (demo: disimpan di browser, bukan keamanan sungguhan)
     ========================================================= */
  const Store = {
    get: (k, area = localStorage) => { try { return area.getItem(k); } catch (e) { return null; } },
    set: (k, v, area = localStorage) => { try { area.setItem(k, v); return true; } catch (e) { return false; } },
    del: (k) => { try { localStorage.removeItem(k); sessionStorage.removeItem(k); } catch (e) { /* diabaikan */ } }
  };
  const Auth = {
    users() { try { return JSON.parse(Store.get('rc_users') || '[]'); } catch (e) { return []; } },
    session() {
      try { return JSON.parse(Store.get('rc_session') || Store.get('rc_session', sessionStorage) || 'null'); } catch (e) { return null; }
    },
    async hash(text) {
      const t = 'rancabali:' + text;
      if (window.crypto && crypto.subtle) {
        const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(t));
        return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, '0')).join('');
      }
      let h = 0;
      for (const c of t) h = (h * 31 + c.charCodeAt(0)) | 0;
      return 'f' + h;
    },
    login(user, ingat) {
      Store.del('rc_session');
      const data = JSON.stringify({ nama: user.nama, email: user.email });
      Store.set('rc_session', data, ingat ? localStorage : sessionStorage);
    },
    logout() { Store.del('rc_session'); }
  };

  /* =========================================================
     HEADER & FOOTER
     ========================================================= */
  function renderHeader() {
    const el = $('#site-header');
    if (!el) return;
    const aktif = document.body.dataset.nav || '';
    const sesi = Auth.session();
    const link = (id, href, teks) => `<a href="${href}" ${aktif === id ? 'aria-current="page"' : ''}>${teks}</a>`;
    el.innerHTML = `
      <div class="header__inner container">
        <a class="logo" href="index.html" aria-label="Rancabali Explore, ke beranda">${ICON.logo}<span>RANCABALI EXPLORE</span></a>
        <nav class="nav" id="nav" aria-label="Menu utama">
          ${link('beranda', 'index.html', 'Beranda')}
          ${link('destinasi', 'pencarian.html', 'Destinasi')}
          ${link('kategori', 'index.html#kategori', 'Kategori')}
        </nav>
        <button class="nav-toggle" type="button" aria-label="Buka menu" aria-expanded="false" aria-controls="nav">${ICON.menu}</button>
        <div class="account">
          <button class="account__btn" type="button" aria-haspopup="true" aria-expanded="false" aria-label="Menu akun">
            <span class="avatar">${sesi ? esc(sesi.nama.trim().charAt(0).toUpperCase()) : ICON.user}</span>${ICON.chevron}
          </button>
          <div class="account__menu" hidden>
            ${sesi
              ? `<div class="account__hello">Masuk sebagai<strong>${esc(sesi.nama)}</strong></div><button type="button" id="btn-keluar">Keluar</button>`
              : `<a href="login.html">Masuk</a><a href="register.html">Daftar akun</a>`}
          </div>
        </div>
      </div>`;

    const toggle = $('.nav-toggle', el), nav = $('#nav', el);
    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Tutup menu' : 'Buka menu');
      toggle.innerHTML = open ? ICON.close : ICON.menu;
    });

    const btn = $('.account__btn', el), menu = $('.account__menu', el);
    const tutup = () => { menu.hidden = true; btn.setAttribute('aria-expanded', 'false'); };
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      menu.hidden = !menu.hidden;
      btn.setAttribute('aria-expanded', String(!menu.hidden));
    });
    document.addEventListener('click', (e) => { if (!menu.contains(e.target)) tutup(); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') { tutup(); btn.focus(); } });
    const keluar = $('#btn-keluar');
    if (keluar) keluar.addEventListener('click', () => { Auth.logout(); location.reload(); });
  }

  function renderFooter() {
    const el = $('#site-footer');
    if (!el) return;
    el.innerHTML = `
      <div class="container">
        <div class="footer__grid">
          <div id="tentang">
            <div class="footer__brand">RANCABALI EXPLORE</div>
            <p>Portal informasi resmi eksplorasi wisata, keindahan alam, budaya, dan kuliner khas kecamatan Rancabali Bandung.</p>
          </div>
          <div>
            <h3>Menu Utama</h3>
            <ul>
              <li><a href="#tentang">Tentang Kami</a></li>
              <li><a href="index.html#populer">Destinasi Populer</a></li>
              <li><a href="mailto:info@rancabaliexplore.id">Hubungi Kami</a></li>
            </ul>
          </div>
          <div>
            <h3>Kontak &amp; Alamat</h3>
            <p>Jl. Raya Ciwidey - Patengan, Rancabali, Bandung</p>
            <p><a href="mailto:info@rancabaliexplore.id" style="color:inherit">info@rancabaliexplore.id</a></p>
          </div>
        </div>
        <div class="footer__bottom">
          <p>&copy; ${new Date().getFullYear()} Rancabali Explore. All rights reserved.</p>
          <div class="social">
            <a href="#" aria-label="Facebook">${ICON.facebook}</a>
            <a href="#" aria-label="Instagram">${ICON.instagram}</a>
            <a href="#" aria-label="Twitter">${ICON.twitter}</a>
          </div>
        </div>
      </div>`;
  }

  /* =========================================================
     BERANDA
     ========================================================= */
  function initBeranda() {
    $('#hero-img').src = Art.src('teh', 3, false);
    $('#kategori-list').innerHTML = KATEGORI.map((k) => `
      <li><a class="cat" href="pencarian.html?kategori=${k.id}">
        <span class="cat__ic" style="--fg-c:${k.warna};--bg-c:${k.latar}">${ICON[k.ikon]}</span>
        <span>${k.nama}</span>
      </a></li>`).join('');
    $('#populer-list').innerHTML = DESTINASI.filter((d) => d.populer).slice(0, 3).map(cardHTML).join('');
  }

  /* =========================================================
     PENCARIAN & KATEGORI
     ========================================================= */
  function initPencarian() {
    const input = $('#cari-input'), chips = $('#chips'), out = $('#hasil'), count = $('#hasil-count');
    let kategori = KATEGORI.some((k) => k.id === params.get('kategori')) ? params.get('kategori') : 'semua';
    input.value = params.get('q') || '';

    chips.innerHTML = [{ id: 'semua', nama: 'Semua' }, ...KATEGORI]
      .map((k) => `<button type="button" class="chip" data-id="${k.id}" aria-pressed="false">${k.nama}</button>`).join('');

    const norm = (s) => s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

    function render() {
      const q = norm(input.value.trim());
      const hasil = DESTINASI.filter((d) =>
        (kategori === 'semua' || d.kategori === kategori) &&
        (!q || norm([d.nama, d.lokasi, d.deskripsi, kat(d.kategori).nama].join(' ')).includes(q)));
      count.textContent = hasil.length ? `${hasil.length} destinasi ditemukan` : '';
      out.innerHTML = hasil.length
        ? hasil.map(resultHTML).join('')
        : `<div class="empty"><p><strong>Tidak ada destinasi yang cocok.</strong></p><p>Coba kata kunci lain atau pilih kategori "Semua".</p></div>`;
      $$('button', chips).forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.id === kategori)));
      const p = new URLSearchParams();
      if (input.value.trim()) p.set('q', input.value.trim());
      if (kategori !== 'semua') p.set('kategori', kategori);
      try { history.replaceState(null, '', p.toString() ? '?' + p : location.pathname); } catch (e) { /* file:// */ }
    }

    chips.addEventListener('click', (e) => {
      const b = e.target.closest('button');
      if (!b) return;
      kategori = b.dataset.id;
      render();
    });
    $('#cari-form').addEventListener('submit', (e) => { e.preventDefault(); render(); });
    input.addEventListener('input', render);
    render();
  }

  /* =========================================================
     DETAIL DESTINASI
     ========================================================= */
  function initDetail() {
    const root = $('#detail');
    const d = cari(params.get('id'));
    if (!d) { notFound(root); return; }
    document.title = `${d.nama} | Rancabali Explore`;

    const sama = d.jam.every((j) => j === d.jam[0]);
    const jamRingkas = sama ? `Senin - Minggu: ${d.jam[0]}` : 'Jadwal berbeda tiap hari';
    root.innerHTML = `
      <div class="detail">
        <a class="back" href="pencarian.html" id="btn-kembali">${ICON.back}<span>Kembali</span></a>
        <div class="detail__hero"><img id="foto-utama" src="${foto(d, 0)}" alt="Foto 1: ${esc(d.nama)}" width="1200" height="536"></div>
        <div class="thumbs" role="group" aria-label="Pilih foto">
          ${[0, 1, 2, 3, 4].map((i) => `<button type="button" class="thumb" data-i="${i}" aria-label="Tampilkan foto ${i + 1}" ${i === 0 ? 'aria-current="true"' : ''}><img src="${foto(d, i)}" alt="" loading="lazy"></button>`).join('')}
        </div>
        <section class="panel" aria-labelledby="judul">
          <div>
            <span class="badge">${esc(kat(d.kategori).badge)}</span>
            <h1 id="judul">${esc(d.nama)}</h1>
            ${ratingHTML(d)}
            <p class="panel__desc">${esc(d.deskripsi)}</p>
            <a class="btn btn--primary btn--block btn--lg" href="galeri.html?id=${d.id}">Lihat Galeri</a>
          </div>
          <aside class="info" aria-labelledby="info-judul">
            <h2 id="info-judul">Informasi Kunjungan</h2>
            <div class="info__row">
              <div class="info__label">${ICON.pin}Lokasi</div>
              <p>${esc(d.lokasi.replace('Bandung', 'Kabupaten Bandung'))}</p>
              <a href="lokasi.html?id=${d.id}">Lihat Lokasi di Maps &rarr;</a>
            </div>
            <div class="info__row">
              <div class="info__label">${ICON.clock}Jam Buka</div>
              <p>${esc(jamRingkas)}</p>
              <a href="jam-buka.html?id=${d.id}">Lihat jam buka lengkap &rarr;</a>
            </div>
            <div class="info__row">
              <div class="info__label">${ICON.ticket}Harga Tiket</div>
              <div class="info__price">${esc(fmtHarga(d))}</div>
            </div>
          </aside>
        </section>
      </div>`;

    const utama = $('#foto-utama');
    $('.thumbs', root).addEventListener('click', (e) => {
      const b = e.target.closest('.thumb');
      if (!b) return;
      const i = Number(b.dataset.i);
      utama.src = foto(d, i);
      utama.alt = `Foto ${i + 1}: ${d.nama}`;
      $$('.thumb', root).forEach((t) => t.removeAttribute('aria-current'));
      b.setAttribute('aria-current', 'true');
    });

    $('#btn-kembali').addEventListener('click', (e) => {
      if (document.referrer && history.length > 1 && new URL(document.referrer).origin === location.origin) {
        e.preventDefault();
        history.back();
      }
    });
  }

  /* ---------- Kerangka halaman turunan (galeri, lokasi, jam) ---------- */
  function kerangkaTurunan(root, d, judul, isi) {
    document.title = `${judul} ${d.nama} | Rancabali Explore`;
    root.innerHTML = `
      <div class="page">
        <div class="page__top">
          <a class="back" href="detail.html?id=${d.id}">${ICON.back}<span>Kembali</span></a>
          <h1>${judul}</h1>
        </div>
        ${isi}
      </div>`;
  }

  /* =========================================================
     GALERI
     ========================================================= */
  function initGaleri() {
    const root = $('#galeri');
    const d = cari(params.get('id'));
    if (!d) { notFound(root); return; }
    const PER = 8, total = jumlahGaleri(d), halTotal = Math.ceil(total / PER);
    let hal = Math.min(Math.max(parseInt(params.get('hal'), 10) || 1, 1), halTotal);

    kerangkaTurunan(root, d, 'Galeri', `
      <h2 class="page__sub">${esc(d.nama)}</h2>
      <p class="page__lead">Kumpulan dokumentasi foto ${esc(d.galeriInfo)}</p>
      <div class="gallery" id="grid"></div>
      <nav class="pager" id="pager" aria-label="Halaman galeri"></nav>`);

    const grid = $('#grid'), pager = $('#pager');

    const daftarHal = () => {
      const s = new Set([1, halTotal, hal - 1, hal, hal + 1]);
      const arr = [...s].filter((n) => n >= 1 && n <= halTotal).sort((a, b) => a - b);
      const out = [];
      arr.forEach((n, i) => { if (i && n - arr[i - 1] > 1) out.push('…'); out.push(n); });
      return out;
    };

    function render() {
      const mulai = (hal - 1) * PER;
      grid.innerHTML = Array.from({ length: Math.min(PER, total - mulai) }, (_, k) => {
        const i = mulai + k;
        return `<button type="button" class="gallery__item" data-i="${i}" aria-label="Perbesar foto ${i + 1} dari ${total}"><img src="${fotoGaleri(d, i)}" alt="Foto ${i + 1} ${esc(d.nama)}" loading="lazy"></button>`;
      }).join('');
      pager.innerHTML =
        `<button type="button" data-p="${hal - 1}" aria-label="Halaman sebelumnya" ${hal === 1 ? 'disabled' : ''}>&lt;</button>` +
        daftarHal().map((n) => (n === '…' ? '<span aria-hidden="true">…</span>' : `<button type="button" data-p="${n}" ${n === hal ? 'aria-current="page"' : ''} aria-label="Halaman ${n}">${n}</button>`)).join('') +
        `<button type="button" data-p="${hal + 1}" aria-label="Halaman berikutnya" ${hal === halTotal ? 'disabled' : ''}>&gt;</button>`;
      try { history.replaceState(null, '', `?id=${d.id}&hal=${hal}`); } catch (e) { /* file:// */ }
    }

    pager.addEventListener('click', (e) => {
      const b = e.target.closest('button[data-p]');
      if (!b || b.disabled) return;
      hal = Number(b.dataset.p);
      render();
      grid.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });

    /* Lightbox */
    const lb = document.createElement('div');
    lb.className = 'lightbox';
    lb.hidden = true;
    lb.setAttribute('role', 'dialog');
    lb.setAttribute('aria-modal', 'true');
    lb.setAttribute('aria-label', `Foto ${d.nama}`);
    lb.innerHTML = `
      <button type="button" class="lightbox__close" aria-label="Tutup">${ICON.close}</button>
      <button type="button" class="lightbox__prev" aria-label="Foto sebelumnya">${ICON.left}</button>
      <figure><img alt=""><figcaption></figcaption></figure>
      <button type="button" class="lightbox__next" aria-label="Foto berikutnya">${ICON.right}</button>`;
    document.body.appendChild(lb);
    let idx = 0, pemicu = null;
    const limg = $('img', lb), lcap = $('figcaption', lb);
    const tampil = (i) => {
      idx = (i + total) % total;
      limg.src = fotoGaleri(d, idx);
      limg.alt = `Foto ${idx + 1} ${d.nama}`;
      lcap.textContent = `${d.nama} — foto ${idx + 1} dari ${total}`;
    };
    const buka = (i, el) => { pemicu = el; tampil(i); lb.hidden = false; $('.lightbox__close', lb).focus(); };
    const tutup = () => { lb.hidden = true; if (pemicu) pemicu.focus(); };
    grid.addEventListener('click', (e) => {
      const b = e.target.closest('.gallery__item');
      if (b) buka(Number(b.dataset.i), b);
    });
    $('.lightbox__close', lb).addEventListener('click', tutup);
    $('.lightbox__prev', lb).addEventListener('click', () => tampil(idx - 1));
    $('.lightbox__next', lb).addEventListener('click', () => tampil(idx + 1));
    lb.addEventListener('click', (e) => { if (e.target === lb) tutup(); });
    document.addEventListener('keydown', (e) => {
      if (lb.hidden) return;
      if (e.key === 'Escape') tutup();
      if (e.key === 'ArrowLeft') tampil(idx - 1);
      if (e.key === 'ArrowRight') tampil(idx + 1);
      if (e.key === 'Tab') {
        const f = $$('button', lb), first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    });

    render();
  }

  /* =========================================================
     LOKASI (peta ilustrasi yang bisa di-zoom dan digeser)
     ========================================================= */
  function initLokasi() {
    const root = $('#lokasi');
    const d = cari(params.get('id'));
    if (!d) { notFound(root); return; }

    kerangkaTurunan(root, d, 'Lokasi', `
      <h2 class="page__sub">${esc(d.nama)}</h2>
      <div class="map" id="map">
        <div class="map__stage" id="stage">
          ${Art.peta()}
          <div class="pin" style="left:${d.mapPos[0]}%;top:${d.mapPos[1]}%">${ICON.pin}<span>${esc(d.nama)}</span></div>
        </div>
        <div class="map__zoom" role="group" aria-label="Zoom peta">
          <button type="button" id="zoom-in" aria-label="Perbesar peta">${ICON.plus}</button>
          <button type="button" id="zoom-out" aria-label="Perkecil peta" disabled>${ICON.minus}</button>
        </div>
        <a class="btn btn--primary map__cta" href="${urlMaps(d)}" target="_blank" rel="noopener">Buka di Google Maps<span class="sr-only"> (tab baru)</span></a>
      </div>
      <section class="facts" aria-label="Detail lokasi">
        <div>
          <div class="facts__block"><h2>Alamat lengkap</h2><p>${esc(d.alamat)}</p></div>
          <div class="facts__block"><h2>Titik koordinat</h2><p class="facts__coord">${koordinat(d)}</p></div>
        </div>
        <div class="facts__how"><h2>Petunjuk arah</h2><p>${esc(d.petunjuk)}</p></div>
      </section>`);

    const map = $('#map'), stage = $('#stage'), bIn = $('#zoom-in'), bOut = $('#zoom-out');
    const ZMAX = 4;
    let z = 1, tx = 0, ty = 0;

    function terapkan() {
      const w = map.clientWidth, h = map.clientHeight, sw = stage.offsetWidth, sh = stage.offsetHeight;
      tx = Math.min(0, Math.max(w - sw * z, tx));
      ty = Math.min(0, Math.max(h - sh * z, ty));
      stage.style.transform = `translate(${tx}px,${ty}px) scale(${z})`;
      stage.style.setProperty('--z', z);
      map.classList.toggle('is-zoomed', z > 1);
      map.classList.toggle('is-pannable', z > 1 || sw > w + 1);
      bIn.disabled = z >= ZMAX;
      bOut.disabled = z <= 1;
    }
    function ubahZoom(z2) {
      z2 = Math.min(ZMAX, Math.max(1, z2));
      const cx = map.clientWidth / 2, cy = map.clientHeight / 2;
      tx = cx - (cx - tx) * (z2 / z);
      ty = cy - (cy - ty) * (z2 / z);
      z = z2;
      terapkan();
    }
    bIn.addEventListener('click', () => ubahZoom(z + 0.75));
    bOut.addEventListener('click', () => ubahZoom(z - 0.75));
    map.addEventListener('dblclick', (e) => { if (!e.target.closest('button,a')) ubahZoom(z >= ZMAX ? 1 : z + 1); });

    let geser = null;
    map.addEventListener('pointerdown', (e) => {
      if (!map.classList.contains('is-pannable') || e.target.closest('button,a')) return;
      geser = { x: e.clientX - tx, y: e.clientY - ty };
      map.classList.add('is-dragging');
      map.setPointerCapture(e.pointerId);
    });
    map.addEventListener('pointermove', (e) => {
      if (!geser) return;
      tx = e.clientX - geser.x;
      ty = e.clientY - geser.y;
      terapkan();
    });
    const selesai = () => { geser = null; map.classList.remove('is-dragging'); };
    map.addEventListener('pointerup', selesai);
    map.addEventListener('pointercancel', selesai);
    window.addEventListener('resize', terapkan);
    // Di layar sempit peta lebih lebar dari kotaknya: mulai dari titik destinasi
    if (stage.offsetWidth > map.clientWidth + 1) {
      tx = map.clientWidth / 2 - (d.mapPos[0] / 100) * stage.offsetWidth;
      ty = map.clientHeight / 2 - (d.mapPos[1] / 100) * stage.offsetHeight;
    }
    terapkan();
  }

  /* =========================================================
     JAM BUKA
     ========================================================= */
  function statusBuka(teks, sekarang) {
    const m = /^(\d{2})\.(\d{2}) - (\d{2})\.(\d{2})$/.exec(teks);
    if (!m) return null;
    const buka = +m[1] * 60 + +m[2], tutup = +m[3] * 60 + +m[4];
    const menit = sekarang.getHours() * 60 + sekarang.getMinutes();
    return menit >= buka && menit < tutup
      ? { buka: true, teks: `Buka sekarang, sampai ${m[3]}.${m[4]}` }
      : { buka: false, teks: 'Tutup sekarang' };
  }

  function initJamBuka() {
    const root = $('#jam');
    const d = cari(params.get('id'));
    if (!d) { notFound(root); return; }
    const sekarang = new Date();
    const hariIni = (sekarang.getDay() + 6) % 7; // 0 = Senin
    const st = statusBuka(d.jam[hariIni], sekarang);

    kerangkaTurunan(root, d, 'Jam Buka', `
      <h2 class="page__sub">${esc(d.nama)}</h2>
      <section class="hours" aria-labelledby="jam-judul">
        <div class="hours__head">
          <span class="hours__ic">${ICON.clock}</span>
          <h2 id="jam-judul">Jam Operasional Mingguan</h2>
          ${st ? `<span class="status ${st.buka ? 'status--open' : 'status--closed'}" role="status">${esc(st.teks)}</span>` : ''}
        </div>
        <ul class="hours__list">
          ${HARI.map((h, i) => `<li class="hours__row" ${i === hariIni ? 'aria-current="date"' : ''}><span>${h}${i === hariIni ? ' <small style="font-weight:500;color:var(--muted)">(hari ini)</small>' : ''}</span><span>${esc(d.jam[i])}</span></li>`).join('')}
        </ul>
        <div class="note">${ICON.info}<div><strong>Catatan Pengunjung</strong>${esc(d.catatanJam)}</div></div>
      </section>`);
  }

  /* =========================================================
     LOGIN & REGISTER
     ========================================================= */
  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  function pasangToggle(root) {
    $$('.field__toggle', root).forEach((btn) => {
      const input = $('input', btn.parentElement);
      btn.innerHTML = ICON.eye;
      btn.addEventListener('click', () => {
        const tampil = input.type === 'password';
        input.type = tampil ? 'text' : 'password';
        btn.innerHTML = tampil ? ICON.eyeOff : ICON.eye;
        btn.setAttribute('aria-pressed', String(tampil));
        btn.setAttribute('aria-label', tampil ? 'Sembunyikan password' : 'Tampilkan password');
      });
    });
    $$('[data-icon]', root).forEach((el) => el.insertAdjacentHTML('afterbegin', ICON[el.dataset.icon]));
  }

  function setError(input, pesan) {
    const err = $(`#${input.id}-err`);
    input.setAttribute('aria-invalid', pesan ? 'true' : 'false');
    if (err) err.textContent = pesan || '';
    return !pesan;
  }

  function aman(next) { return /^[\w-]+\.html(\?[\w=&%.-]*)?$/.test(next || '') ? next : 'index.html'; }

  function initLogin() {
    const form = $('#form-login'), status = $('#status');
    pasangToggle(form.closest('.auth'));
    if (params.get('daftar')) { status.className = 'alert alert--ok'; status.textContent = 'Akun berhasil dibuat. Silakan masuk.'; }

    $('#lupa').addEventListener('click', (e) => {
      e.preventDefault();
      status.className = 'alert alert--info';
      status.textContent = 'Pengaturan ulang password memerlukan server. Untuk sementara, hubungi info@rancabaliexplore.id.';
    });

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const id = $('#id'), pw = $('#pw');
      const okId = setError(id, id.value.trim() ? '' : 'Isi email atau username Anda.');
      const okPw = setError(pw, pw.value ? '' : 'Isi password Anda.');
      if (!okId || !okPw) { (okId ? pw : id).focus(); return; }

      const kunci = id.value.trim().toLowerCase();
      const hash = await Auth.hash(pw.value);
      const user = Auth.users().find((u) => (u.email.toLowerCase() === kunci || u.nama.toLowerCase() === kunci) && u.hash === hash);
      if (!user) {
        status.className = 'alert alert--error';
        status.textContent = 'Email/username atau password salah. Periksa lagi, atau daftar jika belum punya akun.';
        return;
      }
      Auth.login(user, $('#ingat').checked);
      location.href = aman(params.get('next'));
    });
  }

  function initRegister() {
    const form = $('#form-register'), status = $('#status');
    pasangToggle(form.closest('.auth'));

    const dlg = $('#dlg-syarat');
    $('#buka-syarat').addEventListener('click', () => (dlg.showModal ? dlg.showModal() : dlg.setAttribute('open', '')));
    $('#tutup-syarat').addEventListener('click', () => (dlg.close ? dlg.close() : dlg.removeAttribute('open')));

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const nama = $('#nama'), email = $('#email'), pw = $('#pw'), pw2 = $('#pw2');
      const hasil = [
        setError(nama, nama.value.trim().length >= 2 ? '' : 'Isi nama lengkap Anda (minimal 2 huruf).'),
        setError(email, EMAIL_RE.test(email.value.trim()) ? '' : 'Isi email yang valid, contoh: nama@email.com.'),
        setError(pw, pw.value.length >= 8 ? '' : 'Password minimal 8 karakter.'),
        setError(pw2, pw2.value === pw.value && pw2.value ? '' : 'Konfirmasi password harus sama dengan password.')
      ];
      if (hasil.includes(false)) { [nama, email, pw, pw2][hasil.indexOf(false)].focus(); return; }

      const users = Auth.users();
      if (users.some((u) => u.email.toLowerCase() === email.value.trim().toLowerCase())) {
        setError(email, 'Email ini sudah terdaftar. Masuk dengan email tersebut.');
        email.focus();
        return;
      }
      users.push({ nama: nama.value.trim(), email: email.value.trim(), hash: await Auth.hash(pw.value) });
      if (!Store.set('rc_users', JSON.stringify(users))) {
        status.className = 'alert alert--error';
        status.textContent = 'Akun tidak dapat disimpan karena penyimpanan browser diblokir. Aktifkan penyimpanan lalu coba lagi.';
        return;
      }
      location.href = 'login.html?daftar=1';
    });
  }

  /* ---------- Mulai ---------- */
  renderHeader();
  renderFooter();
  const INIT = {
    beranda: initBeranda, pencarian: initPencarian, detail: initDetail,
    galeri: initGaleri, lokasi: initLokasi, 'jam-buka': initJamBuka,
    login: initLogin, register: initRegister
  };
  if (INIT[page]) INIT[page]();
})();
