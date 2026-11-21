const CACHE_NAME = "modxx4-host-v2";
const APP_SHELL = [
  "./",
  "./index.html",
  "./style.css",
  "./app.js",
  "./support.html",
  "./firmwares/9.00/manifest.json",
  "./firmwares/9.00/goldhen.bin"
];

self.addEventListener("install", (event) => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil((async () => {
    const names = await caches.keys();
    await Promise.all(names.filter(name => name.startsWith("nexus-ps4-") && name !== CACHE_NAME).map(name => caches.delete(name)));
    await self.clients.claim();
  })());
});

self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "NEXUS_PRECACHE") {
    event.waitUntil((async () => {
      const cache = await caches.open(CACHE_NAME);
      await cache.addAll(APP_SHELL);
      event.ports[0]?.postMessage({ ok: true, count: APP_SHELL.length });
    })().catch(error => {
      event.ports[0]?.postMessage({ ok: false, message: error.message });
    }));
  }
});

self.addEventListener("fetch", (event) => {
  const request = event.request;
  const url = new URL(request.url);
  if (request.method !== "GET" || url.origin !== self.location.origin) return;

  event.respondWith((async () => {
    const cache = await caches.open(CACHE_NAME);
    if (request.mode === "navigate") {
      try {
        const response = await fetch(request);
        if (response.ok) cache.put("./index.html", response.clone());
        return response;
      } catch {
        return (await cache.match("./index.html")) || Response.error();
      }
    }
    const cached = await cache.match(request);
    if (cached) return cached;
    try {
      const response = await fetch(request);
      if (response.ok) await cache.put(request, response.clone());
      return response;
    } catch {
      return Response.error();
    }
  })());
});
