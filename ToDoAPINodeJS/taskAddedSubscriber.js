const Subscriber = require("./subscriber");

module.exports = class TaskAddedSubscriber extends Subscriber {
    handle(message) {
        super.handle(message);
        console.log(15, message);
    }
};
