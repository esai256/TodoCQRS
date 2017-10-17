namespace ToDoAPI

/// Functions to handle incoming commands
module CommandHandlers =
    
    ///Composition of functions to process any command
    let private commandChain =
        Repository.save >> EventStore.save >> EventStore.publish >> ignore

    ///<summary>
    /// Handles the <see cref="ToDoAPI.AddTaskCommand">AddTaskCommand</see>
    ///</summary>
    ///<param name="command">Incoming command</param>
    let addTask command =
        match command with
        | AddTaskCommand task -> Some(DomainLogic.createTask task) |> commandChain
        | _ -> "Not my message" |> ignore

    ///<summary>
    /// Handles the <see cref="ToDoAPI.UpdateTaskCommand">UpdateTaskCommand</see>
    ///</summary>
    ///<param name="command">Incoming command</param>
    let updateTask command =
        match command with
        | UpdateTaskCommand (id, title) -> Some(DomainLogic.updateTask (id, title)) |> commandChain
        | _ -> "Not my message" |> ignore

    ///<summary>
    /// Handles the <see cref="ToDoAPI.CompleteTaskCommand">CompleteTaskCommand</see>
    ///</summary>
    ///<param name="command">Incoming command</param>
    let completeTask command =
        match command with
        | CompleteTaskCommand id -> Some(DomainLogic.completeTask id) |> commandChain
        | _ -> "Not my message" |> ignore

    ///<summary>
    /// Handles the <see cref="ToDoAPI.DeleteTaskCommand">DeleteTaskCommand</see>
    ///</summary>
    ///<param name="command">Incoming command</param>
    let deleteTask command =
        match command with
        | DeleteTaskCommand id -> Some(DomainLogic.deleteTask id) |> commandChain
        | _ -> "Not my message" |> ignore

    ///<summary>
    /// Handles the <see cref="ToDoAPI.DeleteCompletedTasksCommand">DeleteCompletedTasksCommand</see>
    ///</summary>
    ///<param name="command">Incoming command</param>
    let deleteCompletedTasks command =
        match command with
        | DeleteCompletedTasksCommand ok -> Some(DomainLogic.deleteCompletedTasks) |> commandChain
        | _ -> "Not my message" |> ignore
