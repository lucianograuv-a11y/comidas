// versión 37092b58
const C="comidas-37092b58";
const CORE=["./","./index.html","./manifest.webmanifest","./icon-192.png","./icon-512.png"];
const CDN=/(cdnjs\.cloudflare\.com|cdn\.jsdelivr\.net|cdn\.tailwindcss\.com|fonts\.(googleapis|gstatic)\.com)$/;
self.addEventListener("install",e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(CORE)));self.skipWaiting();});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k.startsWith("comidas-")&&k!==C).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener("fetch",e=>{
  const r=e.request;if(r.method!=="GET")return;const u=new URL(r.url);
  const put=res=>{if(res&&(res.ok||res.type==="opaque")){const cp=res.clone();caches.open(C).then(c=>c.put(r,cp));}return res;};
  if(u.origin===location.origin&&u.pathname.includes("/comidas/")){
    e.respondWith(fetch(r).then(put).catch(()=>caches.match(r,{ignoreSearch:true}).then(m=>m||caches.match("./index.html"))));
  }else if(CDN.test(u.hostname)){
    e.respondWith(caches.match(r).then(m=>m||fetch(r).then(put)));
  }
});
