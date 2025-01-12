using API.DataBase.Context;
using API.DataBase.Entities;
using API.DataBase.Repository;
using API.Modules.ResultModule.Dtos;
using API.Modules.ResultModule.Interfaces;
using API.Shared.Utils;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using System.Text.Json;

namespace API.Modules.ResultModule
{

    public class ResultService : BaseRepository<Result>, IResultService, IReportService
    {
        private readonly IMapper _mapper;

        public ResultService(AppDbContext context, IMapper mapper) : base(context, mapper)
        {
            _mapper = mapper;
        }

        public async Task<List<Result>> CreataManyAsync(List<CreateResultDto> resultsDto)
        {
            List<Result> results = new List<Result>();

            foreach (var dto in resultsDto)
            {
                if (dto.ResultValue is JsonElement jsonElement)
                {
                    if (jsonElement.ValueKind == JsonValueKind.Number && jsonElement.TryGetDouble(out double value))
                    {
                        var r = new QuantitativeResult()
                        {
                            ExamId = dto.ExamId,
                            Type = "quantitative",
                            ParameterId = dto.ParameterId,
                            ReportId = dto.ReportId,
                            DateResult = dto.DateResult,
                            Value = value
                        };
                        results.Add(r);

                    }
                    else if (jsonElement.ValueKind == JsonValueKind.String)
                    {
                        var r = new QualitativeResult()
                        {
                            ExamId = dto.ExamId,
                            Type = "qualitative",
                            ParameterId = dto.ParameterId,
                            ReportId = dto.ReportId,
                            DateResult = dto.DateResult,
                            Value = jsonElement.GetString()
                        };
                        results.Add(r);
                    }
                    else
                    {
                        throw new Exception($"Tipo de JSON no esperado: {jsonElement.ValueKind}");
                    }

                }

            }
            await _dbSet.AddRangeAsync(results);
            await _context.SaveChangesAsync();

            return results;

        }

        public async Task<Report> CreateOrder(CreateReportDto createReportDto)
        {

            var report = _mapper.Map<Report>(createReportDto);

            var result = await _context.Reports.AddAsync(report);

            await _context.SaveChangesAsync();

            return result.Entity;
        }

        public async Task<ServiceResult<object>> DeleteResult(int id)
        {
            try
            {
                var entity = await GetById(id);

                await Delete(entity);

                return ServiceResult<object>.SuccessResult(true);
            }
            catch (Exception ex)
            {
                return ServiceResult<object>.FailedResult(StatusCodes.Status500InternalServerError, ex.Message + ex?.InnerException);
            }
        }

        public async Task<ServiceResult<List<ResponseReportDto>>> GetManyByPatientIdAsync(int patientId)
        {

            var result = await _context
                                    .Reports
                                    .Where(x => x.PatientId == patientId)
                                    .Select(x => new
                                    {
                                        x.DateExam,
                                        x.Doctor,
                                        ExamIds = x.ExamIds.ToList(),
                                        x.Id,
                                        x.Patient,
                                        x.Status,
                                        Results = x.Results.ToList()
                                    }).ToListAsync();

            var response = result.Select(x => new ResponseReportDto()
            {
                DateExam = x.DateExam,
                Doctor = x.Doctor,
                ExamIds = x.ExamIds,
                Id = x.Id,
                Patient = x.Patient,
                Status = x.Status,
                Results = x.Results.Select(x => CheckTypeResult.Check(x)).ToList()
            }).ToList();

            if (result == null)
            {
                return ServiceResult<List<ResponseReportDto>>.FailedResult(StatusCodes.Status500InternalServerError, "Lista de roportes no encontrada");
            }

            return ServiceResult<List<ResponseReportDto>>.SuccessResult(response);
        }

        public async Task<ServiceResult<UpdateResultDto>> UpdateResultDto(UpdateResultDto dto)
        {
            try
            {
                var entity = _context.Results.FirstOrDefault(e => e.Id == dto.Id);
                if (dto.ResultValue is JsonElement jsonElement)
                {
                    if (jsonElement.ValueKind == JsonValueKind.Number && jsonElement.TryGetDouble(out double value))
                    {
                        var result = new QuantitativeResult()
                        {
                            Id = entity.Id,
                            ExamId = dto.ExamId,
                            Type = "quantitative",
                            ParameterId = dto.ParameterId,
                            DateResult = dto.DateResult,
                            ReportId = entity.ReportId,
                            Value = value
                        };

                        _context.Entry(entity).CurrentValues.SetValues(result);
                        await _context.SaveChangesAsync();
                    }
                    else if (jsonElement.ValueKind == JsonValueKind.String)
                    {
                        var result = new QualitativeResult()
                        {
                            Id = entity.Id,
                            ReportId = entity.ReportId,
                            ExamId = dto.ExamId,
                            Type = "qualitative",
                            ParameterId = dto.ParameterId,
                            DateResult = dto.DateResult,
                            Value = jsonElement.GetString()
                        };

                        _context.Entry(entity).CurrentValues.SetValues(result);
                        await _context.SaveChangesAsync();
                    }
                    else
                    {
                        throw new Exception($"Tipo de JSON no esperado: {jsonElement.ValueKind}");
                    }

                }
                else
                {
                    throw new Exception("is not json element");
                }
                return ServiceResult<UpdateResultDto>.SuccessResult(dto);
            }
            catch (Exception ex)
            {
                return ServiceResult<UpdateResultDto>.FailedResult(StatusCodes.Status500InternalServerError, ex.Message + ex?.InnerException);

            }


        }
    }


}