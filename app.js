// MODX Firmware Hub — automatic device-language detection with a manual override.
const translations = {
  en: {
    brandSub:"PLAYSTATION HOST", eyebrow:"PS4 EXPLOIT ENVIRONMENT",
    heading:"Choose<br><span>firmware.</span>",
    intro:"One hub. Seven host routes.<br>Select the route that matches your PS4 system software.",
    artLabel:"MODX / HOST SYSTEM", directory:"FIRMWARE DIRECTORY",
    systemVersion:"SELECT YOUR SYSTEM VERSION <i>↓</i>",
    hostLibrary:'HOST LIBRARY <small>— SELECT A HOST</small>',
    configured:"CONFIGURED", preparation:"IN PREPARATION",
    configuredStatus:"● CONFIGURED", goldhenOffline:"GoldHEN offline host",
    currentBuild:"Current build", goldhenHost:"GoldHEN host",
    buildProgress:"HOST BUILD IN PROGRESS", selectFirmware:"SELECT FIRMWARE",
    dedicatedHost:"Dedicated host", utilityPayloads:"Utility payloads",
    openHost:"OPEN HOST",
    sectionNote:"Only configured routes are clickable. Firmware compatibility and offline-cache behavior still require testing on the matching PS4 system software.",
    helpTitle:"Not sure which firmware you have?",
    helpText:"On your PS4, go to Settings → System → System Information.",
    footerProject:"INDEPENDENT PS4 HOST PROJECT",
    footerCommunity:"BUILT FOR THE COMMUNITY"
  },
  ar: {
    brandSub:"هوست بلايستيشن", eyebrow:"بيئة استغلال PS4",
    heading:"اختر<br><span>إصدار النظام.</span>",
    intro:"منصة واحدة، وسبعة مسارات للهوست.<br>اختر المسار المطابق لإصدار نظام جهاز PS4.",
    artLabel:"MODX / نظام الهوست", directory:"قائمة إصدارات النظام",
    systemVersion:"اختر إصدار نظام جهازك <i>↓</i>",
    hostLibrary:'مكتبة الهوست <small>— اختر الهوست</small>',
    configured:"جاهز", preparation:"قيد التجهيز",
    configuredStatus:"● جاهز", goldhenOffline:"هوست GoldHEN أوفلاين",
    currentBuild:"الإصدار الحالي", goldhenHost:"هوست GoldHEN",
    buildProgress:"الهوست قيد التجهيز", selectFirmware:"اختر إصدار النظام",
    dedicatedHost:"هوست مخصص", utilityPayloads:"ملفات وأدوات إضافية",
    openHost:"افتح الهوست",
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
