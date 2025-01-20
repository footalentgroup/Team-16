namespace API.Modules.ResultModule.Dtos
{

    public abstract class ResultResponseDto
    {
        public int Id { get; set; }

        public required string Type { get; set; }

        public string Parameter { get; set; }

        public DateTime? DateResult { get; set; }

        public string NameExam { get; set; }

        public string Reference { get; set; }
    }

    public class QualitativeResponseResultDto : ResultResponseDto
    {
        public required string ValueResult { get; set; }
    }

    public class QuantitativeResponseResultDto : ResultResponseDto
    {
        public required double ValueResult { get; set; }
    }
}
