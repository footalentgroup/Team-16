namespace API.DataBase.Entities
{
    public class Doctor
    {
        public int Id { get; set; }

        public required string Name { get; set; }

        public required string LastName { get; set; }

        public required string Registration { get; set; }
    }
}
