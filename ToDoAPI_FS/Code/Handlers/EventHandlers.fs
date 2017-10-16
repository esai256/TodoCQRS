namespace ToDoAPI

open ToDoAPI

module EventHandlers =
    let taskAdded event = //(event : Event) =
        match event with
        | TaskAddedEvent task -> ReadModel.insertTask task
        | _ -> event |> ignore

    let taskTitleUpdated event = //(event : Event) =
        match event with
        | TaskUpdatedEvent (id, title) -> ReadModel.updateTaskTitle id title
        | _ -> event |> ignore

    let taskStatusUpdated event = //(event : Event) =
        match event with
        | TaskCompletedEvent id -> ReadModel.updateTaskStatus id true
        | _ -> event |> ignore

    let taskDeleted event = //(event : Event) =
        match event with
        | TaskDeletedEvent id -> ReadModel.deleteTask id
        | _ -> event |> ignore
