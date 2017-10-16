namespace ToDoAPI.Controllers

open Microsoft.AspNetCore.Mvc
open ToDoAPI

[<Route("fapi/[controller]")>]
type TasksController() =
    inherit Controller()

    // GET fapi/tasks
    [<HttpGet>]
    member this.Get() =
        ReadModel.getAll

    // GET fapi/tasks/5
    [<HttpGet("{id:guid}")>]
    member this.Get(id : System.Guid) =
        ReadModel.get (fun task -> task.id = id)

    // GET fapi/tasks/active
    [<HttpGet("{status:alpha}")>]
    member this.Get(status : string) =
        let isDone = 
            match status with
            | "active" -> Some(false)
            | "completed" -> Some(true)
            | _ -> None
        
        ReadModel.get (fun task -> task.isDone = match isDone with | Some(x) -> x | None -> task.isDone)

    // POST fapi/tasks
    [<HttpPost>]
    member this.Post([<FromBody>]task : TaskModel) =
        AddTaskCommand task
        |> ServiceBus.Publish
        |> ignore
        this.Get()
    
    // PUT fapi/tasks
    [<HttpPut>]
    member this.Put([<FromBody>]task : TaskModel) =
        let command = match task.isDone with
                      | true -> CompleteTaskCommand task.id
                      | false -> UpdateTaskCommand (task.id, task.title)
        command
        |> ServiceBus.Publish
        |> ignore
        this.Get()
    
    // DELETE fapi/tasks
    [<HttpDelete>]
    member this.Delete() =
        DeleteCompletedTasksCommand true
        |> ServiceBus.Publish
        |> ignore
        this.Get()
    
    // DELETE fapi/tasks/5
    [<HttpDelete("{id}")>]
    member this.Delete(id : System.Guid) =
        DeleteTaskCommand id
        |> ServiceBus.Publish
        |> ignore
        this.Get()
