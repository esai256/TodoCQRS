const Subscriber = require("./subscriber.js");
const AddTaskCommand = require("./addTaskCommand.js");
const Config = require("./config.js");
const Repository = Config.Repository;

module.exports = class AddTaskSubscriber extends Subscriber {
    handle(message) {
        super.handle(message);

        new AddTaskCommand(message).execute().then(aggregate => this.Repository.save(aggregate));
    }

    get Repository() {
        //lazy loading
        this.repository = this.repository || new Repository();

        return this.repository;
    }
};
