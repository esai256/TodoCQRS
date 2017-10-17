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
    [<HttpGet("{id:int}")>]
    member this.Get(id : int) =
        ReadModel.get (fun task -> task.id = id)

    // GET fapi/tasks/done
    // GET fapi/tasks/undone
    [<HttpGet("{status:alpha}")>]
    member this.Get(status : string) =
        let isDone = 
            match status with
            | "done"   -> Some(true)
            | "undone" -> Some(false)
            | _ -> None
        
        ReadModel.get (fun task -> task.isDone = match isDone with | Some(x) -> x | None -> task.isDone)

    // POST fapi/tasks
    [<HttpPost>]
    member this.Post([<FromBody>]task : TaskModel) =
        AddTaskCommand task
        |> ServiceBus.Publish
        |> ignore

    // PUT fapi/tasks/3
    [<HttpPut("{id:int}")>]
    member this.UpdateTitle(id : int, [<FromBody>]title : string) =
        UpdateTaskCommand (id, title)
        |> ServiceBus.Publish
        |> ignore

    // PUT fapi/tasks/3/done
    [<HttpPut("{id:int}/{status:alpha}")>]
    member this.UpdateStatus(id : int, status : string) =
        let command = match status with
                      | "done" -> CompleteTaskCommand id
                      | "undone" -> UncompleteTaskCommand id
                      | _ -> InvalidCommand (sprintf "Unknown status: \"%s\"" status)

        command
        |> ServiceBus.Publish
        |> ignore
        
    // DELETE fapi/tasks
    [<HttpDelete>]
    member this.Delete() =
        DeleteCompletedTasksCommand true
        |> ServiceBus.Publish
        |> ignore
    
    // DELETE fapi/tasks/5
    [<HttpDelete("{id}")>]
    member this.Delete(id : int) =
        DeleteTaskCommand id
        |> ServiceBus.Publish
        |> ignore
