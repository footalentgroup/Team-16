using API.DataBase.Entities;
using API.Modules.ResultModule.Dtos;
using API.Shared.Utils;

namespace API.Modules.ResultModule.Interfaces
{
    public interface IResultService
    {
        Task<List<Result>> CreataManyAsync(List<CreateResultDto> resultsDto);

        Task<ServiceResult<UpdateResultDto>> UpdateResultDto(UpdateResultDto resultDto);

        Task<ServiceResult<object>> DeleteResult(int id);
    }

    public interface IReportService
    {

        Task<Report> CreateOrder(CreateReportDto createReportDto);

        Task<ServiceResult<List<ResponseReportDto>>> GetManyByPatientIdAsync(int patientId);

        Task<ServiceResult<List<ReportResponseWithoutResultsDto>>> GetAll();

        Task<ServiceResult<ResponseReportDto>> GetReportById(int reportId);

        Task<ServiceResult<object>> UpdateReport(UpdateReportDto updateDto);
    }
}