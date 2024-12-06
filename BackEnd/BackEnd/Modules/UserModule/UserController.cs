using BackEnd.Modules.UserModule.Dto;
using BackEnd.Modules.UserModule.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace BackEnd.Modules.UserModule
{
    [ApiController]
    [Route("[controller]")]
    public class UserController:ControllerBase
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpPost("login")]
        public async Task<ActionResult<AuthResponseDto>> Login([FromBody] AuthRequestDto authRequestDto)

        {
            var response = await _userService.Login(authRequestDto);

            if(response == null)
            {
                throw new Exception();
            }

            return Ok(response);
        }
    }
}
