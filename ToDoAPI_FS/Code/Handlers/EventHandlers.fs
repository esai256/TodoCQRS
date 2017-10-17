namespace ToDoAPI

/// Functions to handle incoming events
module EventHandlers =

    ///<summary>
    /// Handles the <see cref="ToDoAPI.TaskAddedEvent">TaskAddedEvent</see>
    ///</summary>
    ///<param name="event">Incoming event</param>
    let taskAdded event =
        match event with
        | TaskAddedEvent task -> ReadModel.insertTask task
        | _ -> "Not my message" |> ignore

    ///<summary>
    /// Handles the <see cref="ToDoAPI.TaskUpdatedEvent">TaskUpdatedEvent</see>
    ///</summary>
    ///<param name="event">Incoming event</param>
    let taskTitleUpdated event =
        match event with
        | TaskUpdatedEvent (id, title) -> ReadModel.updateTaskTitle id title
        | _ -> "Not my message" |> ignore

    ///<summary>
    /// Handles the <see cref="ToDoAPI.TaskCompletedEvent">TaskCompletedEvent</see>
    ///</summary>
    ///<param name="event">Incoming event</param>
    let taskStatusUpdated event =
        match event with
        | TaskCompletedEvent id -> ReadModel.updateTaskStatus id true
        | _ -> "Not my message" |> ignore

    ///<summary>
    /// Handles the <see cref="ToDoAPI.TaskDeletedEvent">TaskDeletedEvent</see>
    ///</summary>
    ///<param name="event">Incoming event</param>
    let taskDeleted event =
        match event with
        | TaskDeletedEvent id -> ReadModel.deleteTask id
        | _ -> "Not my message" |> ignore
