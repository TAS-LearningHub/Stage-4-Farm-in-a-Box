(() => {
  const course = window.COURSE_FOUNDATION;
  if (!course) throw new Error('Course foundation data is unavailable.');

  const body = document.body;
  const depth = Number(body.dataset.depth || 0);
  const prefix = depth === 1 ? '../' : '';
  const active = body.dataset.nav || '';
  const links = [
    ['Course', `${prefix}index.html`, 'course'],
    ['Modules', `${prefix}index.html#modules`, 'modules'],
    ['Activities', `${prefix}activities.html`, 'activities'],
    ['Puzzles', `${prefix}busy-work.html`, 'puzzles'],
    ['My folio', `${prefix}folio.html`, 'folio'],
    ['Assessment', `${prefix}assessment.html`, 'assessment'],
    ['Teacher resources', `${prefix}teacher-resources.html`, 'teacher-resources'],
    ['Main Menu', 'https://stevencowell.github.io/Main-Page/', 'main-menu']
  ];

  const header = document.querySelector('[data-course-header]');
  if (header) {
    header.className = 'course-family-nav screen-only';
    header.innerHTML = `<div class="course-family-nav__inner"><a class="course-family-nav__brand" href="${prefix}index.html"><span class="course-family-nav__mark" aria-hidden="true">🌱</span><span>${course.shortTitle}</span></a><nav class="course-family-nav__links" aria-label="Course navigation">${links.map(([label, href, key]) => `<a href="${href}"${active === key ? ' aria-current="page"' : ''}>${label}</a>`).join('')}</nav></div>`;
  }

  const footer = document.querySelector('[data-course-footer]');
  if (footer) {
    footer.className = 'footer';
    footer.innerHTML = `<div class="wrap footer-grid"><div><strong>${course.shortTitle}</strong><p class="fine">${course.stage} · ${course.focusArea}</p></div><div><a href="${prefix}index.html">Course home</a> · <a href="${prefix}videos.html">Video library</a> · <a href="${prefix}folio.html">My folio</a> · <a href="${prefix}teacher-resources.html">Teacher resources</a><p class="fine">Learning evidence stays in this browser unless you print or export it · <span data-year></span></p></div></div>`;
  }

  document.querySelectorAll('[data-year]').forEach(element => {
    element.textContent = new Date().getFullYear();
  });

  function revealPackage() {
    const identifier = decodeURIComponent(location.hash.slice(1));
    if (!identifier) return;
    const target = document.getElementById(identifier);
    if (target?.tagName === 'DETAILS') {
      target.open = true;
      const summary = target.querySelector(':scope > summary');
      if (summary) {
        summary.setAttribute('tabindex', '-1');
        requestAnimationFrame(() => summary.focus({ preventScroll: true }));
      }
    }
  }

  document.addEventListener('click', event => {
    const link = event.target.closest('.module-checklist a');
    if (!link) return;
    requestAnimationFrame(revealPackage);
  });
  window.addEventListener('hashchange', revealPackage);
  revealPackage();
})();
