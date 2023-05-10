using StreamingTest.Graph.Backend.Application.Contracts.Formulas;

namespace StreamingTest.Graph.Backend.Application;

public class InMemoryFormulaService : IFormulaService
{
    private readonly SynchronizedCollection<FormulaInternal> _formulasStore = new()
    {
        new FormulaInternal(0, "x+1", "#bf4042"),
        new FormulaInternal(1, "x+2", "#3B862D"),
    };
    private readonly SemaphoreSlim _addLock = new(1, 1);

    public Task EditFormula(int id, EditingFormulaDto formulaData)
    {
        var formula = GetFormulaInternalById(id);
        formula.EditFormula(formulaData.Formula, formulaData.Color.HexValue);
        return Task.CompletedTask;
    }

    public Task DeleteFormula(int id)
    {
        var formula = GetFormulaInternalById(id);
        if (!_formulasStore.Remove(formula))
        {
            throw new ApplicationException($"Can't delete formula with id={id}!");
        }
        return Task.CompletedTask;
    }

    public async Task<FormulaCreationResultDto> AddFormula(CreatingFormulaDto dto)
    {
        var newId = 0;
        await _addLock.WaitAsync();
        try
        {
            if (_formulasStore.Any())
            {
                newId = _formulasStore.Max(formula => formula.Id) + 1;
            }

            _formulasStore.Add(new FormulaInternal(newId, dto.Formula, dto.Color.HexValue));
        }
        finally
        {
            _addLock.Release();
        }

        return new FormulaCreationResultDto() { CreatedFormulaId = newId };
    }

    public Task<FormulaDto> GetFormulaById(int id)
    {
        var formula = GetFormulaInternalById(id);

        return Task.FromResult(MapToFormulaDto(formula));
    }

    public Task<IEnumerable<FormulaDto>> GetFormulas()
    {
        return Task.FromResult(_formulasStore.Select(MapToFormulaDto).ToList().AsEnumerable());
    }

    private class FormulaInternal
    {
        public FormulaInternal(int id, string stringRepresentation, string hexColor)
        {
            Id = id;
            StringRepresentation = stringRepresentation;
            HexColor = hexColor;
        }

        public int Id { get; protected set; }
        public string StringRepresentation { get; protected set; }
        public string HexColor { get; protected set; }

        public void EditFormula(string stringRepresentation, string hexColor)
        {
            StringRepresentation = stringRepresentation;
            HexColor = hexColor;
        }
    }

    private static FormulaDto MapToFormulaDto(FormulaInternal src) =>
        new FormulaDto()
        {
            Id = src.Id,
            Color = new ColorDto(src.HexColor),
            Formula = src.StringRepresentation
        };

    private FormulaInternal GetFormulaInternalById(int id)
    {
        var formula = _formulasStore.FirstOrDefault(f => f.Id == id);
        if (formula == null)
        {
            throw new ApplicationException($"formula with id={id} not found!");
        }

        return formula;
    }
}