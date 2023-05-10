using ProtoBuf;

namespace StreamingTest.Graph.Backend.Ports.gRPC.Contracts;

[ProtoContract]
public record CalculatedPointsResult
{
    [ProtoMember(1)] public Point OriginalPoint { get; set; }
    [ProtoMember(2)] public IEnumerable<CalculatedPoint> CalculatedPoints { get; set; }
}