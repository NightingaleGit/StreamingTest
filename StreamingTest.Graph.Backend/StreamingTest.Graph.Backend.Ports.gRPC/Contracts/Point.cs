using ProtoBuf;

namespace StreamingTest.Graph.Backend.Ports.gRPC.Contracts;

[ProtoContract]
public record Point
{
    [ProtoMember(1, DataFormat = DataFormat.WellKnown)]
    public DateTime PointTime { get; set; }

    [ProtoMember(2)] public double? Value { get; set; }
}