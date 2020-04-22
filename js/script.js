window.addEventListener('DOMContentLoaded', function() {
    'use strict';

    //Timer Block
    function countTimer(deadline) { //Время, до которого отсчитывать
        let timerHours = document.querySelector('#timer-hours'),
            timerMinutes = document.querySelector('#timer-minutes'),
            timerSeconds = document.querySelector('#timer-seconds');

        function getZero(num){
            if (num > 0 && num < 10) {
                return '0' + num;
            } else {
                return num;
            }
        }


        function getTimeRemaining() {
            //получаем конечную дату
            let dateStop = new Date(deadline).getTime(),
                //получаем текущую дату;
                dateNow = new Date().getTime(),
                //разница между датами
                timeRemaining = (dateStop - dateNow) / 1000,
                seconds = Math.floor(timeRemaining % 60),
                minutes = Math.floor((timeRemaining / 60) % 60),
                hours = Math.floor(timeRemaining / 60 / 60);
            //возвращаем результат в виде объекта
            return {timeRemaining, hours, minutes, seconds};
        }

        function updateClock() {
            let timer = getTimeRemaining();
            //выводим все полученные значения на страницу
            timerHours.textContent = getZero(timer.hours);
            timerMinutes.textContent = getZero(timer.minutes);
            timerSeconds.textContent = getZero(timer.seconds);

            if (timer.timeRemaining > 0) {
                return timerId;
            } else if (timer.timeRemaining <= 0){
                clearInterval(timerId);
                timerHours.textContent = '00';
                timerMinutes.textContent = '00';
                timerSeconds.textContent = '00';
            }
        }

        let timerId = setInterval(updateClock, 1000);
        updateClock();
    }

    countTimer('30 June 2020'); //передаем дату

    //Toggle Menu
    const toggleMenu = () => {

        const btnMenu = document.querySelector('.menu'),
            menu = document.querySelector('menu');

        /*Handler Menu Function*/
        const handlerMenu = () => {
           menu.classList.toggle('active-menu');
        };

        /*Menu Button*/
        btnMenu.addEventListener('click', handlerMenu);

        /*Close Button and close click menu item*/
        menu.addEventListener('click', (event) => {
            let target = event.target;
            target = target.closest('a[href*="#"]');
            if (target) {
                handlerMenu();
            }
        });

    };

    toggleMenu();

    //Scroll Anchors
    const scrollAnchors = () => {

        const anchors = document.querySelectorAll('ul > li > a[href*="#"]'),
            anchorArrow = document.querySelector('a[href="#service-block"]'),
            serviceBlock = document.querySelector('#service-block');

        /*Anchor Arrow*/
        anchorArrow.addEventListener('click', (event) => {
            event.preventDefault();
            serviceBlock.scrollIntoView({behavior: "smooth"})
        });


        /*Anchors of items*/
        anchors.forEach((item) => item.addEventListener('click', (event) => {
                event.preventDefault();
                const blockScroll = item.getAttribute('href').substr(1);
                document.getElementById(blockScroll).scrollIntoView({behavior: "smooth"})
            })
        );

    };

    scrollAnchors();

    //popUp Block
    const togglePopUp = () => {

        const popUp = document.querySelector('.popup'),
            popUpBtn = document.querySelectorAll('.popup-btn'),
            popUpContent = document.querySelector('.popup-content');

        /*popUp Animation*/
        let flyInterval,
            count = 0;
        let flyAnimate = function() {
            flyInterval = requestAnimationFrame(flyAnimate);
            count++;
            if (count < 100) {
                popUpContent.style.top = count + 'px';
            } else {
               cancelAnimationFrame(flyInterval);
            }
        };

        /*Open popUp*/
        popUpBtn.forEach((elem) => {
            elem.addEventListener('click', () => {
                popUp.style.display = 'block';
                if (screen.availWidth >= 768) {
                    flyInterval = requestAnimationFrame(flyAnimate);
                }
            });
        });

        /*Close popUp*/
        popUp.addEventListener('click', (event) => {
            let target = event.target;

            if (target.classList.contains('popup-close')) {
                popUp.style.display = 'none';
            } else {
                target = target.closest('.popup-content');
                if (!target) {
                    popUp.style.display = 'none';
                }
            }

        });

    };

    togglePopUp();

    //Tabs Block
    const tabs = () => {

        const tabHeader = document.querySelector('.service-header'),
            tab = tabHeader.querySelectorAll('.service-header-tab'),
            tabContent = document.querySelectorAll('.service-tab');

        const toggleTabContent = (index) => {
            for (let i = 0; i < tabContent.length; i++) {
                if (index === i) {
                    tab[i].classList.add('active');
                    tabContent[i].classList.remove('d-none');
                } else {
                    tab[i].classList.remove('active');
                    tabContent[i].classList.add('d-none');
                }
            }
        };

        tabHeader.addEventListener('click', (event) => {
            let target = event.target;
            target = target.closest('.service-header-tab');

            if (target) {
                tab.forEach((item, i) => {
                    if (item === target) {
                        toggleTabContent(i);
                    }
                });
            }
        });

    };

    tabs();

});


