// 1. Auto-Detect PS4 / PS5 Firmware
(function () {
  var btn = document.getElementById("auto-fw-btn");
  if (!btn) return;

  var ua = navigator.userAgent || "";
  var ps4Match = ua.match(/PlayStation 4\/([0-9]+\.[0-9]+)/i);
  var ps5Match = ua.match(/PlayStation 5\/([0-9]+\.[0-9]+)/i);

  if (ps4Match && ps4Match[1]) {
    var fw = parseFloat(ps4Match[1]);
    var target = "#firmwares";

    if (fw >= 14.00 && fw <= 14.02) target = "./1400/index.html";
    else if (fw >= 13.02 && fw <= 13.52) target = "./13.52/index.html";
    else if (fw >= 11.00 && fw <= 13.00) target = "./13.00/index.html";
    else if (fw >= 9.00 && fw <= 9.60) target = "./900/version-selector.html";
    else if (fw >= 7.00 && fw <= 8.52) target = "./7.00/version-selector.html";
    else if (fw === 6.72) target = "./6.72/cache.html";
    else if (fw === 5.05) target = "./5.05/cache.html";

    if (target !== "#firmwares") {
      btn.textContent = "Detected PS4 " + ps4Match[1] + " — Loading...";
      btn.href = target;
      // تأخير التحويل 1.5 ثانية لضمان استقرار المتصفح
      setTimeout(function () {
        window.location.href = target;
      }, 1500);
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
