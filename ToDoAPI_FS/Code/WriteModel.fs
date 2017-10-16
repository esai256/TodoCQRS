namespace ToDoAPI

module Repository =
    let save (aggregate : Aggregate option) =
        match aggregate with
        | Some(a) -> Some(a.Events)
        | None    -> None

module EventStore = 
    let mutable private storedEvents : Message list = []

    let save (newEvents : Message seq option) =
        match newEvents with
        | Some(e) -> let newEventList = e |> Seq.toList
                     storedEvents <- storedEvents |> List.append newEventList
        | None    -> None |> ignore
        newEvents

    let publish (newEvents : Message seq option) =
        match newEvents with
        | Some(e) -> e |> Seq.iter (fun e -> ServiceBus.Publish e)
        | None    -> None |> ignore
