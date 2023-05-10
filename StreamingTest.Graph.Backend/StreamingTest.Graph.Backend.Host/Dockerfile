FROM mcr.microsoft.com/dotnet/aspnet:7.0 AS base
WORKDIR /app
EXPOSE 8080
EXPOSE 8081

FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build
WORKDIR /src
COPY ["StreamingTest.Graph.Backend.Host/StreamingTest.Graph.Backend.Host.csproj", "StreamingTest.Graph.Backend.Host/"]
RUN dotnet restore "StreamingTest.Graph.Backend.Host/StreamingTest.Graph.Backend.Host.csproj"
COPY . .
WORKDIR "/src/StreamingTest.Graph.Backend.Host"
RUN dotnet build "StreamingTest.Graph.Backend.Host.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "StreamingTest.Graph.Backend.Host.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "StreamingTest.Graph.Backend.Host.dll"]
