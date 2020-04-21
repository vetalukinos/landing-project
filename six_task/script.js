window.addEventListener('DOMContentLoaded', function() {
    'use strict';

    const body = document.querySelector('body');

    let date = new Date(),
        weekday = new Array(7),
        newYearDate = new Date('31 december 2020'),
        decCache = [],
        decCases = [2, 0, 1, 1, 1, 2],
        goodDay,
        hello,
        today,
        timeToday,
        newYear;

    weekday[0]="Воскресенье";
    weekday[1]="Понедельник";
    weekday[2]="Вторник";
    weekday[3]="Среда";
    weekday[4]="Четверг";
    weekday[5]="Пятница";
    weekday[6]="Суббота";

    function decOfNum(number, titles) {
        if(!decCache[number]) decCache[number] = number % 100 > 4 && number % 100 < 20 ? 2 : decCases[Math.min(number % 10, 5)];
        return titles[decCache[number]];
    }

    if (date.getHours() >= 0 && date.getHours() < 6) {
        goodDay = 'Доброй ночи';
    } else if (date.getHours() >= 6 && date.getHours() < 12) {
        goodDay = 'Доброе утро';
    } else if (date.getHours() >= 12 && date.getHours() < 18) {
        goodDay = 'Добрый день';
    } else if (date.getHours() >= 18 && date.getHours() <= 24) {
        goodDay = 'Добрый вечер';
    }


    hello = document.createElement('div');
    hello.textContent = goodDay;
    body.append(hello);

    today = document.createElement('div');
    today.textContent = `Сегодня: ${weekday[date.getDay()]}`;
    body.append(today);

    timeToday = document.createElement('div');
    timeToday.textContent = `Текущее время: ${date.toLocaleTimeString('en')}`;
    body.append(timeToday);

    newYear = document.createElement('div');
    newYear.textContent = `До Нового года осталось: ${Math.ceil((newYearDate - date) / 86400000)} ${decOfNum(Math.ceil((newYearDate - date) / 86400000), ['день', 'дня', 'дней'])}`;
    body.append(newYear);



});

