using AutoMapper;
using BackEnd.Modules.UserModule.Dto;
using BackEnd.Modules.UserModule.Interfaces;
using BackEnd.Shared.Context;
using BackEnd.Shared.Entities;
using BackEnd.Shared.Repository;

namespace BackEnd.Modules.UserModule
{
    public class UserService:BaseRepository<User>,IUserService
    {

        public UserService(AppDbContext context, IMapper mapper) :base(context,mapper)
        {

        }

        public async Task<List<GetUserDto>> GetAll(int id)
        {
            throw new NotImplementedException();

        }

        public Task<AuthResponseDto> Login(AuthRequestDto createUserDto)
        {
            throw new NotImplementedException();
        }

        public Task<AuthResponseDto> Register(CreateRequestDto createUserDto)
        {
            throw new NotImplementedException();

        }
    }
}
