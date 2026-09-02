(() => {
  'use strict';
  const content = window.COURSE_CONTENT;
  const library = document.querySelector('[data-video-library]');
  const escapeHtml = value => String(value ?? '').replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&#039;');

  const placements = new Map();
  content.modules.forEach(module => module.sections.forEach(section => {
    const list = placements.get(section.media.video.id) || [];
    list.push({ module, section });
    placements.set(section.media.video.id, list);
  }));

  library.innerHTML = content.videos.map(video => {
    const uses = placements.get(video.id) || [];
    const first = uses[0];
    const purpose = first?.section.media.purpose || 'Support the linked agriculture learning.';
    const watchFor = first?.section.media.watch_for || 'Notice evidence that connects to the module theory.';
    return `<article class="video-library-card" data-library-video data-video-id="${escapeHtml(video.id)}">
      <img src="${escapeHtml(first?.section.visual.src || 'assets/hero-farm-in-a-box.png')}" alt="${escapeHtml(first?.section.visual.alt || 'Farm in a Box course visual')}" loading="lazy">
      <div class="video-library-card__body">
        <p class="label">${escapeHtml(video.channel)} · ${escapeHtml(video.duration)}</p>
        <h2>${escapeHtml(video.title)}</h2>
        <p>${escapeHtml(purpose)}</p>
        <p><strong>Watch for:</strong> ${escapeHtml(watchFor)}</p>
        <p class="fine"><strong>Used in:</strong> ${uses.map(item => `M${item.module.number} ${item.section.title}`).join(' · ')}</p>
        <div class="package-tools"><button class="small-button" type="button" data-library-play>Play video</button><a href="${escapeHtml(video.url)}" target="_blank" rel="noopener">Open on YouTube</a></div>
        <div data-library-frame hidden></div>
      </div>
    </article>`;
  }).join('');

  function close(card) {
    const frame = card.querySelector('[data-library-frame]');
    frame.innerHTML = '';
    frame.hidden = true;
    card.querySelector('[data-library-play]').focus();
  }

  document.addEventListener('click', event => {
    const play = event.target.closest('[data-library-play]');
    if (play) {
      const card = play.closest('[data-library-video]');
      const frame = card.querySelector('[data-library-frame]');
      frame.hidden = false;
      frame.innerHTML = `<div class="video-embed"><iframe src="https://www.youtube-nocookie.com/embed/${encodeURIComponent(card.dataset.videoId)}?rel=0" title="Embedded lesson video" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe></div><button class="small-button secondary" type="button" data-library-close>Close and stop video</button>`;
      frame.querySelector('iframe').focus();
      return;
    }
    const closeButton = event.target.closest('[data-library-close]');
    if (closeButton) close(closeButton.closest('[data-library-video]'));
  });

  document.addEventListener('keydown', event => {
    if (event.key !== 'Escape') return;
    const open = document.querySelector('[data-library-frame]:not([hidden])');
    if (open) close(open.closest('[data-library-video]'));
  });
})();
