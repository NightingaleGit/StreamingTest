using System.ServiceModel;
using StreamingTest.Graph.Backend.Ports.gRPC.Contracts;
using CalculatedPointsResult = StreamingTest.Graph.Backend.Ports.gRPC.Contracts.CalculatedPointsResult;

namespace StreamingTest.Graph.Backend.Ports.gRPC;

[ServiceContract(Name = "StreamingTest.Graph.Backend.Ports.gRPC.PointsService")]
public interface IPointsService
{
    [OperationContract]
    Task PushPoints(StreamParam streamParam);
    [OperationContract]
    IAsyncEnumerable<CalculatedPointsResult> ReceivePoints(StreamParam streamParam);
}