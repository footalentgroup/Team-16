using API.DataBase.Entities;
using API.Modules.PatientModule.Dtos;
using API.Shared.Utils;

namespace API.Modules.PatientModule.Interfaces
{
    public interface IPatientService
    {

        Task<ServiceResult<Patient>> CreatePatient(PatientCreateDto patientDto);

        Task<ServiceResult<PatientUpdateDto>> UpdatePatient(PatientUpdateDto patientUpdate);

        Task<ServiceResult<Patient>> FindById(int id);
        Task<ServiceResult<List<Patient>>> Search(string? fullname, string? personalId);

    }
}