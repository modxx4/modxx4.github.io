// MODX Firmware Hub — automatic device-language detection with a manual override.
const translations = {
  en: {
    brandSub:"PLAYSTATION HOST", launchCommand:"$ ./launch --select-host", routesDetected:"6 host routes detected",
    heading:"Choose<br><span>firmware.</span>",
    intro:"Pick the host matching the firmware installed on your PlayStation 4.",
    artLabel:"MODX / HOST SYSTEM", directory:"FIRMWARE DIRECTORY",
    systemVersion:"↑ ↓ MOVE &nbsp; X SELECT",
    hostLibrary:"AVAILABLE ROUTES",
    configured:"CONFIGURED", preparation:"IN PREPARATION",
    configuredStatus:"● CONFIGURED", goldhenOffline:"offline host",
    currentBuild:"Current build", goldhenHost:"GoldHEN host",
    buildProgress:"HOST BUILD IN PROGRESS", selectFirmware:"SELECT FIRMWARE",
    dedicatedHost:"Dedicated host", utilityPayloads:"Utility payloads",
    openHost:"OPEN HOST", premiumServers:"Premium game servers", openExternal:"OPEN ↗",
    sectionNote:"Only configured routes are clickable. Firmware compatibility and offline-cache behavior still require testing on the matching PS4 system software.",
    helpTitle:"Not sure which firmware you have?",
    helpText:"On your PS4, go to Settings → System → System Information.",
    footerProject:"INDEPENDENT PS4 HOST PROJECT",
    footerCommunity:"BUILT FOR THE COMMUNITY"
  },
  ar: {
    brandSub:"هوست بلايستيشن", launchCommand:"$ ./launch --select-host", routesDetected:"تم العثور على 6 مسارات للهوست",
    heading:"اختر<br><span>إصدار النظام.</span>",
    intro:"اختر الهوست المطابق لإصدار النظام المثبّت على جهاز PlayStation 4.",
    artLabel:"MODX / نظام الهوست", directory:"قائمة إصدارات النظام",
    systemVersion:"↑ ↓ تحرّك &nbsp; X اختيار",
    hostLibrary:"المسارات المتاحة",
    configured:"جاهز", preparation:"قيد التجهيز",
    configuredStatus:"● جاهز", goldhenOffline:"هوست أوفلاين",
    currentBuild:"الإصدار الحالي", goldhenHost:"هوست GoldHEN",
    buildProgress:"الهوست قيد التجهيز", selectFirmware:"اختر إصدار النظام",
    dedicatedHost:"هوست مخصص", utilityPayloads:"ملفات وأدوات إضافية",
    openHost:"افتح الهوست", premiumServers:"سيرفرات ألعاب مميزة", openExternal:"افتح ↗",
    sectionNote:"المسارات الجاهزة فقط يمكن فتحها. توافق إصدار النظام وعمل الكاش أوفلاين يحتاجان إلى اختبار على جهاز PS4 بنفس الإصدار.",
    helpTitle:"مش عارف إصدار النظام عندك؟",
    helpText:"من جهاز PS4 افتح Settings ← System ← System Information.",
    footerProject:"مشروع هوست PS4 مستقل",
    footerCommunity:"صُنع لخدمة مجتمع بلايستيشن"
  }
};

const savedLanguage = localStorage.getItem("modx-language");
const deviceLanguage = (navigator.language || "").toLowerCase().startsWith("ar") ? "ar" : "en";
let currentLanguage = savedLanguage === "ar" || savedLanguage === "en" ? savedLanguage : deviceLanguage;

function applyLanguage(language) {
  currentLanguage = language;
  const dictionary = translations[language];
  document.documentElement.lang = language;
  document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
  document.querySelectorAll("[data-i18n]").forEach(element => {
    const value = dictionary[element.dataset.i18n];
    if (value !== undefined) element.innerHTML = value;
  });
  const toggle = document.getElementById("languageToggle");
  if (toggle) {
    toggle.textContent = language === "ar" ? "English" : "عربي";
    toggle.setAttribute("aria-label", language === "ar" ? "Switch to English" : "التبديل إلى العربية");
    toggle.setAttribute("title", language === "ar" ? "Switch to English" : "التبديل إلى العربية");
  }
}

applyLanguage(currentLanguage);
document.getElementById("languageToggle")?.addEventListener("click", () => {
  const nextLanguage = currentLanguage === "ar" ? "en" : "ar";
  localStorage.setItem("modx-language", nextLanguage);
  applyLanguage(nextLanguage);
});

document.querySelectorAll(".firmware-card.ready").forEach(card => {
  card.addEventListener("click", () => {
    const version = card.querySelector("strong")?.textContent?.trim() || "unknown";
    console.info("MODX: opening firmware host", version);
  });
});
