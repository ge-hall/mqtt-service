"use strict";

require("dotenv/config");

var log = require("yalm");

log.setLevel("debug");

var db = require("knex")({
    client: "pg",
    version: "7.2",
    connection: {
        host: "127.0.0.1",
        user: process.env.PGUSER,
        password: process.env.PGPASSWORD,
        database: process.env.DB
    },
    debug: true
});

var Mqtt = require("mqtt");
//var client = mqtt.connect("mqtt://test.mosquitto.org");
//MQTT_SERVER
var mqtt = Mqtt.connect(process.env.MQTT_SERVER);
mqtt.on("connect", function () {
    mqtt.subscribe("bbc/subtitles/bbc_one_london/raw", function (err) {
        if (!err) {
            mqtt.publish("bbc/subtitles/bbc_one_london/raw", "Hello there");
        }
    });
});
var buffer = [];
mqtt.on("message", function (topic, message) {
    // message is Buffer
    log.debug(message.toString());
    // respond to message only once by keeping copy of recent messages published
    var msg = "Hello there, " + message;
    if (buffer.find(function (el) {
        log.debug(el + "===" + message + " which is " + el.localeCompare(message));
        return el.localeCompare(message) == 0;
    })) {
        log.debug(msg + " is a duplicate");
    } else {
        buffer.push(msg);
        db("topic").insert([{ topic: topic, value: message }]).catch(function (e) {
            log.error("exception on insert:\n" + e);
        });

        log.debug("pushing to buffer, store and publish!");
        mqtt.publish(topic, msg);
    }
    //client.end();
});

mqtt.on("error", function (err) {
    log.error("mqtt", err);
});

mqtt.on("close", function () {
    log.warn("mqtt close");
});

mqtt.on("offline", function () {
    log.warn("mqtt offline");
});

mqtt.on("reconnect", function () {
    log.info("mqtt reconnect");
});