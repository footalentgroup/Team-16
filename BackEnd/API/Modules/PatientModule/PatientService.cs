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
        private readonly AppDbContext _context;

        public PatientService(AppDbContext context, IMapper mapper) : base(context, mapper)
        {
            _context = context;
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

        public async Task<ServiceResult<Patient>> FindById(int id)
        {
            try
            {

                Patient? patient = await GetById(id);

                if (patient == null)
                {
                    return ServiceResult<Patient>.FailedResult(StatusCodes.Status404NotFound, "Patient not found");

                }

                return ServiceResult<Patient>.SuccessResult(patient);
            }
            catch (Exception ex)
            {
                return ServiceResult<Patient>.FailedResult(StatusCodes.Status500InternalServerError, ex.Message);

            }


        }

        public async Task<ServiceResult<List<Patient>>> Search(string? fullname, string? personalId)
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

                return ServiceResult<List<Patient>>.SuccessResult(patients);
            }
            catch (Exception ex)
            {
                return ServiceResult<List<Patient>>.FailedResult(StatusCodes.Status500InternalServerError, ex.Message);

            }
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