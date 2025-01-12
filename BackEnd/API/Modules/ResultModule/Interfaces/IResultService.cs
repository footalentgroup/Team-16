using API.DataBase.Entities;
using API.Modules.ResultModule.Dtos;
using API.Shared.Utils;

namespace API.Modules.ResultModule.Interfaces
{
    public interface IResultService
    {
        Task<List<Result>> CreataManyAsync(List<CreateResultDto> resultsDto);

        Task<Report> CreateOrder(CreateReportDto createReportDto);
    }

    public interface IReportService
    {
        Task<ServiceResult<List<ResponseOrderDto>>> GetManyByPatientIdAsync(int patientId);
    }
}