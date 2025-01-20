namespace API.Modules.OrdenModule.Dtos
{
    public class UpdateReportDto
    {

        public int Id { get; set; }

        public string? Status { get; set; }

        public string? Priority { get; set; }

        public string? Observations { get; set; }

        public DateTime? DateExam { get; set; }

        public int? PatientId { get; set; }

        public int? DoctorId { get; set; }

        public List<int>? ExamIds { get; set; } = new List<int>();
    }
}
