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

// ── Quiz logic ────────────────────────────────
document.querySelectorAll('.quiz-option').forEach(btn => {
  btn.addEventListener('click', function () {
    const group   = this.closest('.quiz-block');
    const options = group.querySelectorAll('.quiz-option');
    const feedback = group.querySelector('.quiz-feedback');

    // already answered
    if (group.dataset.answered === 'true') return;
    group.dataset.answered = 'true';

    const isCorrect = this.dataset.correct === 'true';

    options.forEach(opt => {
      opt.disabled = true;
      if (opt.dataset.correct === 'true') {
        opt.classList.add('correct');
      } else {
        opt.classList.add('wrong');
      }
    });

    feedback.textContent  = isCorrect
      ? '✓ Correct — ' + feedback.dataset.correct
      : '✗ Not quite — ' + feedback.dataset.wrong;
    feedback.className    = 'quiz-feedback ' + (isCorrect ? 'fb-correct' : 'fb-wrong');
    feedback.style.display = 'block';
  });
});
