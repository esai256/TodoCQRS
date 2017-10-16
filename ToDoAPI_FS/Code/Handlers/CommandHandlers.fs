namespace ToDoAPI

module CommandHandlers =
    let private processCommand =
        Repository.save >> EventStore.save >> EventStore.publish >> ignore

    let addTask command =
        let aggregate = 
            match command with
            | AddTaskCommand task -> Some(DomainLogic.createTask task)
            | _ -> None
        aggregate |> processCommand

    let updateTask command =
        let aggregate = 
            match command with
            | UpdateTaskCommand (id, title) -> Some(DomainLogic.updateTask (id, title))
            | _ -> None
        aggregate |> processCommand

    let completeTask command =
        let aggregate =
            match command with
            | CompleteTaskCommand id -> Some(DomainLogic.completeTask id)
            | _ -> None
        aggregate |> processCommand

    let deleteTask command =
        let aggregate =
            match command with
            | DeleteTaskCommand id -> Some(DomainLogic.deleteTask id)
            | _ -> None
        aggregate |> processCommand

    let deleteCompletedTasks command =
        let aggregate =
            match command with
            | DeleteCompletedTasksCommand ok -> Some(DomainLogic.deleteCompletedTasks)
            | _ -> None
        aggregate |> processCommand
