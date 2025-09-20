
// Simple demo quiz
const demoQuestions = [
  { stem: 'Je ziet een bord: <strong>"Fiets parkeren verboden"</strong>. Wat betekent dit?', choices: ['Je mag je fiets repareren.','Je mag je fiets niet parkeren.','Je mag hier alleen fietsen.'], correct: 1, explanation: 'Niet parkeren.'},
  { stem: 'In een e-mail staat: <em>"Kunt u de bijlage ondertekenen en terugsturen?"</em> Wat moet je doen?', choices: ['De e-mail voorlezen.','De bijlage tekenen en terugsturen.','Meteen bellen.'], correct: 1, explanation: 'Teken en terugsturen.'},
  { stem: 'Op de deur staat: <strong>"Geopend 09:00–18:00"</strong>. Je komt om 19:00. Wat klopt?', choices: ['De winkel is open.','De winkel is gesloten.','Alleen de kassa is open.'], correct: 1, explanation: 'Na 18:00 is het dicht.'}
];

const qRoot = document.getElementById('demo-quiz');
const year = document.getElementById('year');
if(year) year.textContent = new Date().getFullYear();

function renderDemo(){
  if(!qRoot) return;
  const form = document.createElement('form');
  form.className = 'grid';
  demoQuestions.forEach((q, i) => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `<div><strong>Vraag ${i+1}</strong></div><div>${q.stem}</div>`;
    q.choices.forEach((c, idx) => {
      const id = `q${i}_${idx}`;
      const row = document.createElement('div');
      row.style.marginTop = '6px';
      row.innerHTML = `<label><input type="radio" name="q${i}" value="${idx}"> ${c}</label>`;
      card.appendChild(row);
    });
    form.appendChild(card);
  });
  const actions = document.createElement('div');
  actions.innerHTML = `<button class="btn" type="submit">Check answers</button>`;
  form.appendChild(actions);
  form.addEventListener('submit', (e)=>{
    e.preventDefault();
    let score = 0;
    demoQuestions.forEach((q, i)=>{
      const val = form.querySelector(`[name="q${i}"]:checked`);
      const correct = q.correct;
      if(val && +val.value === correct) score++;
    });
    alert(`Score: ${score}/${demoQuestions.length}`);
  });
  qRoot.appendChild(form);
}

renderDemo();

// Netlify forms (AJAX UX)
const subscribeForm = document.getElementById('subscribeForm');
const subscribeStatus = document.getElementById('subscribeStatus');
if(subscribeForm){
  subscribeForm.addEventListener('submit', async (e)=>{
    e.preventDefault();
    const data = new FormData(subscribeForm);
    try{
      await fetch('/', { method:'POST', body:data });
      subscribeStatus.textContent = 'Thanks! Check your inbox soon.';
      document.getElementById('successModal').classList.add('open');
    }catch(err){
      subscribeStatus.textContent = 'Something went wrong. Please try again.';
    }
  });
  document.getElementById('closeModal').onclick = ()=> document.getElementById('successModal').classList.remove('open');
}

// Stripe Checkout (placeholder)
function goToCheckout(){
  // Replace with your live Checkout link or fetch a session from your server/Netlify function.
  // window.location.href = 'YOUR_STRIPE_CHECKOUT_LINK';
  alert('Connect Stripe Checkout first (see README).');
}
document.getElementById('buyBtn')?.addEventListener('click', goToCheckout);
document.getElementById('buyBtn2')?.addEventListener('click', goToCheckout);
