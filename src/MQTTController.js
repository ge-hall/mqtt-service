"use strict";

require("dotenv/config");

var log = require("yalm");

log.setLevel("debug");

// var db = require("knex")({
//     client: "pg",
//     version: "7.2",
//     connection: {
//         host: "127.0.0.1",
//         user: process.env.PGUSER,
//         password: process.env.PGPASSWORD,
//         database: process.env.DB
//     },
//     debug: true
// });

var Mqtt = require("mqtt");
//import { Mqtt } from 'mqtt';
import Knex from "knex";

// @flow
export class MQTTController {
    db: Knex;
    mqtt: Mqtt;
    buffer: [];

    constructor(db: string) {
        this.db = db;
        this.mqtt = Mqtt.connect(process.env.MQTT_SERVER);
        this.buffer = [];
        this.mqtt.on("connect", err => {
            log.info(`connecting...cmd:${err.cmd}`);
        });
        this.messageCount = 0;
        //this.listen(5000);
        //this.printMessages();
        //this.testBuffer();
    }

    scanTopics(duration: number) {
        log.info("begin listening");
        this.storeTopics();

        let mqtt_server = this.mqtt;
        new Promise(function(resolve, reject) {
            mqtt_server.subscribe("#", function(err) {
                if (err) {
                    log.info("error on subscribe");
                    Promise.reject("subscription failed");
                }
            });
            setTimeout(resolve, duration, "foo");
        })
            .then(() => {
                this.testPublish();
                this.mqtt.unsubscribe("#");
                log.info("stopped listening");
            })
            .catch(e => log.error(e));
    }
    storeTopics(): void {

        // use class buffer
        this.buffer.length = 0;
        this.mqtt.on("message", (topic, message) => {
            let i = 0;
            let found = this.buffer.find(el => {
                //log.info(`${i++}:${topic} === ${el} : ${el.localeCompare(topic)}`);
                return el.localeCompare(topic) == 0;
            });

            // store in buffer
            if (found === undefined) {
                this.buffer.push(topic);
            } else {
                // proper test will negate need for this debug out
                log.debug(`${topic} is a duplicate`);
            }
        });
    }
    printMessages(): void {
        this.mqtt.on("message", (topic, message) =>
            log.info(`${topic} | ${message}`)
        );
    }
    addSubscription(topic: string, func: Function) {
        this.mqtt.subscribe(topic, func);
    }
    testBuffer() {
        let topic = "test3";
        let arr = ["test", "test1", "test2", "test1"];
        let result = arr.find(el => {
            log.info(`${el} === ${topic} : ${el.localeCompare(topic)}`);
            return el.localeCompare(topic) == 0;
        });
        log.info(`result = ${result}`);
    }
    testPublish(){
        this.mqtt.publish("bbc/subtitles/bbc_one_london/raw", "Hello there");
        this.mqtt.publish("bbc/subtitles/bbc_one_london/raw1", "Hello there");
        this.mqtt.publish("bbc/subtitles/bbc_one_london/raw2", "Hello there");
        this.mqtt.publish("bbc/subtitles/bbc_one_london/raw3", "Hello there");
        this.mqtt.publish("bbc/subtitles/bbc_one_london/raw2", "Hello there");
        this.mqtt.publish("bbc/subtitles/bbc_one_london/raw", "Hello there");
        this.mqtt.publish("bbc/subtitles/bbc_one_london/raw", "Hello there");
        this.mqtt.publish("bbc/subtitles/bbc_one_london/raw1", "Hello there");
        this.mqtt.publish("bbc/subtitles/bbc_one_london/raw2", "Hello there");
        this.mqtt.publish("bbc/subtitles/bbc_one_london/raw3", "Hello there");
        this.mqtt.publish("bbc/subtitles/bbc_one_london/raw2", "Hello there");
        this.mqtt.publish("bbc/subtitles/bbc_one_london/raw", "Hello there");
    }
}
