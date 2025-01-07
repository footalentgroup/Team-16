namespace API.Modules.PatientModule.Dtos
{
    public class PatientUpdateDto
    {
        public required int Id { get; set; }
        public required string FirstName { get; set; }

        public required string LastName { get; set; }

        public required DateTime Birth { get; set; }

        public string? Email { get; set; }

        public string? Phone { get; set; }
    }
}
