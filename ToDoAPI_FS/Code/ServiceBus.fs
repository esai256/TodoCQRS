namespace ToDoAPI

module ServiceBus =
    let mutable subscriptions = Array.empty

    let subscriptionExists sub =
        subscriptions |> Array.exists (fun e -> e.name = sub.name)

    let Publish message =
        subscriptions
        |> Array.iter (fun sub -> message |> sub.handler)

    let Subscribe (subscription : Subscription) =
        if not (subscriptionExists subscription)
        then subscriptions <- subscriptions |> Array.append [| subscription |]

    let Unsubscribe (subscription : Subscription) =
        if (subscriptionExists subscription)
        then subscriptions <- subscriptions |> Array.filter (fun sub -> sub.name <> subscription.name)