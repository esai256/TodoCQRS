namespace ToDoAPI

///Service bus to (un)register message handlers and publish messages
module ServiceBus =

    ///Internal store of the registered subscriptions
    let private subscriptions = new ResizeArray<(Message -> unit)>()

    ///<summary>
    ///Publishes the specified <c>message</c> to all registered subscribers
    ///</summary>
    ///<param name="message">Message to publish</param>
    let Publish message =
        let apply handle =
            handle message

        subscriptions |> Seq.iter apply

    ///<summary>
    ///Registers the specified message <c>handler</c> in the service bus
    ///</summary>
    ///<param name="handler">Message handler to apply when a message is published</param>
    let Subscribe handler =
        if not (subscriptions.Contains(handler))
        then subscriptions.Add(handler) |> ignore

    ///<summary>
    ///Unregisters the specified message <c>handler</c> from the service bus
    ///</summary>
    ///<param name="handler">Message handler to not apply any more when a message is published</param>
    let Unsubscribe handler =
        if subscriptions.Contains(handler)
        then subscriptions.Remove(handler) |> ignore