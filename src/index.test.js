//import { MQTTController } from './MQTTController';
const {MQTTController} = require('./MQTTController');
var log = require("yalm");
describe("Testing Bootstrapping", () => {
    beforeAll(() =>{

        var Mqtt = require("mqtt");

    });
    it("Start up", () => {
        const control = new MQTTController('knex');
        const mqtt = require('mqtt').connect(process.env.MQTT_SERVER);
        mqtt.on("connect", err => {
            log.info(`connecting...cmd:${err.cmd}`);
        });
        control.scanTopics(500);
        mqtt.publish("bbc/subtitles/bbc_one_london/raw", "Hello there");
        mqtt.publish("bbc/subtitles/bbc_one_london/raw1", "Hello there");
        mqtt.publish("bbc/subtitles/bbc_one_london/raw2", "Hello there");
        mqtt.publish("bbc/subtitles/bbc_one_london/raw3", "Hello there");
        mqtt.publish("bbc/subtitles/bbc_one_london/raw2", "Hello there");
        mqtt.publish("bbc/subtitles/bbc_one_london/raw", "Hello there");

    });
});
