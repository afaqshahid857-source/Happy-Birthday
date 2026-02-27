
// ── Floating petals ──────────────────────────────────────────
const petalEmojis = ['🌸','🌺','🌷','💮','✿','🌼','💐'];

(function spawnPetals() {
  const container = document.getElementById('petals');
  for (let i = 0; i < 18; i++) {
    const p = document.createElement('div');
    p.className = 'petal';
    p.textContent = petalEmojis[Math.floor(Math.random() * petalEmojis.length)];
    p.style.left              = Math.random() * 100 + 'vw';
    p.style.top               = (Math.random() * 120 - 20) + 'vh';
    p.style.animationDuration = (6 + Math.random() * 8) + 's';
    p.style.animationDelay    = (Math.random() * 8) + 's';
    p.style.fontSize          = (0.8 + Math.random() * 1) + 'rem';
    container.appendChild(p);
  }
})();

// ── Screen transitions ────────────────────────────────────────
function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.add('hidden'));
  setTimeout(() => {
    document.getElementById(id).classList.remove('hidden');
  }, 400);
}

function onYes()  { showScreen('cake-screen'); }
function onNo()   { showScreen('no-screen'); }
function goBack() { showScreen('question-screen'); }

// ── Blow candles ──────────────────────────────────────────────
function blowCandles() {
  const btn    = document.getElementById('blow-btn');
  btn.classList.add('hidden');

  const flames = ['flame1','flame2','flame3','flame4'];
  const smokes = ['smoke1','smoke2','smoke3','smoke4'];

  flames.forEach((id, i) => {
    setTimeout(() => {
      // Blow flame
      const flame = document.getElementById(id);
      if (flame) flame.classList.add('blown');

      // Show smoke
      const smoke = document.getElementById(smokes[i]);
      if (smoke) smoke.classList.add('show');

      // Sparkle near candle
      const el = document.getElementById(id);
      if (el) {
        const rect = el.getBoundingClientRect();
        addSparkle(rect.left + rect.width / 2, rect.top + rect.height / 2);
      }
    }, i * 200);
  });

  // After all blown → confetti + wish
  setTimeout(() => {
    launchConfetti();
    setTimeout(() => {
      document.getElementById('wish-container').classList.add('show');
    }, 600);
  }, flames.length * 200 + 300);
}

// ── Confetti ──────────────────────────────────────────────────
const confettiColors = ['#f472b6','#c084fc','#fb7185','#fbbf24','#34d399','#60a5fa','#f9a8d4','#e9d5ff'];

function launchConfetti() {
  for (let i = 0; i < 80; i++) {
    setTimeout(() => spawnConfettiPiece(), Math.random() * 1500);
  }
}

function spawnConfettiPiece() {
  const el = document.createElement('div');
  el.className = 'confetti-piece';

  const size  = 6 + Math.random() * 8;
  const isLong = Math.random() > 0.5;

  el.style.cssText = `
    left:   ${Math.random() * 100}vw;
    top:    0;
    width:  ${isLong ? size / 2 : size}px;
    height: ${isLong ? size * 2 : size}px;
    background: ${confettiColors[Math.floor(Math.random() * confettiColors.length)]};
    animation-duration: ${2 + Math.random() * 2}s;
    animation-delay:    ${Math.random() * 0.5}s;
  `;

  document.body.appendChild(el);
  setTimeout(() => el.remove(), 4000);
}

// ── Sparkles ──────────────────────────────────────────────────
function addSparkle(x, y) {
  const sparkles = ['✨','⭐','💫','🌟'];
  const el = document.createElement('div');
  el.className = 'sparkle';
  el.textContent = sparkles[Math.floor(Math.random() * sparkles.length)];
  el.style.left = x + 'px';
  el.style.top  = y + 'px';
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 1600);
}

// ── Tap-to-sparkle on wish box ────────────────────────────────
document.addEventListener('click', e => {
  if (document.getElementById('wish-container').classList.contains('show')) {
    addSparkle(e.clientX, e.clientY);
  }
});