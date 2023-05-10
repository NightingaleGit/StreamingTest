using StreamingTest.Graph.Backend.Application;
using StreamingTest.Graph.Backend.Ports.gRPC.Contracts;
using CalculatedPointsResult = StreamingTest.Graph.Backend.Ports.gRPC.Contracts.CalculatedPointsResult;
using Point = StreamingTest.Graph.Backend.Ports.gRPC.Contracts.Point;

namespace StreamingTest.Graph.Backend.Ports.gRPC;

public class PointsService : IPointsService
{
    private readonly IPointCalculationService _calculationService;

    public PointsService(IPointCalculationService calculationService)
    {
        _calculationService = calculationService;
    }

    //TODO: to mapper
    private static CalculatedPointsResult MapToResult(Application.Contracts.Points.CalculatedPointsResult result)
    {
        return new CalculatedPointsResult()
        {
            OriginalPoint = new Point()
            {
                Value = result.OriginalPoint.Value,
                PointTime = result.OriginalPoint.PointTime
            },
            CalculatedPoints = result.CalculatedPoints.Select(point => new CalculatedPoint()
            {
                Value = point.Value,
                FormulaId = point.FormulaId
            })
        };
    }

    public async Task PushPoints(StreamParam streamParam)
    {
        await _calculationService.CalculatePoints(streamParam.StreamId);
    }

    public IAsyncEnumerable<CalculatedPointsResult> ReceivePoints(StreamParam streamParam)
    {
        return _calculationService.ReceivePoints(streamParam.StreamId).Select(MapToResult);
    }
}