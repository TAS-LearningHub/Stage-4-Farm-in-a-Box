(() => {
  'use strict';

  const course = window.COURSE_FOUNDATION;
  const content = window.COURSE_CONTENT;
  const grid = document.querySelector('[data-module-grid]');
  if (!course || !content || !grid) return;

  const activityKey = `${course.storageNamespace}:activities:v1`;
  const folioKey = `${course.storageNamespace}:folio:v1:text`;
  const totalMilestones = 50;

  function readJSON(key, fallback) {
    try {
      const value = localStorage.getItem(key);
      return value === null ? fallback : JSON.parse(value);
    } catch (_error) {
      return fallback;
    }
  }

  function textLength(value) {
    return String(value || '').trim().length;
  }

  function packageStatus(section) {
    const scope = section.persistence.storage_scope_id;
    const answers = readJSON(`${scope}:question_answers`, {});
    const completed = readJSON(`${scope}:question_completion`, {});
    const longResponse = readJSON(`${scope}:long_response`, '');
    const checked = section.questions.filter(question => completed[question.question_id] && answers[question.question_id]).length;
    const responseReady = textLength(longResponse) >= 20;
    return {
      ready: checked === section.questions.length && responseReady,
      started: checked > 0 || Object.keys(answers).length > 0 || textLength(longResponse) > 0,
      checked,
      responseReady
    };
  }

  function activityStatus(module, activityState) {
    const record = activityState.activities?.[module.activity.id] || {};
    const notesLength = textLength(record.notes);
    const decisionLength = textLength(record.decision);
    return {
      ready: record.ready === true && notesLength >= 40 && decisionLength >= 30,
      started: notesLength > 0 || decisionLength > 0 || record.ready === true
    };
  }

  function folioStatus(module, folioState) {
    const record = folioState.modules?.[module.module_id] || {};
    const selected = Array.isArray(record.selected) ? record.selected : [];
    return {
      ready: selected.length > 0 && textLength(record.response) >= 80 && textLength(record.caption) >= 20,
      started: selected.length > 0 || textLength(record.response) > 0 || textLength(record.caption) > 0 || textLength(record.nextStep) > 0
    };
  }

  function learningActionFor(moduleState) {
    const incompletePackageIndex = moduleState.packages.findIndex(item => !item.ready);
    if (incompletePackageIndex >= 0) {
      const section = moduleState.module.sections[incompletePackageIndex];
      const status = moduleState.packages[incompletePackageIndex];
      return {
        stage: `Module ${moduleState.number} · Learning check ${moduleState.number}.${incompletePackageIndex + 1}`,
        title: section.title,
        copy: status.started
          ? `${status.checked}/10 questions checked${status.responseReady ? ' and the written response is saved' : '; the written response still needs enough explanation'}.`
          : 'Use the linked theory, then complete the ten feedback checks and one written explanation.',
        href: `modules/${moduleState.module.module_id}.html#package-${section.section_id}`,
        label: `Continue learning check ${moduleState.number}.${incompletePackageIndex + 1} →`
      };
    }
    if (!moduleState.activity.ready) {
      return {
        stage: `Module ${moduleState.number} · Applied activity`,
        title: moduleState.module.activity.title,
        copy: moduleState.activity.started
          ? 'Continue the working notes and evidence-based decision, then mark the record ready for your folio review.'
          : 'Apply the three learning packages in this module’s exact activity and keep an evidence-based decision.',
        href: `activities.html#${moduleState.module.activity.id}`,
        label: `Open Module ${moduleState.number} activity →`
      };
    }
    return null;
  }

  function folioActionFor(moduleState) {
    return {
      stage: `Module ${moduleState.number} · Folio evidence`,
      title: `Select Module ${moduleState.number} evidence`,
      copy: moduleState.folio.started
        ? 'Add enough context to show what the selected evidence proves and give it a meaningful caption.'
        : 'Select one strong item from the activity or project record, explain what it proves and add a meaningful caption.',
      href: `folio.html#folio-${moduleState.module.module_id}`,
      label: `Open Module ${moduleState.number} folio card →`
    };
  }

  function buildState() {
    const activityState = readJSON(activityKey, { activities: {} });
    const folioState = readJSON(folioKey, { modules: {} });
    return content.modules.map((module, index) => {
      const packages = module.sections.map(packageStatus);
      const activity = activityStatus(module, activityState);
      const folio = folioStatus(module, folioState);
      const readyPackages = packages.filter(item => item.ready).length;
      const state = {
        number: index + 1,
        module,
        packages,
        activity,
        folio,
        readyPackages,
        readyMilestones: readyPackages + Number(activity.ready) + Number(folio.ready)
      };
      state.learningAction = learningActionFor(state);
      return state;
    });
  }

  function statusText(item) {
    if (item.ready) return 'Ready';
    return item.started ? 'In progress' : 'Not started';
  }

  function render() {
    const moduleStates = buildState();
    const readyMilestones = moduleStates.reduce((total, moduleState) => total + moduleState.readyMilestones, 0);
    const currentLearning = moduleStates.find(moduleState => moduleState.learningAction);
    const currentFolio = moduleStates.find(moduleState => !moduleState.folio.ready);
    const nextAction = currentLearning?.learningAction
      || (currentFolio ? folioActionFor(currentFolio) : {
        stage: 'Ten modules reviewed',
        title: 'Review and back up your folio',
        copy: 'All 50 device-local evidence milestones have enough context for your own review. Recheck weak or repeated evidence before exporting.',
        href: 'folio.html',
        label: 'Review My folio →'
      });

    const count = document.querySelector('[data-course-progress-count]');
    const summary = document.querySelector('[data-course-progress-summary]');
    const bar = document.querySelector('[data-course-progress-bar]');
    const fill = bar?.querySelector('.progress-bar');
    if (count) count.textContent = `${readyMilestones} of ${totalMilestones} evidence milestones ready`;
    if (summary) summary.textContent = `${moduleStates.filter(item => item.readyMilestones === 5).length} of 10 modules have all five evidence milestones ready for your own review.`;
    if (bar) {
      bar.setAttribute('aria-valuenow', String(readyMilestones));
      bar.setAttribute('aria-valuetext', `${readyMilestones} of ${totalMilestones} evidence milestones ready on this device`);
    }
    if (fill) fill.style.width = `${(readyMilestones / totalMilestones) * 100}%`;
    document.querySelector('[data-course-resume-stage]').textContent = nextAction.stage;
    document.querySelector('[data-course-resume-title]').textContent = nextAction.title;
    document.querySelector('[data-course-resume-copy]').textContent = nextAction.copy;
    const resumeLink = document.querySelector('[data-course-resume-link]');
    resumeLink.href = nextAction.href;
    resumeLink.textContent = nextAction.label;

    grid.innerHTML = moduleStates.map((moduleState, index) => {
      const foundationModule = course.modules[index];
      const nextModuleAction = moduleStates.slice(index + 1).find(item => item.learningAction)?.learningAction;
      const cardAction = moduleState.learningAction || nextModuleAction || (!moduleState.folio.ready ? folioActionFor(moduleState) : nextAction);
      const pathReady = !moduleState.learningAction;
      return `<article class="card module-card" data-module-progress="${moduleState.module.module_id}">
        <div class="number">${moduleState.number}</div>
        <div class="module-card__body">
          <p class="module-stage">Module ${moduleState.number} · Periods ${moduleState.module.periods.join(', ')}</p>
          <h3>${moduleState.module.title}</h3>
          <p>${foundationModule.sections.map(section => section.title).join(' · ')}</p>
          <div class="module-card__progress" role="group" aria-label="Module ${moduleState.number} evidence progress">
            <strong>${moduleState.readyMilestones} of 5 evidence milestones ready</strong>
            <div class="progress-shell" role="progressbar" aria-label="Module ${moduleState.number} evidence progress" aria-valuemin="0" aria-valuemax="5" aria-valuenow="${moduleState.readyMilestones}"><span class="progress-bar" style="width:${moduleState.readyMilestones * 20}%"></span></div>
            <ul>
              <li><span>Learning packages</span><b>${moduleState.readyPackages}/3 ready</b></li>
              <li><span>Applied activity</span><b>${statusText(moduleState.activity)}</b></li>
              <li><span>Folio card</span><b>${statusText(moduleState.folio)}</b></li>
            </ul>
          </div>
          <div class="module-card__actions">
            <a class="module-card__action" href="${cardAction.href}" data-module-next-action>${pathReady && nextModuleAction ? `Continue to ${nextModuleAction.stage} →` : cardAction.label}</a>
            ${moduleState.folio.ready ? '' : `<a href="folio.html#folio-${moduleState.module.module_id}">Open this module’s folio card</a>`}
          </div>
        </div>
      </article>`;
    }).join('');
  }

  render();
  window.addEventListener('pageshow', render);
  window.addEventListener('focus', render);
  window.addEventListener('storage', render);
})();
