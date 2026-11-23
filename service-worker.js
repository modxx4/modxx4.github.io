const CACHE_NAME = "modxx4-host-liquid-glass-v3";
const APP_SHELL = [
  "./",
  "./index.html",
  "./app.js",
  "./modxx4-liquid.css",
  "./assets/modxx4-mark.svg",
  "./support.html",
  "./firmwares/13.52-14.02/index.html",
  "./firmwares/9.00/version-selector.html",
  "./firmwares/9.00/cache.html",
  "./firmwares/9.00/index.html",
  "./firmwares/9.00/index5.html",
  "./firmwares/9.00/cache5.html",
  "./firmwares/9.00/PSPulse.manifest",
  "./firmwares/9.00/PSPulse5.manifest",
  "./firmwares/9.00/goldhen.bin",
  "./firmwares/9.00/goldhen10.bin"
];

self.addEventListener("install", (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    await Promise.all(APP_SHELL.map(async (url) => {
      try {
        const response = await fetch(url, { cache: "reload" });
        if (response.ok) await cache.put(url, response);
      } catch (error) {
        // Keep installation resilient if one optional shell asset is unavailable.
      }
    }));
    await self.skipWaiting();
  })());
});

self.addEventListener("activate", (event) => {
  event.waitUntil((async () => {
    const names = await caches.keys();
    await Promise.all(names
      .filter(name => name.startsWith("modxx4-host-") && name !== CACHE_NAME)
      .map(name => caches.delete(name)));
    await self.clients.claim();
  })());
});

self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "NEXUS_PRECACHE") {
    event.waitUntil((async () => {
      const cache = await caches.open(CACHE_NAME);
      await Promise.all(APP_SHELL.map(async (url) => {
        try {
          const response = await fetch(url, { cache: "reload" });
          if (response.ok) await cache.put(url, response);
        } catch (error) {}
      }));
      event.ports[0]?.postMessage({ ok: true, count: APP_SHELL.length });
    })());
  }
});

self.addEventListener("fetch", (event) => {
  const request = event.request;
  const url = new URL(request.url);
  if (request.method !== "GET" || url.origin !== self.location.origin) return;

  event.respondWith((async () => {
    const cache = await caches.open(CACHE_NAME);

    if (request.mode === "navigate") {
      const cachedPage = await cache.match(request, { ignoreSearch: true });
      if (cachedPage) return cachedPage;

      try {
        const response = await fetch(request);
        if (response.ok) await cache.put(request, response.clone());
        return response;
      } catch (error) {
        return (await cache.match("./index.html")) || Response.error();
      }
    }

    const cached = await cache.match(request, { ignoreSearch: true });
    if (cached) return cached;

    try {
      const response = await fetch(request);
      if (response.ok) await cache.put(request, response.clone());
      return response;
    } catch (error) {
      return Response.error();
    }
  })());
});
