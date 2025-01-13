namespace API.DataBase.Entities
{
    public class Report
    {
        public int Id { get; set; }

        public string Status { get; set; }

        public DateTime DateExam { get; set; }

        public Patient Patient { get; set; }

        public int PatientId { get; set; }

        public Doctor? Doctor { get; set; }

        public int? DoctorId { get; set; }

        public ICollection<Result> Results { get; set; } = new List<Result>();

        public ICollection<int>? ExamIds { get; set; }

    }
}
