var mqtt = require('mqtt'); // Підключення бібліотеки mqtt сервера
var fs = require('fs'); 

var content = fs.readFileSync('mqtt_credentials.json'); // Підключення масиву з правами доступу 
var mqttCredentials = JSON.parse(content); // Перетворення JSON - об'єкту

var mqttOptions = {
    clientId: mqttCredentials.clientId,
    host: mqttCredentials.host,
    port: mqttCredentials.port,
    username: mqttCredentials.username,
    password: mqttCredentials.password
};

var client = mqtt.connect(mqttOptions); // Підключення до серверу

client.on('connect', function(){ // Функція викликається в разі успішного встановлення з'єднання
    console.log('Server successfully start!')
})