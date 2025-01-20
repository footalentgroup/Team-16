using API.DataBase.Entities;
using API.Modules.DoctorModule.Dtos;
using API.Modules.OrdenModule.Dtos;
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

            CreateMap<Order, CreateReportDto>().ReverseMap();


            CreateMap<Doctor, CreateDoctorDto>().ReverseMap();

        }




    }
}
