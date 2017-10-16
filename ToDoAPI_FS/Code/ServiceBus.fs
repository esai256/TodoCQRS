namespace ToDoAPI

open System.Collections.Generic
open System.Linq

module ServiceBus =
    let private subscriptions = new ResizeArray<Subscription>()

    let subscriptionExists sub =
        subscriptions 
        |> Seq.exists (fun e -> e.name = sub.name)

    let Publish message =
        subscriptions
        |> Seq.iter (fun sub -> message |> sub.handler)

    let Subscribe (subscription : Subscription) =
        if not (subscriptionExists subscription)
        then subscriptions.Add(subscription) |> ignore

    let Unsubscribe (subscription : Subscription) =
        if (subscriptionExists subscription)
        then subscriptions.Remove(subscription) |> ignore