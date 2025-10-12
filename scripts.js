// RushRanks landing interactivity
(function(){
  // Mobile nav
  const btn = document.querySelector('.menu-btn');
  const mnav = document.querySelector('.mobile-nav');
  if (btn && mnav) {
    btn.addEventListener('click', ()=> mnav.classList.toggle('open'));
  }

  // Reveal on scroll
  const io = new IntersectionObserver((entries)=>{
    for (const e of entries) if (e.isIntersecting) e.target.classList.add('in');
  }, { threshold: .12 });
  document.querySelectorAll('.reveal').forEach(el=> io.observe(el));

  // Midnight countdown (local)
  function msToMidnight(){
    const now = new Date();
    const next = new Date(now);
    next.setHours(24,0,0,0);
    return next - now;
  }
  function fmt(ms){
    const s = Math.floor(ms/1000);
    const h = String(Math.floor(s/3600)).padStart(2,'0');
    const m = String(Math.floor((s%3600)/60)).padStart(2,'0');
    const sec = String(s%60).padStart(2,'0');
    return `${h}:${m}:${sec}`;
  }
  const cd = document.getElementById('countdown');
  if (cd){
    const tick = ()=> { cd.textContent = fmt(msToMidnight()); };
    tick(); setInterval(tick, 1000);
  }

  // Store link config: set your URLs here
  const APP_STORE_URL = "";
  const PLAY_URL      = "";

  function setLink(id, url){
    const a = document.getElementById(id);
    if (!a) return;
    if (url && url.trim().length > 6) {
      a.setAttribute('href', url);
      a.setAttribute('target', '_blank');
      a.querySelector('.label').textContent = a.dataset.liveText;
    } else {
      const mail = 'mailto:support@rushranks.com?subject=Notify me when the app is live';
      a.setAttribute('href', mail);
      a.querySelector('.label').textContent = a.dataset.preText;
    }
  }
  ['ios-link','gp-link','ios-link-2','gp-link-2'].forEach((id)=>{
    setLink(id, id.includes('ios') ? APP_STORE_URL : PLAY_URL);
  });
})();