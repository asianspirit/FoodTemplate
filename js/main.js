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


    // модальное окно 

    const modalTrigger = document.querySelectorAll('[data-modal]'),
        modal = document.querySelector('.modal'),
        modalCloseBtn = document.querySelector('[data-close]');

    function openModal() {
        modal.classList.add('show');
        modal.classList.remove('hide');
        document.body.style.overflow = 'hidden';
        // если модальнео окно открыто вручную, то сетинетрвал не будет срабатывать 
        clearInterval(modalTimerId);
    }


    function closeModal() {
        modal.classList.add('hide');
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }


    modalTrigger.forEach(btn => {
        btn.addEventListener('click', openModal);

    });


    modalCloseBtn.addEventListener('click', closeModal);

    // руализуем функционал при клике на подложку закрывается модальнео окно 

    modal.addEventListener('click', (event) => {
        if (event.target === modal) {
            closeModal();
        }
    });

    // создаем обработчик событий при клике на клавишу эскейпт будет закрыватсья модальне окно 
    document.addEventListener('keydown', (event) => {
        if (event.code === "Escape" && modal.classList.contains('show')) {
            closeModal();
        }
    });

    // создем функционал, при котором с течением времени будет появлятсья модальнео окно 

    // const modalTimerId = setTimeout(openModal, 5000);

    // реаизуем функциона, если пользователь долистал доконца странице, появистя модальнео окно 

    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal();
            window.removeEventListener('scroll', showModalByScroll);
        }
    }


    window.addEventListener('scroll', showModalByScroll);


    //  используем классы для карточек товаров 

    class MenuCard {
        constructor(src, alt, title, descr, price, parentSelector) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.parent = document.querySelector(parentSelector);
            this.transfer = 27;
            this.changeToUAH();
        }

        changeToUAH() {
            this.price = this.price * this.transfer;
        }

        // типичное название для метода который формирует верстку 
        render() {
            const element = document.createElement('div');
            //    метод позволяющий динамически создавать хтмл структуру 
            element.innerHTML = `
           <div class="menu__item">
           <img src=${this.src} alt=${this.alt}
           <h3 class="menu__item-subtitle">${this.title}</h3>
           <div class="menu__item-descr">${this.descr}</div>
           <div class="menu__item-divider"></div>
           <div class="menu__item-price">
               <div class="menu__item-cost">Цена:</div>
               <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
           </div>
       </div>
       `;
        this.parent.append(element);
        }
    }

    // старый вариант
    // const div = new MenuCard();
    // div.render();
    
    // используем объект на месте
    // когда нужно использовать толкьо 1н раз 
    new MenuCard(
        "img/tabs/vegy.jpg",
        "vegy",
        'Меню "Фитнес"',
        'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
        9,
        '.menu .container'
    ).render();
    
    new MenuCard(
        "img/tabs/elite.jpg",
        "elite",
        'Меню “Премиум”',
        'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
        15,
        '.menu .container'
    ).render();

    new MenuCard(
        "img/tabs/post.jpg",
        "post",
        'Меню "Постное"',
        'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
        25,
        '.menu .container'
    ).render();
});