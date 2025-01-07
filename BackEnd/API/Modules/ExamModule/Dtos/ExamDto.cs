namespace API.Modules.ExamModule.Dtos
{
  public class ExamDto
  {
    public int Id { get; set; }
    public required string Name { get; set; }
    public required string Sample { get; set; }
    public string? Description { get; set; }
    public required List<ParameterDto> Parameters { get; set; }
  }

 public class ExamSummaryDto
{
    public int Id { get; set; }
    public required string Name { get; set; }
    public required string Sample { get; set; }
    public string? Description { get; set; }
}

  public class CreateExamDto
  {
    public required string Name { get; set; }
    public required string Sample { get; set; }
    public string? Description { get; set; }
    public required List<ParameterDto> Parameters { get; set; }
  }

  public abstract class ParameterDto
  {
    public int Id { get; set; }
    public required string Name { get; set; }
    public required string Type { get; set; }
  }

  public class QualitativeParameterDto : ParameterDto
  {
    public required string Reference { get; set; }
  }

  public class QuantitativeParameterDto : ParameterDto
  {
    public double MinValue { get; set; }
    public double MaxValue { get; set; }
    public required string Unit { get; set; }
    public string? Gender { get; set; }
  }
}
