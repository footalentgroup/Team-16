﻿namespace BackEnd.Modules.UserModule.Dto
{
    public class CreateRequestDto
    {
        public string Name { get; set; }

        public string LastName { get; set; }

        public string Email { get; set; }

        public string Password { get; set; }

        public string Role { get; set; }
    }
}
