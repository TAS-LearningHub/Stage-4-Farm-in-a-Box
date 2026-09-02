(() => {
  'use strict';

  const foundation = window.COURSE_FOUNDATION;
  const content = window.COURSE_CONTENT;
  const moduleId = document.body.dataset.moduleId;
  const moduleIndex = content?.modules?.findIndex(item => item.module_id === moduleId) ?? -1;
  const module = content?.modules?.[moduleIndex];

  if (!foundation || !content || !module) {
    throw new Error(`Course content is unavailable for ${moduleId || 'this module'}.`);
  }

  const escapeHtml = value => String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');

  const storageKey = (scope, field) => `${scope}:${field}`;
  const savedFields = ['question_answers', 'question_completion', 'long_response'];

  function loadJson(key, fallback) {
    try {
      const value = localStorage.getItem(key);
      return value === null ? fallback : JSON.parse(value);
    } catch (_error) {
      return fallback;
    }
  }

  function saveJson(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (_error) {
      return false;
    }
  }

  function clearScope(scope) {
    savedFields.forEach(field => {
      try { localStorage.removeItem(storageKey(scope, field)); } catch (_error) { /* browser-local storage unavailable */ }
    });
  }

  function sourceLinks(section) {
    const links = section.theory.source_links || [];
    if (!links.length) return '';
    return `<details class="source-trail"><summary>Source trail</summary><ul>${links.map(source => `<li><a href="${escapeHtml(source.url)}" target="_blank" rel="noopener">${escapeHtml(source.title)}</a> <span>${escapeHtml(source.authority_domain || '')}</span></li>`).join('')}</ul></details>`;
  }

  function vocabulary(section) {
    const terms = section.theory.vocabulary || [];
    if (!terms.length) return '';
    return `<div class="vocabulary-strip" aria-label="Key vocabulary">${terms.map(item => `<span><strong>${escapeHtml(item.term)}</strong>${escapeHtml(item.meaning)}</span>`).join('')}</div>`;
  }

  function renderVisual(section) {
    const visualUrl = `../${section.visual.src}`;
    return `<figure class="teaching-visual" id="visual-${section.section_id}">
      <img src="${escapeHtml(visualUrl)}" alt="${escapeHtml(section.visual.alt)}" loading="lazy" width="1536" height="1024">
      <figcaption><strong>Look closely:</strong> ${escapeHtml(section.visual.caption)}<span>${escapeHtml(section.visual.learning_purpose)}</span><a class="visual-open" href="${escapeHtml(visualUrl)}" target="_blank" rel="noopener" aria-label="Open larger image: ${escapeHtml(section.visual.alt)}">Open larger</a></figcaption>
    </figure>`;
  }

  function renderVideo(section) {
    const media = section.media;
    const video = media.video;
    const frameId = `video-frame-${section.section_id}`;
    return `<aside class="video-learning" id="media-${section.section_id}" data-video-card data-video-id="${escapeHtml(video.id)}">
      <div class="video-learning__copy">
        <p class="label">Watch · ${escapeHtml(media.segment || video.duration)}</p>
        <h3>${escapeHtml(video.title)}</h3>
        <p><strong>Purpose:</strong> ${escapeHtml(media.purpose)}</p>
        <p><strong>Watch for:</strong> ${escapeHtml(media.watch_for)}</p>
        ${media.cultural_note ? `<p class="cultural-context"><strong>Context and attribution:</strong> ${escapeHtml(media.cultural_note)}</p>` : ''}
        <p class="fine">${escapeHtml(video.channel)} · ${escapeHtml(video.duration)} · video loads only when you choose play</p>
        <button class="button video-load" type="button" data-load-video aria-controls="${frameId}">Play video</button>
        <a class="text-link" href="${escapeHtml(video.url)}" target="_blank" rel="noopener">Open on YouTube</a>
      </div>
      <div class="video-frame" id="${frameId}" data-video-frame hidden></div>
      <details class="non-video-pathway">
        <summary>No video? Use this pathway</summary>
        <h4>${escapeHtml(media.non_video.title)}</h4>
        <ol>${(media.non_video.steps || []).map(step => `<li>${escapeHtml(step)}</li>`).join('')}</ol>
      </details>
    </aside>`;
  }

  function renderQuestion(question, questionIndex, scope) {
    const answerName = `${scope}:${question.question_id}`;
    return `<fieldset class="knowledge-question" data-question-id="${escapeHtml(question.question_id)}">
      <legend><span>${questionIndex + 1}</span>${escapeHtml(question.prompt)}</legend>
      <div class="question-options">${question.options.map(option => `<label><input type="radio" name="${escapeHtml(answerName)}" value="${escapeHtml(option.option_id)}"><span><b>${escapeHtml(option.option_id.toUpperCase())}</b>${escapeHtml(option.text)}</span></label>`).join('')}</div>
      <div class="question-actions">
        <button class="small-button" type="button" data-check-question>Check this response</button>
        <a href="${escapeHtml(question.help_anchor)}">Review the theory</a>
      </div>
      <p class="question-feedback" data-question-feedback role="status" hidden></p>
    </fieldset>`;
  }

  function renderLearningPackage(section, number) {
    const scope = section.persistence.storage_scope_id;
    const response = section.long_response;
    return `<details class="section-learning" id="package-${section.section_id}" data-package data-scope="${escapeHtml(scope)}">
      <summary><span>Learning check ${number}</span><strong>10 questions + one written response</strong></summary>
      <div class="section-learning-body">
        <div class="package-intro">
          <div><p class="label">Formative learning evidence</p><h3>Check, explain and keep your thinking</h3><p>This is practice, not a score. Choose a response, check the feedback and return to the linked theory when you need it.</p></div>
          <p class="save-status" data-save-status role="status">Saved on this device as you work.</p>
        </div>
        <form data-package-form novalidate>
          <div class="knowledge-questions">${section.questions.map((question, index) => renderQuestion(question, index, scope)).join('')}</div>
          <section class="long-response" aria-labelledby="${escapeHtml(response.response_id)}-title">
            <p class="label">Think further · ${escapeHtml(response.higher_order_verb)}</p>
            <h3 id="${escapeHtml(response.response_id)}-title">${escapeHtml(response.prompt)}</h3>
            <div class="response-scaffold">
              <div><h4>Build your response</h4><ol>${response.scaffold_prompts.map(prompt => `<li>${escapeHtml(prompt)}</li>`).join('')}</ol></div>
              <div><h4>Success looks like</h4><ul>${response.success_criteria.map(item => `<li>${escapeHtml(item)}</li>`).join('')}</ul></div>
            </div>
            <label for="${escapeHtml(response.response_id)}">Your response</label>
            <p class="sentence-starter"><strong>Start if useful:</strong> ${escapeHtml(response.sentence_starter)}</p>
            <textarea id="${escapeHtml(response.response_id)}" data-long-response rows="9" placeholder="Write, revise and save your own explanation here."></textarea>
          </section>
          <div class="package-tools">
            <button class="small-button secondary" type="button" data-print-package>Print this package</button>
            <button class="text-button danger" type="button" data-reset-package>Reset only this package</button>
          </div>
        </form>
      </div>
    </details>`;
  }

  function renderSection(section, sectionIndex) {
    const number = `${moduleIndex + 1}.${sectionIndex + 1}`;
    return `<section class="module-section-shell" id="${escapeHtml(section.section_id)}" data-section-container>
      <header class="section-heading"><p class="eyebrow">Section ${number}</p><h2>${escapeHtml(section.title)}</h2><p>${escapeHtml(section.theory.summary)}</p></header>
      ${section.theory.html}
      ${vocabulary(section)}
      ${renderVisual(section)}
      ${renderVideo(section)}
      ${renderLearningPackage(section, number)}
      ${sourceLinks(section)}
    </section>`;
  }

  function renderPage() {
    document.title = `Module ${moduleIndex + 1}: ${module.title} | ${foundation.shortTitle}`;
    document.querySelector('[data-module-header]').innerHTML = `<p class="eyebrow">Module ${moduleIndex + 1} of ${content.modules.length} · Periods ${module.periods.join(', ')}</p><h1>${escapeHtml(module.title)}</h1><p class="lede">Three connected learning sections: theory, a purposeful visual, a video or equivalent pathway, then saved formative evidence.</p>`;
    document.querySelector('[data-contents]').innerHTML = module.sections.map(section => `<li><a href="#${escapeHtml(section.section_id)}">${escapeHtml(section.title)}</a></li>`).join('');

    const presentation = `<aside class="module-presentation-card" id="${escapeHtml(module.module_id)}-presentation" data-module-presentation>
      <div><p class="label">Teacher-guided lesson deck</p><h2>${escapeHtml(module.presentation.module_label)}</h2><p>Open the editable classroom presentation before or during this module.</p></div>
      <a class="button" id="${escapeHtml(module.module_id)}-presentation-download" data-module-presentation-download href="../${escapeHtml(module.presentation.path)}" download>${escapeHtml(module.presentation.label)}</a>
    </aside>`;
    const review = `<section id="review-${escapeHtml(module.module_id)}" class="module-review">
      <p class="eyebrow">Always visible</p><h2>Module review</h2><p>Use these links to reopen a package. Completion shows work saved on this device, not a mark.</p>
      <ul class="module-checklist">${module.sections.map((section, index) => `<li><a href="#package-${escapeHtml(section.section_id)}" data-resume-package data-review-section="${escapeHtml(section.section_id)}"><span>${index + 1}. ${escapeHtml(section.title)}</span><strong data-review-status>Not started</strong></a></li>`).join('')}</ul>
      <div class="package-tools"><button class="small-button secondary" type="button" data-export-module>Export module evidence</button><button class="small-button secondary" type="button" onclick="window.print()">Print module</button></div>
    </section>`;
    const previous = moduleIndex === 0
      ? '<a class="button secondary" href="../index.html">← Course home</a>'
      : `<a class="button secondary" href="module-${String(moduleIndex).padStart(2, '0')}.html">← Module ${moduleIndex}</a>`;
    const next = moduleIndex === content.modules.length - 1
      ? '<a class="button" href="../folio.html">Open My folio →</a>'
      : `<a class="button" href="module-${String(moduleIndex + 2).padStart(2, '0')}.html">Module ${moduleIndex + 2} →</a>`;

    document.querySelector('[data-module-main]').innerHTML = `${presentation}${module.sections.map(renderSection).join('')}${review}<nav class="actions" aria-label="Module sequence">${previous}${next}</nav>`;
    document.querySelector('[data-activity-title]').textContent = module.activity.title;
    document.querySelector('[data-activity-link]').href = `../activities.html#${module.activity.id}`;
  }

  function packageState(section) {
    const scope = section.persistence.storage_scope_id;
    return {
      answers: loadJson(storageKey(scope, 'question_answers'), {}),
      completed: loadJson(storageKey(scope, 'question_completion'), {}),
      longResponse: loadJson(storageKey(scope, 'long_response'), '')
    };
  }

  function restorePackage(section) {
    const packageElement = document.querySelector(`#package-${section.section_id}`);
    const state = packageState(section);
    Object.entries(state.answers).forEach(([questionId, optionId]) => {
      const input = packageElement.querySelector(`[data-question-id="${questionId}"] input[value="${CSS.escape(optionId)}"]`);
      if (input) input.checked = true;
    });
    Object.keys(state.completed).forEach(questionId => {
      const question = section.questions.find(item => item.question_id === questionId);
      const selected = state.answers[questionId];
      const fieldset = packageElement.querySelector(`[data-question-id="${questionId}"]`);
      const option = question?.options.find(item => item.option_id === selected);
      if (fieldset && option) showFeedback(fieldset, option.feedback, true);
    });
    const textarea = packageElement.querySelector('[data-long-response]');
    if (textarea) textarea.value = state.longResponse || '';
  }

  function showFeedback(fieldset, text, restored = false) {
    const feedback = fieldset.querySelector('[data-question-feedback]');
    feedback.textContent = `${restored ? 'Saved feedback: ' : ''}${text}`;
    feedback.hidden = false;
    fieldset.classList.add('is-checked');
  }

  function setSaveStatus(packageElement, message, okay = true) {
    const status = packageElement.querySelector('[data-save-status]');
    status.textContent = message;
    status.dataset.state = okay ? 'saved' : 'error';
  }

  function updateProgress() {
    let completePackages = 0;
    module.sections.forEach(section => {
      const state = packageState(section);
      const checked = section.questions.filter(question => state.completed[question.question_id]).length;
      const written = String(state.longResponse || '').trim().length >= 20;
      const complete = checked === section.questions.length && written;
      if (complete) completePackages += 1;
      const status = document.querySelector(`[data-review-section="${section.section_id}"] [data-review-status]`);
      if (status) status.textContent = `${checked}/10 checked · ${written ? 'response saved' : 'response needed'}`;
    });
    const progress = document.querySelector('[data-progress]');
    progress.style.width = `${(completePackages / module.sections.length) * 100}%`;
    document.querySelector('[data-progress-text]').textContent = `${completePackages} of 3 section packages complete on this device`;
  }

  function downloadText(filename, text) {
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.append(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  }

  function exportModule() {
    const lines = [foundation.title, `Module ${moduleIndex + 1}: ${module.title}`, `Exported ${new Date().toLocaleString('en-AU')}`, ''];
    module.sections.forEach((section, index) => {
      const state = packageState(section);
      lines.push(`SECTION ${moduleIndex + 1}.${index + 1} — ${section.title}`);
      section.questions.forEach((question, qIndex) => {
        const optionId = state.answers[question.question_id];
        const option = question.options.find(item => item.option_id === optionId);
        lines.push(`${qIndex + 1}. ${question.prompt}`, `Selected: ${option ? option.text : 'Not answered'}`);
      });
      lines.push('', section.long_response.prompt, state.longResponse || 'No response saved.', '', '---', '');
    });
    downloadText(`farm-in-a-box-module-${String(moduleIndex + 1).padStart(2, '0')}-evidence.txt`, lines.join('\n'));
  }

  function loadVideo(button) {
    const card = button.closest('[data-video-card]');
    const frame = card.querySelector('[data-video-frame]');
    const videoId = card.dataset.videoId;
    frame.hidden = false;
    frame.innerHTML = `<div class="video-embed"><iframe src="https://www.youtube-nocookie.com/embed/${encodeURIComponent(videoId)}?rel=0" title="Embedded lesson video" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe></div><button class="small-button secondary" type="button" data-close-video>Close and stop video</button>`;
    frame.querySelector('iframe').focus();
  }

  function closeVideo(button) {
    const card = button.closest('[data-video-card]');
    const loadButton = card.querySelector('[data-load-video]');
    const frame = card.querySelector('[data-video-frame]');
    frame.innerHTML = '';
    frame.hidden = true;
    loadButton.focus();
  }

  function wireInteractions() {
    module.sections.forEach(restorePackage);
    updateProgress();

    document.addEventListener('change', event => {
      const input = event.target.closest('.knowledge-question input[type="radio"]');
      if (!input) return;
      const packageElement = input.closest('[data-package]');
      const fieldset = input.closest('[data-question-id]');
      const answers = loadJson(storageKey(packageElement.dataset.scope, 'question_answers'), {});
      answers[fieldset.dataset.questionId] = input.value;
      const saved = saveJson(storageKey(packageElement.dataset.scope, 'question_answers'), answers);
      setSaveStatus(packageElement, saved ? 'Choice saved on this device.' : 'This browser could not save your choice.', saved);
      updateProgress();
    });

    document.addEventListener('input', event => {
      const textarea = event.target.closest('[data-long-response]');
      if (!textarea) return;
      const packageElement = textarea.closest('[data-package]');
      const saved = saveJson(storageKey(packageElement.dataset.scope, 'long_response'), textarea.value);
      setSaveStatus(packageElement, saved ? 'Written response saved on this device.' : 'This browser could not save your writing.', saved);
      updateProgress();
    });

    document.addEventListener('click', event => {
      const check = event.target.closest('[data-check-question]');
      if (check) {
        const fieldset = check.closest('[data-question-id]');
        const packageElement = check.closest('[data-package]');
        const selected = fieldset.querySelector('input:checked');
        if (!selected) {
          showFeedback(fieldset, 'Choose one response first, then check it.');
          return;
        }
        const section = module.sections.find(item => item.persistence.storage_scope_id === packageElement.dataset.scope);
        const question = section.questions.find(item => item.question_id === fieldset.dataset.questionId);
        const option = question.options.find(item => item.option_id === selected.value);
        const completed = loadJson(storageKey(packageElement.dataset.scope, 'question_completion'), {});
        completed[question.question_id] = true;
        const saved = saveJson(storageKey(packageElement.dataset.scope, 'question_completion'), completed);
        showFeedback(fieldset, option.feedback);
        setSaveStatus(packageElement, saved ? 'Feedback checked and saved.' : 'Feedback shown, but this browser could not save completion.', saved);
        updateProgress();
        return;
      }

      const reset = event.target.closest('[data-reset-package]');
      if (reset) {
        const packageElement = reset.closest('[data-package]');
        if (!window.confirm('Reset only this section package? Its saved answers and writing will be removed from this device.')) return;
        clearScope(packageElement.dataset.scope);
        packageElement.querySelector('form').reset();
        packageElement.querySelectorAll('[data-question-feedback]').forEach(item => { item.hidden = true; item.textContent = ''; });
        packageElement.querySelectorAll('.knowledge-question').forEach(item => item.classList.remove('is-checked'));
        setSaveStatus(packageElement, 'This section package has been reset.');
        updateProgress();
        return;
      }

      const print = event.target.closest('[data-print-package]');
      if (print) {
        print.closest('[data-package]').open = true;
        window.print();
        return;
      }

      if (event.target.closest('[data-export-module]')) {
        exportModule();
        return;
      }

      const play = event.target.closest('[data-load-video]');
      if (play) { loadVideo(play); return; }
      const close = event.target.closest('[data-close-video]');
      if (close) closeVideo(close);
    });

    document.addEventListener('keydown', event => {
      if (event.key !== 'Escape') return;
      const activeFrame = document.querySelector('[data-video-frame]:not([hidden])');
      const close = activeFrame?.querySelector('[data-close-video]');
      if (close) closeVideo(close);
    });

    const printStates = new Map();
    window.addEventListener('beforeprint', () => {
      document.querySelectorAll('details.section-learning').forEach(details => {
        printStates.set(details, details.open);
        details.open = true;
      });
    });
    window.addEventListener('afterprint', () => {
      printStates.forEach((wasOpen, details) => { details.open = wasOpen; });
      printStates.clear();
    });
  }

  function openHashedPackage() {
    const target = document.getElementById(decodeURIComponent(location.hash.slice(1)));
    if (target?.matches('details.section-learning')) {
      target.open = true;
      requestAnimationFrame(() => target.querySelector(':scope > summary')?.focus({ preventScroll: true }));
    }
  }

  renderPage();
  wireInteractions();
  openHashedPackage();
  if (location.hash) {
    window.addEventListener('load', () => requestAnimationFrame(openHashedPackage), { once: true });
  }
})();
