particlesJS('fire-particles', {
  particles: {
    number: { value: 80, density: { enable: true, value_area: 800 } },
    color: { value: ['#ff9800', '#ff4500', '#ffd700', '#ff0000'] },
    shape: { type: 'circle' },
    opacity: { value: 0.8, random: true, anim: { enable: true, speed: 1, opacity_min: 0.4, sync: false } },
    size: { value: 14, random: true, anim: { enable: true, speed: 4, size_min: 6, sync: false } },
    line_linked: { enable: false },
    move: {
      enable: true,
      speed: 5,
      direction: 'top',
      random: true,
      straight: false,
      out_mode: 'out',
      bounce: false
    }
  },
  interactivity: {
    detect_on: 'canvas',
    events: {
      onhover: { enable: false },
      onclick: { enable: false },
      resize: true
    }
  },
  retina_detect: true
});
