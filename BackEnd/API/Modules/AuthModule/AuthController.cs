using API.DataBase.Entities;
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
        public async  Task<ActionResult<AuthAdminResponseDto>> Login(AuthAdminRequestDto authAdminRequestDto)
        {
            try
            {

            var response =  await _authService.LoginAdmin(authAdminRequestDto);

            return Ok(response);
            }catch (UnauthorizedAccessException ex)
            {
                return new UnauthorizedObjectResult(ex.Message);
            }
            catch (Exception ex)
            {
                return new BadRequestObjectResult(ex.InnerException + ":::" + ex.Message);
            }
        }

        [HttpPost("create-admin")]
        public async Task<ActionResult<AuthAdminResponseDto>> Create(Admin admin)
        {
           await  _authService.CreateAdmin(admin);

            return Ok();
        }

    }
}
