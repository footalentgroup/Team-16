namespace API.DataBase.Entities
{
    public class Report
    {
        public int Id { get; set; }

        public string Status { get; set; } = string.Empty;

        public string Priority { get; set; } = string.Empty;

        public string Observations { get; set; } = string.Empty;

        public DateTime DateExam { get; set; }

        public Patient Patient { get; set; }

        public int PatientId { get; set; }

        public Doctor? Doctor { get; set; }

        public int? DoctorId { get; set; }

        public ICollection<Result> Results { get; set; } = new List<Result>();

        public string ExamIds { get; set; } = string.Empty;

    }
}
