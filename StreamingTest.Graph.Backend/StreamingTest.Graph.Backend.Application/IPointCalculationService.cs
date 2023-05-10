using StreamingTest.Graph.Backend.Application.Contracts;
using StreamingTest.Graph.Backend.Application.Contracts.Points;

namespace StreamingTest.Graph.Backend.Application;

public interface IPointCalculationService
{
    Task CalculatePoints(string streamId);
    IAsyncEnumerable<CalculatedPointsResult> ReceivePoints(string streamId);
}