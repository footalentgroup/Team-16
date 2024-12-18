namespace API.DataBase.Entities
{
    public enum PersonalIDType
    {
        DNI,
        Passport
    }
    public class Patient
    {
        public int Id { get; set; }

        public required string FirstName { get; set; }

        public required string LastName { get; set; }

        public required string PersonalID { get; set; }

        public PersonalIDType PersonalIDType { get; set; }

        public required string Password { get; set; }

        public string? Email { get; set; }

        public string? Phone { get; set; }

    }
}
