const express = require("express");
const Bus = require("./bus.js");
const TestSubscriber = require("./testSubscriber.js");

const bus = new Bus();

const symbol = Symbol("asdf");

bus.subscribe(symbol, TestSubscriber);

bus.publish(symbol, "Testmessage");
