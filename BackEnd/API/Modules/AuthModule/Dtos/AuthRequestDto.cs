namespace API.Modules.AuthModule.Dtos
{
    public class AuthAdminRequestDto
    {
        public required string Email { get; set; }

        public required string Password { get; set; }
    }

    public class AuthPatientRequestDto
    {
        public required string PersonalID { get; set; }

        public required string PersonalIDType { get; set; }

        public required string Password { get; set; }
    }
}
