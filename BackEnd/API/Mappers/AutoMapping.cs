using System.Globalization;
using API.DataBase.Entities;
using API.Modules.PatientModule.Dtos;
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
        }
    }
}
