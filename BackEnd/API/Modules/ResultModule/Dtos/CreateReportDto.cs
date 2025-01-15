
namespace API.Modules.ResultModule.Dtos
{
    public class CreateReportDto
    {
        public required string Status { get; set; }

        public DateTime DateExam { get; set; }

        public string? Priority { get; set; }

        public string? Observations { get; set; }

        public int PatientId { get; set; }

        public int? DoctorId { get; set; }

        public ICollection<int>? ExamIds { get; set; }

    }
}