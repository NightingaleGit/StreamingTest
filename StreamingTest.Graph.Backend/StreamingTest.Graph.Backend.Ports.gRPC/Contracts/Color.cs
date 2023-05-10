using ProtoBuf;

namespace StreamingTest.Graph.Backend.Ports.gRPC.Contracts;

[ProtoContract]
public record Color(string Value)
{
    [ProtoMember(1)] public string Value { get; set; } = Value;
}