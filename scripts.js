// RushRanks landing interactivity (CT countdown, mobile nav)
(function(){
  const btn = document.querySelector('.menu-btn');
  const mnav = document.querySelector('.mobile-nav');
  if (btn && mnav) btn.addEventListener('click', ()=> mnav.classList.toggle('open'));

  // Midnight countdown for America/Chicago (CT)
  function msToMidnightCT(){
    const now = new Date();
    const ctNowStr = now.toLocaleString('en-US', { timeZone: 'America/Chicago' });
    const ctNow = new Date(ctNowStr);
    const ctNext = new Date(ctNow);
    ctNext.setHours(24,0,0,0);
    return ctNext - ctNow;
  }
  function fmt(ms){
    const s = Math.max(0, Math.floor(ms/1000));
    const h = String(Math.floor(s/3600)).padStart(2,'0');
    const m = String(Math.floor((s%3600)/60)).padStart(2,'0');
    const sec = String(s%60).padStart(2,'0');
    return `${h}:${m}:${sec}`;
  }
  const cd = document.getElementById('countdown');
  if (cd){ const tick = ()=> cd.textContent = fmt(msToMidnightCT()); tick(); setInterval(tick, 1000); }

  // Store links
  const APP_STORE_URL = "https://apps.apple.com/us/app/rushranks/id6743615287";
  const PLAY_URL = "";
  const buttons = ['ios-link','gp-link','ios-link-2','gp-link-2'];
  for (const id of buttons){
    const a = document.getElementById(id);
    if (!a) continue;
    const isIOS = id.includes('ios');
    const url = isIOS ? APP_STORE_URL : PLAY_URL;
    if (url && url.length > 6){ a.href = url; a.target = "_blank"; a.querySelector('.label').textContent = isIOS ? 'Get it on the App Store (iOS)' : 'Get it on Google Play'; }
    else { a.href = 'mailto:support@rushranks.com?subject=Notify me when the app is live'; a.querySelector('.label').textContent = isIOS ? 'Download on iOS' : 'Get it on Google Play (Android)'; }
  }

  const y = document.getElementById('y');
  if (y) y.textContent = new Date().getFullYear();
})();
