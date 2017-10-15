const Subscriber = require("./subscriber.js");
const AddTaskCommand = require("./addTaskCommand.js");
const Repository = require("./repository");

module.exports = class AddTaskSubscriber extends Subscriber {
    handle(message) {
        super.handle(message);
        console.log(message);

        new AddTaskCommand(message).execute().then((aggregate) => {
            this.Repository.save(aggregate);
        });
    }

    get Repository() {
        //lazy loading
        this.repository = this.repository || new Repository();

        return this.repository;
    }
};
