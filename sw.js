// Calculi: funciona sin conexión. Red primero (así los cambios llegan solos) y copia guardada si no hay red.
// Prefijo propio «calc-pwa-»: comparte dominio con Lectori y Barri y solo borra sus propias cachés.
const V="calc-pwa-6",CORE=["./","index.html","manifest.webmanifest","icon-192.png","icon-512.png","fonts/fredoka.woff","fonts/fredoka-ext.woff","fonts/inter-400.woff","fonts/inter-500.woff","fonts/inter-600.woff"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(V).then(c=>Promise.all(CORE.map(u=>c.add(u).catch(()=>{})))).then(()=>self.skipWaiting()))});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x.startsWith("calc-pwa-")&&x!==V).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener("fetch",e=>{const r=e.request;if(r.method!=="GET")return;const u=new URL(r.url);if(u.origin!==location.origin)return;
e.respondWith(fetch(r).then(n=>{if(n.ok){const c=n.clone();caches.open(V).then(x=>x.put(r,c))}return n}).catch(()=>caches.match(r).then(h=>h||caches.match("index.html"))))});
