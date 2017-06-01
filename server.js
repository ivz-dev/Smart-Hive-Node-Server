var mqtt = require('mqtt'); // Підключення бібліотеки mqtt сервера
var fs = require('fs'); 
var mysql = require('mysql');

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
    console.log('API server start!');
    client.subscribe('temp');
    client.subscribe('weight');
});

var contentDb = fs.readFileSync('db_credentials.json'); // Підключення масиву з правами доступу 
var dbCredentials = JSON.parse(contentDb);

client.on('message', function (topic, message) {
    var connection = mysql.createConnection({
        host: dbCredentials.host,
        user: dbCredentials.user,
        password: dbCredentials.password,
        database: dbCredentials.database
    });
    connection.connect();
    connection.query('INSERT INTO `'+topic+'` (`number`, `date`, `value`) VALUES (1,NOW(),'+message+')', function(err, rows, fields) {
    connection.end();
    if (!err)
        console.log(topic+' : '+message+' successfully added!');
    else
        console.log('Error while performing Query.');
    });
});
