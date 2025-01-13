using API.DataBase.Entities;
using API.Modules.DoctorModule.Dtos;
using API.Shared.Utils;

namespace API.Modules.DoctorModule.Interfaces
{
    public interface IDoctorService
    {
        Task<ServiceResult<Doctor>> CreateAsync(CreateDoctorDto createDto);
        Task<ServiceResult<Doctor>> DeleteAsync(int id);
        Task<ServiceResult<List<Doctor>>> GetAllAsync();
        Task<ServiceResult<Doctor>> GetByIdAsync(int Id);
        Task<ServiceResult<object>> UpdateAsync(Doctor doctor);
    }
}