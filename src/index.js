import 'dotenv/config';
const log = require('yalm');
var Mqtt = require("mqtt");
//var client = mqtt.connect("mqtt://test.mosquitto.org");
//MQTT_SERVER
var mqtt = Mqtt.connect(process.env.MQTT_SERVER);
mqtt.on("connect", function() {
    mqtt.subscribe("presence", function(err) {
        if (!err) {
            mqtt.publish("presence", "Hello mqtt");
        }
    });
});

mqtt.on("message", function(topic, message) {
    // message is Buffer
    console.log(message.toString());
    //client.end();
});

mqtt.on('error', err => {
    log.error('mqtt', err);
});

mqtt.on('close', () => {
    log.warn('mqtt close');
});

mqtt.on('offline', () => {
    log.warn('mqtt offline');
});

mqtt.on('reconnect', () => {
    log.info('mqtt reconnect');
});
