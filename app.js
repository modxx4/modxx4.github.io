const firmware = document.getElementById('firmware');
const button = document.getElementById('continue');
const notice = document.getElementById('notice');

firmware.addEventListener('change', () => {
  button.disabled = !firmware.value;
  notice.textContent = firmware.value
    ? `Selected firmware: ${firmware.value}. Host routes are not connected yet.`
    : 'Choose the exact version shown in Settings → System → System Information.';
});

button.addEventListener('click', () => {
  if (!firmware.value) return;
  notice.textContent = `NEXUS HOST: firmware ${firmware.value} selected. The matching, verified host package must be added before launch is enabled.`;
});

// Basic controller / keyboard navigation support.
document.addEventListener('keydown', (event) => {
  if (event.key === 'Enter' && document.activeElement === firmware && firmware.value) {
    button.focus();
  }
});
