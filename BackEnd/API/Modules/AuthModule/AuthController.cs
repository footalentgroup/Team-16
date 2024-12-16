using API.Modules.AuthModule.Dtos;
using Microsoft.AspNetCore.Mvc;

namespace API.Modules.AuthModule
{
    [ApiController]
    [Route("auth")]
    public class AuthController : ControllerBase
    {
        private readonly AuthService _authService;

        public AuthController(AuthService authService) {
            _authService = authService;
        }

        [HttpPost("admin-login")]
        public  ActionResult<AuthAdminResponseDto> Login(AuthAdminRequestDto authAdminRequestDto)
        {


            var response =  _authService.LoginAdmin();

            return Ok(response);
        }

    }
}
