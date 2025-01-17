using API.DataBase.Context;
using API.DataBase.Entities;
using API.DataBase.Repository;
using API.Modules.ResultModule.Dtos;
using API.Modules.ResultModule.Interfaces;
using API.Shared.Utils;
using AutoMapper;
using System.Text.Json;

namespace API.Modules.ResultModule
{

    public class ResultService : BaseRepository<Result>, IResultService
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