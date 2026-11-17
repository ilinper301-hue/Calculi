// Calculi: funciona sin conexión. Abre al instante con la copia guardada y la actualiza por detrás;
// si la página ha cambiado, avisa a la app («Hay una versión nueva»).
// Prefijo propio «calc-pwa-»: comparte dominio con Lectori y Barri y solo borra sus propias cachés.
const V="calc-pwa-20",CORE=["./","index.html","manifest.webmanifest","icon-192.png","icon-512.png","fonts/fredoka.woff","fonts/fredoka-ext.woff","fonts/inter-400.woff","fonts/inter-500.woff","fonts/inter-600.woff"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(V).then(c=>Promise.all(CORE.map(u=>c.add(u).catch(()=>{})))).then(()=>self.skipWaiting()))});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x.startsWith("calc-pwa-")&&x!==V).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
const esPagina=u=>/\/(index\.html)?$/.test(u.pathname);
async function avisar(){await new Promise(r=>setTimeout(r,1500));const cs=await self.clients.matchAll();cs.forEach(c=>c.postMessage("calc-nueva"))}
self.addEventListener("fetch",e=>{const r=e.request;if(r.method!=="GET")return;const u=new URL(r.url);if(u.origin!==location.origin)return;
e.respondWith((async()=>{
const c=await caches.open(V),h=await c.match(r),hc=h?h.clone():null;
const red=fetch(r,{cache:"no-cache"}).then(async n=>{if(n.ok){if(h&&esPagina(u)){try{const [a,b]=await Promise.all([hc.text(),n.clone().text()]);if(a!==b)await avisar()}catch(_){}}await c.put(r,n.clone())}return n}).catch(()=>null);
if(h){e.waitUntil(red);return h}
const n=await red;return n||(await c.match("index.html"))||Response.error()})())});
