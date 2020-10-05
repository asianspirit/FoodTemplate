"use strict";



window.addEventListener('DOMContentLoaded', () => {
    // create tabs

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
        modal = document.querySelector('.modal');
    // modalCloseBtn = document.querySelector('[data-close]');

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


    // modalCloseBtn.addEventListener('click', closeModal);

    // руализуем функционал при клике на подложку закрывается модальнео окно 

    modal.addEventListener('click', (event) => {
        if (event.target === modal || event.target.getAttribute('data-close') == '') {
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

    const modalTimerId = setTimeout(openModal, 50000);

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
        constructor(src, alt, title, descr, price, parentSelector, ...classes) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.classes = classes;
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
            // используем оператор рест(который объединетя в массив) добавляем каждый класс который будет находистя в массвие 
            if (this.classes.length === 0) {
                this.element = 'menu__item';
                element.classList.add(this.element);
            } else {
                this.classes.forEach(className => element.classList.add(className));
            }
            //    метод позволяющий динамически создавать хтмл структуру 
            element.innerHTML = `
           <img src=${this.src} alt=${this.alt}
           <h3 class="menu__item-subtitle">${this.title}</h3>
           <div class="menu__item-descr">${this.descr}</div>
           <div class="menu__item-divider"></div>
           <div class="menu__item-price">
               <div class="menu__item-cost">Цена:</div>
               <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
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

    // запрос для поулчения данных из бд с карточками твоаров 
    const getResource = async (url) => {
        const result = await fetch(url);
        // т.к fetch не видит ошибки 404, которая возникает при неправиьном адресе к бд, необходимо вручную создать лсовие на рповерку 
        // 2 свойства .ok 
        // 2 свойство .status 
        if (!result.ok) {
            // объект ошибки 
            throw new Error(`Could nit fetch ${url}, status: ${result.status}`);
        }

        return await result.json();
    };


    getResource('http://localhost:3000/menu')
        .then(data => {
            // используем деструктуризацию объекта(вытаскиваем отдельнео свойства в качесвте отдельного объекта) 
            data.forEach(({ img, altimg, title, descr, price }) => {
                //  этот конструктор будет создавать столкьо раз, сколкьо объектов внутри массива, котоыйр рпидет с сервера
                new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
            });
        });

    // 2 вариант, в котором не будет создавать новый обект, а сразу формироваться вертска с нвоыми картчоками 
    // getResource('http://localhost:3000/menu')
    // .then(data => createCard(data));


    // function createCard(data) {
    //     data.forEach(({img, altimg, title, descr, price}) => {
    //         const element = document.createElement('div');

    //         element.classList.add('menu__item');

    //         element.innerHTML = `
    //         <img src=${img} alt=${altimg}
    //         <h3 class="menu__item-subtitle">${title}</h3>
    //         <div class="menu__item-descr">${descr}</div>
    //         <div class="menu__item-divider"></div>
    //         <div class="menu__item-price">
    //             <div class="menu__item-cost">Цена:</div>
    //             <div class="menu__item-total"><span>${price}</span> грн/день</div>
    //         </div>
    //         `;

    //         document.querySelector('.menu .container').append(element);
    //     });
    // }



    // created forms 

    // const forms = document.querySelectorAll('form');

    // const message = {
    //     loading: 'img/form/spinner.svg',
    //     success: 'Спасибо! Скоро с вами свяжемся',
    //     failure: 'Что-то пошло не так...'
    // };

    // forms.forEach(item => {
    //     postDate(item);
    // });

    // function postDate(form) {
    //     form.addEventListener('submit', (event) => {
    //         event.preventDefault();

    //         const statusMessage = document.createElement('div');
    //         statusMessage.src = message.loading;
    //         //    statusMessage.textContent = message.loading;
    //         statusMessage.style.cssText = `
    //             display: block;
    //             margin: 0 auto;
    //            `;
    //         // form.append(statusMessage);
    //         form.insertAdjacentElement('afterend', statusMessage);

    //         const request = new XMLHttpRequest();
    //         request.open('POST', 'server.php');

    //         //    объект, который позволяет с определеннй оформы быстр осформирвоать все данные( формат ключ = значение)

    //         // когда используем связку  XMLHttpRequest   и   FormData заголовок 'multipart/form-date' устанавливать не нужно 
    //         // request.setRequestHeader('Content-type', 'multipart/form-date');


    //         // для отправки данных в формате json 
    //         request.setRequestHeader('Content-type', 'application/json');
    //         const formData = new FormData(form);

    //         // функционал для переноса формдаты в формат джейсон 
    //         const object = {};
    //         formData.forEach(function (value, key) {
    //             object[key] = value; // так мы получаем обычный объект, а не формдату можем использоват ьконвертацию в json
    //         });

    //         const json = JSON.stringify(object);

    //         // request.send(formData);
    //         request.send(json);

    //         request.addEventListener('load', () => {
    //             if (request.status === 200) {
    //                 showThanksModal(message.success);
    //                 // statusMessage.textContent = message.success;
    //                 form.reset();
    //                 // setTimeout(() => {
    //                 //    statusMessage.remove();
    //                 // }, 2000);
    //                 statusMessage.remove();
    //             } else {
    //                 // statusMessage.textContent = message.failure;
    //                 showThanksModal(message.failure);
    //             }

    //         });
    //     });
    // }

    // // created custom alert 
    // function showThanksModal(message) {
    //     const prevModalDialog = document.querySelector('.modal__dialog');

    //     prevModalDialog.classList.add('hide');
    //     openModal();

    //     const thanksModal = document.createElement('div');
    //     thanksModal.classList.add('modal__dialog');
    //     thanksModal.innerHTML = `
    //         <div class="modal__content">
    //             <div class="modal__close" data-close>×</div>
    //             <div class="modal__title">${message}</div>
    //         </div>
    //     `;
    //     document.querySelector('.modal').append(thanksModal);
    //     setTimeout(() => {
    //         thanksModal.remove();
    //         prevModalDialog.classList.add('show');
    //         prevModalDialog.classList.remove('hide');
    //         closeModal();
    //     }, 4000);
    // }

    // пример 
    // fetch('https://jsonplaceholder.typicode.com/posts', {
    //     method: 'POST',
    //     body: JSON.stringify({NAME: 'Alex'}),
    //     headers: {
    //         'Content-type': 'application/json'
    //     }
    // })
    //     .then(response => response.json())
    //     .then(json => console.log(json));


    // переписываем функционал на fetch API 

    const forms = document.querySelectorAll('form');

    const message = {
        loading: 'img/form/spinner.svg',
        success: 'Спасибо! Скоро с вами свяжемся',
        failure: 'Что-то пошло не так...'
    };

    forms.forEach(item => {
        bindPostDate(item);
    });

    const postDate = async (url, data) => {
        const result = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: data
        });


        return await result.json();
    };

    function bindPostDate(form) {
        form.addEventListener('submit', (event) => {
            event.preventDefault();

            const statusMessage = document.createElement('div');
            statusMessage.src = message.loading;
            //    statusMessage.textContent = message.loading;
            statusMessage.style.cssText = `
            display: block;
            margin: 0 auto;
           `;
            // form.append(statusMessage);
            form.insertAdjacentElement('afterend', statusMessage);



            const formData = new FormData(form);

            // функционал для переноса формдаты в формат джейсон 
            // const object = {};
            // formData.forEach(function (value, key) {
            //     object[key] = value; // так мы получаем обычный объект, а не формдату можем использоват ьконвертацию в json
            // });

            // новый метод для преобразования в формат json 
            // испольузем метод entries, который позволяет превратить свойства объекта в мини масивы(а сам объект в матрицу с этими масивами) 
            // обратный метод fromEntries 
            const json = JSON.stringify(Object.fromEntries(formData.entries()));




            postDate('http://localhost:3000/requests', json)
                .then(data => {
                    console.log(data);
                    showThanksModal(message.success);
                    statusMessage.remove();
                }).catch(() => {
                    showThanksModal(message.failure);
                }).finally(() => {
                    form.reset();
                });

        });
    }

    // created custom alert 
    function showThanksModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog');

        prevModalDialog.classList.add('hide');
        openModal();

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
        <div class="modal__content">
            <div class="modal__close" data-close>×</div>
            <div class="modal__title">${message}</div>
        </div>
    `;
        document.querySelector('.modal').append(thanksModal);
        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            closeModal();
        }, 4000);
    }

    fetch('db.json')
        .then(data => data.json())
        .then(res => console.log(res));


    //  slider 
    // const slider = document.querySelectorAll('.offer__slide'),
    //     prev = document.querySelector('.offer__slider-prev'),
    //     next = document.querySelector('.offer__slider-next'),
    //     total = document.querySelector('#total'),
    //     current = document.querySelector('#current');
    // // индекс, котоырй определяет какой сейчас слайде 
    // let slideIndex= 1;  

    // // вызываем функцию с текущим индксом слайда 
    // showSlides(slideIndex);

    // if (slider.length < 10) {
    //     total.textContent = `0${slider.length}`;
    // } else {
    //     total.textContent = `${slider.length}`;
    // }

    // // по показу и скрытию слайдов (n-слайд индекс который к нам приходит)
    // function showSlides(n) {
    //     // првоеряем граничные значения 
    //     if (n > slider.length) {
    //         slideIndex= 1;
    //     }

    //     if (n < 1) {
    //         slideIndex = slider.length;
    //     }

    //     slider.forEach(item => item.style.display = 'none');

    //     slider[slideIndex - 1].style.display = 'block';

    //     if (slider.length < 10) {
    //         current.textContent = `0${slideIndex}`;
    //     } else {
    //         current.textContent = slideIndex;
    //     }
    // }

    // // функция кооаря вызывает функцию showSlides 
    // function plusSlides(n) {
    //     showSlides(slideIndex += n);
    // }

    // // назанчаем обработчик событйи на кнопки 

    // prev.addEventListener('click', () => {
    //     plusSlides(-1);
    // });

    // next.addEventListener('click', () => {
    //     plusSlides(1);
    // });



    // slider carusel  
    const slides = document.querySelectorAll('.offer__slide'),
        slider = document.querySelector('.offer__slider'),
        prev = document.querySelector('.offer__slider-prev'),
        next = document.querySelector('.offer__slider-next'),
        total = document.querySelector('#total'),
        current = document.querySelector('#current'),
        slidesWrapper = document.querySelector('.offer__slider-wrapper'),
        width = window.getComputedStyle(slidesWrapper).width,
        slidesField = document.querySelector('.offer__slider-inner');

    // индекс, котоырй определяет какой сейчас слайде 
    let slideIndex = 1;
    // создаем отступ, чтобы понять на сколько мы отступили после использвоания transform 
    let offset = 0;

    if (slides.length < 10) {
        total.textContent = `0${slides.length}`;
        current.textContent = `0${slideIndex}`;
    } else {
        total.textContent = `${slides.length}`;
        current.textContent = { slideIndex };
    }

    slidesField.style.width = 100 * slides.length + '%';
    slidesField.style.display = 'flex';
    slidesField.style.transition = '0.5s all';

    slidesWrapper.style.overflow = 'hidden';

    // устанавиаем каждмоу слайду нужную нам ширину, чтобы они были одинаковые 
    slides.forEach(slide => {
        slide.style.width = width;
    });

    // функция для модификации строчек

    function deleteNotDigits(str) {
        return +str.replace(/\D/g, '');
    }


    // обработчик событий для передвижения слайдов 

    next.addEventListener('click', () => {
        // превращаем строку к примеру '500px' в 500 используя +width.slice(0, width.length - 2)
        if (offset == deleteNotDigits(width) * (slides.length - 1)) {
            offset = 0;
        } else {
            offset += deleteNotDigits(width);
        }

        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == slides.length) {
            slideIndex = 1;
        } else {
            slideIndex++;
        }

        if (slides.length < 10) {
            current.textContent = `0${slideIndex}`;
        } else {
            current.textContent = slideIndex;
        }

        dots.forEach(dot => dot.style.opacity = '0.5');
        dots[slideIndex - 1].style.opacity = 1;
    });

    prev.addEventListener('click', () => {
        // превращаем строку к примеру '500px' в 500 используя +width.slice(0, width.length - 2)
        if (offset == 0) {
            offset = deleteNotDigits(width) * (slides.length - 1);
        } else {
            offset -= deleteNotDigits(width);
        }

        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == 1) {
            slideIndex = slides.length;
        } else {
            slideIndex--;
        }

        if (slides.length < 10) {
            current.textContent = `0${slideIndex}`;
        } else {
            current.textContent = slideIndex;
        }

        dots.forEach(dot => dot.style.opacity = '0.5');
        dots[slideIndex - 1].style.opacity = 1;
    });


    // pagination 

    // 1 получаем весь слайдер со страницы
    // 2 задаем ему position relative 
    // 3 создаем обертку для точек
    // 4 при помощи цикла создаем колчиесвто тчоек равнео количеству слайдов

    slider.style.position = 'relative';

    const indicators = document.createElement('ol'),
        dots = [];

    indicators.classList.add('carousel-indicators');

    indicators.style.cssText = `
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 15;
        display: flex;
        justify-content: center;
        margin-right: 15%;
        margin-left: 15%;
        list-style: none;
    `;

    slider.append(indicators);

    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('li');
        // устанавлвиаем атрибут чтоыб понять какая тчока к какому слайду идет 
        dot.setAttribute('data-slide-to', i + 1);
        dot.style.cssText = `
        box-sizing: content-box;
        flex: 0 1 auto;
        width: 30px;
        height: 6px;
        margin-right: 3px;
        margin-left: 3px;
        cursor: pointer;
        background-color: #fff;
        background-clip: padding-box;
        border-top: 10px solid transparent;
        border-bottom: 10px solid transparent;
        opacity: .5;
        transition: opacity .6s ease;
        `;
        if (i == 0) {
            dot.style.opacity = 1;
        }
        indicators.append(dot);
        dots.push(dot);
    }

    // функционал для точек при клкие 
    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to');

            slideIndex = slideTo;

            offset = deleteNotDigits(width) * (slideTo - 1);

            slidesField.style.transform = `translateX(-${offset}px)`;


            if (slides.length < 10) {
                current.textContent = `0${slideIndex}`;
            } else {
                current.textContent = slideIndex;
            }

            dots.forEach(dot => dot.style.opacity = '0.5');
            dots[slideIndex - 1].style.opacity = 1;

        });
    });

    // calc 

    const result = document.querySelector('.calculating__result span');
  
    let sex , height, weight, age, ratio ;

    if(localStorage.getItem('sex')) {
        sex = localStorage.getItem('sex');
    } else {
        sex = 'female';
        localStorage.setItem('sex', 'female');
    }

    if(localStorage.getItem('ratio')) {
        ratio = localStorage.getItem('ratio');
    } else {
        ratio = '1.375';
        localStorage.setItem('ratio', '1.375');
    }

    function initLocalSettings(selector, activeClass) {
        const elements = document.querySelectorAll(selector);

        elements.forEach(elem => {
            elem.classList.remove(activeClass);
            if(elem.getAttribute('id') === localStorage.getItem('sex')) {
                elem.classList.add(activeClass);
            }
            if(elem.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
                elem.classList.add(activeClass);
            }
        });
    }

    initLocalSettings('#gender div', 'calculating__choose-item_active');
    initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active');
    // функция для расчетов итоговых 

    function calcTotal() {
        // всегда в калькуляторах необходимо провести проверку
        // производить расчет толкьто тогда, когда заполнены все параметры 
        if (!sex || !height || !weight || !age || !ratio) {
            result.textContent = '----';
            return;
        }
        // условия выполнения по заданаму полу 
        if (sex == 'female') {
            result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
        } else {
            result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
        }
    }

    calcTotal();

    // функция для выбора пунктов в калькуляторе 

    function getStaticInformation(selector, activeClass) {
        const elements = document.querySelectorAll(selector);

        elements.forEach(elem => {
            elem.addEventListener('click', (event) => {
                if (event.target.getAttribute('data-ratio')) {
                    ratio = +event.target.getAttribute('data-ratio');
                    localStorage.setItem('ratio', +event.target.getAttribute('data-ratio'));
                } else {
                    sex = event.target.getAttribute('id');
                    localStorage.setItem('sex', event.target.getAttribute('id'));
                }
    
                elements.forEach(elem => {
                    elem.classList.remove(activeClass);
                });
                event.target.classList.add(activeClass);
                calcTotal();
            });
        });
       
    }

    getStaticInformation('#gender div', 'calculating__choose-item_active');
    getStaticInformation('.calculating__choose_big div', 'calculating__choose-item_active');

    // функция которая будет обрабатывать инпуты 

    function getDynamicInformation(selector) {
        const input = document.querySelector(selector);


        input.addEventListener('input', () => {

            if(input.value.match(/\D/g)) {
                input.style.border = '1px solid red';
            } else {
                input.style.border = 'none';
            }

            switch (input.getAttribute('id')) {
                case 'height':
                    height = +input.value;
                    break;
                case 'weight':
                    weight = +input.value;
                    break;
                case 'age':
                    age = +input.value;
                    break;
            }
            calcTotal();
        });
   
    }
    getDynamicInformation('#height');
    getDynamicInformation('#weight');
    getDynamicInformation('#age');
});



