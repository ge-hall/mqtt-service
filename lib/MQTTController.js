"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.MQTTController = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _knex = require("knex");

var _knex2 = _interopRequireDefault(_knex);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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

// flow-types
var MQTTController = exports.MQTTController = function () {
    function MQTTController(db) {
        _classCallCheck(this, MQTTController);

        this.db = db;
        this.mqtt = Mqtt.connect(process.env.MQTT_SERVER);
        this.buffer = [];
        this.mqtt.on("connect", function (err) {
            log.info("connecting..." + err);
        });
        this.listen();
        this.processMessage();
    }

    _createClass(MQTTController, [{
        key: "listen",
        value: function listen(duration) {
            this.mqtt.subscribe("#", function (err) {
                if (!err) {
                    log.info('No error subscribe');
                    //this.mqtt.publish("bbc/subtitles/bbc_one_london/raw", "Hello there");
                }
            });
        }
    }, {
        key: "processMessage",
        value: function processMessage() {
            this.mqtt.on('message', function (topic, message) {
                return log.info(topic + " | " + message);
            });
        }
    }, {
        key: "addSubscription",
        value: function addSubscription(topic, func) {
            this.mqtt.subscribe(topic, func);
        }
    }]);

    return MQTTController;
}();

;
