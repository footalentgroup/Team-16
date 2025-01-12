using System.Text.Json;
using API.DataBase.Context;
using API.DataBase.Entities;
using API.DataBase.Repository;
using API.Modules.ResultModule.Dtos;
using API.Modules.ResultModule.Interfaces;
using API.Shared.Utils;
using AutoMapper;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;

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

                    // if (dto.ResultValue is string valueString)
                    // {
                    //     var r = new QualitativeResult()
                    //     {
                    //         ExamId = dto.ExamId,
                    //         Type = "qualitative",
                    //         ParameterId = dto.ParameterId,
                    //         ReportId = dto.ReportId,
                    //         DateResult = dto.DateResult,
                    //         Value = valueString
                    //     };
                    //     results.Add(r);

                    // }
                    // else if (dto.ResultValue as double? != null)
                    // {
                    //     var r = new QuantitativeResult()
                    //     {
                    //         ExamId = dto.ExamId,
                    //         Type = "Quantitative",
                    //         ParameterId = dto.ParameterId,
                    //         ReportId = dto.ReportId,
                    //         DateResult = dto.DateResult,
                    //         Value = Convert.ToDouble(dto.ResultValue)
                    //     };
                    //     results.Add(r);
                    // }
                    // else
                    // {
                    //     throw new ArgumentException("Invalid ResultValue type");
                    // }
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

        public async Task<ServiceResult<List<ResponseOrderDto>>> GetManyByPatientIdAsync(int patientId)
        {

            var result = await _context
                                    .Reports
                                    .Where(x => x.PatientId == patientId)
                                    .Select(x => new ResponseOrderDto()
                                    {
                                        DateExam = x.DateExam,
                                        Doctor = x.Doctor,
                                        ExamIds = x.ExamIds.ToList(),
                                        Id = x.Id,
                                        Patient = x.Patient,
                                        Results = x.Results.Select(r => CheckTypeResult.Check(r).ValueResult).ToList(),
                                        Status = x.Status
                                    }).ToListAsync();

            if (result == null)
            {
                return ServiceResult<List<ResponseOrderDto>>.FailedResult(StatusCodes.Status500InternalServerError, "Lista de roportes no encontrada");
            }

            return ServiceResult<List<ResponseOrderDto>>.SuccessResult(result);
        }
    }


}