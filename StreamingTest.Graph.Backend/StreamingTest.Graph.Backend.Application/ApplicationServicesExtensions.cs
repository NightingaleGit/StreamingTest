using Akka.Actor;
using Akka.Streams;
using Microsoft.Extensions.DependencyInjection;

namespace StreamingTest.Graph.Backend.Application;

public static class ApplicationServicesExtensions
{
    public static void RegisterApplicationDependencies(this IServiceCollection collection)
    {
        collection.AddSingleton<IActorRefFactory>((provider) => ActorSystem.Create("Point-Calculation"));
        collection.AddSingleton<IMaterializer>((provider) => provider.GetService<IActorRefFactory>().Materializer());
        collection.AddSingleton<IPointCalculationService, AkkaPointCalculationService>();
        collection.AddSingleton<IStreamStorage, InMemoryStreamStorage>();
        collection.AddSingleton<IFormulaService, InMemoryFormulaService>();
        collection.AddSingleton<IFormulaCalculator, MxParserFormulaCalculator>();
    }
}