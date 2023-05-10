using Akka;
using Akka.Streams.Dsl;
using StreamingTest.Graph.Backend.Application.Contracts;
using StreamingTest.Graph.Backend.Application.Contracts.Points;

namespace StreamingTest.Graph.Backend.Application;

public interface IStreamStorage
{
    Source<CalculatedPointsResult, NotUsed> GetStream(string streamId);
    void RegisterStream(Source<CalculatedPointsResult, NotUsed> stream, string streamId);
}