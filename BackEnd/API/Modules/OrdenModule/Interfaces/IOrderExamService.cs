using API.Shared.Utils;

namespace API.Modules.OrdenModule.Interfaces
{
    public interface IOrderExamService
    {

        Task<ServiceResult<bool>> CreateManyAsync(int orderId, List<int> examsId);

        Task<ServiceResult<bool>> UpdateManyAsync(int orderId, List<int> examsId);
    }
}
