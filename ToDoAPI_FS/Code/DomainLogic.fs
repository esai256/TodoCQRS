namespace ToDoAPI

module DomainLogic =
    let createTask task =
        let taskCount = ReadModel.getAll |> List.length
        {
            Events = [| TaskAddedEvent { id = taskCount + 1; title = task.title; isDone = task.isDone } |]
        }

    let updateTask (id, title) =
        {
            Events = [| TaskUpdatedEvent (id, title) |]
        }

    let completeTask id =
        {
            Events = [| TaskCompletedEvent id |]
        }

    let deleteTask id =
        {
            Events = [| TaskDeletedEvent id |]
        }

    let deleteCompletedTasks =
        let filterByStatus task = task.isDone
        let createDeletedEvent task = TaskDeletedEvent task.id

        {
            Events = (ReadModel.get filterByStatus) |> (List.map createDeletedEvent)
        }
