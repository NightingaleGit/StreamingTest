using StreamingTest.Graph.Backend.Application.Contracts.Formulas;

namespace StreamingTest.Graph.Backend.Application;

public interface IFormulaService
{
    Task EditFormula(int id, EditingFormulaDto formulaData);

    Task DeleteFormula(int id);

    Task<FormulaCreationResultDto> AddFormula(CreatingFormulaDto dto);

    Task<FormulaDto> GetFormulaById(int id);

    Task<IEnumerable<FormulaDto>> GetFormulas();
}