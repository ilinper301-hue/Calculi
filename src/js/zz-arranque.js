/* ===== Arranque ===== */
cargar();
matchMedia('(prefers-color-scheme: dark)').addEventListener?.('change', () => pintar());
let primeraVez = false; try { primeraVez = !localStorage.getItem('calc.wel') && !EST.alu.length; } catch (e) {}
if (primeraVez) { scr = 'wel'; WEL = 0; }
pintar();
// Presentación: mascota y nombre durante un momento, con fundido (como Lectori y Barri)
(() => { const s = document.createElement('div'); s.className = 'splash'; s.innerHTML = mascota(150) + '<div class="wm">Calculi</div>'; document.body.appendChild(s); setTimeout(() => s.remove(), 1900); })();
if ('serviceWorker' in navigator && location.protocol === 'https:') navigator.serviceWorker.register('sw.js').catch(() => {});
