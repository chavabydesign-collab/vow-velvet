const C='chava-soiree-v20';
const A=['./','./index.html','./manifest.json','./icon-192.png','./icon-512.png','./hero.jpg'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>Promise.all(A.map(u=>c.add(u).catch(()=>{})))))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(n=>n!==C).map(n=>caches.delete(n)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;const u=new URL(e.request.url),same=u.origin===location.origin;if(!same&&!/(^|\.)(googleapis|gstatic)\.com$/.test(u.hostname))return;
e.respondWith(caches.match(e.request,{ignoreSearch:same}).then(r=>r||fetch(e.request).then(n=>{if(n.ok||n.type==='opaque'){const k=n.clone();caches.open(C).then(c=>c.put(e.request,k))}return n}).catch(()=>same?caches.match('./index.html'):Response.error())))});
