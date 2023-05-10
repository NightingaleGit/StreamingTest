using ProtoBuf;

namespace StreamingTest.Graph.Backend.Ports.gRPC.Contracts;

[ProtoContract]
public record CalculatedPoint
{
    [ProtoMember(1)] public double? Value { get; set; }
    [ProtoMember(2)] public int FormulaId { get; set; }
    
}