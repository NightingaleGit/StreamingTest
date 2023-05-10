using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using StreamingTest.Graph.Backend.Application;

namespace StreamingTest.Graph.Backend.Ports.WebApi;

public static class WebAppBuilder
{
    public static void ConfigureWebApp(this WebApplication app)
    {
        var formulas = app.MapGroup("/formulas");
        formulas.MapGet("/", GetFormulas);
        formulas.MapGet("/{id:int}", GetFormulaById);
        formulas.MapPost("/", AddFormula);
        formulas.MapDelete("/{id:int}", DeleteFormula);
        formulas.MapPatch("/{id:int}", EditFormula);
    }

    private static async Task<IResult> EditFormula(int id, EditingFormulaDto formulaData, IFormulaService service)
    {
        await service.EditFormula(id, new(new(formulaData.Color.HexValue), formulaData.Formula));
        return Results.Ok();
    }

    private static async Task<IResult> DeleteFormula(int id, IFormulaService service)
    {
        await service.DeleteFormula(id);
        return Results.Ok();
    }

    private static async Task<IResult> AddFormula(CreatingFormulaDto dto, IFormulaService service)
    {
        return Results.Ok(await service.AddFormula(new Application.Contracts.Formulas.CreatingFormulaDto()
        {
            Color = new(dto.Color.HexValue),
            Formula = dto.Formula
        }));
    }

    private static async Task<IResult> GetFormulaById(int id, IFormulaService service)
    {
        return Results.Ok(MapToFormulaDto(await service.GetFormulaById(id)));
    }

    private static async Task<IResult> GetFormulas(IFormulaService service)
    {
        var formulas = await service.GetFormulas();
        return Results.Ok(formulas.Select(MapToFormulaDto));
    }

    private static FormulaDto MapToFormulaDto(Application.Contracts.Formulas.FormulaDto src)
    {
        return new FormulaDto()
        {
            Color = new ColorDto()
            {
                HexValue = src.Color.HexValue
            },
            Formula = src.Formula,
            Id = src.Id
        };
    }
}