using API.DataBase.Entities;
using API.Modules.ResultModule.Dtos;

namespace API.Modules.OrdenModule.Dtos
{
    public class ReportResponseDto
    {
        public int Id { get; set; }

        public string Status { get; set; }

        public string? Priority { get; set; }

        public string? Observations { get; set; }

        public DateTime DateExam { get; set; }

        public Patient Patient { get; set; }

        public Doctor? Doctor { get; set; }

        public List<ExamResponseDto>? ExamIds { get; set; }
    }

    public class ReportResponseWithResultsDto : ReportResponseDto
    {
        public List<ResultResponseDto> Results { get; set; }

    }

    public class ExamResponseDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
    }
}
