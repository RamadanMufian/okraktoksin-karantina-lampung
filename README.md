# 🧪 Toksikologi Okratoksin - Website Edukatif Interaktif

Website pembelajaran interaktif tentang Ochratoxin A (OTA), mikotoksin berbahaya yang dihasilkan oleh cendawan pada komoditas pertanian, khususnya kopi.

## 🌟 Fitur Utama

### 🎨 Desain Interaktif 3D
- **Molekul 3D Viewer** - Visualisasi struktur molekul OTA dengan rotasi interaktif
- **3D Card Effects** - Hover tilt dan transform effects pada semua cards
- **Parallax Scrolling** - Smooth scrolling dengan depth perception
- **Floating Animations** - Icon dan badge dengan efek floating 3D

### 📊 Konten Edukatif Lengkap
1. **Ringkasan Mikotoksin** - Overview OTA dan dampaknya
2. **Tiga Cendawan Penghasil OTA** - Detail fungi dengan photo cards interaktif
3. **Karakteristik Molekul** - Struktur kimia dengan 3D molecule viewer
4. **Enam Dampak Klinis** - Health impact cards dengan medical illustrations
5. **Enam Langkah Pengendalian** - Interactive step cards dengan visual guides
6. **Regulasi Global** - Sortable table standar 6 negara
7. **Tim Penyusun** - Team cards dengan photo profiles

### 🎯 Teknologi
- **Pure HTML5/CSS3/JavaScript** - No frameworks, optimized performance
- **Responsive Design** - Mobile (≤640px), Tablet (641-1024px), Desktop (>1024px)
- **Canvas 2D API** - Custom molecule renderer (28 atoms, 30 bonds)
- **Intersection Observer API** - Scroll-triggered animations
- **CSS 3D Transforms** - Hardware-accelerated animations

## 📱 Responsive Breakpoints
```css
Mobile:  max-width: 640px
Tablet:  641px - 1024px
Desktop: min-width: 1025px
```

## 🎨 Color Palette
```css
--kraft:      #E4D5B7  /* Kraft paper background */
--roast:      #6B4226  /* Roasted coffee brown */
--stamp:      #A83121  /* Warning red stamp */
--inspect:    #4DD8C0  /* Inspection cyan */
--ink:        #2C1810  /* Text ink */
--crema:      #F5ECD7  /* Coffee crema light */
```

## 📂 Struktur File
```
okraktoksin-karantina-lampung/
├── index.html              # Main HTML structure
├── style.css               # Base styling & 3D effects
├── responsive.css          # Responsive breakpoints
├── script.js               # Interactive features
├── molecule-data.js        # OTA molecular structure data
├── logo-karantina.png      # Karantina Lampung logo
├── aspergillus-*.jpg       # Fungi images (3 files)
├── kidney-disease.jpg      # Health impact images (6 files)
├── nephron-anatomy.jpg
├── dna-damage.jpg
├── cancer-cell.jpg
├── blood-cells.jpg
├── neuron-damage.jpg
├── step-01-sortasi.jpg     # Prevention steps images (6 files)
├── step-02-penjemuran.jpg
├── step-03-pengeringan.jpg
├── step-04-pemisahan.jpg
├── step-05-ruang.jpg
├── step-06-kontrol.jpg
└── team-*.jpg              # Team member photos (7 files)
```

## 🚀 Quick Start

### 1. Clone Repository
```bash
git clone https://github.com/RamadanMufian/okraktoksin-karantina-lampung.git
cd okraktoksin-karantina-lampung
```

### 2. Open in Browser
```bash
# Buka index.html di browser favorit Anda
# Atau gunakan local server:
python -m http.server 8000
# Akses: http://localhost:8000
```

### 3. Deploy to GitHub Pages
Website otomatis ter-deploy di:
```
https://ramadanmufian.github.io/okraktoksin-karantina-lampung/
```

## 🎓 Tim Penyusun

**Kelompok Toksikologi - Balai Karantina Lampung**

1. Adelia Putri Khaila - E1K23011
2. Apri Fajar Susmiati - E1K23009
3. Anggi Dwi Cahyati - E1K23023
4. Jea Afdila Durlle - E1K23036
5. Lidia - E1K23001
6. Virna Endang Sartika - E1K23007
7. Yolaini Pratama - E1K23013

## 📍 Kontak

**Balai Karantina Hewan, Ikan dan Tumbuhan Lampung**

📧 Email: karantinapertanianlampung@gmail.com  
📍 Alamat: Jl. Soekarno-Hatta Km. 20, Way Laga, Kec. Panjang, Kota Bandar Lampung  
📮 Kode Pos: 35244  
⏰ Jam Pelayanan:  
- Senin - Kamis: 08.00 - 16.00  
- Jumat: 08.00 - 16.30  

## 📄 Lisensi

© 2024 Balai Karantina Pertanian Lampung. All rights reserved.

Website ini dibuat untuk keperluan edukasi dan pembelajaran tentang keamanan pangan komoditas pertanian.

## 🌟 Fitur Interaktif Detail

### Molecule 3D Viewer
- 28 atoms (C, O, N, H, Cl) dengan CPK coloring
- 30 bonds dengan depth-based rendering
- Mouse drag untuk rotasi
- Scroll wheel untuk zoom
- Auto-rotate mode
- Reset view button

### Health Impact Cards
- 200×200px medical illustrations
- 3D floating badges
- Gradient overlay effects
- Hover scale & tilt
- Animated health bars (0-95%)
- Color-coded severity levels

### Prevention Steps
- 240px hero images
- Interactive moisture widget
- Pulsing critical marker
- Shimmer animation on progress bar
- Temperature & humidity stats
- Tag system dengan emojis

### Responsive Features
- Hamburger menu untuk mobile
- Touch-optimized interactions
- Adaptive image sizes
- Fluid typography
- Mobile-first approach

## 🔧 Browser Support

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ Opera 76+

## 📊 Performance

- Lighthouse Score: 95+
- First Contentful Paint: <1.5s
- Time to Interactive: <3.0s
- Cumulative Layout Shift: <0.1

## 🎯 Educational Goals

Website ini dirancang untuk:
1. Meningkatkan awareness tentang bahaya OTA
2. Edukasi visual tentang struktur molekul racun
3. Panduan praktis pencegahan kontaminasi
4. Compliance dengan regulasi internasional
5. Best practices dalam quality control

---

**Made with ❤️ by Kelompok Toksikologi Karantina Lampung**

🌐 **Live Demo:** [https://ramadanmufian.github.io/okraktoksin-karantina-lampung/](https://ramadanmufian.github.io/okraktoksin-karantina-lampung/)

⭐ **Star this repo** if you find it helpful!
