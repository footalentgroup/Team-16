namespace API.Modules.PatientModule.Dtos
{

    public enum PersonalIDType
    {
        DNI,
        Passport
    }
    public class PatientCreateDto
    {

        public required string FirstName { get; set; }

        public required string LastName { get; set; }

        public required string PersonalID { get; set; }

        public required DateTime Birth { get; set; }

        public PersonalIDType PersonalIDType { get; set; }

        public string? Email { get; set; }

        public string? Phone { get; set; }
    }

}