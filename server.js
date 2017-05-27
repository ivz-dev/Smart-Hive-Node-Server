var mqtt = require('mqtt');
var fs = require('fs');

var content = fs.readFileSync('mqtt_credentials.json');
var mqttCredentials = JSON.parse(content);

