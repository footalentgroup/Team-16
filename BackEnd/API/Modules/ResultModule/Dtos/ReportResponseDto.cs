using API.DataBase.Entities;

namespace API.Modules.ResultModule.Dtos
{
    public class ReportResponseWithoutResultsDto
    {
        public int Id { get; set; }

        public string Status { get; set; }

        public string? Priority { get; set; }

        public string? Observations { get; set; }

        public DateTime DateExam { get; set; }

        public Patient Patient { get; set; }

        public Doctor? Doctor { get; set; }

        public ICollection<int>? ExamIds { get; set; }
    }
}
