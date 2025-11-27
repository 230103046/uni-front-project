const animatedEls = document.querySelectorAll('[data-animate]');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

animatedEls.forEach(el => observer.observe(el));

const track = document.querySelector('.slider-track');
const slides = document.querySelectorAll('.slide');
const prev = document.querySelector('.prev');
const next = document.querySelector('.next');

if (track && slides.length && prev && next) {
  let index = 0;

  function updateSlider() {
    track.style.transform = `translateX(-${index * 100}%)`;
  }

  prev.addEventListener('click', () => {
    index = (index - 1 + slides.length) % slides.length;
    updateSlider();
  });

  next.addEventListener('click', () => {
    index = (index + 1) % slides.length;
    updateSlider();
  });

  setInterval(() => {
    index = (index + 1) % slides.length;
    updateSlider();
  }, 4000);
}

const items = document.querySelectorAll('.gl-item');
const lightbox = document.getElementById('lightbox');

if (items.length && lightbox) {
  const lbImage = lightbox.querySelector('.lb-image');
  const lbCaption = lightbox.querySelector('.lb-caption');
  const lbClose = lightbox.querySelector('.lb-close');

  items.forEach(item => {
    item.addEventListener('click', e => {
      e.preventDefault();
      lbImage.src = item.href;
      lbCaption.textContent = item.dataset.caption || '';
      lightbox.classList.add('show');
    });
  });

  lbClose.addEventListener('click', () => {
    lightbox.classList.remove('show');
  });

  lightbox.addEventListener('click', e => {
    if (e.target === lightbox) lightbox.classList.remove('show');
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') lightbox.classList.remove('show');
  });
}