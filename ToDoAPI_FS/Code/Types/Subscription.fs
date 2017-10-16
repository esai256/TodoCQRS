namespace ToDoAPI

type Subscription = {
    name: string;
    handler: Message -> unit
}
