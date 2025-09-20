
const loginCard = document.getElementById('loginCard');
const adminCard = document.getElementById('adminCard');
const loginBtn = document.getElementById('loginBtn');
const toggleModeBtn = document.getElementById('toggleMode');
const loginStatus = document.getElementById('loginStatus');

let mode = localStorage.getItem('mode') || 'demo'; // 'demo' (localStorage) or 'supabase'
toggleModeBtn.textContent = `Mode: ${mode === 'demo' ? 'Demo (Local)' : 'Supabase'}`;

toggleModeBtn.addEventListener('click', ()=>{
  mode = mode === 'demo' ? 'supabase' : 'demo';
  localStorage.setItem('mode', mode);
  toggleModeBtn.textContent = `Mode: ${mode === 'demo' ? 'Demo (Local)' : 'Supabase'}`;
});

loginBtn.addEventListener('click', async ()=>{
  const u = document.getElementById('username').value.trim();
  const p = document.getElementById('password').value;
  if(u === 'admin' && p === 'admin123'){
    // Demo auth
    loginCard.style.display = 'none';
    adminCard.style.display = 'block';
    initAdmin();
  }else{
    loginStatus.textContent = 'Invalid credentials. (Demo: admin / admin123)';
  }
});

const qForm = document.getElementById('qForm');
const qTable = document.getElementById('qTable').querySelector('tbody');
const clearBtn = document.getElementById('clearBtn');

function getLocal(){
  return JSON.parse(localStorage.getItem('questions') || '[]');
}
function setLocal(items){
  localStorage.setItem('questions', JSON.stringify(items));
}

function rowHtml(q, idx){
  return `<tr>
    <td>${q.examSlug}</td>
    <td>${q.stem.replace(/<[^>]+>/g,'').slice(0,120)}</td>
    <td>${q.correct}</td>
    <td><button class="btn btn-outline" data-idx="${idx}">Delete</button></td>
  </tr>`;
}

function renderTable(){
  const items = getLocal();
  qTable.innerHTML = items.map((q, idx)=>rowHtml(q, idx)).join('');
  qTable.querySelectorAll('button[data-idx]').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      const items = getLocal();
      items.splice(+btn.dataset.idx,1);
      setLocal(items); renderTable();
    });
  });
}

function initAdmin(){
  renderTable();
  qForm.addEventListener('submit', async (e)=>{
    e.preventDefault();
    const q = {
      id: crypto.randomUUID(),
      examSlug: document.getElementById('examSlug').value.trim(),
      stem: document.getElementById('stem').value.trim(),
      choices: [document.getElementById('c1').value, document.getElementById('c2').value, document.getElementById('c3').value, document.getElementById('c4').value].filter(Boolean),
      correct: document.getElementById('correct').value.trim().toUpperCase(),
      explanation: document.getElementById('explanation').value.trim()
    };
    if(mode === 'demo'){
      const items = getLocal(); items.push(q); setLocal(items);
      renderTable();
      qForm.reset();
    }else{
      alert('Supabase mode not configured in this static bundle. See README for wiring Auth + RLS.');
    }
  });
  clearBtn.addEventListener('click', ()=> qForm.reset());
}
