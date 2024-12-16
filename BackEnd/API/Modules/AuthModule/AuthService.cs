using API.Modules.AuthModule.Dtos;
using API.Modules.AuthModule.Interfaces;

namespace API.Modules.AuthModule
{
    public class AuthService
    {
        private readonly ITokenService _tokenService;

        public AuthService(ITokenService tokenService) {
            _tokenService = tokenService;
        }

        public  AuthAdminResponseDto LoginAdmin()
        {
            return  new AuthAdminResponseDto()
            {
                Email= "admin@gmail.com",
                LastName= "last",
                Name = "Name",
                Token = _tokenService.CreateAdminToken("45", "admin@gmail.com")
            };
        }
    }
}
