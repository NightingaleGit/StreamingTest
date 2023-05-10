using System.Collections.Concurrent;
using Akka;
using Akka.Streams.Dsl;
using StreamingTest.Graph.Backend.Application.Contracts;
using StreamingTest.Graph.Backend.Application.Contracts.Points;

namespace StreamingTest.Graph.Backend.Application;

public class InMemoryStreamStorage: IStreamStorage
{
    private static readonly ConcurrentDictionary<string, Source<CalculatedPointsResult, NotUsed>> Storage = new ();

    public Source<CalculatedPointsResult, NotUsed> GetStream(string streamId)
    {
        return Storage[streamId];
    }

    public void RegisterStream(Source<CalculatedPointsResult, NotUsed> stream, string streamId)
    {
        if (!Storage.TryAdd(streamId, stream))
        {
            throw new ApplicationException($"Can't register stream with id {streamId}");
        }
    }
}