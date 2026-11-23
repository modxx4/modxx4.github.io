// Lightweight firmware card logging.
document.querySelectorAll(".firmware-card.ready").forEach(card => {
  card.addEventListener("click", () => {
    const version = card.querySelector("strong")?.textContent?.trim() || "unknown";
    console.info("MODX: opening firmware host", version);
  });
});

// 1. Auto-Detect PS4 / PS5 Firmware & Automatically Open MODXX4 Host
(function () {
  var btn = document.getElementById("auto-fw-btn");
  if (!btn) return;

  var ua = navigator.userAgent || "";
  var ps4Match = ua.match(/PlayStation 4\/([0-9]+\.[0-9]+)/i);
  var ps5Match = ua.match(/PlayStation 5\/([0-9]+\.[0-9]+)/i);

  if (ps4Match && ps4Match[1]) {
    var fw = parseFloat(ps4Match[1]);
    var target = "#firmwares";

    if (fw >= 14.00 && fw <= 14.02) target = "./firmwares/14.00-14.02/index.html";
    else if (fw >= 13.02 && fw <= 13.52) target = "./firmwares/13.52/index.html";
    else if (fw >= 11.00 && fw <= 13.00) target = "./firmwares/13.00/index.html";
    else if (fw >= 9.00 && fw <= 9.60) target = "./900/version-selector.html";
    else if (fw >= 7.00 && fw <= 8.52) target = "./firmwares/7.00/version-selector.html";
    else if (fw === 6.72) target = "./firmwares/6.72/cache.html";
    else if (fw === 5.05) target = "./firmwares/5.05/cache.html";

    if (target !== "#firmwares") {
      window.location.replace(target);
      return;
    }

    btn.textContent = "PS4 FW " + ps4Match[1] + " — Select Firmware Manually";
    btn.href = target;
  } else if (ps5Match && ps5Match[1]) {
    btn.textContent = "PS5 FW " + ps5Match[1] + " Detected";
  } else {
    btn.textContent = "Browse Firmware Library ↓";
  }
})();

// 2. Offline Service Worker & Live Cache Status Indicator
if ("serviceWorker" in navigator && (location.protocol === "https:" || location.hostname === "localhost")) {
  window.addEventListener("load", function () {
    navigator.serviceWorker.register("./service-worker.js", { scope: "./" }).then(function (reg) {
      var badge = document.getElementById("cache-badge");
      if (!badge) return;
      if (navigator.serviceWorker.controller || reg.active) {
        badge.textContent = "CACHED ✓";
      }
    }).catch(function () {});
  }, { once: true });
}
