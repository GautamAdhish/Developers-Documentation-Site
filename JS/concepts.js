// ── Theme toggle ──────────────────────────────
const toggle = document.getElementById('theme-toggle');
const html   = document.documentElement;
const saved  = localStorage.getItem('devdocs-theme');
if (saved) html.setAttribute('data-theme', saved);
toggle.addEventListener('click', () => {
  const next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', next);
  localStorage.setItem('devdocs-theme', next);
});

// ── Hamburger sidebar toggle ──────────────────
const hamburger = document.getElementById('hamburger');
const sidebar   = document.querySelector('aside.left');
const overlay   = document.getElementById('sidebar-overlay');

hamburger.addEventListener('click', () => {
  sidebar.classList.toggle('open');
  overlay.classList.toggle('active');
});

overlay.addEventListener('click', () => {
  sidebar.classList.remove('open');
  overlay.classList.remove('active');
});

// ── Active TOC on scroll ──────────────────────
const sections = document.querySelectorAll('[id]');
const tocLinks = document.querySelectorAll('.toc-list a');

function setActiveLink() {
  let currentId = '';
  sections.forEach(section => {
    if (section.getBoundingClientRect().top <= 120) {
      currentId = section.getAttribute('id');
    }
  });
  tocLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${currentId}`) {
      link.classList.add('active');
    }
  });
}

window.addEventListener('scroll', setActiveLink);
window.addEventListener('load', setActiveLink);
