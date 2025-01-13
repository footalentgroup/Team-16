namespace API.DataBase.Entities
{
    public abstract class Result
    {
        public int Id { get; set; }

        public required string Type { get; set; }

        public Exam Exam { get; set; }

        public int ExamId { get; set; }

        public Report Report { get; set; }

        public int ReportId { get; set; }

        public ParameterBase Parameter { get; set; }

        public int ParameterId { get; set; }

        public DateTime? DateResult { get; set; }

    }

    public class QualitativeResult : Result
    {
        public required string Value { get; set; }
    }

    public class QuantitativeResult : Result
    {
        public required double Value { get; set; }
    }
}