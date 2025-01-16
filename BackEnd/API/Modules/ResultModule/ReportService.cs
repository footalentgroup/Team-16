using API.DataBase.Context;
using API.DataBase.Entities;
using API.DataBase.Repository;
using API.Modules.ResultModule.Dtos;
using API.Modules.ResultModule.Interfaces;
using API.Shared.Utils;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

namespace API.Modules.ResultModule
{
    public class ReportService : BaseRepository<Report>, IReportService
    {
        private readonly IMapper _mapper;
        private Dictionary<int, string>? dic;
        public ReportService(AppDbContext context, IMapper mapper) : base(context, mapper)
        {
            _mapper = mapper;

        }

        public async Task<Report> CreateOrder(CreateReportDto createReportDto)
        {
            createReportDto.ExamIds = createReportDto?.ExamIds ?? new List<int>();

            var report = _mapper.Map<Report>(createReportDto);

            var result = await _context.Reports.AddAsync(report);

            await _context.SaveChangesAsync();

            return result.Entity;
        }

        public async Task<ServiceResult<List<ResponseReportDto>>> GetManyByPatientIdAsync(int patientId)
        {

            var result = await _context
                                    .Reports
                                    .Where(x => x.PatientId == patientId)
                                    .Include(x => x.Results)
                                    .ThenInclude(r => r.Parameter)
                                    .Select(x => new
                                    {
                                        x.DateExam,
                                        x.Doctor,
                                        x.ExamIds,
                                        x.Id,
                                        x.Patient,
                                        x.Status,
                                        x.Priority,
                                        x.Observations,
                                        Results = x.Results.ToList()
                                    }).ToListAsync();

            if (dic == null)
            {
                dic = await _context.Parameters.Include(x => x.Exam).ToDictionaryAsync(parameter => parameter.Id, param => param.Exam.Name);
            }

            var response = result.Select(x => new ResponseReportDto()
            {
                DateExam = x.DateExam,
                Doctor = x.Doctor,
                ExamIds = x.ExamIds.Split(",", StringSplitOptions.RemoveEmptyEntries).Select(int.Parse).ToList(),
                Id = x.Id,
                Patient = x.Patient,
                Status = x.Status,
                Priority = x.Priority,
                Observations = x.Observations,
                Results = x.Results.Select(x =>
                {
                    var param = x.Parameter;
                    string examName = GetExamByParameterId(param.Id);

                    return CheckTypeResult.Check(x, param, examName);
                }).ToList()
            }).ToList();

            if (result == null)
            {
                return ServiceResult<List<ResponseReportDto>>.FailedResult(StatusCodes.Status500InternalServerError, "Lista de roportes no encontrada");
            }

            return ServiceResult<List<ResponseReportDto>>.SuccessResult(response);
        }


        public async Task<ServiceResult<List<ReportResponseWithoutResultsDto>>> GetAll(string? status)
        {
            try
            {
                IQueryable<Report> query = _context.Reports;


                if (!string.IsNullOrEmpty(status))
                {
                    query = query.Where(x => x.Status == status);
                }

                var response = await query.Select(x => new
                {
                    DateExam = x.DateExam,
                    Doctor = x.Doctor,
                    ExamIds = x.ExamIds ?? "",
                    Id = x.Id,
                    Observations = x.Observations ?? "",
                    Patient = x.Patient,
                    Priority = x.Priority ?? "",
                    Status = x.Status ?? "",
                }).ToListAsync();



                var responseDto = response.Select(x => new ReportResponseWithoutResultsDto()
                {
                    DateExam = x.DateExam,
                    Doctor = x.Doctor,
                    ExamIds = x.ExamIds.Split(",", StringSplitOptions.RemoveEmptyEntries).Select(int.Parse).ToList(),
                    Id = x.Id,
                    Observations = x.Observations,
                    Patient = x.Patient,
                    Priority = x.Priority,
                    Status = x.Status,
                }).ToList();

                return ServiceResult<List<ReportResponseWithoutResultsDto>>.SuccessResult(responseDto);

            }
            catch (Exception ex)
            {
                return ServiceResult<List<ReportResponseWithoutResultsDto>>.FailedResult(StatusCodes.Status500InternalServerError, ex.Message + ex?.InnerException);

            }
        }
        public async Task<ServiceResult<ResponseReportDto>> GetReportById(int reportId)
        {
            try
            {
                var result = await _context
                               .Reports
                               .Where(x => x.Id == reportId)
                               .Include(x => x.Doctor)
                               .Include(x => x.Results)
                               .ThenInclude(r => r.Parameter)
                               .ThenInclude(r => r.Exam)
                               .Select(x => new
                               {
                                   x.DateExam,
                                   x.Doctor,
                                   x.ExamIds,
                                   x.Id,
                                   x.Patient,
                                   x.Status,
                                   x.Priority,
                                   x.Observations,
                                   Results = x.Results.ToList()
                               }).FirstOrDefaultAsync();

                if (result == null)
                {
                    return ServiceResult<ResponseReportDto>.FailedResult(StatusCodes.Status404NotFound, " roporte no encontrada");
                }

                if (dic == null)
                {
                    dic = await _context.Parameters.Include(x => x.Exam).ToDictionaryAsync(parameter => parameter.Id, param => param.Exam.Name);
                }

                ResponseReportDto response = new ResponseReportDto()
                {
                    DateExam = result.DateExam,
                    Doctor = result.Doctor,
                    ExamIds = result.ExamIds.Split(",", StringSplitOptions.RemoveEmptyEntries).Select(int.Parse).ToList(),
                    Id = result.Id,
                    Patient = result.Patient,
                    Status = result.Status,
                    Priority = result.Priority,
                    Observations = result.Observations,
                    Results = result.Results.Select(x =>
                    {
                        var param = x.Parameter;
                        string examName = GetExamByParameterId(param.Id);
                        return CheckTypeResult.Check(x, param, examName);
                    }).ToList()
                };


                return ServiceResult<ResponseReportDto>.SuccessResult(response);

            }
            catch (Exception ex)
            {
                return ServiceResult<ResponseReportDto>.FailedResult(StatusCodes.Status500InternalServerError, ex.Message + ex?.InnerException);

            }
        }

        public async Task<ServiceResult<object>> UpdateReport(UpdateReportDto updateDto)
        {
            try
            {
                var report = await _context.Reports.FirstOrDefaultAsync(report => report.Id == updateDto.Id);

                if (report == null)
                {
                    return ServiceResult<object>.FailedResult(StatusCodes.Status404NotFound, "Orden No encontrado");
                }
                var updatedReport = new Report()
                {
                    Id = report.Id,
                    Priority = updateDto?.Priority ?? report.Priority,
                    Observations = updateDto?.Observations ?? report.Observations,
                    Status = updateDto?.Status ?? report.Status,
                    PatientId = updateDto?.PatientId ?? report.PatientId,
                    ExamIds = updateDto?.ExamIds != null ? string.Join(",", updateDto.ExamIds) : report.ExamIds,
                    DateExam = updateDto?.DateExam ?? report.DateExam,
                    DoctorId = updateDto?.DoctorId ?? report.DoctorId,
                };


                _context.Entry(report).CurrentValues.SetValues(updatedReport);
                await _context.SaveChangesAsync();

                return ServiceResult<object>.SuccessResult(updatedReport);
            }
            catch (Exception ex)
            {
                return ServiceResult<object>.FailedResult(StatusCodes.Status500InternalServerError, ex.Message + ex?.InnerException);

            }
        }


        private string GetExamByParameterId(int parameterId)
        {

            if (dic.TryGetValue(parameterId, out string examName))
            {
                return examName;
            }
            else
            {
                return "";
            }
        }

    }
}
