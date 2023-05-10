using ProtoBuf;

namespace StreamingTest.Graph.Backend.Ports.gRPC.Contracts;

[ProtoContract]
public record Formula(int Id, string FormulaString, Color Color)
{
    [ProtoMember(1)]
    public int Id { get; set; } = Id;

    [ProtoMember(2)]
    public string FormulaString { get; set; } = FormulaString;

    [ProtoMember(3)]
    public Color Color { get; set; } = Color;
}