using BackEnd.Modules.UserModule.Dto;

namespace BackEnd.Modules.UserModule.Interfaces
{
    public interface IUserService
    {
        Task<AuthResponseDto> Register(CreateRequestDto createUserDto);

        Task<AuthResponseDto> Login(AuthRequestDto createUserDto);

        Task<List<GetUserDto>> GetAll(int id);
    }
}
