using API.DataBase.Entities;
using API.Modules.ResultModule.Dtos;

namespace API.Modules.ResultModule.Interfaces
{
    public interface IResultService
    {
        Task<List<Result>> CreataManyAsync(List<CreateResultDto> resultsDto);

        Task<Report> CreateOrder(CreateReportDto createReportDto);
    }
}