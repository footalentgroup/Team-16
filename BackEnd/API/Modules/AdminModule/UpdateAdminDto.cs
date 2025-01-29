namespace API.Modules.AdminModule
{
    public class UpdateAdminDto
    {
        public int Id { get; set; }

        public string? Name { get; set; }

        public string? LastName { get; set; }

        public string? Email { get; set; }

        public string? Password { get; set; }
    }
}
