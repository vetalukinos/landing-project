window.addEventListener('DOMContentLoaded', function() {
    'use strict';

    //Timer
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

    //Menu
    const toggleMenu = () => {

        const btnMenu = document.querySelector('.menu'),
            menu = document.querySelector('menu'),
            closeBtn = document.querySelector('.close-btn'),
            menuItems = menu.querySelectorAll('ul > li');

        /*Handler Menu Function*/
        const handlerMenu = () => {
           menu.classList.toggle('active-menu');
        };

        /*Menu Button*/
        btnMenu.addEventListener('click', handlerMenu);
        /*Close Button*/
        closeBtn.addEventListener('click', handlerMenu);
        /*Close to click menu item*/
        menuItems.forEach((elem) => elem.addEventListener('click', handlerMenu));


    };

    toggleMenu();

    //Popup
    const togglePopup = () => {

        const popup = document.querySelector('.popup'),
            popupBtn = document.querySelectorAll('.popup-btn'),
            popupClose = document.querySelector('.popup-close'),
            popupContent = document.querySelector('.popup-content');

        /*Popup Animation*/
        let flyInterval,
            count = 0;
        let flyAnimate = function() {
            flyInterval = requestAnimationFrame(flyAnimate);
            count++;
            if (count < 100) {
                popupContent.style.top = count + 'px';
            } else {
               cancelAnimationFrame(flyInterval);
            }
        };

        /*Open Popup*/
        popupBtn.forEach((elem) => {
            elem.addEventListener('click', () => {
                popup.style.display = 'block';
                if (screen.availWidth >= 768) {
                    flyInterval = requestAnimationFrame(flyAnimate);
                }
            });
        });
        /*Close Popup*/
        popupClose.addEventListener('click', () => {
            popup.style.display = 'none';
        });

    };

    togglePopup();


});


