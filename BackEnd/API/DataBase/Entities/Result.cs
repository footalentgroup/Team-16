namespace API.DataBase.Entities
{
    public class Result
    {
        public int Id { get; set; }

        public required string Type { get; set; }

        public required Exam Exam { get; set; }

        public int ExamId { get; set; }

        public required Patient Patient { get; set; }

        public int PatientId { get; set; }

        public required ParameterBase Parameter { get; set; }

        public int ParameterId { get; set; }

        public DateTime Date { get; set; }
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