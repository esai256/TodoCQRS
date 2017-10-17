namespace ToDoAPI

///Facade to access the read model of the application
module ReadModel =

    ///Internal store of the read model
    let private items = ResizeArray<TaskModel>()
    items.Add({ id = System.Guid.NewGuid(); title = "Task 1"; isDone = true })
    items.Add({ id = System.Guid.NewGuid(); title = "Task 2"; isDone = true })
    items.Add({ id = System.Guid.NewGuid(); title = "Task 3"; isDone = true })

    ///<summary>
    ///Loads all items from the read model that apply to the specified <c>filter</c>
    ///</summary>
    ///<param name="filter">Predicate to apply on the read model</param>
    let get filter =
        items |> Seq.filter filter

    ///<summary>
    ///Loads the complete read model
    ///</summary>
    ///<returns>All items from the read model</returns>
    let getAll =
        items

    //let getCount =
    //    items |> Seq.length

    ///<summary>
    ///Adds the specified <c>task</c> to the read model
    ///</summary>
    ///<param name="task">Task to insert</param>
    let insertTask task =
        items.Add(task) |> ignore
    
    ///<summary>
    ///Returns the index of the Task with the specified <c>id</c>
    ///</summary>
    ///<param name="id">Task ID to find</param>
    ///<returns>Option with the index of the task with the specified <c>id</c>; otherwise <c>None</c></returns>
    let private findIndexById id =
        let index = items.FindIndex(fun i -> i.id = id)
        if index = -1 then None else Some(index)

    ///<summary>
    ///Sets the specified <c>title</c> of the task with the specified <c>id</c>
    ///</summary>
    ///<param name="id">ID of the task to update</param>
    ///<param name="title">New title to set</param>
    let updateTaskTitle id title =
        match (findIndexById id) with
        | Some(i) -> items.Item(i) <- { id = id; title = title; isDone = false }
        | None    -> "Task not found" |> ignore

    ///<summary>
    ///Sets the specified <c>isDone</c> status of the task with the specified <c>id</c>
    ///</summary>
    ///<param name="id">ID of the task to update</param>
    ///<param name="isDone">New status to set</param>
    let updateTaskStatus id isDone =
        match (findIndexById id) with
        | Some(i) -> items.Item(i) <- { id = items.[i].id; title = items.[i].title; isDone = isDone }
        | None    -> "Task not found" |> ignore     

    ///<summary>
    ///Deletes the task with the specified <c>id</c> from the read model
    ///</summary>
    ///<param name="id">ID of the task to delete</param>
    let deleteTask id =
        match findIndexById id with
        | Some(i) -> items.RemoveAt(i) |> ignore
        | None -> "Task not found" |> ignore
