namespace ToDoAPI

module ReadModel =

    let mutable private items = [
        { id = 1; title = "Task 1"; isDone = true };
        { id = 2; title = "Task 2"; isDone = true };
        { id = 3; title = "Task 3"; isDone = true }//;
        //{ id = 4; title = "Task 4"; isDone = false };
        //{ id = 5; title = "Task 5"; isDone = false };
        //{ id = 6; title = "Task 6"; isDone = false };
        //{ id = 7; title = "Task 7"; isDone = false };
        //{ id = 8; title = "Task 8"; isDone = false };
        //{ id = 9; title = "Task 9"; isDone = false }
    ]

    let private findIndexById id =
        items |> List.tryFindIndex (fun i -> i.id = id)

    let get filter =
        items |> List.filter filter

    let getAll =
        items //get (fun t -> t.id = t.id)

    let insertTask task =
        items <- List.append items [task]
    
    let updateTaskTitle id title =
        match (findIndexById id) with
        | Some(i) -> items <- items |> List.map (fun task -> if task.id = id then { id = items.[i].id; title = title; isDone = items.[i].isDone } else task)
        | None    -> "Task not found" |> ignore

    let updateTaskStatus id isDone =
        match (findIndexById id) with
        | Some(i) -> items <- items |> List.map (fun task -> if task.id = id then { id = items.[i].id; title = items.[i].title; isDone = isDone } else task)
        | None    -> "Task not found" |> ignore     

    let deleteTask id =
        items <- get (fun i -> i.id <> id)
