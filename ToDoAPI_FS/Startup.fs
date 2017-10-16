namespace ToDoAPI

open System
open System.Collections.Generic
open System.Linq
open System.Threading.Tasks
open Microsoft.AspNetCore.Builder
open Microsoft.AspNetCore.Hosting
open Microsoft.Extensions.Configuration
open Microsoft.Extensions.DependencyInjection
open Microsoft.Extensions.Logging

type Startup (env:IHostingEnvironment)=

    let builder = ConfigurationBuilder()
                    .SetBasePath(env.ContentRootPath)
                    .AddJsonFile("appsettings.json", true, true)
                    .AddJsonFile((sprintf "appsettings.%s.json" env.EnvironmentName), true)
                    .AddEnvironmentVariables()

    let configuration = builder.Build()

    // This method gets called by the runtime. Use this method to add services to the container.
    member this.ConfigureServices (services:IServiceCollection) =
        // Add framework services.
        services.AddMvc() |> ignore

    // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
    member this.Configure(app:IApplicationBuilder, env:IHostingEnvironment, loggerFactory: ILoggerFactory) =
    
        loggerFactory
            .AddConsole(configuration.GetSection("Logging"))
            .AddDebug()
            |> ignore

        app.UseMvc() |> ignore

        // Register command handlers and event handlers at service bus
        ServiceBus.Subscribe { name = "CmdAddTask"; handler = CommandHandlers.addTask }
        ServiceBus.Subscribe { name = "CmdUpdateTask"; handler = CommandHandlers.updateTask }
        ServiceBus.Subscribe { name = "CmdCompleteTask"; handler = CommandHandlers.completeTask }
        ServiceBus.Subscribe { name = "CmdDeleteTask"; handler = CommandHandlers.deleteTask }
        ServiceBus.Subscribe { name = "CmdDeleteCompletedTasks";  handler = CommandHandlers.deleteCompletedTasks }
        ServiceBus.Subscribe { name = "EvtTaskAdded"; handler = EventHandlers.taskAdded }
        ServiceBus.Subscribe { name = "EvtTaskTitleUpdated"; handler = EventHandlers.taskTitleUpdated }
        ServiceBus.Subscribe { name = "EvtTaskStatusUpdated"; handler = EventHandlers.taskStatusUpdated }
        ServiceBus.Subscribe { name = "EvtTaskDeleted"; handler = EventHandlers.taskDeleted }
