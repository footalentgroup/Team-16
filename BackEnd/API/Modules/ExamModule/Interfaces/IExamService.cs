using API.Modules.ExamModule.Dtos;

namespace API.Modules.ExamModule.Interfaces
{
    public interface IExamService
    {
        Task<List<ExamSummaryDto>> GetAllExamsAsync();
        Task<ExamDto?> GetExamByIdAsync(int id);
        Task<ExamDto> CreateExamAsync(CreateExamDto createExamDto);
    }
}
