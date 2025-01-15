
using API.DataBase.Entities;

namespace API.Modules.ResultModule.Dtos
{
    public class ResponseReportDto
    {

        public int Id { get; set; }

        public string Status { get; set; }

        public DateTime DateExam { get; set; }

        public Patient Patient { get; set; }

        public string? Observations { get; set; }

        public string? Priority { get; set; }

        public Doctor? Doctor { get; set; }

        public List<ResultResponseDto> Results { get; set; }

        public List<int>? ExamIds { get; set; }

    }


    public abstract class ResultResponseDto
    {
        public int Id { get; set; }

        public required string Type { get; set; }

        public string Parameter { get; set; }

        public DateTime? DateResult { get; set; }

        public string Reference { get; set; }
    }

    public class QualitativeResponseResultDto : ResultResponseDto
    {
        public required string ValueResult { get; set; }
    }

    public class QuantitativeResponseResultDto : ResultResponseDto
    {
        public required double ValueResult { get; set; }
    }
}