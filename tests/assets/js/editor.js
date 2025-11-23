import { supabase } from './supabaseClient.js';
import { requireAuth } from './auth.js';

document.addEventListener('DOMContentLoaded', async () => {
  const auth = await requireAuth(['editor', 'admin']);
  if (!auth) return;

  const { user } = auth;

  const listEl = document.getElementById('editor-questions');
  const form = document.getElementById('editor-form');

  const { data: questions } = await supabase
    .from('questions')
    .select('*')
    .order('created_at', { ascending: true })
    .limit(50);

  if (listEl && questions) {
    listEl.innerHTML = questions.map(q => `
      <tr>
        <td>${q.skill}</td>
        <td>${q.category}</td>
        <td>${q.question_text.substring(0,80)}${q.question_text.length>80?'…':''}</td>
        <td>${q.difficulty}</td>
        <td>${q.is_published ? 'Yes' : 'No'}</td>
      </tr>
    `).join('');
  }

  form?.addEventListener('submit', async (e) => {
    e.preventDefault();

    const q = {
      skill: form.skill.value,
      category: form.category.value,
      type: 'multiple_choice',
      question_text: form.question_text.value,
      choices: JSON.stringify(form.choices.value.split('\n').map(s => s.trim()).filter(Boolean)),
      correct_answer: form.correct_answer.value,
      explanation: form.explanation.value,
      difficulty: form.difficulty.value,
      is_published: form.is_published.checked,
      created_by: user.id,
    };

    const { error } = await supabase.from('questions').insert(q);
    if (error) {
      alert(error.message);
      return;
    }

    alert('Question created. Refresh the page to see it in the list.');
    form.reset();
  });
});
