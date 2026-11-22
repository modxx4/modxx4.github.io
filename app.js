// Lightweight firmware card logging.
document.querySelectorAll(".firmware-card.ready").forEach(card => {
  card.addEventListener("click", () => {
    const version = card.querySelector("strong")?.textContent?.trim() || "unknown";
    console.info("MODX: opening firmware host", version);
  });
});


// Register the host service worker so the homepage and shell can open offline.
if ("serviceWorker" in navigator && (location.protocol === "https:" || location.hostname === "localhost")) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./service-worker.js", { scope: "./" })
      .then(registration => registration.update())
      .catch(error => console.warn("MODXX4: offline cache registration failed", error));
  }, { once: true });
}
