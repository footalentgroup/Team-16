namespace API.Modules.DoctorModule.Dtos
{
    public class CreateDoctorDto
    {
        public required string Name { get; set; }

        public required string LastName { get; set; }

        public required string Registration { get; set; }
    }
}
