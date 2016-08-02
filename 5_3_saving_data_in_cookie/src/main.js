/*
 Дз 3
 Взять результат ДЗ по теме DOM Events
 (страница с кнопкой для создания div'ов, которые можно перетаскивать при помощи D&D)
 Добавить на страницу кнопку "сохранить".
 При нажатии на данную кнопку, количество, цвет и позиция всех div'ов должны быть сохранены в одну cookie.
 После перезагрузки страницы,
 необходимо достать эту информацию из cookie и восстановить все div'ы (с их размерами, позицией и цветами)

 ДЗ по теме DOM Events:
 Создать страницу с кнопкой. При клике на кнопку, на странице должен создаваться div произвольных размеров,
 в произвольном месте.
 Цвет фона div'а должен быть каждый раз случайным.
 Созданные div'ы можно перетаскивать мышкой (drag & drop)
 */

//Восстановление из cookie
window.addEventListener('load', () => {
    let divs = readFromCookie('magic-divs');
    if (divs) {
        for (let i=0;i<divs.length;i++) {
            let div = getDiv(divs[i].width, divs[i].height, divs[i].top, divs[i].left, divs[i].background);
            document.body.appendChild(div);
        }
    }
});

//Сохранение в cookie
document.getElementById('save-btn').addEventListener('click', () => {
    let magicDivs = document.getElementsByClassName('magic-div');

    let divs = [];
    for (let i=0;i<magicDivs.length;i++) {
        let divDescr = {};
        let style = window.getComputedStyle(magicDivs[i], null);
        divDescr.background = style.background;
        divDescr.width = style.width;
        divDescr.height = style.height;
        divDescr.top = style.top;
        divDescr.left = style.left;
        divs.push(divDescr);
    }

    storeToCookie('magic-divs', divs);
});

//Очистка экрана
document.getElementById('clear-btn').addEventListener('click', () => {
    let magicDivs = document.getElementsByClassName('magic-div');
    while (magicDivs.length > 0) {
        document.body.removeChild(magicDivs[0]);
    }
});

function storeToCookie(name, value) {
    document.cookie = name + '=' + JSON.stringify(value);
}

function readFromCookie(name) {
    var result = document.cookie.match(new RegExp(name + '=([^;]+)'));
    result && (result = JSON.parse(result[1]));
    return result;
}

//Код дз по теме DOM Events
let dragObject = null;
let createDivBtn = document.getElementById('create-div-btn');

createDivBtn.addEventListener('click', function () {

    const MIN_WIDTH = 10;
    const MAX_WIDTH = 200;
    const MIN_HEIGHT = 10;
    const MAX_HEIGHT = 200;

    let height = getRandomInt(MIN_HEIGHT, MAX_HEIGHT);
    let width = getRandomInt(MIN_WIDTH, MAX_WIDTH);

    let top = getRandomInt(0, document.documentElement.clientHeight - height);
    let left = getRandomInt(0, document.documentElement.clientWidth - width);

    let background = getRandomColor();

    let div = getDiv(width + 'px', height + 'px', top + 'px', left + 'px', background);
    document.body.appendChild(div);

    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function getRandomColor() {
        //генерация hex-кода вида #000000-#FFFFFF		}
        return "#" + ((1 << 24) * Math.random() | 0).toString(16);
    }

});

document.addEventListener('mousedown', function (e) {
    if (e.which !== 1 || e.target.tagName !== 'DIV') {
        return;
    }

    dragObject = e.target;
    dragObject.oldX = e.pageX;
    dragObject.oldY = e.pageY;

});

document.addEventListener('mousemove', function (e) {
    if (!dragObject) {
        return;
    }

    let shiftX = dragObject.oldX - e.pageX;
    let shiftY = dragObject.oldY - e.pageY;

    dragObject.oldX = e.pageX;
    dragObject.oldY = e.pageY;

    let left = parseInt(dragObject.style.left, 10) - shiftX;
    let top = parseInt(dragObject.style.top, 10) - shiftY;

    let width = parseInt(dragObject.style.width, 10);
    let height = parseInt(dragObject.style.height, 10);

    let clientWidth =  parseInt(document.documentElement.clientWidth, 10);
    let clientHeight =  parseInt(document.documentElement.clientHeight, 10);

    left = (left < 0 ? 0 : (left + width > clientWidth ? clientWidth - width : left));
    top = top < 0 ? 0 : (top + height > clientHeight  ? clientHeight - height : top);

    dragObject.style.left = left + 'px';
    dragObject.style.top = top + 'px';
});

document.addEventListener('mouseup', function() {
    dragObject = null;
});

function getDiv(width, height, top, left, background) {
    let div = document.createElement('div');
    div.className = 'magic-div';
    div.style.background = background;
    div.style.position = 'absolute';
    div.style.width = width;
    div.style.height = height;
    div.style.top = top;
    div.style.left = left;
    return div;
}
