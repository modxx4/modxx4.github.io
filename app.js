// MODX Firmware Hub — Cairo clock and lightweight host navigation.
(function(){
  const clock=document.getElementById("hostClock");
  const date=document.getElementById("hostDate");
  if(clock && date){
    const timeOptions={timeZone:"Africa/Cairo",hour:"2-digit",minute:"2-digit",second:"2-digit",hourCycle:"h23"};
    const dateOptions={timeZone:"Africa/Cairo",day:"2-digit",month:"short",year:"numeric"};
    let timeFormatter,dateFormatter;
    try{
      timeFormatter=new Intl.DateTimeFormat("en-GB",timeOptions);
      dateFormatter=new Intl.DateTimeFormat("en-GB",dateOptions);
    }catch(error){
      timeFormatter=new Intl.DateTimeFormat("en-GB",{hour:"2-digit",minute:"2-digit",second:"2-digit",hourCycle:"h23"});
      dateFormatter=new Intl.DateTimeFormat("en-GB",{day:"2-digit",month:"short",year:"numeric"});
    }
    const updateClock=()=>{
      const now=new Date();
      clock.textContent=timeFormatter.format(now);
      date.textContent=dateFormatter.format(now).replace(/,/g,"").toUpperCase();
      clock.dateTime=now.toISOString();
    };
    updateClock();
    window.setInterval(updateClock,1000);
  }
})();
document.querySelectorAll(".firmware-card.ready").forEach(card => {
  card.addEventListener("click", () => {
    const version = card.querySelector("strong")?.textContent?.trim() || "unknown";
    console.info("MODX: opening firmware host", version);
  });
});
