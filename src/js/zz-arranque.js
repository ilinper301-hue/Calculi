/* ===== Arranque ===== */
cargar();
matchMedia('(prefers-color-scheme: dark)').addEventListener?.('change', () => pintar());
pintar();
if ('serviceWorker' in navigator && location.protocol === 'https:') navigator.serviceWorker.register('sw.js').catch(() => {});
