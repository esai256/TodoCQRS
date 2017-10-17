open System
open System.IO
open Microsoft.Extensions.Configuration
open Microsoft.AspNetCore.Hosting

open ToDoAPI

[<EntryPoint>]
let main argv =

    let config = ConfigurationBuilder()
                    .AddCommandLine(argv)
                    .AddEnvironmentVariables("ASPNETCORE_")
                    .Build()

    let host = WebHostBuilder()
                    .UseConfiguration(config)
                    .UseKestrel()
                    .UseContentRoot(Directory.GetCurrentDirectory())
                    .UseIISIntegration()
                    .UseStartup<Startup>()
                    .Build()
    host.Run();

    0 // return an integer exit code
