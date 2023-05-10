namespace StreamingTest.Graph.Backend.Application.Contracts.Points;

public record CalculatedPointsResult(Point OriginalPoint, IEnumerable<CalculatedPoint> CalculatedPoints);