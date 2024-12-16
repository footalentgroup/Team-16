namespace API.DataBase.Entities
{
    public class Patient
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string LastName { get; set; }

        public string Email { get; set; }

        public int DNI { get; set; }

        public string Phone { get; set; }

        public string Password { get; set; }
    }
}
