using API.DataBase.Entities;
using API.Modules.AuthModule.Dtos;
using API.Shared.Extensions;
using API.Shared.Utils;
using Microsoft.AspNetCore.Mvc;

namespace API.Modules.AuthModule
{
    [ApiController]
    [Route("auth")]
    public class AuthController : ControllerBase
    {
        private readonly AuthService _authService;

        public AuthController(AuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("admin-login")]
        public async Task<IActionResult> Login(AuthAdminRequestDto authAdminRequestDto)
        {
            try
            {
                ServiceResult<AuthAdminResponseDto> response = await _authService.LoginAdmin(authAdminRequestDto);

                return response.ToActionResult();
            }
            catch (UnauthorizedAccessException ex)
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
            try
            {
                await _authService.CreateAdmin(admin);

                return Ok();
            }
            catch (Exception ex)
            {
                return new BadRequestObjectResult(ex.InnerException + ":::" + ex.Message);
            }
        }

        [HttpPost("patient-login")]
        public async Task<IActionResult> Login(AuthPatientRequestDto authPatientRequestDto)
        {
            try
            {

                ServiceResult<AuthPatientResponseDto> response = await _authService.LoginPatient(authPatientRequestDto);

                return response.ToActionResult();
            }
            catch (Exception ex)
            {
                return new BadRequestObjectResult(ex.InnerException + ":::" + ex.Message);
            }
        }

        [HttpPost("create-patient")]
        public async Task<ActionResult<AuthPatientResponseDto>> Create(Patient patient)
        {
            await _authService.CreatePatient(patient);

            return Ok();
        }

    }
}
