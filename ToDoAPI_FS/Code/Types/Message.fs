namespace ToDoAPI

///Discriminated union of all supported messages
type Message = 
  ///Command representing the creation of a new task
| AddTaskCommand of task : TaskModel
  ///Command representing the update of the title of an existing task
| UpdateTaskCommand of id : int * title : string
  ///Command representing the completion an existing task
| CompleteTaskCommand of id : int
  ///Command representing the completion an existing task
| UncompleteTaskCommand of id : int
  ///Command representing the deletion of an existing task
| DeleteTaskCommand of id : int
  ///Command representing the deletion of all completed tasks
| DeleteCompletedTasksCommand of ok : bool
  ///Command representing the request for an invalid operation
| InvalidCommand of error : string

  ///Event representing that a new task has been created
| TaskAddedEvent of task : TaskModel
  ///Event representing that the title of an existing task has been updated
| TaskUpdatedEvent of task : TaskModel
  ///Event representing that an existing task has been completed
| TaskCompletedEvent of task : TaskModel
  ///Event representing that an existing task has been uncompleted
| TaskUncompletedEvent of task : TaskModel
  ///Event representing that an existing task has been deleted
| TaskDeletedEvent of id : int
