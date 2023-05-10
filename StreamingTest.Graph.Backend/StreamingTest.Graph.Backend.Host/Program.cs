using System.Diagnostics;
using System.Net;
using Microsoft.AspNetCore.Server.Kestrel.Core;
using ProtoBuf.Grpc.Reflection;
using ProtoBuf.Grpc.Server;
using ProtoBuf.Meta;
using StreamingTest.Graph.Backend.Application;
using StreamingTest.Graph.Backend.Ports.gRPC;
using StreamingTest.Graph.Backend.Ports.WebApi;

var builder = WebApplication.CreateBuilder(args);


builder.WebHost.ConfigureKestrel(options =>
{
    options.Listen(IPAddress.Any, 8081, o => o.Protocols =
        HttpProtocols.Http2);
    
    options.Listen(IPAddress.Any, 8080, o => o.Protocols =
        HttpProtocols.Http1);
});

const string corsPolicy = "_corsPolicy";
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: corsPolicy,
        policy  =>
        {
            policy.AllowAnyOrigin()
                .AllowAnyHeader()
                .AllowAnyMethod();
        });
});
builder.Services.RegisterApplicationDependencies();
builder.Services.AddGrpc();
builder.Services.AddCodeFirstGrpc();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(); 

var app = builder.Build();

app.UseSwagger();
app.UseSwaggerUI();
app.UseCors(corsPolicy);
app.MapGrpcService<PointsService>();

app.ConfigureWebApp();

if (Debugger.IsAttached)
{
    var generator = new SchemaGenerator
    {
        ProtoSyntax = ProtoSyntax.Proto3
    };

    var schema = generator.GetSchema<IPointsService>(); // there is also a non-generic overload that takes Type

    using (var writer = new System.IO.StreamWriter("services.proto"))
    {
        await writer.WriteAsync(schema);
    }
}

app.Run();