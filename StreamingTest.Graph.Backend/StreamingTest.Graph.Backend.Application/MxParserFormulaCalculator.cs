using org.mariuszgromada.math.mxparser;
using StreamingTest.Graph.Backend.Application.Contracts.Points;

namespace StreamingTest.Graph.Backend.Application;

public class MxParserFormulaCalculator : IFormulaCalculator
{
    private readonly IFormulaService _formulaService;

    public MxParserFormulaCalculator(IFormulaService formulaService)
    {
        _formulaService = formulaService;
    }

    public async Task<CalculatedPointsResult> CalculateFormulas(Point arg)
    {
        var formulas = await _formulaService.GetFormulas();
        var calculatedPoints = formulas.ToList().Select(formula =>
            new CalculatedPoint(formula.Id, CalculateFormula(formula.Formula, arg.Value)));
        return new CalculatedPointsResult(arg, calculatedPoints);
    }

    private static double? CalculateFormula(string formula, double originalValue)
    {
        double? value = null;
        try
        {
            var x = new Argument("x", originalValue);

            var e = new Expression(formula, x);
            value = e.calculate();
        }
        catch (Exception exception)
        {
            //TODO: mark formula as failed
        }
        return value;
    }
}