namespace API.Modules.ResultModule.Dtos
{
    public class CreateResultDto
    {
        public int ExamId { get; set; }

        public int ParameterId { get; set; }

        public int ReportId { get; set; }

        public string Type { get; set; }

        public required object ResultValue { get; set; }

        public DateTime? DateResult { get; set; }
    }
}