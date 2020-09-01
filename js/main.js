"use strict";

// create tabs

window.addEventListener('DOMContentLoaded', () => {


    const tabs = document.querySelectorAll('.tabheader__item'),
        tabsContent = document.querySelectorAll('.tabcontent'),
        tabsParent = document.querySelector('.tabheader__items');



    // create a function that initially hides all tabs and removes the activity class 
    function hideTabContent() {
        tabsContent.forEach(item => {
            item.style.display = 'none';
        });

        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        });
    }


    // create a function that shows tabs  
    function showTabContent(i = 0) {
        tabsContent[i].style.display = 'block';
        tabs[i].classList.add('tabheader__item_active');
    }


    hideTabContent();
    showTabContent();


   
// using deligation and creating an event handler on click 

    tabsParent.addEventListener('click', (event) => {
   
        const target = event.target;

        if (target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });


  // create the countdown timer 

  const deadline = '2020-10-11';

    
  // we implement the function that determines the difference between the deadline and the current time 
      function getTimeRemaining(endtime) {
          // используем метод тчоыб получить количество милисекунд из строчки и получим разницу от заданной даты минус текущая
          const t = Date.parse(endtime) - Date.parse(new Date()),
              // создаем перменную и переводим разнциу сверху в дни часы минуты и так далее 
              // метод огругляющий до целого 
              days = Math.floor(t / (1000 * 60 * 60 * 24)),
              hours = Math.floor((t / (1000 * 60 * 60) % 24)),
              minutes = Math.floor((t / 1000 / 60) % 60),
              seconds = Math.floor((t / 1000) % 60);
  
          // так как все перменные находятся внутри функции, мы не сможем ими еще воспользоваться вне функции, потэму возвращаем перменную наружу испольузем оператор ретерн и возвращаем объект 
          return {
              'total': t,
              'days': days,
              'hours': hours,
              'minutes': minutes,
              'seconds': seconds
          };
      }
  
      // создаем функцию помошник, которая будет првоерять однозначное ли число, если да то будет подставлят ьвпереди нолик 
      function getZero(num) {
          if (num >= 0 && num < 10) {
              return `0${num}`;
          } else {
              return num;
          }
      }
      // создаем функцию котоаря устанавливает таймер на страницу 
  
      function setClock(selector, endtime) {
          const timer = document.querySelector(selector),
              days = timer.querySelector('#days'),
              hours = timer.querySelector('#hours'),
              minutes = timer.querySelector('#minutes'),
              seconds = timer.querySelector('#seconds'),
  
              // создаем интервал обновления счетчика каждую секунду 
              timeInterval = setInterval(updateClock, 1000);
          // запускаем тут функция дял того тчобы при обновлении страницы не происходило мигание и запускаля таймер сразу 
          updateClock();
  
          // создаем функцию, котоаря будет обновлять таймер каждую секунду 
          function updateClock() {
              // 1 расчет того времени, который остался на ту секунду 
              const t = getTimeRemaining(endtime);
  
              // 2 помещаем расчетные единицы на страницу 
              days.innerHTML = getZero(t.days);
              hours.innerHTML = getZero(t.hours);
              minutes.innerHTML = getZero(t.minutes);
              seconds.innerHTML = getZero(t.seconds);
  
              // создаем условие, если запланированнео время вышло то интервал будет отсанавливаться 
              if (t.total <= 0) {
                  clearInterval(timeInterval);
              }
          }
      }
  
      setClock('.timer', deadline);
  
  
  
     

});