(() => {
  'use strict';

  const course = window.COURSE_FOUNDATION;
  if (!course) return;

  const COURSE_ID = 'stage-4-farm-in-a-box';
  const SCHEMA = '1.0';
  const KEYS = Object.freeze({
    activities: `${course.storageNamespace}:activities:v1`,
    puzzles: `${course.storageNamespace}:puzzles:v1`,
    folio: `${course.storageNamespace}:folio:v1:text`,
    folioImage: moduleId => `${course.storageNamespace}:folio:v1:image:${moduleId}`,
    teacher: `${course.storageNamespace}:teacher-preparation:v1`
  });

  const supportModules = [
    {
      id: 'module-01', number: 1, title: 'Agriculture Is Everywhere', periods: 'Periods 1–2', moduleRoute: 'modules/module-01.html', folioRoute: 'folio-module-01',
      evidence: ['NSW agriculture and product map', 'paddock-to-product chain', 'problem statement and measurable draft criteria'],
      activity: {
        id: 'activity-module-01-system-detectives', title: 'Agriculture system detectives', mechanic: 'Sort, connect and justify',
        purpose: 'Reveal the agricultural systems behind familiar products and turn an observed need into a clear design problem.',
        instructions: [
          'Choose three familiar products and identify the agricultural product that begins each chain.',
          'Arrange the likely stages from production to the user, marking where information, materials, energy or transport enter the system.',
          'Circle one stage where a producer or designer could reduce waste or use a resource more carefully.',
          'Write a problem statement for a small-space crop-production system without naming a final solution.',
          'Draft two criteria that could be checked with evidence and one genuine constraint from the course brief.'
        ],
        printable: 'Use printed product cards and a blank flow-chain sheet; annotate the links and write the problem statement by hand.'
      }
    },
    {
      id: 'module-02', number: 2, title: 'Country, Care and Future Farms', periods: 'Periods 3–5', moduleRoute: 'modules/module-02.html', folioRoute: 'folio-module-02',
      evidence: ['attributed first-foods source notes', 'resource-management comparison', 'sustainability criterion and reflection'],
      activity: {
        id: 'activity-module-02-evidence-and-perspectives', title: 'Two sources, two contexts, one careful comparison', mechanic: 'Source annotation and comparison matrix',
        purpose: 'Practise respectful attribution and compare publicly shared approaches without blending distinct knowledge systems or claiming local Cultural Knowledge.',
        instructions: [
          'Read the supplied extracts from the named Wadawurrung–CSIRO case study and the CSIRO WaterWise case study.',
          'Record who shared each example, its place or production context, its purpose and the evidence it uses.',
          'Identify one similarity and two important differences without ranking one knowledge system above the other.',
          'Mark any claim the sources do not support and rewrite it more carefully.',
          'Draft one sustainability criterion for the Farm in a Box mission and explain which evidence could test it.'
        ],
        printable: 'Use printed source cards and a four-column comparison sheet headed attribution, context, purpose and evidence.'
      }
    },
    {
      id: 'module-03', number: 3, title: 'Start a Living Crop', periods: 'Periods 6–8', moduleRoute: 'modules/module-03.html', folioRoute: 'folio-module-03',
      evidence: ['labelled plant-function diagram', 'crop rationale and germination plan', 'teacher-observed safe sowing record and baseline entry'],
      activity: {
        id: 'activity-module-03-crop-start-file', title: 'Build the crop start file', mechanic: 'Observe, choose, plan and record',
        purpose: 'Use plant-function knowledge to justify a crop choice and create an accurate baseline for later comparison.',
        instructions: [
          'Label roots, stem, leaves and any visible reproductive structure on a supplied specimen image; connect each structure with its main function.',
          'Compare teacher-approved crop options against available time, space, growing conditions, purpose and care opportunities.',
          'Select an option only after the local choices are confirmed and write an evidence-based rationale.',
          'Follow the teacher’s demonstrated local sowing process and stop whenever an instruction, tool or material is unclear.',
          'Create a baseline record with the confirmed crop identity, date, starting condition and a labelled image or drawing.'
        ],
        printable: 'Complete a printed plant-function sheet, crop-decision matrix, sowing observation record and baseline sketch.'
      }
    },
    {
      id: 'module-04', number: 4, title: 'Soil, Media and Circular Nutrients', periods: 'Periods 9–10', moduleRoute: 'modules/module-04.html', folioRoute: 'folio-module-04',
      evidence: ['growing-media comparison', 'circular nutrient diagram', 'fair-test record and evidence-based media decision'],
      activity: {
        id: 'activity-module-04-root-zone-evidence-lab', title: 'Root-zone evidence lab', mechanic: 'Predict, test, record and decide',
        purpose: 'Compare teacher-approved growing-media options with a fair, observable test and use evidence to justify a project decision.',
        instructions: [
          'Describe the properties a root-zone medium should provide for the confirmed project context.',
          'Choose one testable property and write a question that changes one selected variable.',
          'Use only teacher-approved samples, equipment and local procedures.',
          'Record the same measure in the same way for each option and include repeat observations where directed.',
          'Compare the evidence, limitations and variation before writing a media decision; do not claim the test proves every property.'
        ],
        printable: 'Use teacher-supplied results or photographs to complete a prediction table, fair-test audit and evidence-based media recommendation.'
      }
    },
    {
      id: 'module-05', number: 5, title: 'Water-Smart Growing', periods: 'Periods 11–12', moduleRoute: 'modules/module-05.html', folioRoute: 'folio-module-05',
      evidence: ['water-technology comparison', 'annotated water-smart concept', 'wick prototype test and modification'],
      activity: {
        id: 'activity-module-05-water-pathway-challenge', title: 'Make every drop visible', mechanic: 'Map, prototype, test and modify',
        purpose: 'Use a water budget and a small passive-transfer test to select a water-management idea for the project.',
        instructions: [
          'Map possible water pathways through a generic container-growing system, separating useful availability from evaporation, drainage, runoff and stored water.',
          'Compare at least three water-delivery ideas against control, visibility, maintenance, energy, cost and fit with confirmed care conditions.',
          'Sketch an annotated concept that shows how water reaches the root zone and how the user can inspect the system.',
          'Use only teacher-approved materials and the demonstrated local process to test a small wick concept.',
          'Record transfer evidence, identify one limitation and modify one variable for a second test rather than promising crop performance.'
        ],
        printable: 'Analyse supplied water-pathway diagrams and wick-test data, then annotate a concept and justify one modification on paper.'
      }
    },
    {
      id: 'module-06', number: 6, title: 'Farm Under Pressure', periods: 'Periods 13–14', moduleRoute: 'modules/module-06.html', folioRoute: 'folio-module-06',
      evidence: ['microclimate site audit', 'crop-stress diagnosis flowchart', 'biosecurity and responsible-response decision'],
      activity: {
        id: 'activity-m06-farm-detectives', title: 'Farm detectives: evidence before action', mechanic: 'Scenario cards and evidence classification',
        purpose: 'Practise separating observation from inference before changing a crop-production system.',
        instructions: [
          'Read each site or crop card and underline only what can be directly observed or measured.',
          'Sort each fact under environment, plant pattern, production record or unknown.',
          'List two plausible explanations and identify the extra evidence that would help distinguish them.',
          'Choose a responsible next step: monitor, isolate, record and report, or make one teacher-approved change.',
          'Add the completed site audit, diagnosis flowchart and decision note to the module evidence record.'
        ],
        printable: 'Use printed evidence cards and a three-column observation–possibility–next evidence sheet; no device or live crop is required.'
      }
    },
    {
      id: 'module-07', number: 7, title: 'Design the Farm in a Box', periods: 'Periods 15–17', moduleRoute: 'modules/module-07.html', folioRoute: 'folio-module-07',
      evidence: ['final design brief and criteria', 'annotated concepts and decision matrix', 'production plan and teacher-confirmed risk-control record'],
      activity: {
        id: 'activity-m07-design-studio', title: 'Three-concept design studio', mechanic: 'Sketch, compare, weight and refine',
        purpose: 'Make the final concept traceable to evidence rather than taste or first-idea bias.',
        instructions: [
          'Rewrite the project need, users, required functions and fixed limits as a concise brief.',
          'Create measurable criteria for portability, resource awareness, crop support, monitoring access and responsible production.',
          'Sketch three different system arrangements and annotate how each responds to the criteria.',
          'Use the same decision matrix to compare every concept and explain the weighting.',
          'Refine the strongest concept and build a sequenced production plan with approval checkpoints and a separate teacher-confirmed risk-control record.'
        ],
        printable: 'Use an A3 design-studio sheet containing the brief, three concept frames, a weighted matrix and a production-plan strip.'
      }
    },
    {
      id: 'module-08', number: 8, title: 'Build and Establish', periods: 'Periods 18–20', moduleRoute: 'modules/module-08.html', folioRoute: 'folio-module-08',
      evidence: ['workstation readiness check', 'safe-process build record', 'establishment record and working-system evidence'],
      activity: {
        id: 'activity-m08-production-control-room', title: 'Production control room', mechanic: 'Ready–work–check–record team cycle',
        purpose: 'Make safe process, quality control and collaborative evidence part of production rather than an afterthought.',
        instructions: [
          'Confirm the current drawing, approved resources, demonstration and workstation controls before starting.',
          'Complete only the approved production stage and keep the work area organised.',
          'Pause at the planned checkpoint to compare the result with the drawing and criteria.',
          'Record what was completed, the evidence observed and any variation or stop decision.',
          'Proceed to establishment only after the system passes the teacher-confirmed readiness checkpoint.'
        ],
        printable: 'Use a printed production traveller with one row for ready, work, check, evidence and next-authorisation status at each stage.'
      }
    },
    {
      id: 'module-09', number: 9, title: 'Grow, Measure and Improve', periods: 'Periods 21–23', moduleRoute: 'modules/module-09.html', folioRoute: 'folio-module-09',
      evidence: ['field data table and graph', 'maintenance log and evidence-based modification', 'community food initiative response and waste-reduction plan'],
      activity: {
        id: 'activity-m09-field-data-huddle', title: 'Field data huddle', mechanic: 'Graph, challenge a claim and recommend',
        purpose: 'Connect field evidence, production improvement and community responsibility in one agricultural decision cycle.',
        instructions: [
          'Check that the table identifies variables, units, dates or stages and the method used.',
          'Graph one suitable variable and describe the pattern without claiming an unsupported cause.',
          'Compare the pattern with photographs, site notes or a teacher-supplied fallback record.',
          'Recommend one teacher-approved maintenance or system investigation and state how it will be re-checked.',
          'Explain how the decision could reduce avoidable waste or improve the usefulness of a community food initiative.'
        ],
        printable: 'Use a printed field-data pack, graph grid, claim-check card and community-decision postcard.'
      }
    },
    {
      id: 'module-10', number: 10, title: 'Harvest, Judge and Share', periods: 'Periods 24–25', moduleRoute: 'modules/module-10.html', folioRoute: 'folio-module-10',
      evidence: ['yield and quality record', 'product supply-chain trace', 'final evaluation, short pitch and next-version proposal'],
      activity: {
        id: 'activity-m10-field-day-pitch', title: 'Farm in a Box field-day pitch', mechanic: 'Evidence board and two-minute peer pitch',
        purpose: 'Make the final claim about quality proportional to production evidence, including biological disruption and unresolved local pathways.',
        instructions: [
          'Record the teacher-approved harvest or supplied fallback evidence using the stated method and units.',
          'Trace the product from production through confirmed or hypothetical supply-chain stages, marking any stage that does not apply or remains locally unapproved.',
          'Evaluate each original criterion with one evidence item and a confidence statement.',
          'Select the most important success, limitation and next-version change.',
          'Deliver a short pitch that distinguishes observed evidence, inference and future proposal.'
        ],
        printable: 'Use an A3 field-day board with spaces for product record, supply-chain trace, criterion evidence, limitation and next-version pitch notes.'
      }
    }
  ];

  const escapeHTML = value => String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');

  function nowLabel() {
    return new Intl.DateTimeFormat('en-AU', { hour: 'numeric', minute: '2-digit' }).format(new Date());
  }

  function readJSON(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch {
      return fallback;
    }
  }

  function writeJSON(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch {
      return false;
    }
  }

  function downloadFile(filename, contents, type = 'text/plain;charset=utf-8') {
    const blob = new Blob([contents], { type });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.append(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  function routeStatus(message, selector, state = 'saved') {
    const status = document.querySelector(selector);
    if (!status) return;
    status.textContent = message;
    status.dataset.state = state;
  }

  function openHashedCard() {
    const id = decodeURIComponent(location.hash.slice(1));
    if (!id) return false;
    const target = document.getElementById(id);
    if (!target) return false;
    if (target.tagName === 'DETAILS') target.open = true;
    target.scrollIntoView({ block: 'start' });
    const focusTarget = target.querySelector('summary, h2, h3, textarea, input, select, a');
    if (focusTarget) {
      focusTarget.setAttribute('tabindex', '-1');
      focusTarget.focus({ preventScroll: true });
    }
    return true;
  }

  function initActivities() {
    const list = document.querySelector('[data-activity-list]');
    if (!list) return;

    const state = readJSON(KEYS.activities, { schema_version: SCHEMA, course_id: COURSE_ID, activities: {} });

    list.innerHTML = supportModules.map(module => {
      const saved = state.activities[module.activity.id] || {};
      const ready = Boolean(saved.ready);
      return `<details class="activity-card" id="${escapeHTML(module.activity.id)}" data-activity-id="${escapeHTML(module.activity.id)}">
        <summary>
          <span aria-hidden="true" class="number">${module.number}</span>
          <span><strong>${escapeHTML(module.activity.title)}</strong><small>Module ${module.number}: ${escapeHTML(module.title)}</small></span>
          <span class="status-chip" data-activity-chip data-state="${ready ? 'ready' : 'attention'}">${ready ? 'Ready for folio review' : saved.notes || saved.decision ? 'In progress' : 'Not started'}</span>
        </summary>
        <div class="activity-body">
          <div class="activity-meta"><span>${escapeHTML(module.periods)}</span><span>${escapeHTML(module.activity.mechanic)}</span><span>Formative practice</span></div>
          <p><strong>What you practise:</strong> ${escapeHTML(module.activity.purpose)}</p>
          <p><strong>Where it belongs:</strong> Use this during <a href="${escapeHTML(module.moduleRoute)}">Module ${module.number}</a> after the linked ideas have been taught and before you select final folio evidence.</p>
          <ol class="support-list">${module.activity.instructions.map(step => `<li>${escapeHTML(step)}</li>`).join('')}</ol>
          <div class="field-grid">
            <label class="field"><span>Working notes</span><textarea data-activity-field="notes" rows="7" placeholder="Record observations, source notes, comparisons or test evidence here.">${escapeHTML(saved.notes || '')}</textarea></label>
            <label class="field"><span>Decision and reason</span><textarea data-activity-field="decision" rows="7" placeholder="State the decision you can defend and the evidence that supports it.">${escapeHTML(saved.decision || '')}</textarea></label>
          </div>
          <label class="check-row"><input type="checkbox" data-activity-field="ready"${ready ? ' checked' : ''}><span><strong>Ready for my folio review</strong><br><span class="fine">This marks the activity record for your own review. It does not submit work or prove teacher observation.</span></span></label>
          <p class="formative-boundary" data-activity-feedback>${ready ? 'You have marked this record ready to review. Select only the strongest evidence for your folio.' : 'Use the notes to rehearse the concept. Mark ready only when your decision names supporting evidence.'}</p>
          <details class="activity-help"><summary>Printable or low-tech pathway</summary><p>${escapeHTML(module.activity.printable)}</p></details>
          <div class="compact-actions"><a class="button secondary" href="folio.html#${escapeHTML(module.folioRoute)}">Take selected evidence to My folio</a><a class="button secondary" href="${escapeHTML(module.moduleRoute)}">Return to Module ${module.number}</a></div>
        </div>
      </details>`;
    }).join('');

    function saveCard(card) {
      const id = card.dataset.activityId;
      const notes = card.querySelector('[data-activity-field="notes"]').value;
      const decision = card.querySelector('[data-activity-field="decision"]').value;
      const ready = card.querySelector('[data-activity-field="ready"]').checked;
      state.schema_version = SCHEMA;
      state.course_id = COURSE_ID;
      state.updated_at = new Date().toISOString();
      state.activities[id] = { notes, decision, ready };
      const saved = writeJSON(KEYS.activities, state);
      const chip = card.querySelector('[data-activity-chip]');
      chip.textContent = ready ? 'Ready for folio review' : notes || decision ? 'In progress' : 'Not started';
      chip.dataset.state = ready ? 'ready' : 'attention';
      card.querySelector('[data-activity-feedback]').textContent = ready
        ? 'You have marked this record ready to review. Select only the strongest evidence for your folio.'
        : 'Use the notes to rehearse the concept. Mark ready only when your decision names supporting evidence.';
      routeStatus(saved ? `Activities saved on this device at ${nowLabel()}.` : 'This browser could not save. Export or print before leaving.', '[data-activity-status]', saved ? 'saved' : 'error');
      updateActivitySummary();
    }

    function updateActivitySummary() {
      const records = Object.values(state.activities || {});
      const started = records.filter(record => String(record.notes || '').trim() || String(record.decision || '').trim()).length;
      const ready = records.filter(record => record.ready).length;
      const summary = document.querySelector('[data-activity-summary]');
      if (summary) summary.textContent = `${started} of 10 started · ${ready} marked ready for your folio review`;
    }

    list.addEventListener('input', event => {
      const card = event.target.closest('[data-activity-id]');
      if (card) saveCard(card);
    });
    list.addEventListener('change', event => {
      const card = event.target.closest('[data-activity-id]');
      if (card) saveCard(card);
    });

    document.querySelector('[data-export-activities]')?.addEventListener('click', () => {
      const lines = ['Farm in a Box — Applied Learning Activities', 'Formative practice export — not a submission', `Exported: ${new Date().toLocaleString('en-AU')}`, ''];
      supportModules.forEach(module => {
        const record = state.activities[module.activity.id] || {};
        lines.push(`Module ${module.number}: ${module.activity.title}`, `Mechanic: ${module.activity.mechanic}`, `Working notes: ${record.notes || ''}`, `Decision and reason: ${record.decision || ''}`, `Marked ready for folio review: ${record.ready ? 'Yes' : 'No'}`, '');
      });
      downloadFile('farm-in-a-box-activity-notes.txt', lines.join('\n'));
      routeStatus('Activity notes exported. The file is a backup, not a submission.', '[data-activity-status]');
    });

    document.querySelector('[data-reset-activities]')?.addEventListener('click', () => {
      if (!confirm('Reset only the ten saved activity records on this device? Your folio and module work will not be changed.')) return;
      try { localStorage.removeItem(KEYS.activities); } catch {}
      state.activities = {};
      list.querySelectorAll('textarea').forEach(field => { field.value = ''; });
      list.querySelectorAll('input[type="checkbox"]').forEach(field => { field.checked = false; });
      list.querySelectorAll('[data-activity-chip]').forEach(chip => { chip.textContent = 'Not started'; chip.dataset.state = 'attention'; });
      list.querySelectorAll('[data-activity-feedback]').forEach(feedback => { feedback.textContent = 'Use the notes to rehearse the concept. Mark ready only when your decision names supporting evidence.'; });
      updateActivitySummary();
      routeStatus('Only activity notes were reset.', '[data-activity-status]');
    });

    updateActivitySummary();
    openHashedCard();
  }

  function initPuzzles() {
    const bank = document.querySelector('[data-puzzle-bank]');
    if (!bank) return;
    const state = readJSON(KEYS.puzzles, { schema_version: SCHEMA, course_id: COURSE_ID, values: {}, checks: {} });

    bank.querySelectorAll('input, select').forEach(control => {
      const saved = state.values[control.name];
      if (saved === undefined) return;
      if (control.type === 'radio' || control.type === 'checkbox') control.checked = control.value === saved;
      else control.value = saved;
    });

    function saveControl(control) {
      if (!control.name) return;
      if ((control.type === 'radio' || control.type === 'checkbox') && !control.checked) return;
      state.values[control.name] = control.value;
      state.updated_at = new Date().toISOString();
      const saved = writeJSON(KEYS.puzzles, state);
      routeStatus(saved ? `Puzzle choices saved on this device at ${nowLabel()}.` : 'This browser could not save puzzle choices.', '[data-puzzle-status]', saved ? 'saved' : 'error');
    }

    bank.addEventListener('input', event => saveControl(event.target));
    bank.addEventListener('change', event => saveControl(event.target));

    bank.addEventListener('click', event => {
      const checkButton = event.target.closest('[data-check-puzzle]');
      const resetButton = event.target.closest('[data-reset-puzzle]');
      if (!checkButton && !resetButton) return;
      const puzzle = event.target.closest('[data-puzzle]');
      if (!puzzle) return;

      if (resetButton) {
        puzzle.querySelectorAll('input, select').forEach(control => {
          if (control.type === 'radio' || control.type === 'checkbox') control.checked = false;
          else control.value = '';
          control.removeAttribute('aria-invalid');
          delete state.values[control.name];
        });
        delete state.checks[puzzle.dataset.puzzle];
        writeJSON(KEYS.puzzles, state);
        const feedback = puzzle.querySelector('[data-puzzle-feedback]');
        feedback.textContent = 'This puzzle was reset. Other puzzle records were not changed.';
        feedback.dataset.state = '';
        return;
      }

      let correct = 0;
      const controls = [...puzzle.querySelectorAll('[data-answer]')];
      controls.forEach(item => {
        let value = '';
        if (item.matches('select, input')) value = item.value;
        else value = item.querySelector('input:checked')?.value || '';
        const isCorrect = value === item.dataset.answer;
        if (isCorrect) correct += 1;
        item.setAttribute('aria-invalid', isCorrect || !value ? 'false' : 'true');
      });
      state.checks[puzzle.dataset.puzzle] = { correct, total: controls.length, checked_at: new Date().toISOString() };
      writeJSON(KEYS.puzzles, state);
      const feedback = puzzle.querySelector('[data-puzzle-feedback]');
      if (correct === controls.length) {
        feedback.textContent = `All ${controls.length} choices fit. Explain one of the relationships aloud or in your notes to lock in the idea.`;
        feedback.dataset.state = 'ready';
      } else {
        feedback.textContent = `${correct} of ${controls.length} choices fit. Revisit the highlighted choices, use the linked module idea, then check again.`;
        feedback.dataset.state = 'try-again';
      }
    });

    document.querySelector('[data-reset-all-puzzles]')?.addEventListener('click', () => {
      if (!confirm('Reset only the saved puzzle choices on this device?')) return;
      try { localStorage.removeItem(KEYS.puzzles); } catch {}
      bank.querySelectorAll('input, select').forEach(control => {
        if (control.type === 'radio' || control.type === 'checkbox') control.checked = false;
        else control.value = '';
        control.removeAttribute('aria-invalid');
      });
      bank.querySelectorAll('[data-puzzle-feedback]').forEach(feedback => { feedback.textContent = 'Choose, check and use the feedback to revise your thinking.'; feedback.dataset.state = ''; });
      routeStatus('Only puzzle choices were reset.', '[data-puzzle-status]');
    });
  }

  function initFolio() {
    const bank = document.querySelector('[data-folio-bank]');
    if (!bank) return;
    let state = readJSON(KEYS.folio, { schema_version: SCHEMA, course_id: COURSE_ID, modules: {} });
    if (state.schema_version !== SCHEMA || state.course_id !== COURSE_ID || !state.modules) {
      state = { schema_version: SCHEMA, course_id: COURSE_ID, modules: {} };
    }

    function imageFor(moduleId) {
      try { return localStorage.getItem(KEYS.folioImage(moduleId)) || ''; } catch { return ''; }
    }

    function recordFor(moduleId) {
      return state.modules[moduleId] || { selected: [], response: '', caption: '', nextStep: '' };
    }

    function recordReady(record) {
      return Array.isArray(record.selected) && record.selected.length > 0 && String(record.response || '').trim().length >= 80 && String(record.caption || '').trim().length >= 20;
    }

    bank.innerHTML = supportModules.map(module => {
      const record = recordFor(module.id);
      const ready = recordReady(record);
      const image = imageFor(module.id);
      return `<details class="folio-card" id="${escapeHTML(module.folioRoute)}" data-folio-module="${escapeHTML(module.id)}">
        <summary>
          <span aria-hidden="true" class="number">${module.number}</span>
          <span><strong>${escapeHTML(module.title)}</strong><small>Select the strongest evidence from this module.</small></span>
          <span class="status-chip" data-folio-chip data-state="${ready ? 'ready' : 'attention'}">${ready ? 'Ready for your review' : record.response || record.caption || record.selected?.length ? 'In progress' : 'Not started'}</span>
        </summary>
        <div class="folio-body">
          <p><strong>Action:</strong> Select the evidence you actually have, explain what it proves and add a meaningful caption. Do not copy all your theory or quiz responses here.</p>
          <div class="destination-list" aria-label="Module ${module.number} evidence destinations">
            ${module.evidence.map((item, index) => `<label class="evidence-destination"><input type="checkbox" value="${index}" data-folio-destination${record.selected?.includes(index) ? ' checked' : ''}><span>${escapeHTML(item)}</span></label>`).join('')}
          </div>
          <div class="field-grid">
            <label class="field"><span>What does your selected evidence show?</span><textarea data-folio-field="response" rows="8" placeholder="Name the decision, process or result, then cite the observation, measurement, comparison or record that supports it.">${escapeHTML(record.response || '')}</textarea><small class="fine">Aim for enough context that the evidence still makes sense away from this page.</small></label>
            <label class="field"><span>Evidence caption</span><textarea data-folio-field="caption" rows="8" placeholder="Example: This dated image and record show… The important feature is…">${escapeHTML(record.caption || '')}</textarea><small class="fine">A useful caption says what the evidence proves, not just what is pictured.</small></label>
          </div>
          <label class="field"><span>Next decision or improvement</span><textarea data-folio-field="nextStep" rows="4" placeholder="What should happen next, and what evidence would show whether it worked?">${escapeHTML(record.nextStep || '')}</textarea></label>
          <div class="image-control">
            <label class="field-label" for="folio-image-${escapeHTML(module.id)}">Optional supporting image</label>
            <p class="fine">JPEG, PNG or WebP, maximum 250 KB. The image stays in this browser and is included in the editable JSON backup. It is not uploaded.</p>
            <input id="folio-image-${escapeHTML(module.id)}" type="file" accept="image/jpeg,image/png,image/webp" data-folio-image>
            <div class="image-preview" data-image-preview${image ? '' : ' hidden'}>${image ? `<img src="${escapeHTML(image)}" alt="Locally saved supporting evidence preview"><div><p><strong>Image saved on this device.</strong></p><button type="button" class="danger-button" data-remove-image>Remove this image</button></div>` : ''}</div>
          </div>
          <p class="formative-boundary">Saved evidence is not teacher-observed proof, a mark or a submission. Your teacher decides which records are required and how they are used.</p>
          <div class="compact-actions"><a class="button secondary" href="${escapeHTML(module.moduleRoute)}">Return to Module ${module.number}</a><a class="button secondary" href="activities.html#${escapeHTML(module.activity.id)}">Open the linked activity</a></div>
        </div>
      </details>`;
    }).join('');

    function collectCard(card) {
      const moduleId = card.dataset.folioModule;
      const selected = [...card.querySelectorAll('[data-folio-destination]:checked')].map(input => Number(input.value));
      return {
        selected,
        response: card.querySelector('[data-folio-field="response"]').value,
        caption: card.querySelector('[data-folio-field="caption"]').value,
        nextStep: card.querySelector('[data-folio-field="nextStep"]').value,
        updated_at: new Date().toISOString()
      };
    }

    function saveCard(card) {
      const moduleId = card.dataset.folioModule;
      state.modules[moduleId] = collectCard(card);
      state.updated_at = new Date().toISOString();
      const saved = writeJSON(KEYS.folio, state);
      updateFolioUI();
      routeStatus(saved ? `Folio text saved on this device at ${nowLabel()}.` : 'This browser could not save. Export a JSON backup before leaving.', '[data-folio-status]', saved ? 'saved' : 'error');
    }

    function updateFolioUI() {
      let readyCount = 0;
      let nextModule = null;
      supportModules.forEach(module => {
        const record = recordFor(module.id);
        const ready = recordReady(record);
        if (ready) readyCount += 1;
        else if (!nextModule) nextModule = module;
        const card = bank.querySelector(`[data-folio-module="${module.id}"]`);
        const chip = card?.querySelector('[data-folio-chip]');
        if (chip) {
          const started = record.response || record.caption || record.nextStep || record.selected?.length;
          chip.textContent = ready ? 'Ready for your review' : started ? 'In progress' : 'Not started';
          chip.dataset.state = ready ? 'ready' : 'attention';
        }
      });
      const summary = document.querySelector('[data-folio-summary]');
      if (summary) summary.textContent = `${readyCount} of 10 evidence cards have enough context for your own review.`;
      const next = document.querySelector('[data-folio-next]');
      if (next) {
        if (nextModule) next.innerHTML = `<strong>Next useful action:</strong> <a href="#${escapeHTML(nextModule.folioRoute)}">open Module ${nextModule.number}: ${escapeHTML(nextModule.title)}</a> and select one piece of evidence you can explain.`;
        else next.innerHTML = '<strong>Next useful action:</strong> review the ten cards, remove weak or repeated evidence, then export a backup.';
      }
    }

    bank.addEventListener('input', event => {
      const card = event.target.closest('[data-folio-module]');
      if (card && !event.target.matches('[data-folio-image]')) saveCard(card);
    });
    bank.addEventListener('change', async event => {
      const card = event.target.closest('[data-folio-module]');
      if (!card) return;
      if (!event.target.matches('[data-folio-image]')) {
        saveCard(card);
        return;
      }
      const file = event.target.files?.[0];
      event.target.value = '';
      if (!file) return;
      if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
        routeStatus('That image type is not supported. Use JPEG, PNG or WebP.', '[data-folio-status]', 'error');
        return;
      }
      if (file.size > 250000) {
        routeStatus('That image is larger than 250 KB. Resize it, then try again.', '[data-folio-status]', 'error');
        return;
      }
      const currentBytes = supportModules.reduce((total, module) => {
        if (module.id === card.dataset.folioModule) return total;
        const existing = imageFor(module.id);
        return total + Math.floor(existing.length * .75);
      }, 0);
      if (currentBytes + file.size > 1750000) {
        routeStatus('The folio image allowance on this device is full. Remove an image or keep this evidence in the text export.', '[data-folio-status]', 'error');
        return;
      }
      const dataUrl = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(String(reader.result));
        reader.onerror = reject;
        reader.readAsDataURL(file);
      }).catch(() => '');
      if (!dataUrl) {
        routeStatus('The image could not be read.', '[data-folio-status]', 'error');
        return;
      }
      try {
        localStorage.setItem(KEYS.folioImage(card.dataset.folioModule), dataUrl);
      } catch {
        routeStatus('The browser could not save that image. Your text evidence is unchanged.', '[data-folio-status]', 'error');
        return;
      }
      const preview = card.querySelector('[data-image-preview]');
      preview.hidden = false;
      preview.innerHTML = `<img src="${escapeHTML(dataUrl)}" alt="Locally saved supporting evidence preview"><div><p><strong>Image saved on this device.</strong></p><button type="button" class="danger-button" data-remove-image>Remove this image</button></div>`;
      routeStatus(`Image saved only in this browser at ${nowLabel()}.`, '[data-folio-status]');
    });

    bank.addEventListener('click', event => {
      const button = event.target.closest('[data-remove-image]');
      if (!button) return;
      const card = button.closest('[data-folio-module]');
      try { localStorage.removeItem(KEYS.folioImage(card.dataset.folioModule)); } catch {}
      const preview = card.querySelector('[data-image-preview]');
      preview.hidden = true;
      preview.innerHTML = '';
      routeStatus('Only that supporting image was removed.', '[data-folio-status]');
    });

    document.querySelector('[data-export-folio-json]')?.addEventListener('click', () => {
      const images = {};
      supportModules.forEach(module => {
        const image = imageFor(module.id);
        if (image) images[module.id] = image;
      });
      const backup = { schema_version: SCHEMA, course_id: COURSE_ID, export_type: 'editable-backup', exported_at: new Date().toISOString(), text_state: state, images };
      downloadFile('farm-in-a-box-folio-backup.json', `${JSON.stringify(backup, null, 2)}\n`, 'application/json');
      routeStatus('Editable JSON backup exported. It includes saved optional images.', '[data-folio-status]');
    });

    document.querySelector('[data-export-folio-text]')?.addEventListener('click', () => {
      const lines = ['Farm in a Box — Project folio', 'Student evidence export — exporting is not submission', `Exported: ${new Date().toLocaleString('en-AU')}`, ''];
      supportModules.forEach(module => {
        const record = recordFor(module.id);
        const selected = (record.selected || []).map(index => module.evidence[index]).filter(Boolean);
        lines.push(`Module ${module.number}: ${module.title}`, `Selected evidence: ${selected.length ? selected.join('; ') : 'None selected'}`, `What it shows: ${record.response || ''}`, `Caption: ${record.caption || ''}`, `Next decision or improvement: ${record.nextStep || ''}`, `Optional image saved locally: ${imageFor(module.id) ? 'Yes — image data is in the JSON backup, not this text file' : 'No'}`, '');
      });
      downloadFile('farm-in-a-box-folio-evidence.txt', lines.join('\n'));
      routeStatus('Readable text evidence exported. Optional images remain in the JSON backup.', '[data-folio-status]');
    });

    const restoreInput = document.querySelector('[data-restore-folio]');
    document.querySelector('[data-choose-restore]')?.addEventListener('click', () => restoreInput?.click());
    restoreInput?.addEventListener('change', async () => {
      const file = restoreInput.files?.[0];
      restoreInput.value = '';
      if (!file) return;
      let backup;
      try { backup = JSON.parse(await file.text()); } catch {
        routeStatus('That file is not a readable JSON backup.', '[data-folio-status]', 'error');
        return;
      }
      if (backup.schema_version !== SCHEMA || backup.course_id !== COURSE_ID || backup.export_type !== 'editable-backup' || !backup.text_state?.modules) {
        routeStatus('That backup belongs to a different course or folio version.', '[data-folio-status]', 'error');
        return;
      }
      const allowedIds = new Set(supportModules.map(module => module.id));
      const restoredImages = backup.images || {};
      for (const [moduleId, dataUrl] of Object.entries(restoredImages)) {
        const supported = allowedIds.has(moduleId) && /^data:image\/(jpeg|png|webp);base64,/i.test(dataUrl) && dataUrl.length * .75 <= 250000;
        if (!supported) {
          routeStatus(`The backup contains an unsupported or oversized image for ${moduleId}. Nothing was restored.`, '[data-folio-status]', 'error');
          return;
        }
      }
      const totalImageBytes = Object.values(restoredImages).reduce((total, value) => total + String(value).length * .75, 0);
      if (totalImageBytes > 1750000) {
        routeStatus('The backup contains more image data than this folio allows. Nothing was restored.', '[data-folio-status]', 'error');
        return;
      }
      const restoredState = { schema_version: SCHEMA, course_id: COURSE_ID, modules: {} };
      supportModules.forEach(module => {
        const incoming = backup.text_state.modules[module.id] || {};
        restoredState.modules[module.id] = {
          selected: Array.isArray(incoming.selected) ? incoming.selected.filter(index => Number.isInteger(index) && index >= 0 && index < 3) : [],
          response: String(incoming.response || ''),
          caption: String(incoming.caption || ''),
          nextStep: String(incoming.nextStep || ''),
          updated_at: new Date().toISOString()
        };
      });
      try {
        supportModules.forEach(module => localStorage.removeItem(KEYS.folioImage(module.id)));
        Object.entries(restoredImages).forEach(([moduleId, dataUrl]) => localStorage.setItem(KEYS.folioImage(moduleId), dataUrl));
        localStorage.setItem(KEYS.folio, JSON.stringify(restoredState));
      } catch {
        routeStatus('This browser did not have enough local storage to restore the backup.', '[data-folio-status]', 'error');
        return;
      }
      location.reload();
    });

    document.querySelector('[data-reset-folio]')?.addEventListener('click', () => {
      if (!confirm('Reset only this Farm in a Box folio on this device, including its optional images? Export a JSON backup first if you may need the work again.')) return;
      try {
        localStorage.removeItem(KEYS.folio);
        supportModules.forEach(module => localStorage.removeItem(KEYS.folioImage(module.id)));
      } catch {}
      location.reload();
    });

    updateFolioUI();
    if (!openHashedCard()) {
      const next = supportModules.find(module => !recordReady(recordFor(module.id)));
      const nextCard = next && bank.querySelector(`[data-folio-module="${next.id}"]`);
      if (nextCard) nextCard.open = true;
    }
  }

  function initTeacherControls() {
    const container = document.querySelector('[data-teacher-controls]');
    if (!container) return;
    const state = readJSON(KEYS.teacher, { schema_version: SCHEMA, course_id: COURSE_ID, controls: {} });
    container.querySelectorAll('[data-teacher-control]').forEach(control => {
      const record = state.controls[control.dataset.controlId] || {};
      control.querySelector('input[type="checkbox"]').checked = Boolean(record.confirmed);
      control.querySelector('textarea').value = record.notes || '';
    });

    function save() {
      container.querySelectorAll('[data-teacher-control]').forEach(control => {
        state.controls[control.dataset.controlId] = {
          confirmed: control.querySelector('input[type="checkbox"]').checked,
          notes: control.querySelector('textarea').value
        };
      });
      state.updated_at = new Date().toISOString();
      const saved = writeJSON(KEYS.teacher, state);
      routeStatus(saved ? `Preparation notes saved on this device at ${nowLabel()}.` : 'This browser could not save the preparation notes.', '[data-teacher-status]', saved ? 'saved' : 'error');
    }
    container.addEventListener('input', save);
    container.addEventListener('change', save);
    document.querySelector('[data-reset-teacher]')?.addEventListener('click', () => {
      if (!confirm('Reset only the local teacher-preparation checklist for this course?')) return;
      try { localStorage.removeItem(KEYS.teacher); } catch {}
      container.querySelectorAll('input[type="checkbox"]').forEach(input => { input.checked = false; });
      container.querySelectorAll('textarea').forEach(textarea => { textarea.value = ''; });
      routeStatus('Only the local preparation checklist was reset.', '[data-teacher-status]');
    });
  }

  const printState = new Map();
  window.addEventListener('beforeprint', () => {
    document.querySelectorAll('details.activity-card, details.folio-card, details.activity-help').forEach(details => {
      printState.set(details, details.open);
      details.open = true;
    });
  });
  window.addEventListener('afterprint', () => {
    printState.forEach((wasOpen, details) => { details.open = wasOpen; });
    printState.clear();
  });
  window.addEventListener('hashchange', openHashedCard);
  if (location.hash) {
    window.addEventListener('load', () => requestAnimationFrame(openHashedCard), { once: true });
  }

  document.querySelectorAll('[data-print-route]').forEach(button => {
    button.addEventListener('click', () => window.print());
  });

  initActivities();
  initPuzzles();
  initFolio();
  initTeacherControls();
})();
