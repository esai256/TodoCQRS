namespace ToDoAPI

///Model representing a single task
type TaskModel = {
    ///ID of the task
    id : System.Guid; 
    ///Title of the task
    title : string;
    ///Completion status of the task
    isDone : bool
}
