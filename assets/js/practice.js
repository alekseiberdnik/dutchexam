import { supabase } from './supabaseClient.js';
import { requireAuth } from './auth.js';

const SET_NAME_MAP = {
  quick: 'Quick Test',
  deep: 'Deep Test',
};

function getSetKeyFromUrl() {
  const params = new URLSearchParams(window.location.search);
  const key = params.get('set') || 'quick';
  return key in SET_NAME_MAP ? key : 'quick';
}

function formatSeconds(total) {
  const m = Math.floor(total / 60);
  const s = total % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
}

document.addEventListener('DOMContentLoaded', async () => {
  const auth = await requireAuth();
  if (!auth) return;
  const { user } = auth;

  const setKey = getSetKeyFromUrl();
  const setTitleEl = document.getElementById('test-title');
  if (setTitleEl) setTitleEl.textContent = SET_NAME_MAP[setKey];

  // Load test set
  const { data: testSet, error: setError } = await supabase
    .from('test_sets')
    .select('*')
    .eq('name', SET_NAME_MAP[setKey])
    .order('created_at', { ascending: true })
    .limit(1)
    .single();

  if (setError || !testSet) {
    console.error(setError);
    alert('Could not load test set.');
    return;
  }

  const { data: items, error: qError } = await supabase
    .from('test_set_questions')
    .select('question_order, questions(*)')
    .eq('set_id', testSet.id)
    .order('question_order', { ascending: true });

  if (qError || !items?.length) {
    console.error(qError);
    alert('No questions found for this test yet.');
    return;
  }

  const questions = items.map(it => it.questions);
  let currentIndex = 0;
  let score = 0;
  let secondsLeft = (testSet.duration_minutes || 15) * 60;
  let timerId;

  const timerEl = document.getElementById('test-timer');
  const progressEl = document.getElementById('test-progress');
  const qTextEl = document.getElementById('question-text');
  const qMetaEl = document.getElementById('question-meta');
  const choicesEl = document.getElementById('question-choices');
  const feedbackEl = document.getElementById('test-feedback');

  function renderQuestion() {
    const q = questions[currentIndex];
    if (!q) return;

    if (progressEl) {
      progressEl.textContent = `Question ${currentIndex + 1} of ${questions.length}`;
    }
    if (qTextEl) qTextEl.textContent = q.question_text;
    if (qMetaEl) qMetaEl.textContent = `${q.skill} • ${q.category}`;

    feedbackEl.textContent = '';
    feedbackEl.className = 'test-feedback';

    choicesEl.innerHTML = '';
    const options = Array.isArray(q.choices) ? q.choices : JSON.parse(q.choices || '[]');

    options.forEach((opt) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'test-choice';
      btn.textContent = opt;

      btn.addEventListener('click', () => handleAnswer(q, opt, btn));

      choicesEl.appendChild(btn);
    });
  }

  async function handleAnswer(question, answer, buttonEl) {
    const optionsEls = choicesEl.querySelectorAll('.test-choice');
    optionsEls.forEach(el => el.disabled = true);
    if (buttonEl) buttonEl.classList.add('selected');

    const correct = answer === question.correct_answer;
    if (correct) score += 1;

    // Save attempt
    await supabase.from('attempts').insert({
      user_id: user.id,
      question_id: question.id,
      user_answer: answer,
      is_correct: correct,
    });

    feedbackEl.textContent = correct ? 'Correct ✅' : `Not correct ❌  Correct answer: ${question.correct_answer}`;
    feedbackEl.classList.add(correct ? 'correct' : 'incorrect');

    setTimeout(() => {
      currentIndex += 1;
      if (currentIndex >= questions.length) {
        finishTest();
      } else {
        renderQuestion();
      }
    }, 900);
  }

  function updateTimer() {
    secondsLeft -= 1;
    if (timerEl) timerEl.textContent = formatSeconds(Math.max(0, secondsLeft));
    if (secondsLeft <= 0) {
      finishTest(true);
    }
  }

  function finishTest(timeUp = false) {
    clearInterval(timerId);
    const pct = Math.round((score / questions.length) * 100);
    const msg = timeUp
      ? `Time is up! You answered ${score} of ${questions.length} questions. Estimated score: ${pct}%.`
      : `Test finished! You answered ${score} of ${questions.length} questions. Estimated score: ${pct}%.`;

    alert(msg);
    window.location.href = '/app/dashboard.html';
  }

  // Initial render + timer
  renderQuestion();
  if (timerEl) timerEl.textContent = formatSeconds(secondsLeft);
  timerId = setInterval(updateTimer, 1000);
});
