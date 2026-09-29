/* =========================================================
   DATA DESTINASI — Rancabali Explore
   Ubah / tambah data di sini. Halaman lain membaca dari file ini.

   CATATAN: Data Kawah Putih mengikuti contoh desain. Data lainnya
   (rating, harga, jam buka, koordinat) adalah CONTOH — mohon
   diverifikasi sebelum dipublikasikan.

   Foto: secara bawaan web memakai ilustrasi buatan (js/art.js).
   Untuk memakai foto asli, isi:
     foto:   ['images/kawah-1.jpg', ...]  -> foto lanskap (foto[0] = foto utama)
     galeri: ['images/kawah-g1.jpg', ...] -> foto untuk halaman galeri
   ========================================================= */

const KATEGORI = [
  { id: 'alam',    nama: 'Alam',    badge: 'Wisata Alam',    ikon: 'pohon',  warna: '#10a15a', latar: '#e6f6ec' },
  { id: 'kuliner', nama: 'Kuliner', badge: 'Wisata Kuliner', ikon: 'garpu',  warna: '#f59e0b', latar: '#fff1de' },
  { id: 'edukasi', nama: 'Edukasi', badge: 'Wisata Edukasi', ikon: 'topi',   warna: '#0a66cc', latar: '#e6f2ff' },
  { id: 'religi',  nama: 'Religi',  badge: 'Wisata Religi',  ikon: 'masjid', warna: '#9333ea', latar: '#f1e8ff' }
];

const SEMUA_HARI = (jam) => Array(7).fill(jam); // Senin..Minggu

const DESTINASI = [
  {
    id: 'kawah-putih',
    nama: 'Kawah Putih',
    kategori: 'alam',
    seni: 'kawah',
    populer: true,
    rating: 4.8,
    ulasan: 2400,
    lokasi: 'Rancabali, Bandung',
    alamat: 'Rancabali, Kabupaten Bandung, Jawa Barat 40973',
    lat: -7.1797, lng: 107.4003,
    mapPos: [14, 24],
    deskripsi: 'Kawah Putih merupakan sebuah danau kawah yang terbentuk dari letusan Gunung Patuha yang terletak di daerah Ciwidey, Kabupaten Bandung. Danau kawah ini memiliki air yang berwarna putih kehijauan yang unik serta dikelilingi pasir putih belerang yang memukau. Udara sejuk pegunungan menambah kesan magis tersendiri bagi para pengunjung.',
    galeriInfo: 'keindahan alam kawah vulkanik belerang Rancabali.',
    petunjuk: 'Kawasan Kawah Putih terletak sekitar 50 km di selatan Bandung. Anda dapat mengikuti rute menuju Soreang, lalu Ciwidey, dan melanjutkan perjalanan menuju Rancabali. Gunakan navigasi Google Maps untuk petunjuk arah real-time yang optimal.',
    jam: SEMUA_HARI('07.00 - 17.00'),
    catatanJam: 'Jam operasional dapat berubah sewaktu-waktu tergantung pada kondisi cuaca ekstrem di kawasan puncak gunung kawah, ataupun kebijakan manajemen khusus selama hari libur nasional.',
    harga: 30000, satuan: 'orang'
  },
  {
    id: 'situ-patenggang',
    nama: 'Situ Patenggang',
    kategori: 'alam',
    seni: 'situ',
    populer: true,
    rating: 4.7,
    ulasan: 1800,
    lokasi: 'Rancabali, Bandung',
    alamat: 'Patengan, Rancabali, Kabupaten Bandung, Jawa Barat 40973',
    lat: -7.1656, lng: 107.3603,
    mapPos: [46, 56],
    deskripsi: 'Situ Patenggang adalah danau alami di kawasan Rancabali yang dikelilingi kebun teh dan hutan pinus. Pengunjung dapat naik perahu untuk mengelilingi danau, lalu menuju Batu Cinta, tempat yang lekat dengan legenda percintaan setempat.',
    galeriInfo: 'danau, hutan pinus, dan kebun teh di sekitar Situ Patenggang.',
    petunjuk: 'Dari Ciwidey, ikuti Jalan Raya Ciwidey - Patengan ke arah Rancabali. Situ Patenggang berada di sisi jalan yang sama dengan jalur menuju Kawah Putih, jadi keduanya mudah dikunjungi dalam satu perjalanan.',
    jam: SEMUA_HARI('07.00 - 17.00'),
    catatanJam: 'Operasional perahu bergantung pada cuaca dan tinggi permukaan air danau. Datang lebih pagi untuk antrean yang lebih pendek.',
    harga: 20000, satuan: 'orang'
  },
  {
    id: 'glamping-lakeside',
    nama: 'Glamping Lakeside',
    kategori: 'alam',
    seni: 'glamping',
    populer: true,
    rating: 4.9,
    ulasan: 920,
    lokasi: 'Rancabali, Bandung',
    alamat: 'Jl. Raya Ciwidey - Patengan, Rancabali, Kabupaten Bandung, Jawa Barat 40973',
    lat: -7.1590, lng: 107.3660,
    mapPos: [50, 74],
    deskripsi: 'Penginapan bergaya kemah mewah di tepi danau Rancabali dengan pemandangan telaga dan pegunungan. Cocok untuk bermalam santai, menikmati kabut pagi, dan sarapan di tepi air.',
    galeriInfo: 'tenda, danau, dan suasana senja di Glamping Lakeside.',
    petunjuk: 'Dari Ciwidey, lanjutkan ke arah Rancabali melalui Jalan Raya Ciwidey - Patengan. Hubungi pengelola untuk memastikan ketersediaan kamar dan titik penjemputan sebelum berangkat.',
    jam: SEMUA_HARI('Check-in 14.00, check-out 12.00'),
    catatanJam: 'Reservasi disarankan, terutama pada akhir pekan dan hari libur nasional.',
    harga: 850000, satuan: 'malam', mulai: true
  },
  {
    id: 'perkebunan-teh-rancabali',
    nama: 'Perkebunan Teh Rancabali',
    kategori: 'alam',
    seni: 'teh',
    populer: false,
    rating: 4.8,
    ulasan: 750,
    lokasi: 'Rancabali, Bandung',
    alamat: 'Rancabali, Kabupaten Bandung, Jawa Barat 40973',
    lat: -7.1462, lng: 107.3765,
    mapPos: [68, 44],
    deskripsi: 'Hamparan kebun teh berundak di dataran tinggi Rancabali. Jalan setapak di antara barisan teh cocok untuk berjalan santai dan berfoto saat pagi yang berkabut.',
    galeriInfo: 'hamparan kebun teh berundak di dataran tinggi Rancabali.',
    petunjuk: 'Kebun teh dapat dilihat langsung dari sepanjang Jalan Raya Ciwidey - Patengan. Cari area parkir yang aman sebelum berhenti untuk berfoto.',
    jam: SEMUA_HARI('06.00 - 17.00'),
    catatanJam: 'Kabut biasanya paling tebal di pagi hari. Bawa jaket karena suhu bisa turun cukup jauh.',
    harga: 0, satuan: 'orang'
  },
  {
    id: 'ranca-upas',
    nama: 'Ranca Upas',
    kategori: 'edukasi',
    seni: 'edukasi',
    populer: false,
    rating: 4.6,
    ulasan: 1300,
    lokasi: 'Ciwidey, Bandung',
    alamat: 'Alam Endah, Ciwidey, Kabupaten Bandung, Jawa Barat 40973',
    lat: -7.1385, lng: 107.3985,
    mapPos: [27, 68],
    deskripsi: 'Area konservasi dengan penangkaran rusa yang bisa dikunjungi keluarga. Pengunjung dapat belajar tentang satwa dan memberi makan rusa, serta berkemah di tengah hutan pinus.',
    galeriInfo: 'penangkaran rusa dan area berkemah di tengah hutan pinus.',
    petunjuk: 'Dari Ciwidey, ikuti jalan menuju Kawah Putih dan cari petunjuk arah ke Ranca Upas sebelum gerbang kawah. Jalannya menanjak, jadi pastikan kendaraan dalam kondisi baik.',
    jam: SEMUA_HARI('07.00 - 17.00'),
    catatanJam: 'Waktu memberi makan rusa dapat berbeda tiap hari. Tanyakan jadwalnya di loket saat tiba.',
    harga: 15000, satuan: 'orang'
  },
  {
    id: 'sentra-kuliner-patenggang',
    nama: 'Sentra Kuliner Patenggang',
    kategori: 'kuliner',
    seni: 'kuliner',
    populer: false,
    rating: 4.5,
    ulasan: 640,
    lokasi: 'Rancabali, Bandung',
    alamat: 'Sekitar Situ Patenggang, Rancabali, Kabupaten Bandung, Jawa Barat 40973',
    lat: -7.1668, lng: 107.3630,
    mapPos: [40, 62],
    deskripsi: 'Warung dan kedai di sekitar Situ Patenggang yang menyajikan makanan hangat khas Priangan. Cocok untuk makan siang setelah menyusuri danau.',
    galeriInfo: 'hidangan hangat dan suasana warung di sekitar Situ Patenggang.',
    petunjuk: 'Warung berada di sekitar area parkir Situ Patenggang. Setelah tiba di danau, ikuti jalur pejalan kaki ke arah kedai-kedai di tepi jalan.',
    jam: SEMUA_HARI('08.00 - 17.00'),
    catatanJam: 'Jam buka tiap warung bisa berbeda. Sebagian warung tutup lebih awal saat cuaca hujan.',
    harga: 15000, satuan: 'porsi', mulai: true
  },
  {
    id: 'masjid-jami-rancabali',
    nama: 'Masjid Jami Rancabali',
    kategori: 'religi',
    seni: 'religi',
    populer: false,
    rating: 4.7,
    ulasan: 210,
    lokasi: 'Rancabali, Bandung',
    alamat: 'Rancabali, Kabupaten Bandung, Jawa Barat 40973',
    lat: -7.1740, lng: 107.3800,
    mapPos: [30, 46],
    deskripsi: 'Masjid dengan halaman luas yang sering disinggahi wisatawan dan warga untuk beribadah dan beristirahat dalam perjalanan menuju kawasan Rancabali.',
    galeriInfo: 'bangunan dan halaman masjid di kawasan Rancabali.',
    petunjuk: 'Masjid berada di jalur utama menuju kawasan wisata Rancabali. Gunakan navigasi Google Maps untuk lokasi yang paling akurat.',
    jam: SEMUA_HARI('04.00 - 21.00'),
    catatanJam: 'Pengunjung diharapkan berpakaian sopan dan menjaga ketenangan, terutama pada waktu salat.',
    harga: 0, satuan: 'orang'
  }
];
