namespace ToDoAPI

///Repository to save incoming events in the event store
module Repository =

    ///<summary>
    ///Saves the events from the specified <c>aggregate</c> in the event store
    ///</summary>
    ///<param name="aggregate">Enumeration of events to save</param>
    let save (aggregate : Message seq option) =
        match aggregate with
        | Some(a) -> Some(a)
        | None    -> None

module EventStore = 

    ///Internal store of the stored events
    let private storedEvents = new ResizeArray<Message>()

    ///<summary>
    ///Saves the specified events
    ///</summary>
    ///<param name="newEvents">Enumeration of events to save</param>
    let save (newEvents : Message seq option) =
        match newEvents with
        | Some(e) -> storedEvents.AddRange(e)
        | None    -> None |> ignore
        newEvents

    ///<summary>
    ///Publishes the specified events to the service bus
    ///</summary>
    ///<param name="newEvents">Enumeration of events to publish</param>
    let publish (newEvents : Message seq option) =
        match newEvents with
        | Some(e) -> e |> Seq.iter ServiceBus.Publish
        | None    -> None |> ignore
