namespace API.Modules.AuthModule.Dtos
{
    public class AuthAdminResponseDto
    {
        public required string FirstName { get; set; }

        public required string LastName { get; set; }

        public required string Email { get; set; }

        public required string Token { get; set; }
    }

    public class AuthPatientResponseDto
    {
        public required string FirstName { get; set; }

        public required string LastName { get; set; }

        public required string Token { get; set; }
    }
}
