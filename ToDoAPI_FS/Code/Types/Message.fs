namespace ToDoAPI

type Message = 
// Commands
| AddTaskCommand of task : TaskModel
| UpdateTaskCommand of id : int * title : string
| CompleteTaskCommand of id : int
| DeleteTaskCommand of id : int
| DeleteCompletedTasksCommand of ok : bool
// Events
| TaskAddedEvent of task : TaskModel
| TaskUpdatedEvent of id : int * title : string
| TaskCompletedEvent of id : int
| TaskDeletedEvent of id : int
