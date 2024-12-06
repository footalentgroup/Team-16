using Microsoft.AspNetCore.Mvc;

namespace BackEnd.Modules.User
{
    [ApiController]
    [Route("[controller]")]
    public class UserController:ControllerBase
    {


        [HttpGet]
        public string getHello()
        {
            return "Hello World";
        }
    }
}
