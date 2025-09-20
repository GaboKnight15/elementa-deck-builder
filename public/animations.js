const PARTICLE_PRESETS = {
  red: {
    particles: {
      number: { value: 30, density: { enable: true, value_area: 200 } },
      color: { value: ['#ff9800', '#ff4500', '#ffd700', '#ff0000'] }, // orange, fire, yellow, deep red
      shape: { type: 'circle' },
      opacity: { value: 0.8, random: true, anim: { enable: true, speed: 1, opacity_min: 0.4, sync: false } },
      size: { value: 7, random: true, anim: { enable: true, speed: 2, size_min: 3, sync: false } },
      line_linked: { enable: false },
      move: { enable: true, speed: 3, direction: 'top', random: true, straight: false, out_mode: 'out', bounce: false }
    },
    interactivity: { detect_on: 'canvas', events: { onhover: { enable: false }, onclick: { enable: false }, resize: true } },
    retina_detect: true
  },
  green: {
    particles: {
      number: { value: 30, density: { enable: true, value_area: 200 } },
      color: { value: ['#00c800', '#7fff7f', '#137c13', '#b6ff79'] }, // green, light green, dark green, lime
      shape: { type: 'circle' },
      opacity: { value: 0.8, random: true, anim: { enable: true, speed: 1, opacity_min: 0.4, sync: false } },
      size: { value: 7, random: true, anim: { enable: true, speed: 2, size_min: 3, sync: false } },
      line_linked: { enable: false },
      move: { enable: true, speed: 3, direction: 'top', random: true, straight: false, out_mode: 'out', bounce: false }
    },
    interactivity: { detect_on: 'canvas', events: { onhover: { enable: false }, onclick: { enable: false }, resize: true } },
    retina_detect: true
  },
  blue: {
    particles: {
      number: { value: 30, density: { enable: true, value_area: 200 } },
      color: { value: ['#00bfff', '#1e90ff', '#00149e', '#b0e0ff'] }, // sky, medium, deep, mist blue
      shape: { type: 'circle' },
      opacity: { value: 0.8, random: true, anim: { enable: true, speed: 1, opacity_min: 0.4, sync: false } },
      size: { value: 7, random: true, anim: { enable: true, speed: 2, size_min: 3, sync: false } },
      line_linked: { enable: false },
      move: { enable: true, speed: 3, direction: 'top', random: true, straight: false, out_mode: 'out', bounce: false }
    },
    interactivity: { detect_on: 'canvas', events: { onhover: { enable: false }, onclick: { enable: false }, resize: true } },
    retina_detect: true
  },
  yellow: {
    particles: {
      number: { value: 30, density: { enable: true, value_area: 200 } },
      color: { value: ['#ffe066', '#fff700', '#ffd700', '#fffde4'] }, // gold, pure yellow, gold, pale yellow
      shape: { type: 'circle' },
      opacity: { value: 0.8, random: true, anim: { enable: true, speed: 1, opacity_min: 0.4, sync: false } },
      size: { value: 7, random: true, anim: { enable: true, speed: 2, size_min: 3, sync: false } },
      line_linked: { enable: false },
      move: { enable: true, speed: 3, direction: 'top', random: true, straight: false, out_mode: 'out', bounce: false }
    },
    interactivity: { detect_on: 'canvas', events: { onhover: { enable: false }, onclick: { enable: false }, resize: true } },
    retina_detect: true
  },
  purple: {
    particles: {
      number: { value: 30, density: { enable: true, value_area: 200 } },
      color: { value: ['#b266ff', '#8000ff', '#4b006e', '#e0b3ff'] }, // lavender, purple, deep purple, pale purple
      shape: { type: 'circle' },
      opacity: { value: 0.8, random: true, anim: { enable: true, speed: 1, opacity_min: 0.4, sync: false } },
      size: { value: 7, random: true, anim: { enable: true, speed: 2, size_min: 3, sync: false } },
      line_linked: { enable: false },
      move: { enable: true, speed: 3, direction: 'top', random: true, straight: false, out_mode: 'out', bounce: false }
    },
    interactivity: { detect_on: 'canvas', events: { onhover: { enable: false }, onclick: { enable: false }, resize: true } },
    retina_detect: true
  },
  gray: {
    particles: {
      number: { value: 30, density: { enable: true, value_area: 200 } },
      color: { value: ['#d3d3d3', '#b0b0b0', '#505050', '#f7f7f7'] }, // light, mid, dark, off-white gray
      shape: { type: 'circle' },
      opacity: { value: 0.8, random: true, anim: { enable: true, speed: 1, opacity_min: 0.4, sync: false } },
      size: { value: 7, random: true, anim: { enable: true, speed: 2, size_min: 3, sync: false } },
      line_linked: { enable: false },
      move: { enable: true, speed: 3, direction: 'top', random: true, straight: false, out_mode: 'out', bounce: false }
    },
    interactivity: { detect_on: 'canvas', events: { onhover: { enable: false }, onclick: { enable: false }, resize: true } },
    retina_detect: true
  },
  black: {
    particles: {
      number: { value: 30, density: { enable: true, value_area: 200 } },
      color: { value: ['#000000', '#434343', '#6e6e6e', '#a0a0a0'] }, // black, charcoal, gray, light gray
      shape: { type: 'circle' },
      opacity: { value: 0.8, random: true, anim: { enable: true, speed: 1, opacity_min: 0.4, sync: false } },
      size: { value: 7, random: true, anim: { enable: true, speed: 2, size_min: 3, sync: false } },
      line_linked: { enable: false },
      move: { enable: true, speed: 3, direction: 'top', random: true, straight: false, out_mode: 'out', bounce: false }
    },
    interactivity: { detect_on: 'canvas', events: { onhover: { enable: false }, onclick: { enable: false }, resize: true } },
    retina_detect: true
  },
  white: {
    particles: {
      number: { value: 30, density: { enable: true, value_area: 200 } },
      color: { value: ['#ffffff', '#f6f6f6', '#e0e0e0', '#bfbfbf'] }, // white, off-white, light gray
      shape: { type: 'circle' },
      opacity: { value: 0.8, random: true, anim: { enable: true, speed: 1, opacity_min: 0.4, sync: false } },
      size: { value: 7, random: true, anim: { enable: true, speed: 2, size_min: 3, sync: false } },
      line_linked: { enable: false },
      move: { enable: true, speed: 3, direction: 'top', random: true, straight: false, out_mode: 'out', bounce: false }
    },
    interactivity: { detect_on: 'canvas', events: { onhover: { enable: false }, onclick: { enable: false }, resize: true } },
    retina_detect: true
  },
  bronze: {
    particles: {
      number: { value: 25, density: { enable: true, value_area: 120 } },
      color: { value: ['#b08d57', '#cd7f32', '#ad8a56', '#ffb46a'] }, // bronze/copper
      shape: { type: 'circle' },
      opacity: { value: 0.8, random: true, anim: { enable: true, speed: 1, opacity_min: 0.4, sync: false } },
      size: { value: 5, random: true, anim: { enable: true, speed: 2, size_min: 2.5, sync: false } },
      line_linked: { enable: false },
      move: { enable: true, speed: 2, direction: 'top', random: true, straight: false, out_mode: 'out', bounce: false }
    },
    interactivity: { detect_on: 'canvas', events: { onhover: { enable: false }, onclick: { enable: false }, resize: true } },
    retina_detect: true
  },
  silver: {
    particles: {
      number: { value: 28, density: { enable: true, value_area: 120 } },
      color: { value: ['#d7d7d7', '#c0c0c0', '#bfc1c2', '#f0f0f0', '#b0b0b0'] }, // silver
      shape: { type: 'circle' },
      opacity: { value: 0.85, random: true, anim: { enable: true, speed: 1, opacity_min: 0.4, sync: false } },
      size: { value: 5.5, random: true, anim: { enable: true, speed: 2, size_min: 2.7, sync: false } },
      line_linked: { enable: false },
      move: { enable: true, speed: 2.5, direction: 'top', random: true, straight: false, out_mode: 'out', bounce: false }
    },
    interactivity: { detect_on: 'canvas', events: { onhover: { enable: false }, onclick: { enable: false }, resize: true } },
    retina_detect: true
  },
  gold: {
    particles: {
      number: { value: 32, density: { enable: true, value_area: 120 } },
      color: { value: ['#ffe066', '#ffd700', '#fff700', '#fffbe2', '#fffde4'] }, // gold/yellow
      shape: { type: 'star' },
      opacity: { value: 0.9, random: true, anim: { enable: true, speed: 1.5, opacity_min: 0.5, sync: false } },
      size: { value: 7, random: true, anim: { enable: true, speed: 2.2, size_min: 3.5, sync: false } },
      line_linked: { enable: false },
      move: { enable: true, speed: 3, direction: 'top', random: true, straight: false, out_mode: 'out', bounce: false }
    },
    interactivity: { detect_on: 'canvas', events: { onhover: { enable: false }, onclick: { enable: false }, resize: true } },
    retina_detect: true
  },
};
const STAR_PARTICLE_PRESET = {
  particles: {
    number: { value: 40, density: { enable: true, value_area: 120 } },
    color: { value: ['#ffe066', '#fff700', '#ffd700', '#fffde4', '#fff', '#b3e0ff', '#cfa0ff'] },
    shape: { type: 'star' },
    opacity: { value: 0.8, random: true, anim: { enable: true, speed: 1, opacity_min: 0.3, sync: false } },
    size: { value: 3, random: true, anim: { enable: true, speed: 5, size_min: 1.5, sync: false } },
    line_linked: { enable: false },
    move: { enable: true, speed: 3, direction: 'top', random: true, straight: false, out_mode: 'out', bounce: false }
  },
  interactivity: { detect_on: 'canvas', events: { onhover: { enable: false }, onclick: { enable: false }, resize: true } },
  retina_detect: true
};

function createStarBurstAt(x, y, options = {}) {
  const {
    particleCount = 20,
    radius = 32,
    particleSize = 1.1,
    duration = 300,
    colors = ['#ffd700', '#fffbe2', '#fff', '#ffe066', '#b3e0ff', '#cfa0ff']
  } = options;

  // Create canvas overlay
  const canvas = document.createElement('canvas');
  canvas.width = radius * 2;
  canvas.height = radius * 2;
  canvas.style.position = 'fixed';
  canvas.style.left = (x - radius) + 'px';
  canvas.style.top = (y - radius) + 'px';
  canvas.style.pointerEvents = 'none';
  canvas.style.zIndex = 9999;
  document.body.appendChild(canvas);
  const ctx = canvas.getContext('2d');

  // Generate particles
  const particles = [];
  for (let i = 0; i < particleCount; i++) {
    const angle = (2 * Math.PI * i) / particleCount + (Math.random() * 0.5 - 0.25);
    const speed = (0.82 + Math.random() * 0.22) * radius;
    const color = colors[Math.floor(Math.random() * colors.length)];
    particles.push({
      angle,
      speed,
      color,
      size: particleSize + Math.random() * 0.5,
      rotate: Math.random() * Math.PI,
      x: radius, y: radius
    });
  }

  let startTime;
  function draw(now) {
    if (!startTime) startTime = now;
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw all particles
    particles.forEach(p => {
      // Move outward with easing
      const dist = progress * p.speed * 2 * (1 - 0.6 * progress);
      const px = p.x + Math.cos(p.angle) * dist;
      const py = p.y + Math.sin(p.angle) * dist;
      // Fade out near the edge: alpha diminishes with progress
      const alpha = Math.max(0, 1 - Math.pow(progress, 1.2));
      drawStar(ctx, px, py, p.size, p.size * 2, 5, p.color, alpha, p.rotate);
    });

    if (progress < 1) {
      requestAnimationFrame(draw);
    } else {
      canvas.remove();
    }
  }
  requestAnimationFrame(draw);
}

// Helper: draw a simple 5-pointed star
function drawStar(ctx, x, y, r1, r2, points, color, alpha, rotation = 0) {
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.beginPath();
  ctx.translate(x, y);
  ctx.rotate(rotation);
  for (let i = 0; i < points * 2; i++) {
    const angle = (Math.PI * i) / points;
    const r = i % 2 === 0 ? r2 : r1;
    ctx.lineTo(Math.cos(angle) * r, Math.sin(angle) * r);
  }
  ctx.closePath();
  ctx.fillStyle = color;
  ctx.shadowColor = color;
  ctx.shadowBlur = 3;
  ctx.fill();
  ctx.restore();
}

// Attach click event for custom burst
document.addEventListener('click', function(e) {
  createStarBurstAt(e.clientX, e.clientY);
});

function applyCardParticles({ cardDiv, effectKey, particlesConfig }) {
  const safeId = String(effectKey).replace(/[^a-zA-Z0-9_-]/g, "_");
  const effectId = `card-effect-${safeId}`;
  if (!cardDiv.querySelector(`#${effectId}`)) {
    const effectDiv = document.createElement('div');
    effectDiv.id = effectId;
    effectDiv.style.position = 'absolute';
    effectDiv.style.top = 0;
    effectDiv.style.left = 0;
    effectDiv.style.width = '100%';
    effectDiv.style.height = '100%';
    effectDiv.style.pointerEvents = 'none';
    effectDiv.style.zIndex = 0;
    cardDiv.appendChild(effectDiv);

    setTimeout(() => {
      if (window.particlesJS && document.getElementById(effectId)) {
        particlesJS(effectId, particlesConfig);
      }
    }, 0);
  }
}
function getParticlePresetForCard(cardData) {
  // Card color can be a string or array
  const colors = Array.isArray(cardData.color) ? cardData.color : [cardData.color];
  // Merge all color values from the presets
  let mergedConfig = null;
  colors.forEach(color => {
    const preset = PARTICLE_PRESETS[color];
    if (preset) {
      if (!mergedConfig) {
        // Deep clone the first preset as a base
        mergedConfig = JSON.parse(JSON.stringify(preset));
      } else {
        // Merge color.value arrays
        const presetColors = preset.particles.color.value;
        mergedConfig.particles.color.value = [
          ...new Set([...mergedConfig.particles.color.value, ...presetColors])
        ];
      }
    }
  });
  return mergedConfig;
}
// Attach particle overlay to a card DOM node, using effectKey for uniqueness
function applyRarityParticlesToCard(cardDiv, rarity) {
  // Remove any previous rarity effect overlay
  const existing = cardDiv.querySelector('.rarity-particle-overlay');
  if (existing) existing.remove();

  let preset = null;
  if (rarity === 'Rare')     preset = PARTICLE_PRESETS.bronze;
  if (rarity === 'Epic')     preset = PARTICLE_PRESETS.silver;
  if (rarity === 'Legendary')preset = PARTICLE_PRESETS.gold;

  if (!preset) return; // Only apply to rare/epic/legendary

  const overlay = document.createElement('div');
  overlay.className = 'rarity-particle-overlay';
  overlay.style.position = 'absolute';
  overlay.style.left = '0';
  overlay.style.top = '0';
  overlay.style.width = '100%';
  overlay.style.height = '100%';
  overlay.style.pointerEvents = 'none';
  overlay.style.zIndex = 2; // above front card image, below badges

  // Unique id for this overlay instance
  const uniqueId = 'rarity-effect-' + Math.random().toString(36).slice(2, 9);
  overlay.id = uniqueId;
  cardDiv.style.position = 'relative';
  cardDiv.appendChild(overlay);

  setTimeout(() => {
    if (window.particlesJS && document.getElementById(uniqueId)) {
      particlesJS(uniqueId, preset);
    }
  }, 0);
}
window.applyRarityParticlesToCard = applyRarityParticlesToCard;
