const select = document.getElementById('firmwareSelect');
const notice = document.getElementById('notice');
document.getElementById('initialize').addEventListener('click', () => {
  notice.textContent = `NEXUS interface preview selected for firmware ${select.value}. Exploit modules are not connected in this build.`;
});
document.querySelector('.menu-toggle').addEventListener('click', () => {
  document.querySelector('nav').classList.toggle('open');
});
document.querySelectorAll('nav a').forEach(link => link.addEventListener('click', () => {
  document.querySelector('nav').classList.remove('open');
}));
