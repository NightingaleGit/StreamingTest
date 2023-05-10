using Akka;
using Akka.Actor;
using Akka.Streams;
using Akka.Streams.Dsl;
using StreamingTest.Graph.Backend.Application.Contracts.Points;

namespace StreamingTest.Graph.Backend.Application;

public class AkkaPointCalculationService : IPointCalculationService
{
    private readonly IMaterializer _materializer;
    private readonly IStreamStorage _streamStorage;
    private readonly IFormulaCalculator _formulaCalculator;

    public AkkaPointCalculationService(IMaterializer materializer, IStreamStorage streamStorage,
        IFormulaCalculator formulaCalculator)
    {
        _materializer = materializer;
        _streamStorage = streamStorage;
        _formulaCalculator = formulaCalculator;
    }

    public Task CalculatePoints(string streamId)
    {
        var pointsSource = Source
            .Tick(TimeSpan.FromSeconds(1), TimeSpan.FromSeconds(1), "Tick!"
            ).Select(_ => new Point(Value: Random.Shared.Next(0, 10), PointTime: DateTime.Now));
        var pointsCalculationFlow = Flow.Create<Point>().SelectAsync(10, _formulaCalculator.CalculateFormulas);
        var calculationFlow = pointsSource
            .Via(pointsCalculationFlow)
            .ToMaterialized(BroadcastHub.Sink<CalculatedPointsResult>(bufferSize: 256), Keep.Right);


        var broadcastSource = calculationFlow.Run(_materializer);
        _streamStorage.RegisterStream(broadcastSource, streamId);
        return Task.CompletedTask;
    }

    public IAsyncEnumerable<CalculatedPointsResult> ReceivePoints(string streamId)
    {
        return _streamStorage.GetStream(streamId).RunAsAsyncEnumerable(_materializer);
    }
}