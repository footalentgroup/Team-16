using API.DataBase.Entities;
using API.Modules.OrdenModule.Dtos;
using API.Shared.Utils;

namespace API.Modules.OrdenModule.Interfaces
{
    public interface IOrderService
    {
        Task<ServiceResult<Order>> CreateOrder(CreateReportDto createReportDto);

        Task<ServiceResult<List<ReportResponseWithResultsDto>>> GetManyByPatientIdAsync(int patientId);

        Task<ServiceResult<List<ReportResponseDto>>> GetAll(string? status);

        Task<ServiceResult<ReportResponseWithResultsDto>> GetOrderById(int reportId);

        Task<ServiceResult<object>> UpdateOrder(UpdateReportDto updateDto);
    }
}
