using System.Text.Json.Serialization;

namespace API.DataBase.Entities
{
    public class Exam
    {
        public int Id { get; set; }

        public required string Name { get; set; }

        public required string Sample { get; set; }

        public string? Description { get; set; }

        public required ICollection<ParameterBase> Parameters { get; set; }
        [JsonIgnore]
        public ICollection<OrderExam> OrderExams { get; set; } = new List<OrderExam>();

    }

    public abstract class ParameterBase
    {
        public int Id { get; set; }
        public required string Name { get; set; }
        public required string Type { get; set; }
        public int ExamId { get; set; }
        public required Exam Exam { get; set; }
    }

    public class QualitativeParameter : ParameterBase
    {
        public required string Reference { get; set; }
    }

    public class QuantitativeParameter : ParameterBase
    {
        public double MinValue { get; set; }
        public double MaxValue { get; set; }
        public required string Unit { get; set; }
        public string? Gender { get; set; }
    }
}
