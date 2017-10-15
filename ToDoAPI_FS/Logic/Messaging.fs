namespace ToDoAPI.Messaging

open ToDoAPI.Models

type Message = {
    type : string
    id : int
    task : Task
}

module Messages =
    let AddTask = "AddTask"
    let UpdateTask = "UpdateTask"
    let DeleteTask = "DeleteTask"

    let TaskAdded = "TaskAdded"
    let TaskUpdated = "TaskUpdated"
    let TaskDeleted = "TaskDeleted"

    let Create (id, task, messageType) =
        {
            type = messageType,
            id = id,
            task = task
        }

module ServiceBus =
    let mutable subscriptions = []

    let Publish message =
        subscriptions 
        |> Seq.filter (fun (type, h)    -> type = message.type)
        |> Seq.iter   (fun (t, handler) -> message |> handler)
        |> ignore

    let Subscribe type handler =
        subscriptions <- subscriptions::(type, handler)
        ignore

    let Unsubscribe type handler =
        let rec remove_first pred lst =
            match lst with
            | h::t when pred h -> t
            | h::t -> h::remove_first pred t
            | _ -> []

        subscriptions <- subscriptions |> remove_first (fun (type, handler) -> type = type && handler = handler)
        ignore