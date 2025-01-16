using API.DataBase.Entities;
using API.Modules.ResultModule.Dtos;
using API.Shared.Utils;

namespace API.Modules.ResultModule.Interfaces
{
    public interface IReportService
    {
        Task<Report> CreateOrder(CreateReportDto createReportDto);

        Task<ServiceResult<List<ResponseReportDto>>> GetManyByPatientIdAsync(int patientId);

        Task<ServiceResult<List<ReportResponseWithoutResultsDto>>> GetAll(string? status);

        Task<ServiceResult<ResponseReportDto>> GetReportById(int reportId);

        Task<ServiceResult<object>> UpdateReport(UpdateReportDto updateDto);
    }
}
