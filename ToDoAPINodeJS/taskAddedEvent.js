const Event = require("./event");
const Identifier = Symbol("TaskAddedEvent");

module.exports = class TaskAddedEvent extends Event {
    constructor(task) {
        super();
    }

    get Symbol() {
        console.log(6, TaskAddedEvent.Symbol);
        return TaskAddedEvent.Symbol;
    }

    static get Symbol() {
        return Identifier;
    }
};
