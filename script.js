document.getElementById('getSettings').onclick = function() { 
    apiRequest('GET', '/waInstance' + getIdInstance() + '/getSettings'); 
};
document.getElementById('getState').onclick = function() { 
    apiRequest('GET', '/waInstance' + getIdInstance() + '/getStateInstance'); 
};
document.getElementById('sendMessage').onclick = function() {
    const chatId = document.getElementById('phoneNumber').value.trim() + "@c.us"; // Получаем и форматируем номер телефона
    const messageText = document.getElementById('messageText').value.trim(); // Получаем текст сообщения
    apiRequest('POST', '/waInstance' + getIdInstance() + '/sendMessage', {
        "chatId": chatId,
        "message": messageText
    });
};
document.getElementById('sendFile').onclick = function() {
    const filePhoneNumber = document.getElementById('filePhoneNumber').value.trim() + "@c.us"; // Получаем и форматируем номер телефона для файла
    const fileUrl = document.getElementById('fileUrl').value.trim(); // Получаем URL файла
    const fileName = extractFileName(fileUrl); // Извлекаем имя файла из URL
    apiRequest('POST', '/waInstance' + getIdInstance() + '/sendFileByUrl', {
        "chatId": filePhoneNumber,
        "urlFile": fileUrl,
        "fileName": fileName,
        "caption": fileName // Используем имя файла как подпись
    });
};

function getIdInstance() {
    return document.getElementById('idInstance').value.trim();
}

function extractFileName(url) {
    const urlParts = url.split('/');
    return urlParts[urlParts.length - 1]; // Возвращаем последний элемент массива как имя файла
}

function apiRequest(method, path, body = null) {
    const apiToken = document.getElementById('apiToken').value.trim(); // Получаем API токен
    const baseURL = 'https://api.green-api.com';
    const url = `${baseURL}${path}/${apiToken}`;

    const options = {
        method: method,
        headers: new Headers({
            'Content-Type': 'application/json'
        }),
    };

    // Добавляем тело запроса только для методов, которые это допускают (не GET и не HEAD)
    if (method !== 'GET' && method !== 'HEAD' && body) {
        options.body = JSON.stringify(body);
    }

    fetch(url, options).then(response => response.json())
      .then(data => {
        document.getElementById('apiResponse').textContent = JSON.stringify(data, null, 2);
    }).catch(error => {
        console.error('Error:', error);
        document.getElementById('apiResponse').textContent = 'Error: ' + error;
    });

}
