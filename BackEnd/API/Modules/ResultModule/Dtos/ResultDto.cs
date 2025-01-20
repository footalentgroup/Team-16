namespace API.Modules.ResultModule.Dtos
{
    public class CreateResultDto
    {
        public int ParameterId { get; set; }

        public int ReportId { get; set; }

        public required object ResultValue { get; set; }

        public DateTime? DateResult { get; set; }
    }

    public class UpdateResultDto
    {
        public int Id { get; set; }

        public int ParameterId { get; set; }

        public required object ResultValue { get; set; }

        public DateTime? DateResult { get; set; }
    }
}