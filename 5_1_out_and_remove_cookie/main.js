/*
ДЗ 5.1
Создать страницу, которая выводит все имеющиеся cookie в виде таблицы (имя, значение).
    Для каждой cookie в таблице, необходимо добавить кнопку "удалить",
    При нажатии на "удалить", на экран должен быть выведен confirm с текстом "Удалить cookie с именем …?".
    Вместо … необходимо подставить имя удаляемой cookie.
    Если пользователь ответил положительно, то соответствующая cookie должна быть удалена.
*/

window.addEventListener('load', () => {
    let cookies = getCookiesArray();
    let cookiesTbl = document.querySelector('#cookies-tbl tbody');

    for(let cookieName in cookies) {
        outRow(cookiesTbl, cookieName, cookies[cookieName]);
    }

    cookiesTbl.addEventListener('click', e => {
        if (e.target.tagName === 'BUTTON' ) {
            let row = e.target.closest('TR');
            deleteCookie(row.getAttribute('cookie-name'));
            cookiesTbl.removeChild(row);
        }
    })
});

function outRow(cookiesTbl, cookieName, cookieValue) {
    let row = document.createElement('tr');
    row.setAttribute('cookie-name', cookieName);

    let nameCell = document.createElement('td');
    nameCell.innerHTML = cookieName;

    let valueCell = document.createElement('td');
    valueCell.innerHTML = cookieValue;

    let buttonCell = document.createElement('td');
    let button = document.createElement('button');
    button.innerHTML = 'Удалить';

    buttonCell.appendChild(button);

    row.appendChild(nameCell);
    row.appendChild(valueCell);
    row.appendChild(buttonCell);

    cookiesTbl.appendChild(row);
}

function deleteCookie(name) {
    let cookieString = name + '=';
    let expiryDate = new Date();
    expiryDate.setTime(expiryDate.getTime() - 86400 * 1000);
    cookieString += ';expires=' + expiryDate.toGMTString();
    document.cookie = cookieString;
};

function getCookiesArray() {
    var cookies = { };

    if (document.cookie && document.cookie != '') {
        var split = document.cookie.split(';');
        for (var i = 0; i < split.length; i++) {
            var name_value = split[i].split("=");
            name_value[0] = name_value[0].replace(/^ /, '');
            cookies[decodeURIComponent(name_value[0])] = decodeURIComponent(name_value[1]);
        }
    }

    return cookies;
}