using StreamingTest.Graph.Backend.Application.Contracts.Points;

namespace StreamingTest.Graph.Backend.Application;

public interface IFormulaCalculator
{
    Task<CalculatedPointsResult> CalculateFormulas(Point arg);
}