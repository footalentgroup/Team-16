namespace API.DataBase.Entities
{
    public abstract class Result
    {
        public int Id { get; set; }

        public required string Type { get; set; }

        public Order Order { get; set; }

        public int OrderId { get; set; }

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