namespace ToDoAPI

module ReadModel =

    let private items = ResizeArray<TaskModel>()
    items.Add({ id = System.Guid.NewGuid(); title = "Task 1"; isDone = true })
    items.Add({ id = System.Guid.NewGuid(); title = "Task 2"; isDone = true })
    items.Add({ id = System.Guid.NewGuid(); title = "Task 3"; isDone = true })
    items.Add({ id = System.Guid.NewGuid(); title = "Task 4"; isDone = false })
    items.Add({ id = System.Guid.NewGuid(); title = "Task 5"; isDone = false })
    items.Add({ id = System.Guid.NewGuid(); title = "Task 6"; isDone = false })
    items.Add({ id = System.Guid.NewGuid(); title = "Task 7"; isDone = false })
    items.Add({ id = System.Guid.NewGuid(); title = "Task 8"; isDone = false })
    items.Add({ id = System.Guid.NewGuid(); title = "Task 9"; isDone = false })

    let private findIndexById id =
        let index = items.FindIndex(fun i -> i.id = id)
        match index with
        | -1 -> None
        | _  -> Some(index)

    let get filter =
        items |> Seq.filter filter

    let getAll =
        items

    let getCount =
        items |> Seq.length

    let insertTask task =
        items.Add(task) |> ignore
    
    let updateTaskTitle id title =
        match (findIndexById id) with
        | Some(i) -> items.Item(i) <- { id = items.[i].id; title = title; isDone = false }
                     "Task updated" |>  ignore
        | None    -> "Task not found" |> ignore

    let updateTaskStatus id isDone =
        match (findIndexById id) with
        | Some(i) -> items.Item(i) <- { id = items.[i].id; title = items.[i].title; isDone = isDone }
        | None    -> "Task not found" |> ignore     

    let deleteTask id =
        match findIndexById id with
        | Some(i) -> items.RemoveAt(i) |> ignore
        | None -> "Task not found" |> ignore
