using System.Globalization;
using API.DataBase.Entities;
using API.Modules.PatientModule.Dtos;
using API.Modules.ResultModule.Dtos;
using AutoMapper;

namespace API.Mappers
{
    public class AutoMapping : Profile
    {
        public AutoMapping()
        {
            CreateMap<Patient, PatientCreateDto>().ReverseMap();
            CreateMap<Patient, PatientUpdateDto>().ReverseMap();
            CreateMap<Patient, PatientResponseDto>().ReverseMap();

            CreateMap<CreateResultDto, Result>().ConvertUsing(dto => mapResult(dto));

            CreateMap<Result, CreateResultDto>();

            CreateMap<Report, CreateReportDto>().ReverseMap();

        }

        private static Result mapResult(CreateResultDto dto)
        {
            if (dto.ResultValue is string)
            {
                return new QualitativeResult()
                {
                    ExamId = dto.ExamId,
                    Type = "qualitative",
                    ParameterId = dto.ParameterId,
                    ReportId = dto.ReportId,
                    DateResult = dto.DateResult,
                    Value = dto.ResultValue.ToString()
                };
            }
            else if (dto.ResultValue is decimal || dto.ResultValue is int || dto.ResultValue is double)
            {
                return new QuantitativeResult()
                {
                    ExamId = dto.ExamId,
                    Type = "Quantitative",
                    ParameterId = dto.ParameterId,
                    ReportId = dto.ReportId,
                    DateResult = dto.DateResult,
                    Value = Convert.ToDouble(dto.ResultValue)
                };
            }
            else
            {
                throw new ArgumentException("Invalid ResultValue type");
            }
        }
    }
}
