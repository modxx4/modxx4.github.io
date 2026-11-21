// MODX Firmware Hub — firmware cards link directly to their host pages.
document.querySelectorAll('.firmware-card.ready').forEach(card => {
  card.addEventListener('click', () => {
    const version = card.querySelector('strong')?.textContent?.trim() || 'unknown';
    console.info('MODX: opening firmware host', version);
  });
});
