const Bus = require("./bus.js");
const AddTaskSubscriber = require("./addTaskSubscriber.js");
const TaskAddedEvent = require("./taskAddedEvent");
const TaskAddedSubscriber = require("./taskAddedSubscriber");

const addTaskID = Symbol("AddTask");

Bus.subscribe(addTaskID, AddTaskSubscriber);
Bus.subscribe(TaskAddedEvent.Symbol, TaskAddedSubscriber);

//test-event -> remove when ui is done
Bus.publish(addTaskID, {
    Title: "Title",
    CreatedOn: new Date(),
    Done: false
});
