using System.Text.Json.Serialization;

namespace API.DataBase.Entities
{
    public class Order
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

        [JsonIgnore]
        public ICollection<OrderExam> OrderExams { get; set; } = new List<OrderExam>();

    }
}
