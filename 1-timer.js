import"./assets/modulepreload-polyfill-B5Qt9EMX.js";/* empty css                      */import{f as T,i as r}from"./assets/vendor-BZoxUzx5.js";const l=document.querySelector("#datetime-picker"),o=document.querySelector("button[data-start]"),i=document.querySelector(".days"),m=document.querySelector(".hours"),f=document.querySelector(".minutes"),h=document.querySelector(".seconds");(!i||!m||!f||!h)&&console.error("Помилка: не знайдено елементів для таймера!");let c=null,a=null;o.disabled=!0;const C={enableTime:!0,time_24hr:!0,defaultDate:new Date,minuteIncrement:1,onClose(e){const t=e[0];console.log("Selected date:",t),t<=new Date?(o.disabled=!0,c=null,r.error({title:"Error",message:"Please choose a date in the future"})):(o.disabled=!1,c=t,r.success({title:"Success",message:"Valid date selected!"}))}};T(l,C);o.addEventListener("click",()=>{o.disabled=!0,l.disabled=!0,console.log("Timer started!"),a=setInterval(()=>{const t=Math.max(c-new Date,0);if(console.log("Time left:",t),t<=0){clearInterval(a),r.success({title:"Finished",message:"Countdown complete!"}),q();return}y(s(t))},1e3)});function y({days:e,hours:t,minutes:u,seconds:d}){i.textContent=n(e),m.textContent=n(t),f.textContent=n(u),h.textContent=n(d)}function n(e){return String(e).padStart(2,"0")}function s(e){const S=Math.floor(e/864e5),p=Math.floor(e%864e5/36e5),g=Math.floor(e%864e5%36e5/6e4),b=Math.floor(e%864e5%36e5%6e4/1e3);return{days:S,hours:p,minutes:g,seconds:b}}console.log(s(2e3));console.log(s(14e4));console.log(s(2414e4));function q(){clearInterval(a),l.disabled=!1,o.disabled=!0,y({days:0,hours:0,minutes:0,seconds:0})}
//# sourceMappingURL=1-timer.js.map
