/* =====================================================================
   OKRATOKSIN 3D INTERACTIVE SCRIPT
===================================================================== */
'use strict';

// ══════════════════════════════════════════════════════════════
// 1. NAVBAR SCROLL + HAMBURGER
// ══════════════════════════════════════════════════════════════
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

hamburger?.addEventListener('click', () => {
  navLinks?.classList.toggle('open');
  hamburger.classList.toggle('open');
});

navLinks?.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger?.classList.remove('open');
  });
});

// Active nav highlight
const sections = document.querySelectorAll('section[id], div[id]');
const links = document.querySelectorAll('.nav-link');
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      links.forEach(l => l.classList.remove('active'));
      const match = document.querySelector(`.nav-link[href="#${e.target.id}"]`);
      if (match) match.classList.add('active');
    }
  });
}, { threshold: 0.35 });
sections.forEach(s => observer.observe(s));

// ══════════════════════════════════════════════════════════════
// 2. MOLEKUL 3D DRAGGABLE ROTATION
// ══════════════════════════════════════════════════════════════
const molMini = document.getElementById('molMini');
if (molMini) {
  let isDragging = false;
  let startX = 0, startY = 0;
  let currentRotX = 20, currentRotY = 0;

  molMini.addEventListener('mousedown', e => {
    isDragging = true;
    startX = e.clientX;
    startY = e.clientY;
    molMini.style.cursor = 'grabbing';
    molMini.style.animationPlayState = 'paused';
  });

  document.addEventListener('mousemove', e => {
    if (!isDragging) return;
    const dx = e.clientX - startX;
    const dy = e.clientY - startY;
    currentRotY += dx * 0.5;
    currentRotX -= dy * 0.5;
    currentRotX = Math.max(-60, Math.min(60, currentRotX));
    molMini.style.transform = `rotateX(${currentRotX}deg) rotateY(${currentRotY}deg)`;
    startX = e.clientX;
    startY = e.clientY;
  });

  document.addEventListener('mouseup', () => {
    if (isDragging) {
      isDragging = false;
      molMini.style.cursor = 'grab';
    }
  });
}

// ══════════════════════════════════════════════════════════════
// 3. SCROLL REVEAL ANIMATIONS 3D
// ══════════════════════════════════════════════════════════════
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      revealObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// Auto-add reveal class to major elements
document.querySelectorAll('.fungi-card, .fungi-card-new, .char-item, .health-card, .step-card, .team-card').forEach(el => {
  el.classList.add('reveal');
  revealObserver.observe(el);
});

// Fungi toxicity bar animation
const fungiCards = document.querySelectorAll('.fungi-card-new');
const fungiObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      const toxFill = e.target.querySelector('.tox-fill');
      const level = toxFill?.dataset.level;
      if (toxFill && level) {
        setTimeout(() => {
          toxFill.style.width = level + '%';
        }, 400);
      }
      fungiObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.2 });

fungiCards.forEach(card => {
  fungiObserver.observe(card);
  
  // Add click to zoom photo (optional enhancement)
  const photoFrame = card.querySelector('.fungi-photo-frame');
  if (photoFrame) {
    photoFrame.addEventListener('click', (e) => {
      e.stopPropagation();
      const img = photoFrame.querySelector('img');
      if (img) {
        // Create fullscreen overlay
        const overlay = document.createElement('div');
        overlay.style.cssText = `
          position: fixed;
          inset: 0;
          background: rgba(27,20,15,0.95);
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: zoom-out;
          backdrop-filter: blur(8px);
        `;
        
        const bigImg = document.createElement('img');
        bigImg.src = img.src;
        bigImg.alt = img.alt;
        bigImg.style.cssText = `
          max-width: 90%;
          max-height: 90vh;
          border-radius: 12px;
          box-shadow: 0 20px 80px rgba(0,0,0,0.5);
          transform: scale(0.8);
          opacity: 0;
          transition: all 0.3s;
        `;
        
        overlay.appendChild(bigImg);
        document.body.appendChild(overlay);
        
        // Fade in animation
        requestAnimationFrame(() => {
          bigImg.style.transform = 'scale(1)';
          bigImg.style.opacity = '1';
        });
        
        // Close on click
        overlay.addEventListener('click', () => {
          bigImg.style.transform = 'scale(0.8)';
          bigImg.style.opacity = '0';
          setTimeout(() => overlay.remove(), 300);
        });
      }
    });
  }
});

// ══════════════════════════════════════════════════════════════
// 4. STAT COUNTER ANIMATION
// ══════════════════════════════════════════════════════════════
const statNums = document.querySelectorAll('.stat-num[data-target]');
const statObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    const el = e.target;
    const target = parseFloat(el.dataset.target);
    const decimal = parseInt(el.dataset.decimal || '0');
    const duration = 1800;
    const startTime = performance.now();
    
    const animate = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      const current = target * ease;
      el.textContent = decimal > 0 ? current.toFixed(decimal) : Math.floor(current);
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
    statObserver.unobserve(el);
  });
}, { threshold: 0.5 });
statNums.forEach(el => statObserver.observe(el));

// ══════════════════════════════════════════════════════════════
// 5. PARALLAX 3D SCROLL EFFECT
// ══════════════════════════════════════════════════════════════
let ticking = false;
function parallax3D() {
  const scrolled = window.pageYOffset;
  
  // Hero background parallax
  const heroBg = document.querySelector('.hero-bg img');
  if (heroBg) {
    heroBg.style.transform = `translateY(${scrolled * 0.3}px) scale(1.1)`;
  }

  // Molekul parallax
  if (molMini && !molMini.matches(':hover')) {
    const molSpeed = scrolled * 0.15;
    molMini.style.transform = `translateY(${molSpeed}px) rotateX(20deg) rotateY(${molSpeed * 0.5}deg)`;
  }

  // Section headers parallax
  document.querySelectorAll('.section-header').forEach(header => {
    const rect = header.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      const offset = (window.innerHeight - rect.top) * 0.1;
      header.style.transform = `translateZ(${offset}px)`;
    }
  });

  ticking = false;
}

window.addEventListener('scroll', () => {
  if (!ticking) {
    requestAnimationFrame(parallax3D);
    ticking = true;
  }
}, { passive: true });

// ══════════════════════════════════════════════════════════════
// 6. 3D CARD TILT ON HOVER
// ══════════════════════════════════════════════════════════════
document.querySelectorAll('.fungi-card, .health-card, .team-card, .step-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)`;
  });
  
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

// ══════════════════════════════════════════════════════════════
// 7. HEALTH CARD PROGRESS BARS
// ══════════════════════════════════════════════════════════════
const healthFills = document.querySelectorAll('.health-fill');
const healthObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    const fill = e.target;
    const w = fill.dataset.w || '0';
    setTimeout(() => {
      fill.style.width = w + '%';
    }, 300);
    healthObserver.unobserve(fill);
  });
}, { threshold: 0.3 });
healthFills.forEach(f => healthObserver.observe(f));

// ══════════════════════════════════════════════════════════════
// 8. MOISTURE WIDGET
// ══════════════════════════════════════════════════════════════
const moistureFill = document.getElementById('moistureFill');
if (moistureFill) {
  const moistureObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        setTimeout(() => {
          moistureFill.style.width = '55%';
        }, 400);
        moistureObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.5 });
  moistureObs.observe(moistureFill);
}

// ══════════════════════════════════════════════════════════════
// 9. TABLE SORT & FILTER
// ══════════════════════════════════════════════════════════════
const regBody = document.getElementById('regBody');
if (regBody) {
  // Filter buttons
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      const filter = this.dataset.filter;
      regBody.querySelectorAll('tr').forEach(row => {
        if (filter === 'all') {
          row.style.display = '';
        } else {
          row.style.display = row.dataset.type === filter ? '' : 'none';
        }
      });
    });
  });

  // Sort table
  const allRows = () => Array.from(regBody.querySelectorAll('tr'));
  let sortState = { col: -1, dir: 1 };

  document.querySelectorAll('.reg-table th.sortable').forEach(th => {
    th.addEventListener('click', function() {
      const col = parseInt(this.dataset.col);
      if (sortState.col === col) {
        sortState.dir *= -1;
      } else {
        sortState.col = col;
        sortState.dir = 1;
      }

      document.querySelectorAll('.reg-table th').forEach(h => {
        h.classList.remove('sort-asc', 'sort-desc');
      });
      this.classList.add(sortState.dir === 1 ? 'sort-asc' : 'sort-desc');

      const rows = allRows().filter(r => {
        const cell = r.cells[col];
        return cell && cell.textContent.trim() !== '';
      });
      const emptyRows = allRows().filter(r => {
        const cell = r.cells[col];
        return !cell || cell.textContent.trim() === '';
      });

      rows.sort((a, b) => {
        let va = a.cells[col]?.textContent.trim() || '';
        let vb = b.cells[col]?.textContent.trim() || '';
        const na = parseFloat(va);
        const nb = parseFloat(vb);
        if (!isNaN(na) && !isNaN(nb)) return (na - nb) * sortState.dir;
        return va.localeCompare(vb, 'id') * sortState.dir;
      });

      rows.forEach(r => regBody.appendChild(r));
      emptyRows.forEach(r => regBody.appendChild(r));
    });
  });
}

// ══════════════════════════════════════════════════════════════
// 10. QUIZ SYSTEM
// ══════════════════════════════════════════════════════════════
const quizData = [
  { q: 'Apa kepanjangan OTA dalam konteks mikotoksin?',
    opts: ['Ochratoxin A','Organic Toxic Acid','Oxidative Toxin Alkaloid','Ochre Toxic Antigen'], ans: 0 },
  { q: 'OTA dianggap sebagai mikotoksin berbahaya ke berapa setelah aflatoksin?',
    opts: ['Pertama','Kedua','Ketiga','Keempat'], ans: 1 },
  { q: 'Kapang manakah yang BUKAN penghasil Okratoksin A?',
    opts: ['Aspergillus ochraceus','Penicillium verrucosum','Aspergillus flavus','Aspergillus carbonarius'], ans: 2 },
  { q: 'Batas kadar air biji kopi yang aman agar tidak terkontaminasi OTA adalah…',
    opts: ['≤ 15%','≤ 12,5%','≤ 10%','≤ 8%'], ans: 1 },
  { q: 'Negara yang menetapkan batas 3 µg/kg untuk kopi sangrai meliputi…',
    opts: ['Maroko & China','Tunisia & Georgia','Mesir, Belanda & Georgia','Semua negara'], ans: 2 },
  { q: 'Sifat OTA yang membuatnya mudah terakumulasi di jaringan tubuh adalah…',
    opts: ['Larut air','Larut lemak','Tahan beku','Berfluoresensi UV'], ans: 1 },
  { q: 'Nekrosis 50% sel Neuro-2a oleh OTA berkaitan dengan risiko…',
    opts: ['Diabetes mellitus','Gagal jantung','Kanker otak','Osteoporosis'], ans: 2 },
];

let qIndex = 0, qScore = 0, qAnswered = false;

const overlay = document.getElementById('quizOverlay');
const quizClose = document.getElementById('quizClose');
const quizContent = document.getElementById('quizContent');
const progressBar = document.getElementById('quizProgress');
const counter = document.getElementById('quizCounter');
const fabQuiz = document.getElementById('fabQuiz');

function openQuiz() {
  qIndex = 0; qScore = 0;
  overlay?.classList.add('open');
  renderQ();
}
function closeQuiz() { overlay?.classList.remove('open'); }

function renderQ() {
  qAnswered = false;
  const total = quizData.length;
  if (progressBar) progressBar.innerHTML = `<div style="width:${(qIndex / total) * 100}%"></div>`;
  if (counter) counter.textContent = `${qIndex + 1} / ${total}`;

  const d = quizData[qIndex];
  const letters = ['A','B','C','D'];
  if (quizContent) {
    quizContent.innerHTML = `
      <div style="font-family:var(--font-mono);font-size:0.75rem;color:var(--roast);margin-bottom:0.5rem">Soal ${qIndex + 1}</div>
      <div style="font-size:1.05rem;font-weight:600;margin-bottom:1.2rem;color:var(--ink)">${d.q}</div>
      <div style="display:flex;flex-direction:column;gap:0.6rem">
        ${d.opts.map((o, i) => `
          <button class="quiz-opt" data-i="${i}" style="width:100%;text-align:left;background:var(--crema);border:1.5px solid var(--kraft-dark);color:var(--ink);padding:0.85rem 1rem;border-radius:8px;cursor:pointer;font-size:0.9rem;transition:all 0.3s;font-family:var(--font-display)">
            <strong>${letters[i]}.</strong> ${o}
          </button>`).join('')}
      </div>
      <div id="qFeedback" style="margin-top:1.2rem;text-align:center"></div>
    `;

    quizContent.querySelectorAll('.quiz-opt').forEach(btn => {
      btn.addEventListener('mouseenter', function() {
        if (!qAnswered) {
          this.style.borderColor = 'var(--stamp)';
          this.style.background = 'rgba(168,49,31,0.08)';
          this.style.transform = 'translateX(6px)';
        }
      });
      btn.addEventListener('mouseleave', function() {
        if (!qAnswered) {
          this.style.borderColor = 'var(--kraft-dark)';
          this.style.background = 'var(--crema)';
          this.style.transform = '';
        }
      });
      btn.addEventListener('click', function() {
        if (qAnswered) return;
        qAnswered = true;
        const chosen = parseInt(this.dataset.i);
        quizContent.querySelectorAll('.quiz-opt').forEach(b => {
          const bi = parseInt(b.dataset.i);
          if (bi === d.ans) {
            b.style.borderColor = '#4DD8C0';
            b.style.background = 'rgba(77,216,192,0.15)';
            b.style.color = '#2A9D8F';
          } else if (bi === chosen) {
            b.style.borderColor = 'var(--stamp)';
            b.style.background = 'rgba(168,49,31,0.15)';
            b.style.color = 'var(--stamp)';
          }
          b.style.cursor = 'default';
          b.style.transform = '';
        });
        if (chosen === d.ans) qScore++;
        const fb = document.getElementById('qFeedback');
        if (chosen === d.ans) {
          fb.innerHTML = `<p style="color:#2A9D8F;font-weight:700">✓ Benar!</p>`;
        } else {
          fb.innerHTML = `<p style="color:var(--stamp);font-weight:700">✗ Kurang tepat. Jawaban: <strong>${letters[d.ans]}. ${d.opts[d.ans]}</strong></p>`;
        }
        if (qIndex < quizData.length - 1) {
          fb.innerHTML += `<button id="nextBtn" style="margin-top:1rem;background:var(--stamp);color:var(--crema);border:none;padding:0.7rem 2rem;border-radius:6px;font-weight:700;cursor:pointer;font-family:var(--font-mono)">Lanjut →</button>`;
          document.getElementById('nextBtn').addEventListener('click', () => { qIndex++; renderQ(); });
        } else {
          fb.innerHTML += `<button id="nextBtn" style="margin-top:1rem;background:var(--stamp);color:var(--crema);border:none;padding:0.7rem 2rem;border-radius:6px;font-weight:700;cursor:pointer;font-family:var(--font-mono)">Lihat Hasil</button>`;
          document.getElementById('nextBtn').addEventListener('click', showResult);
        }
      });
    });
  }
}

function showResult() {
  const total = quizData.length;
  const pct = Math.round((qScore / total) * 100);
  if (progressBar) progressBar.innerHTML = `<div style="width:100%"></div>`;
  if (counter) counter.textContent = `Selesai`;
  let msg = '';
  if (pct >= 86) msg = '🎉 Luar biasa! Penguasaan materi sangat baik.';
  else if (pct >= 57) msg = '👍 Cukup baik! Masih ada ruang untuk berkembang.';
  else msg = '📖 Perlu belajar lebih lagi. Baca ulang materinya ya!';

  if (quizContent) {
    quizContent.innerHTML = `
      <div style="text-align:center;padding:1.5rem 0">
        <div style="font-size:4rem;font-weight:800;color:var(--stamp);font-family:var(--font-display)">${pct}%</div>
        <div style="font-size:0.85rem;color:var(--roast);margin:0.5rem 0 1.5rem;font-family:var(--font-mono)">${qScore} dari ${total} soal benar</div>
        <div style="font-size:1.05rem;margin-bottom:1.5rem;color:var(--ink)">${msg}</div>
        <button onclick="window.startQuizAgain()" style="background:var(--stamp);color:var(--crema);border:none;padding:0.75rem 2rem;border-radius:6px;font-weight:700;cursor:pointer;font-family:var(--font-mono)">↺ Ulangi Kuis</button>
      </div>
    `;
  }
}

window.startQuizAgain = function() { qIndex = 0; qScore = 0; renderQ(); };

fabQuiz?.addEventListener('click', openQuiz);
quizClose?.addEventListener('click', closeQuiz);
overlay?.addEventListener('click', e => { if (e.target === overlay) closeQuiz(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeQuiz(); });

// ══════════════════════════════════════════════════════════════
// 11. PAGE FADE IN
// ══════════════════════════════════════════════════════════════
document.documentElement.style.opacity = '0';
document.documentElement.style.transition = 'opacity 0.5s ease';
window.addEventListener('load', () => {
  requestAnimationFrame(() => {
    document.documentElement.style.opacity = '1';
  });
});

console.log('%c⚗️ Okratoksin Website Loaded', 'color:#A8311F;font-weight:bold;font-size:14px;font-family:IBM Plex Mono');
console.log('%c3D Interactive Mode Active', 'color:#6B4226;font-size:11px');

// ══════════════════════════════════════════════════════════════
// 12. 3D MOLECULE VIEWER — OCHRATOXIN A STRUCTURE
// ══════════════════════════════════════════════════════════════
const canvas = document.getElementById('moleculeCanvas');
if (canvas && window.OTA_MOLECULE) {
  const ctx = canvas.getContext('2d');
  let width, height, dpr;
  
  // Molecule state
  let rotX = 0.3, rotY = 0.5, rotZ = 0;
  let zoom = 1.2;
  let autoRotate = true;
  let isDragging = false;
  let lastX = 0, lastY = 0;
  
  const molecule = window.OTA_MOLECULE;
  
  // Atom colors (CPK coloring scheme)
  const atomColors = {
    'C': '#909090',
    'O': '#FF0D0D',
    'N': '#3050F8',
    'Cl': '#1FF01F',
    'H': '#FFFFFF'
  };
  
  const atomSizes = {
    'C': 0.7,
    'O': 0.65,
    'N': 0.7,
    'Cl': 1.0,
    'H': 0.4
  };
  
  // Setup canvas
  function setupCanvas() {
    dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    width = rect.width;
    height = rect.height;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);
  }
  
  // 3D rotation matrices
  function rotateX(p, angle) {
    const cos = Math.cos(angle), sin = Math.sin(angle);
    return {
      x: p.x,
      y: p.y * cos - p.z * sin,
      z: p.y * sin + p.z * cos
    };
  }
  
  function rotateY(p, angle) {
    const cos = Math.cos(angle), sin = Math.sin(angle);
    return {
      x: p.x * cos + p.z * sin,
      y: p.y,
      z: -p.x * sin + p.z * cos
    };
  }
  
  function rotateZ(p, angle) {
    const cos = Math.cos(angle), sin = Math.sin(angle);
    return {
      x: p.x * cos - p.y * sin,
      y: p.x * sin + p.y * cos,
      z: p.z
    };
  }
  
  // Project 3D to 2D
  function project(p) {
    const scale = zoom * 15;
    const perspective = 800;
    const factor = perspective / (perspective + p.z);
    return {
      x: width / 2 + p.x * scale * factor,
      y: height / 2 - p.y * scale * factor,
      z: p.z,
      scale: factor
    };
  }
  
  // Transform and project all atoms
  function transformAtoms() {
    return molecule.atoms.map(atom => {
      let p = { x: atom.x, y: atom.y, z: atom.z };
      p = rotateX(p, rotX);
      p = rotateY(p, rotY);
      p = rotateZ(p, rotZ);
      return { ...atom, projected: project(p), z: p.z };
    });
  }
  
  // Render
  function render() {
    ctx.clearRect(0, 0, width, height);
    
    // Transform atoms
    const transformed = transformAtoms();
    
    // Sort by z-depth (painter's algorithm)
    const sorted = transformed.slice().sort((a, b) => a.z - b.z);
    
    // Draw bonds first
    ctx.lineWidth = 2;
    molecule.bonds.forEach(bond => {
      const atomA = transformed[bond.a];
      const atomB = transformed[bond.b];
      if (!atomA || !atomB) return;
      
      const pA = atomA.projected;
      const pB = atomB.projected;
      
      // Gradient for depth
      const gradient = ctx.createLinearGradient(pA.x, pA.y, pB.x, pB.y);
      const depthA = (atomA.z + 20) / 40;
      const depthB = (atomB.z + 20) / 40;
      
      if (bond.order === 2) {
        // Double bond
        ctx.strokeStyle = `rgba(200,178,135,${0.3 + depthA * 0.5})`;
        ctx.lineWidth = 1.5;
        
        const dx = pB.y - pA.y;
        const dy = pA.x - pB.x;
        const len = Math.sqrt(dx * dx + dy * dy);
        const offset = 2;
        const ox = (dx / len) * offset;
        const oy = (dy / len) * offset;
        
        ctx.beginPath();
        ctx.moveTo(pA.x + ox, pA.y + oy);
        ctx.lineTo(pB.x + ox, pB.y + oy);
        ctx.stroke();
        
        ctx.beginPath();
        ctx.moveTo(pA.x - ox, pA.y - oy);
        ctx.lineTo(pB.x - ox, pB.y - oy);
        ctx.stroke();
      } else if (bond.order === 1.5) {
        // Aromatic (dashed)
        ctx.strokeStyle = `rgba(200,178,135,${0.4 + depthA * 0.5})`;
        ctx.lineWidth = 2;
        ctx.setLineDash([4, 3]);
        ctx.beginPath();
        ctx.moveTo(pA.x, pA.y);
        ctx.lineTo(pB.x, pB.y);
        ctx.stroke();
        ctx.setLineDash([]);
      } else {
        // Single bond
        ctx.strokeStyle = `rgba(200,178,135,${0.5 + depthA * 0.5})`;
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.moveTo(pA.x, pA.y);
        ctx.lineTo(pB.x, pB.y);
        ctx.stroke();
      }
    });
    
    // Draw atoms
    sorted.forEach(atom => {
      const p = atom.projected;
      const color = atomColors[atom.el] || '#CCCCCC';
      const size = (atomSizes[atom.el] || 0.6) * 8 * p.scale;
      const depth = (atom.z + 20) / 40; // normalize depth
      
      // Outer glow
      const glowGradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, size * 1.8);
      glowGradient.addColorStop(0, `${color}40`);
      glowGradient.addColorStop(1, 'transparent');
      ctx.fillStyle = glowGradient;
      ctx.beginPath();
      ctx.arc(p.x, p.y, size * 1.8, 0, Math.PI * 2);
      ctx.fill();
      
      // Atom sphere with gradient
      const gradient = ctx.createRadialGradient(
        p.x - size * 0.3, p.y - size * 0.3, size * 0.1,
        p.x, p.y, size
      );
      gradient.addColorStop(0, '#FFFFFF');
      gradient.addColorStop(0.3, color);
      gradient.addColorStop(1, shadeColor(color, -30));
      
      ctx.fillStyle = gradient;
      ctx.shadowColor = 'rgba(0,0,0,0.3)';
      ctx.shadowBlur = 10 * depth;
      ctx.shadowOffsetX = 3 * depth;
      ctx.shadowOffsetY = 3 * depth;
      
      ctx.beginPath();
      ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.shadowColor = 'transparent';
      
      // Outline
      ctx.strokeStyle = shadeColor(color, -40);
      ctx.lineWidth = 1.5;
      ctx.stroke();
      
      // Element label (for non-carbon atoms or important atoms)
      if (atom.el !== 'C' || size > 8) {
        ctx.fillStyle = '#1B140F';
        ctx.font = `bold ${Math.max(8, size * 0.9)}px "IBM Plex Mono"`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(atom.el, p.x, p.y);
      }
    });
    
    if (autoRotate) {
      rotY += 0.005;
    }
    
    requestAnimationFrame(render);
  }
  
  // Utility: shade color
  function shadeColor(color, percent) {
    const num = parseInt(color.replace('#', ''), 16);
    const amt = Math.round(2.55 * percent);
    const R = Math.max(0, Math.min(255, (num >> 16) + amt));
    const G = Math.max(0, Math.min(255, ((num >> 8) & 0x00FF) + amt));
    const B = Math.max(0, Math.min(255, (num & 0x0000FF) + amt));
    return `#${(0x1000000 + R * 0x10000 + G * 0x100 + B).toString(16).slice(1)}`;
  }
  
  // Mouse/touch interactions
  canvas.addEventListener('mousedown', e => {
    isDragging = true;
    lastX = e.clientX;
    lastY = e.clientY;
    autoRotate = false;
  });
  
  canvas.addEventListener('mousemove', e => {
    if (!isDragging) return;
    const dx = e.clientX - lastX;
    const dy = e.clientY - lastY;
    rotY += dx * 0.01;
    rotX -= dy * 0.01;
    lastX = e.clientX;
    lastY = e.clientY;
  });
  
  canvas.addEventListener('mouseup', () => isDragging = false);
  canvas.addEventListener('mouseleave', () => isDragging = false);
  
  // Touch support
  canvas.addEventListener('touchstart', e => {
    if (e.touches.length === 1) {
      isDragging = true;
      lastX = e.touches[0].clientX;
      lastY = e.touches[0].clientY;
      autoRotate = false;
    }
  });
  
  canvas.addEventListener('touchmove', e => {
    if (!isDragging || e.touches.length !== 1) return;
    e.preventDefault();
    const dx = e.touches[0].clientX - lastX;
    const dy = e.touches[0].clientY - lastY;
    rotY += dx * 0.01;
    rotX -= dy * 0.01;
    lastX = e.touches[0].clientX;
    lastY = e.touches[0].clientY;
  });
  
  canvas.addEventListener('touchend', () => isDragging = false);
  
  // Zoom with mouse wheel
  canvas.addEventListener('wheel', e => {
    e.preventDefault();
    zoom *= e.deltaY < 0 ? 1.1 : 0.9;
    zoom = Math.max(0.5, Math.min(3, zoom));
  }, { passive: false });
  
  // Controls
  document.getElementById('molRotate')?.addEventListener('click', function() {
    autoRotate = !autoRotate;
    this.classList.toggle('active', autoRotate);
  });
  
  document.getElementById('molReset')?.addEventListener('click', () => {
    rotX = 0.3;
    rotY = 0.5;
    rotZ = 0;
    zoom = 1.2;
    autoRotate = true;
    document.getElementById('molRotate')?.classList.add('active');
  });
  
  document.getElementById('molZoomIn')?.addEventListener('click', () => {
    zoom = Math.min(3, zoom * 1.2);
  });
  
  document.getElementById('molZoomOut')?.addEventListener('click', () => {
    zoom = Math.max(0.5, zoom * 0.8);
  });
  
  // Init
  setupCanvas();
  window.addEventListener('resize', () => {
    setupCanvas();
  });
  
  // Set initial state
  document.getElementById('molRotate')?.classList.add('active');
  
  // Start render loop
  render();
  
  console.log('%c🧬 Molecule Viewer Initialized', 'color:#4DD8C0;font-weight:bold;font-size:12px');
}
