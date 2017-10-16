namespace ToDoAPI

type Message = 
// Commands
| AddTaskCommand of task : TaskModel
| UpdateTaskCommand of id : System.Guid * title : string
| CompleteTaskCommand of id : System.Guid
| DeleteTaskCommand of id : System.Guid
| DeleteCompletedTasksCommand of ok : bool
// Events
| TaskAddedEvent of task : TaskModel
| TaskUpdatedEvent of id : System.Guid * title : string
| TaskCompletedEvent of id : System.Guid
| TaskDeletedEvent of id : System.Guid
