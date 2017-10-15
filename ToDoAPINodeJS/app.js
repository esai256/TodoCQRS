const Bus = require("./bus.js");
const AddTaskSubscriber = require("./addTaskSubscriber.js");
const TaskAddedEvent = require("./taskAddedEvent");
const TaskAddedSubscriber = require("./taskAddedSubscriber");

const addTaskID = Symbol("AddTask");

Bus.subscribe(addTaskID, AddTaskSubscriber);
console.log(0, TaskAddedEvent.Symbol);
Bus.subscribe(TaskAddedEvent.Symbol, TaskAddedSubscriber);

Bus.publish(addTaskID, {
    Title: "Title",
    CreatedOn: new Date(),
    Done: false
});
