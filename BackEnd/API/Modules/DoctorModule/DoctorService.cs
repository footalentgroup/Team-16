using API.DataBase.Context;
using API.DataBase.Entities;
using API.DataBase.Repository;
using API.Modules.DoctorModule.Dtos;
using API.Modules.DoctorModule.Interfaces;
using API.Shared.Utils;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

namespace API.Modules.DoctorModule
{
    public class DoctorService : BaseRepository<Doctor>, IDoctorService
    {
        public DoctorService(AppDbContext database, IMapper mapper) : base(database, mapper)
        {
        }

        public async Task<ServiceResult<Doctor>> GetByIdAsync(int Id)
        {

            try
            {
                var result = await GetById(Id);

                if (result == null)
                {
                    return ServiceResult<Doctor>.FailedResult(StatusCodes.Status404NotFound, "Doctor no encontrado");
                }

                return ServiceResult<Doctor>.SuccessResult(result);
            }
            catch (Exception ex)
            {
                return ServiceResult<Doctor>.FailedResult(StatusCodes.Status500InternalServerError, ex.Message + ex?.InnerException);
            }
        }
        public async Task<ServiceResult<List<Doctor>>> GetAllAsync()
        {
            try
            {
                var result = await _dbSet.ToListAsync();

                return ServiceResult<List<Doctor>>.SuccessResult(result);
            }
            catch (Exception ex)
            {
                return ServiceResult<List<Doctor>>.FailedResult(StatusCodes.Status500InternalServerError, ex.Message + ex?.InnerException);
            }
        }
        public async Task<ServiceResult<Doctor>> CreateAsync(CreateDoctorDto createDto)
        {
            try
            {
                var entity = await AddWithDto(createDto);

                if (entity == null)
                {
                    return ServiceResult<Doctor>.FailedResult(StatusCodes.Status500InternalServerError, "Error al crear doctor");
                }

                return ServiceResult<Doctor>.SuccessResult(entity, StatusCodes.Status201Created);

            }
            catch (Exception ex)
            {
                return ServiceResult<Doctor>.FailedResult(StatusCodes.Status500InternalServerError, ex.Message + ex?.InnerException);
            }
        }
        public async Task<ServiceResult<object>> UpdateAsync(Doctor doctor)
        {
            try
            {
                await Update(doctor);

                return ServiceResult<object>.SuccessResult(true);
            }
            catch (Exception ex)
            {
                return ServiceResult<object>.FailedResult(StatusCodes.Status500InternalServerError, ex.Message + ex?.InnerException);
            }
        }
        public async Task<ServiceResult<Doctor>> DeleteAsync(int id)
        {
            try
            {
                var entity = await GetById(id);

                if (entity == null)
                {
                    return ServiceResult<Doctor>.FailedResult(StatusCodes.Status404NotFound, "Doctor no encontrado");
                }

                await Delete(entity);

                return ServiceResult<Doctor>.SuccessResult(entity);

            }
            catch (Exception ex)
            {
                return ServiceResult<Doctor>.FailedResult(StatusCodes.Status500InternalServerError, ex.Message + ex?.InnerException);
            }
        }


    }
}
