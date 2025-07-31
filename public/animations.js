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
  }
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
// Helper to spawn a temporary particle effect at a screen position
function spawnParticleEffectAt(x, y, preset = STAR_PARTICLE_PRESET, duration = 430, size = 44) {
  const effectId = 'mouse-effect-' + Date.now() + Math.floor(Math.random()*1000);
  const effectDiv = document.createElement('div');
  effectDiv.id = effectId;
  effectDiv.style.position = 'fixed';
  effectDiv.style.pointerEvents = 'none';
  effectDiv.style.left = (x - size/2) + 'px';
  effectDiv.style.top = (y - size/2) + 'px';
  effectDiv.style.width = size + 'px';
  effectDiv.style.height = size + 'px';
  effectDiv.style.zIndex = 9999;
  document.body.appendChild(effectDiv);

  setTimeout(() => {
    if (window.particlesJS) {
      particlesJS(effectId, preset);
    }
  }, 0);

  setTimeout(() => {
    if (effectDiv.parentNode) effectDiv.parentNode.removeChild(effectDiv);
  }, duration);
}

// --- Mouse trail effect ---
// Appear more often (every 15ms), smaller & star-shaped
let lastTrailTime = 0;
document.addEventListener('mousemove', function(e) {
  const now = Date.now();
  if (now - lastTrailTime > 15) {
    spawnParticleEffectAt(e.clientX, e.clientY, STAR_PARTICLE_PRESET, 350, 40);
    lastTrailTime = now;
  }
});

// --- Mouse click effect ---
// Slightly bigger, more bursty star effect
document.addEventListener('click', function(e) {
  spawnParticleEffectAt(e.clientX, e.clientY, STAR_PARTICLE_PRESET, 600, 70);
});
