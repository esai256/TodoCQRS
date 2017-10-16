namespace ToDoAPI

module Repository =
    let save (aggregate : Aggregate option) =
        match aggregate with
        | Some(a) -> Some(a.Events)
        | None    -> None

module EventStore = 

    let private storedEvents = new ResizeArray<Message>()

    let save (newEvents : Message seq option) =
        match newEvents with
        | Some(e) -> storedEvents.AddRange(e)
        | None    -> None |> ignore
        newEvents

    let publish (newEvents : Message seq option) =
        match newEvents with
        | Some(e) -> e |> Seq.iter (fun e -> ServiceBus.Publish e)
        | None    -> None |> ignore
