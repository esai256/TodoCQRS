const Event = require("./event");
const Identifier = Symbol("TaskAddedEvent");

module.exports = class TaskAddedEvent extends Event {
    constructor(task) {
        super();
        this.Payload = task;
    }

    get Symbol() {
        return TaskAddedEvent.Symbol;
    }

    static get Symbol() {
        return Identifier;
    }
};
