// MODX shared live clock — always uses Egypt local time and DST rules.
(function(){
  const clock=document.querySelector(".modx-clock time");
  const date=document.querySelector(".modx-clock span");
  if(!clock||!date)return;
  const timeFormat=new Intl.DateTimeFormat("en-GB",{timeZone:"Africa/Cairo",hour:"2-digit",minute:"2-digit",second:"2-digit",hourCycle:"h23"});
  const dateFormat=new Intl.DateTimeFormat("en-GB",{timeZone:"Africa/Cairo",day:"2-digit",month:"short",year:"numeric"});
  function update(){
    const now=new Date();
    clock.textContent=timeFormat.format(now);
    clock.dateTime=now.toISOString();
    date.textContent=dateFormat.format(now).replace(/,/g,"").toUpperCase();
  }
  update();
  window.setInterval(update,1000);
})();
