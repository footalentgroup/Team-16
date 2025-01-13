using System.ComponentModel.DataAnnotations;

namespace API.Modules.PatientModule.Dtos
{
    public enum PersonalIDTypeDto
    {
        DNI,
        Passport
    }
    public class PatientCreateDto
    {
        [Required, RegularExpression("^[a-zA-Z]+$", ErrorMessage = "Solo puede contener letras"),
         MaxLength(14, ErrorMessage = "Debe tener una longitud menor a 14")]
        public required string FirstName { get; set; }

        [Required, RegularExpression("^[a-zA-Z]+$", ErrorMessage = "Solo puede contener letras"),
              MaxLength(14, ErrorMessage = "Debe tener una longitud menor a 14")]
        public required string LastName { get; set; }

        [Required, RegularExpression("^[0-9a-zA-Z]+$", ErrorMessage = "Solo puede contener letras y numeros"),
         MaxLength(14, ErrorMessage = "Debe tener una longitud menor a 14")]
        public required string PersonalID { get; set; }

        public required DateTime Birth { get; set; }

        public PersonalIDTypeDto PersonalIDType { get; set; }

        [Required]
        [EmailAddress(ErrorMessage = "Formato de email no valido")]
        public string? Email { get; set; }
        [Required, RegularExpression("^[+-]?[0-9]+$", ErrorMessage = "numero invalido"),
             MaxLength(25, ErrorMessage = "Debe tener una longitud menor a 25")]
        public string? Phone { get; set; }
    }

}