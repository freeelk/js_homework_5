/*
ДЗ 5.2
 К страничке из предыдущего задания необходимо добавить форму с текстовыми полями и кнопкой "добавить".
 Список текстовых полей:
 - имя
 - значение
 - срок годности (количество дней)

 После нажатия на кнопку "добавить" должна быть создана (и добавлена в таблицу)
 новая cookie с указанными параметрами.
 Обратите внимание, что в поле "срок годности" указывается количество дней (начиная с текущего),
 на протяжении которых будет доступна cookie.

 После добавление cookie, значения текстовых полей формы должны быть очищены.
 Если какое-то из полей формы не заполнено, то, при нажатии на кнопку "добавить",
 cookie не должна быть создана, а на экран должен быть выведен alert с предупреждением
 "Заполните все поля формы".
 Так же заметьте, что при работе с формой и таблицей, не должно быть перезагрузок страницы
*/

window.addEventListener('load', () => {
    let cookiesTbl = document.querySelector('#cookies-tbl tbody');
    outTable(cookiesTbl);

    cookiesTbl.addEventListener('click', e => {
        if (e.target.tagName === 'BUTTON' ) {
            let row = e.target.closest('TR');
            deleteCookie(row.getAttribute('cookie-name'));
            cookiesTbl.removeChild(row);
        }
    })
});

function outTable(cookiesTbl) {
    let cookies = getCookiesArray();

    while (cookiesTbl.firstChild) {
        cookiesTbl.removeChild(cookiesTbl.firstChild);
    }

    for(let cookieName in cookies) {
        outRow(cookiesTbl, cookieName, cookies[cookieName]);
    }
}

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

document.getElementById('cookie-btn').addEventListener('click', () => {
    let name = document.getElementById('cookie-name').value;
    let value = document.getElementById('cookie-value').value;
    let expired = parseInt(document.getElementById('cookie-expired').value, 10);

    let checkMessage = checkValues(name, value, expired);

    if (checkMessage === '') {
        addCookie(name, value, expired);
    } else {
        alert(checkMessage);
    }

});

function checkValues(name, value, expired) {
    let message = '';

    if (name.trim() === '') {
        message += 'Пустое значение имени cookie.\n ';
    }

    if (value.trim() === '') {
        message += 'Пустое значение содержимого cookie.\n ';
    }

    if (Number.isNaN(expired) || expired < 1)  {
        message += 'Срок годности должен быть положительным целым числом\n ';
    }

    if (message !== '') {
        message = message + 'Заполните все поля формы. ';
    }

    return message;
}

function addCookie(name, value, daysExpired) {
    let date = new Date();
    let expires = new Date(date.getTime() + daysExpired*24*60*60*1000);
    expires = expires.toGMTString();
    document.cookie = name + '=' + value + ';expires=' + expires;
    outTable(document.querySelector('#cookies-tbl tbody'));
    clearForm();
}

function clearForm() {
    document.getElementById('cookie-name').value = '';
    document.getElementById('cookie-value').value = '';
    document.getElementById('cookie-expired').value = '';
}