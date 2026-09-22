const carousel = document.querySelector('.hero-carousel');

if (carousel) {
  const slides = [...carousel.querySelectorAll('.hero-slide')];
  const dots = [...carousel.querySelectorAll('.carousel-dot')];
  const status = carousel.querySelector('.carousel-status');
  const toggle = carousel.querySelector('.carousel-toggle');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let current = 0;
  let paused = reducedMotion.matches;

  function showSlide(index, announce = false) {
    current = (index + slides.length) % slides.length;
    slides.forEach((slide, position) => {
      const active = position === current;
      slide.classList.toggle('is-active', active);
      slide.setAttribute('aria-hidden', String(!active));
    });
    dots.forEach((dot, position) => {
      const active = position === current;
      dot.classList.toggle('is-active', active);
      if (active) dot.setAttribute('aria-current', 'true');
      else dot.removeAttribute('aria-current');
    });
    if (announce) status.textContent = `Photo ${current + 1} of ${slides.length}`;
  }

  function updateToggle() {
    toggle.textContent = paused ? '▶' : 'Ⅱ';
    toggle.setAttribute('aria-label', paused ? 'Play slideshow' : 'Pause slideshow');
  }

  carousel.querySelector('.carousel-previous').addEventListener('click', () => showSlide(current - 1, true));
  carousel.querySelector('.carousel-next').addEventListener('click', () => showSlide(current + 1, true));
  dots.forEach((dot, index) => dot.addEventListener('click', () => showSlide(index, true)));
  toggle.addEventListener('click', () => {
    paused = !paused;
    updateToggle();
  });

  reducedMotion.addEventListener('change', () => {
    if (reducedMotion.matches) paused = true;
    updateToggle();
  });

  updateToggle();
  window.setInterval(() => {
    if (!paused && !document.hidden && !carousel.matches(':hover') && !carousel.contains(document.activeElement)) {
      showSlide(current + 1);
    }
  }, 6000);
}
