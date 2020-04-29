
class Validator {
    constructor({selector, pattern = {}, method}) {
        this.form = document.querySelector(selector); //селектор формы
        this.pattern = pattern; //кастомный шаблон
        this.method = method; //настройки полей валидации
        this.elementsForm = [...this.form.elements].filter(item => {
            return item.tagName.toLowerCase() !== 'button' && item.type !== 'button';
        });
        this.error = new Set(); //коллекция, в которую будет передаваться элемент в случаи ошибки
    }

    /*Метод Init*/
    init() {
        this.applyStyle(); //вызываем метод
        this.setPattern(); //метод паттерна
        /*на каждый элемент навешиваем событие, которое будет проверять валидацию с помощью вызова метода*/
        this.elementsForm.forEach(elem => elem.addEventListener('change', this.checkIt.bind(this)));
        this.form.addEventListener('submit', event => {
            event.preventDefault();
            this.elementsForm.forEach(elem => this.checkIt({target: elem}));
            if (this.error.size) {
                event.preventDefault();
            }
        });
    }

    isValid(elem) {
        const validatorMethod = {
            notEmpty(elem) {
                if (elem.value.trim() === '') {
                    return false;
                }
                return true;
            },
            pattern(elem, pattern) {
                return pattern.test(elem.value);
            }
        };
        //проверка на то, передает ли пользователь метод
        if (this.method) {
            const method = this.method[elem.id];

            if (method) {
                return method.every(item => validatorMethod[item[0]](elem, this.pattern[item[1]]));
            }
        } else {
            console.warn('Необходимо передать id полей ввода и методы проверки этих полей!');
        }

        return true;
    }

    //Запускаеи проверку на валидность, если прошли, то вызываем showSuccess, если нет - showError
    checkIt(event) {
        const target = event.target;
        if (this.isValid(target)) {
            this.showSuccess(target);
            this.error.delete(target); //удаляем элемент из коллекции
        } else {
            this.showError(target);
            this.error.add(target); //при ошибке добавляем элемент в коллекцию
        }
    }

    //input не прошел валидацию
    showError(elem) {
        elem.classList.remove('success');
        elem.classList.add('error');
        if (elem.nextElementSibling && elem.nextElementSibling.classList.contains('validator-error')) {
            return;
        }
        //создаем сообщение об ошибке
        const errorDiv = document.createElement('div');
        errorDiv.textContent = 'Ошибка в этом поле';
        errorDiv.classList.add('validator-error');
        elem.insertAdjacentElement('afterend', errorDiv);
    }

    //Валидация прошла успешно
    showSuccess(elem) {
        elem.classList.remove('error');
        elem.classList.add('success');
        /*Если в данном методе будет существовать класс validator-error, то его будем удалять*/
        if (elem.nextElementSibling && elem.nextElementSibling.classList.contains('validator-error')) {
            elem.nextElementSibling.remove();
        }
    }

    //Метод, который добавляет стили
    applyStyle() {
        const style = document.createElement('style'); //создаем новый тег, в котором будем прописывать все стили
        style.textContent = `
            input.success {
                border: 2px solid green !important;    
            }
            input.error {
                border: 2px solid red !important;    
            }
            .validator-error {
                color: red !important;
                font-size: 12px !important;
                font-family: 'sans-serif' !important;
            }
        `; //прописываем стили
        document.head.appendChild(style); //вставляем в head
    }

    //Метод паттерна
    /*Если пользователь передал паттерн с таким же имененм, то мы используем наш паттерн.
    Если пользователь передал другой паттерн, то используем паттерн по умолчанию*/
    setPattern() {

        if (!this.pattern.phone) {
            this.pattern.phone = /^\+?[78]([-()]*\d){10}$/;
        }

        if (!this.pattern.email) {
            this.pattern.email = /^\w+@\w+\.\w{2,}$/;
        }

        if (!this.pattern.name) {
            this.pattern.name = /^[А-Яа-яЁё]+$/;
        }

    }

}