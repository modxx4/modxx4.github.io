// Lightweight firmware card logging.
document.querySelectorAll(".firmware-card.ready").forEach(card => {
  card.addEventListener("click", () => {
    const version = card.querySelector("strong")?.textContent?.trim() || "unknown";
    console.info("MODX: opening firmware host", version);
  });
});

// Detect the exact PS4 firmware and highlight matching MODXX4 host routes.
// Detection is informational only: it never launches a jailbreak automatically.
(function () {
  var title = document.getElementById("modxx4-detect-title");
  var copy = document.getElementById("modxx4-detect-copy");
  var status = document.getElementById("modxx4-detect-status");
  var cards = document.querySelectorAll(".crystal-fw-card[data-fw-versions]");
  if (!title || !copy || !status || !cards.length) return;

  function detectFirmware() {
    var ua = navigator.userAgent || "";
    var match = /PlayStation\s+4[\/ ](\d+)\.(\d+)/i.exec(ua);
    if (!match) return null;

    // PS4 reports the minor firmware component in hexadecimal notation.
    var minor = parseInt(match[2], 16);
    if (isNaN(minor)) return null;
    var minorText = minor.toString(16);
    if (minorText.length < 2) minorText = "0" + minorText;
    return match[1] + "." + minorText;
  }

  function setStatus(label, kind) {
    status.textContent = label;
    status.className = "modxx4-detect-status" + (kind ? " is-" + kind : "");
  }

  var firmware = detectFirmware();
  if (!firmware) {
    title.textContent = "Open MODXX4 in the PS4 browser";
    copy.textContent = "Automatic detection is available on PS4. You can still choose a firmware card manually on this device.";
    setStatus("MANUAL SELECT", "");
    return;
  }

  var matches = [];
  cards.forEach(function (card) {
    var versions = (card.getAttribute("data-fw-versions") || "").split(",");
    if (versions.indexOf(firmware) !== -1) {
      matches.push(card);
      card.classList.add("modxx4-fw-match");
    }
  });

  if (!matches.length) {
    title.textContent = "Firmware " + firmware + " detected — unavailable";
    if (firmware === "14.01") {
      copy.textContent = "The current Afterglow route supports 14.00 and 14.02, but not 14.01. No jailbreak will be started.";
    } else {
      copy.textContent = "No exact MODXX4 host route is listed for this firmware. Do not launch a different firmware card.";
    }
    setStatus("UNAVAILABLE", "unavailable");
    return;
  }

  if (matches.length > 1) {
    title.textContent = "Firmware " + firmware + " detected — two host routes found";
    copy.textContent = "Both Afterglow and SlopKit routes are available for 13.52. Choose the card you prefer; detection will not start the jailbreak.";
    setStatus("2 ROUTES", "supported");
    return;
  }

  var routeStatus = matches[0].getAttribute("data-fw-status") || "supported";
  var routeName = matches[0].querySelector(".crystal-fw-copy strong");
  var routeLabel = routeName ? routeName.textContent : "matching firmware host";
  title.textContent = "Firmware " + firmware + " detected";
  copy.textContent = routeLabel + " is the matching MODXX4 route. Select the highlighted card when you're ready.";
  setStatus(routeStatus === "experimental" ? "EXPERIMENTAL" : "SUPPORTED", routeStatus);
})();

// Register offline service worker cleanly for PS4/PS5 WebKit
if ("serviceWorker" in navigator && (location.protocol === "https:" || location.hostname === "localhost")) {
  window.addEventListener("load", function () {
    navigator.serviceWorker.register("./service-worker.js", { scope: "./" }).catch(function () {});
  }, { once: true });
}
