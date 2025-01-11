using API.DataBase.Context;
using API.Modules.PatientModule.Interfaces;
using API.Modules.PatientModule.Dtos;
using API.DataBase.Entities;
using AutoMapper;
using API.DataBase.Repository;
using Microsoft.EntityFrameworkCore;
using API.Shared.Utils;

namespace API.Modules.PatientModule
{
    public class PatientService : BaseRepository<Patient>, IPatientService
    {
        private readonly IMapper _mapper;

        public PatientService(AppDbContext context, IMapper mapper) : base(context, mapper)
        {
            _mapper = mapper;
        }

        public IMapper Mapper { get; }

        public async Task<ServiceResult<Patient>> CreatePatient(PatientCreateDto patientDto)
        {
            var password = CreatePassword();
            try
            {
                Patient patient = _mapper.Map<Patient>(patientDto);

                patient.Password = BCrypt.Net.BCrypt.HashPassword(password);

                var response = await Add(patient);

                await _context.SaveChangesAsync();

                patient.Password = password;
                return ServiceResult<Patient>.SuccessResult(patient);
            }
            catch (Exception ex)
            {
                return ServiceResult<Patient>.FailedResult(500, ex.Message);
            }
        }

        public async Task<ServiceResult<PatientUpdateDto>> UpdatePatient(PatientUpdateDto patientUpdate)
        {
            try
            {
                Patient patient = await GetById(patientUpdate.Id) ??
                                            throw new Exception("Not Found");

                patient.FirstName = patientUpdate.FirstName;
                patient.LastName = patientUpdate.LastName;
                patient.Phone = patientUpdate.Phone;
                patient.Birth = patientUpdate.Birth;
                patient.Email = patientUpdate.Email;

                await Update(patient);

                return ServiceResult<PatientUpdateDto>.SuccessResult(patientUpdate);
            }
            catch (Exception ex)
            {
                return ServiceResult<PatientUpdateDto>.FailedResult(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        public async Task<ServiceResult<PatientResponseDto>> FindById(int id)
        {
            try
            {

                Patient? patient = await GetById(id);

                if (patient == null)
                {
                    return ServiceResult<PatientResponseDto>.FailedResult(StatusCodes.Status404NotFound, "Patient not found");

                }

                var patientDto = _mapper.Map<PatientResponseDto>(patient);
                return ServiceResult<PatientResponseDto>.SuccessResult(patientDto);
            }
            catch (Exception ex)
            {
                return ServiceResult<PatientResponseDto>.FailedResult(StatusCodes.Status500InternalServerError, ex.Message);

            }


        }

        public async Task<ServiceResult<List<PatientResponseDto>>> Search(string? fullname, string? personalId)
        {
            try
            {
                IQueryable<Patient> query = _context.Patients;
                if (fullname != null)
                {
                    string[] arrStr = fullname.Split(" ", StringSplitOptions.RemoveEmptyEntries);

                    foreach (var s in arrStr)
                    {
                        query = query.Where(std => EF.Functions.Like(std.FirstName.ToLower(), $"%{s.ToLower()}%") ||
                                      EF.Functions.Like(std.LastName.ToLower(), $"%{s.ToLower()}%")
                              );
                    }
                }

                if (personalId != null)
                {
                    query = query.Where(s => EF.Functions.Like(s.PersonalID, $"%{personalId}%"));
                }

                List<Patient> patients = await query.ToListAsync();

                var patienDto = _mapper.Map<List<PatientResponseDto>>(patients);
                return ServiceResult<List<PatientResponseDto>>.SuccessResult(patienDto);
            }
            catch (Exception ex)
            {
                return ServiceResult<List<PatientResponseDto>>.FailedResult(StatusCodes.Status500InternalServerError, ex.Message);

            }
        }

        public async Task<ServiceResult<List<PatientResponseDto>>> GetAll()
        {

            var response = await _dbSet.ToListAsync();

            return ServiceResult<List<PatientResponseDto>>.SuccessResult(_mapper.Map<List<PatientResponseDto>>(response));
        }
        private string CreatePassword()
        {
            const string validChars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
            Random random = new Random();

            string password = new string(Enumerable.Range(0, 10)
                                                    .Select(_ => validChars[random.Next(validChars.Length)])
                                                    .ToArray());

            return password;
        }
    }

}