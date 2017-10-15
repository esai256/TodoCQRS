namespace ToDoAPI.Controllers

open Microsoft.AspNetCore.Mvc
open ToDoAPI.Messaging

[<Route("fapi/[controller]")>]
type TasksController() =
    inherit Controller()

    let processQuery =
        ReadModelFacade.Get

    let processCommand =
        Commands.Create >> ServiceBus.Publish >> ignore

    // GET fapi/tasks
    [<HttpGet>]
    member this.Get() =
        None |> processQuery

    // GET fapi/tasks/5
    [<HttpGet("{id}")>]
    member this.Get(id:int) =
        Some(id) |> processQuery

    // POST fapi/tasks
    [<HttpPost>]
    member this.Post([<FromBody>]task:Task) =
        (None, Some(task), Command.AddTask) |> processCommand
    
    // PUT fapi/tasks/5
    [<HttpPut("{id}")>]
    member this.Put(id:int, [<FromBody>]task:Task) =
        (Some(id), Some(task), Commands.UpdateTask) |> processCommand
    
    // DELETE fapi/tasks/5
    [<HttpDelete("{id}")>]
    member this.Delete(id:int) =
        (Some(id), None, Commands.DeleteTask) |> processCommand
