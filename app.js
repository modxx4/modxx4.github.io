// Lightweight firmware card logging.
document.querySelectorAll(".firmware-card.ready").forEach(card => {
  card.addEventListener("click", () => {
    const version = card.querySelector("strong")?.textContent?.trim() || "unknown";
    console.info("MODX: opening firmware host", version);
  });
});


// Register offline service worker cleanly for PS4/PS5 WebKit
if ("serviceWorker" in navigator && (location.protocol === "https:" || location.hostname === "localhost")) {
  window.addEventListener("load", function () {
    navigator.serviceWorker.register("./service-worker.js", { scope: "./" }).catch(function () {});
  }, { once: true });
}
