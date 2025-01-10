namespace API.Modules.ResultModule.Dtos
{
    public class CreateResultDto
    {

        public int ExamId { get; set; }

        public int PatientId { get; set; }

        public int ParameterId { get; set; }

        public DateTime Date { get; set; }

        public required object ResultValue { get; set; }
    }
}