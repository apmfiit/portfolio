/* Reusable prototype primitives. All sources are local; no tracking. */
const root = document.documentElement;
const finePointer = matchMedia('(hover: hover) and (pointer: fine)');
// Independent comparison primitive, reusable without a phone or image stage.
function mountComparison(container, {beforeSrc, afterSrc, beforeAlt, afterAlt, locale = 'ru'}) {
  const element = typeof container === 'string' ? document.querySelector(container) : container;
  element.dataset.visibleLabel = 'before';
  const viewer = new CIBeforeAfter.CIBeforeAfter(container, {
    beforeSrc, afterSrc, beforeAlt, afterAlt,
    mode: finePointer.matches ? 'hover' : 'drag', handleStyle: 'line',
    theme: root.dataset.theme, initialPosition: 90,
    onSlide: position => { element.dataset.visibleLabel = position >= 50 ? 'before' : 'after'; },
    labels: locale === 'ru' ? {before:'До', after:'После'} : {before:'Before', after:'After'},
    zoom: false, zoomControls: false, fullscreenButton: true,
    animate: {duration:1100, delay:150, easing:'ease-in-out'}, animateOnce:true, lazyLoad:false,
  });
  const updateMode = () => viewer.update({mode:finePointer.matches ? 'hover' : 'drag'});
  finePointer.addEventListener('change', updateMode);
  return {setTheme: theme => viewer.update({theme}), destroy() {
    finePointer.removeEventListener('change', updateMode); viewer.destroy();
  }};
}
const comparison = mountComparison('#comparison-viewer', {
  beforeSrc:'assets/before.png', afterSrc:'assets/after-blue.png',
  beforeAlt:'Лента уведомлений ВТБ до редизайна', afterAlt:'Лента уведомлений ВТБ после редизайна',
});
document.querySelector('#theme').addEventListener('click', (event) => {
  const theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
  root.dataset.theme = theme;
  comparison.setTheme(theme);
  event.currentTarget.textContent = theme === 'dark' ? 'Светлая тема' : 'Тёмная тема';
});

// Screen slot: 402×874, Bezel asset: 450×920 with offsets 24,23.
// Supply videoSrc later to enable inline muted playback over the static poster.
function mountPhone(container, { poster, alt, videoSrc }) {
  const phone = document.createElement('div'); phone.className = 'phone';
  const screen = document.createElement('div'); screen.className = 'phone-screen';
  const button = document.createElement('button'); button.dataset.zoom = poster;
  button.dataset.phone = 'true';
  button.setAttribute('aria-label', `Увеличить: ${alt}`);
  const image = document.createElement('img'); image.src = poster; image.alt = alt;
  image.width = 402; image.height = 874; button.append(image); screen.append(button);
  const bezel = document.createElement('img'); bezel.src = 'assets/bezel.png';
  bezel.className = 'bezel'; bezel.alt = ''; bezel.width = 450; bezel.height = 920;
  phone.append(screen, bezel); container.append(phone);
  if (!videoSrc) return;
  const video = document.createElement('video');
  video.src = videoSrc; video.poster = poster; video.muted = true;
  video.loop = true; video.playsInline = true; video.preload = 'metadata';
  video.setAttribute('aria-label', alt); screen.append(video);
  const control = document.createElement('button'); control.className = 'playback';
  control.textContent = 'Воспроизвести'; container.append(control);
  let pausedByUser = false;
  video.addEventListener('playing', () => { video.classList.add('ready'); control.textContent = 'Пауза'; });
  video.addEventListener('pause', () => { control.textContent = 'Воспроизвести'; });
  control.addEventListener('click', () => {
    pausedByUser = !video.paused;
    if (video.paused) video.play().catch(() => {}); else video.pause();
  });
  const observer = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting && !pausedByUser && !matchMedia('(prefers-reduced-motion: reduce)').matches) video.play().catch(() => {});
    else video.pause();
  }, { threshold: .35 }); observer.observe(container);
}
mountPhone(document.querySelector('#phone-stage'), {poster:'assets/screen.png', alt:'Новая лента уведомлений ВТБ'});
mountPhone(document.querySelector('#small-phone-stage'), {poster:'assets/screen.png', alt:'Новая лента уведомлений ВТБ'});

const dialog = document.querySelector('#zoom');
document.addEventListener('click', event => {
  const trigger = event.target.closest('[data-zoom]'); if (!trigger) return;
  const content = dialog.querySelector('.zoom-content'); content.replaceChildren();
  const image = document.createElement('img'); image.src = trigger.dataset.zoom;
  image.alt = trigger.getAttribute('aria-label') || 'Макет интерфейса';
  if (trigger.dataset.phone) {
    const phone = document.createElement('div'); phone.className = 'phone zoom-phone';
    const screen = document.createElement('div'); screen.className = 'phone-screen'; screen.append(image);
    const bezel = document.createElement('img'); bezel.className = 'bezel'; bezel.src = 'assets/bezel.png'; bezel.alt = '';
    phone.append(screen,bezel); content.append(phone);
  } else content.append(image);
  document.body.style.overflow = 'hidden'; dialog.showModal();
});
dialog.querySelector('.close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => {if (event.target !== dialog.querySelector('.close')) dialog.close();});
dialog.addEventListener('close', () => { document.body.style.overflow = ''; });
