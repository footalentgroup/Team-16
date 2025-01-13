namespace API.Modules.PatientModule.Dtos
{

    public class PatientResponseDto
    {
        public int Id { get; set; }

        public required string FirstName { get; set; }

        public required string LastName { get; set; }

        public required string PersonalID { get; set; }

        public PersonalIDTypeDto PersonalIDType { get; set; }

        public required DateTime Birth { get; set; }

        public string? Email { get; set; }

        public string? Phone { get; set; }
    }
}