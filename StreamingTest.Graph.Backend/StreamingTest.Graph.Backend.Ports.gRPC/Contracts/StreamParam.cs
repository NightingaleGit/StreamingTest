using ProtoBuf;

namespace StreamingTest.Graph.Backend.Ports.gRPC.Contracts;

[ProtoContract]
public record StreamParam
{
    [ProtoMember(1)]
    public string StreamId { get; set; }
}