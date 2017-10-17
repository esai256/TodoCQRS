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
            console.log(`I'm doing whatever i like to with ${JSON.stringify(this.Task)}`);
            
            resolve(new Aggregate([new TaskAddedEvent(this.Task)]));
        });
    }
};
