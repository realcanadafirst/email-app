import fetch from 'node-fetch';
export async function sendMessage({ appDataResult = '' }) {

      const data = { "messaging_product": "whatsapp", "to": "918373020202", "type": "template", "template": { "name": "hello_world", "language": { "code": "en_US" } } };

    fetch('https://graph.facebook.com/v19.0/334791366393483/messages', {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer EAANNJMGYr2cBOwONUTl8STvZBQWumujuVuXWKI4GuRZBAVuaASPY4eks45DZB56gBoZCt1Ie8ZA2LzRrEXXFgbncLZCkNE80y9X1jbTv6isxlCQfj4nNJgtvwDZBiKrYhQtlOajhgdFhB2qqNqZCXKHsox15vazC0HQZARYIYzTGsvjQUS6Rzniy7z0FaUTuygv64rRlHtRZCrCLfg7VLlwFQh',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });

    console.log('sendMessage')
    // do something with response data 
    return 1;

}


