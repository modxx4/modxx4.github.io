const select = document.getElementById('firmwareSelect');
const notice = document.getElementById('notice');

const firmwareInfo = {
  '5.05': {
    entry: 'WebKit browser exploit',
    kernel: 'Public kernel exploit (5.05 chain)',
    notes: 'Gold-standard firmware; known for strong stability. Stay on this version.'
  },
  '6.72': {
    entry: 'WebKit browser exploit',
    kernel: '6.72 kernel exploit',
    notes: 'Mature, well-optimized jailbreak route. Stay on this version.'
  },
  '7.02': {
    entry: 'psFree / WebKit or Vue After Free',
    kernel: 'Lapse; IPV6 Double Free',
    notes: 'WebKit is the recommended route. PPPwn is not recommended for this firmware range.'
  },
  '7.55': {
    entry: 'psFree / WebKit or Vue After Free',
    kernel: 'Lapse; IPV6 Double Free',
    notes: 'WebKit is the recommended route. PPPwn is not recommended for this firmware range.'
  },
  '9.00': {
    entry: 'psFree / WebKit; pOOBs4; Vue After Free; BD-JB',
    kernel: 'Lapse; Netctrl/Poopsploit',
    notes: 'pOOBs4 requires a specially prepared USB drive for its initial method. WebKit is another common route.'
  },
  '9.60': {
    entry: 'psFree / WebKit; Vue After Free; BD-JB',
    kernel: 'Lapse; Netctrl/Poopsploit',
    notes: 'WebKit, Vue After Free, and BD-JB are documented alternatives. pOOBs4 USB method is for 9.00.'
  },
  '10.01': {
    entry: 'CSSFontFace / Slopkit WebKit; Vue After Free; BD-JB',
    kernel: 'Lapse; PPPwn; Netctrl/Poopsploit',
    notes: 'WebKit or Vue After Free are recommended options. PPPwn needs a computer and Ethernet connection.'
  },
  '10.71': {
    entry: 'CSSFontFace / Slopkit WebKit; Vue After Free; BD-JB',
    kernel: 'Lapse; PPPwn; Netctrl/Poopsploit',
    notes: 'WebKit or Vue After Free are recommended options. PPPwn needs a computer and Ethernet connection.'
  },
  '11.00': {
    entry: 'Slopkit / CSSFontFace WebKit; Vue After Free; BD-JB',
    kernel: 'Lapse; PPPwn; Netctrl/Poopsploit',
    notes: 'Last firmware in the PPPwn-supported range. WebKit or Vue After Free are generally preferred.'
  },
  '11.02': {
    entry: 'Slopkit / CSSFontFace WebKit; Vue After Free; BD-JB',
    kernel: 'Lapse; Netctrl/Poopsploit',
    notes: 'PPPwn is patched on 11.02. Use a firmware-specific WebKit or alternative route.'
  },
  '11.52': {
    entry: 'Slopkit WebKit; Vue After Free; BD-JB',
    kernel: 'Lapse; Netctrl/Poopsploit',
    notes: 'WebKit, Vue After Free, and BD-JB are documented options.'
  },
  '12.02': {
    entry: 'Slopkit WebKit; Vue After Free; BD-JB',
    kernel: 'Lapse; Netctrl/Poopsploit',
    notes: 'Stay on this firmware; newer 12.5x kernel routes are described as less consistent.'
  },
  '12.50': {
    entry: 'Slopkit WebKit; Vue After Free; BD-JB',
    kernel: 'Netctrl/Poopsploit; Relapse',
    notes: 'Lapse is patched from 12.50. BD-JB on 13.00+ needs additional preparation.'
  },
  '13.00': {
    entry: 'Slopkit WebKit',
    kernel: 'Relapse',
    notes: 'BD-JB requires a preparatory file step after gaining access. Vue After Free is not listed as a confirmed route here.'
  },
  '13.52': {
    entry: 'Slopkit WebKit',
    kernel: 'Relapse (documented firmware range)',
    notes: 'Use the firmware-specific WebKit route. Do not assume methods from earlier versions apply.'
  },
  '14.02': {
    entry: 'Slopkit WebKit',
    kernel: 'Afterglow',
    notes: 'WebKit is the documented entry point for this firmware.'
  }
};

function renderFirmwareInfo() {
  const version = select.value;
  const info = firmwareInfo[version];
  document.getElementById('firmwareTitle').textContent = `Firmware ${version}`;
  document.getElementById('firmwareSummary').textContent = 'Known public compatibility information for this firmware.';
  document.getElementById('entryPoint').textContent = info.entry;
  document.getElementById('kernelExploit').textContent = info.kernel;
  document.getElementById('requirements').textContent = info.notes;
  document.getElementById('goldhenStatus').textContent = 'Listed as supported by the linked community host. GoldHEN v2.4b18.14 is a beta; confirm the selected firmware on the host before launching.';
  notice.textContent = `Compatibility information loaded for firmware ${version}. No exploit has been launched.`;
}

select.addEventListener('change', renderFirmwareInfo);
document.getElementById('initialize').addEventListener('click', () => {
  renderFirmwareInfo();
  document.getElementById('status-panel').scrollIntoView({ behavior: 'smooth', block: 'start' });
});

document.querySelector('.menu-toggle').addEventListener('click', () => {
  document.querySelector('nav').classList.toggle('open');
});
document.querySelectorAll('nav a').forEach(link => link.addEventListener('click', () => {
  document.querySelector('nav').classList.remove('open');
}));

renderFirmwareInfo();


const cacheButton = document.getElementById('installCache');
const cacheStatus = document.getElementById('cacheStatus');

if ('serviceWorker' in navigator && window.isSecureContext) {
  navigator.serviceWorker.register('./service-worker.js')
    .then(() => navigator.serviceWorker.ready)
    .then(() => {
      if (cacheStatus) cacheStatus.textContent = 'Ready to save for offline use';
    })
    .catch(() => {
      if (cacheStatus) cacheStatus.textContent = 'Offline cache unavailable in this browser';
    });
} else if (cacheStatus) {
  cacheStatus.textContent = 'Offline cache not supported by this browser';
}

if (cacheButton) {
  cacheButton.addEventListener('click', async () => {
    if (!('serviceWorker' in navigator) || !('caches' in window) || !window.isSecureContext) {
      if (cacheStatus) cacheStatus.textContent = 'This browser does not support offline caching';
      return;
    }
    cacheButton.disabled = true;
    if (cacheStatus) cacheStatus.textContent = 'Installing cache…';
    try {
      await navigator.serviceWorker.register('./service-worker.js');
      const registration = await navigator.serviceWorker.ready;
      const worker = registration.active || navigator.serviceWorker.controller;
      if (!worker) throw new Error('Service worker is not active yet. Reload and try again.');
      const result = await new Promise((resolve, reject) => {
        const channel = new MessageChannel();
        const timeout = setTimeout(() => reject(new Error('Cache operation timed out')), 30000);
        channel.port1.onmessage = event => {
          clearTimeout(timeout);
          resolve(event.data);
        };
        worker.postMessage({ type: 'NEXUS_PRECACHE' }, [channel.port2]);
      });
      if (!result.ok) throw new Error(result.message || 'Cache failed');
      if (cacheStatus) cacheStatus.textContent = 'Cache installed • ' + result.count + ' files saved';
      notice.textContent = 'NEXUS offline cache installed. Open the host once while online before using it offline.';
    } catch (error) {
      if (cacheStatus) cacheStatus.textContent = 'Cache failed: ' + error.message;
    } finally {
      cacheButton.disabled = false;
    }
  });
}
