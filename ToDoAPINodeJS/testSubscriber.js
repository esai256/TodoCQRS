const Subscriber = require("./subscriber.js");

module.exports = class TestSubscriber extends Subscriber {
    handle(message) {
        console.log(message);
    }
}
