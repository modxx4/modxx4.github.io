// NEXUS Firmware Hub — direct firmware routing.
document.querySelectorAll('.firmware-card.ready').forEach(card => {
  card.addEventListener('click', () => {
    const version = card.querySelector('.firmware-number')?.textContent?.trim() || 'unknown';
    console.info('NEXUS: opening firmware host', version);
  });
});
