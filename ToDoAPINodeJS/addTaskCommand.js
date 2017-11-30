const Aggregate = require("./aggregate");
const TaskAddedEvent = require("./taskAddedEvent");

module.exports = class AddTaskCommand
{
    constructor(task)
    {
        this.Task = task;
    }

    execute()
    {
        return new Promise(resolve =>
        {
            resolve(new Aggregate([new TaskAddedEvent(this.Task)]));
        });
    }
};
