using API.DataBase.Entities;
using API.Modules.DoctorModule.Dtos;
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

            CreateMap<Result, CreateResultDto>();

            CreateMap<Report, CreateReportDto>();

            CreateMap<CreateReportDto, Report>()
             .ForMember(dest => dest.ExamIds,
                  opt => opt.MapFrom(src => string.Join(",", src.ExamIds ?? new List<int>())));

            CreateMap<Doctor, CreateDoctorDto>().ReverseMap();

        }




    }
}
