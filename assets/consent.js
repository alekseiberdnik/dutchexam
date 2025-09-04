
<script>
(function(){
  const I18N = {
    en: {
      title: "We respect your privacy",
      desc: "We use cookies for essential features and, with your consent, for analytics and improvement.",
      btnAcceptAll: "Accept all",
      btnRejectAll: "Reject all",
      btnSave: "Save choices",
      analytics: "Analytics",
      ads: "Personalized ads",
      linkPolicy: "Privacy policy"
    },
    nl: {
      title: "Wij respecteren je privacy",
      desc: "We gebruiken cookies voor essentiële functies en, met jouw toestemming, voor analyse en verbetering.",
      btnAcceptAll: "Alles accepteren",
      btnRejectAll: "Alles weigeren",
      btnSave: "Keuzes opslaan",
      analytics: "Analytics",
      ads: "Gepersonaliseerde advertenties",
      linkPolicy: "Privacyverklaring"
    },
    ru: {
      title: "Мы уважаем вашу приватность",
      desc: "Мы используем cookies для основных функций и, с вашего согласия, для аналитики и улучшений.",
      btnAcceptAll: "Принять все",
      btnRejectAll: "Отклонить все",
      btnSave: "Сохранить выбор",
      analytics: "Аналитика",
      ads: "Персонализированная реклама",
      linkPolicy: "Политика конфиденциальности"
    }
  };

  function t(key){
    const lang = localStorage.getItem("lang") || "en";
    return (I18N[lang] && I18N[lang][key]) || (I18N.en && I18N.en[key]) || key;
  }

  const el = document.createElement('div');
  el.id = 'de-consent';
  el.innerHTML = `
    <h4>${t('title')}</h4>
    <p>${t('desc')}</p>
    <div class="row">
      <div class="switches">
        <label class="switch"><input id="sw-analytics" type="checkbox"> ${t('analytics')}</label>
        <label class="switch"><input id="sw-ads" type="checkbox"> ${t('ads')}</label>
        <a class="btn link" href="/privacy.html" target="_blank" rel="noopener">${t('linkPolicy')}</a>
      </div>
      <div>
        <button class="btn ghost" id="btn-reject">${t('btnRejectAll')}</button>
        <button class="btn primary" id="btn-accept">${t('btnAcceptAll')}</button>
        <button class="btn ghost" id="btn-save">${t('btnSave')}</button>
      </div>
    </div>`;
  document.body.appendChild(el);

  const LSKEY = "DE_CONSENT_V1";
  function readState(){
    try { return JSON.parse(localStorage.getItem(LSKEY) || "{}"); } catch(e){ return {}; }
  }
  function writeState(s){ localStorage.setItem(LSKEY, JSON.stringify(s)); }

  function applyConsent(s){
    // default denied
    const base = {
      'ad_storage':'denied','ad_personalization':'denied','ad_user_data':'denied',
      'analytics_storage':'denied','functionality_storage':'granted','security_storage':'granted'
    };
    if (s.analytics) base.analytics_storage = 'granted';
    if (s.ads) { base.ad_storage = 'granted'; base.ad_personalization = 'granted'; base.ad_user_data = 'granted'; }
    if (window.gtag) gtag('consent','update', base);
  }

  function show(){ el.classList.add('show'); }
  function hide(){ el.classList.remove('show'); }

  const saved = readState();
  const swA = el.querySelector('#sw-analytics');
  const swAds = el.querySelector('#sw-ads');
  if (saved.analytics) swA.checked = true;
  if (saved.ads) swAds.checked = true;

  if (!('analytics' in saved)) show(); // first-time only

  el.querySelector('#btn-accept').addEventListener('click', ()=>{
    const s = {analytics:true, ads:true}; writeState(s); applyConsent(s); hide();
  });
  el.querySelector('#btn-reject').addEventListener('click', ()=>{
    const s = {analytics:false, ads:false}; writeState(s); applyConsent(s); hide();
  });
  el.querySelector('#btn-save').addEventListener('click', ()=>{
    const s = {analytics: swA.checked, ads: swAds.checked}; writeState(s); applyConsent(s); hide();
  });

  // Re-render texts on language change
  const sel = document.getElementById('lang');
  if (sel){
    sel.addEventListener('change', ()=>{
      el.remove(); // rebuild
      setTimeout(()=>{ /* naive reload */ location.reload(); }, 50);
    });
  }
})();
</script>
