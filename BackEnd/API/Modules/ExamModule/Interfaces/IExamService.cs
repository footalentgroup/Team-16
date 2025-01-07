using API.Modules.ExamModule.Dtos;

namespace API.Modules.ExamModule.Interfaces
{
    public interface IExamService
    {
        Task<ExamDto?> GetExamByIdAsync(int id);
    }
}
