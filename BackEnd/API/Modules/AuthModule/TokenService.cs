using API.Modules.AuthModule.Interfaces;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace API.Modules.AuthModule
{

    public static class Roles
    {
        public const string Admin = "Admin";
        public const string Patient = "Patient";
    }

    public class TokenService : ITokenService
    {
        private readonly IConfiguration _configuration;

        public TokenService(IConfiguration configuration)
        {
            _configuration = configuration;
        }


        public string CreateAdminToken(string userId, string userEmail)
        {
            List<Claim> claims = new List<Claim>()
            {
                new Claim(ClaimTypes.Email, userEmail),
                new Claim(ClaimTypes.Uri, userId),
                new Claim(ClaimTypes.Role, Roles.Admin),
            };

            return CreateToken(claims);
        }


        public string CreatePatientToken(string patientId)
        {
            List<Claim> claims = new List<Claim>()
            {
                new Claim(ClaimTypes.Uri, patientId),
                new Claim(ClaimTypes.Role, Roles.Patient),
            };
            return CreateToken(claims);
        }

        public bool IsAdminToken(int UserId, ClaimsPrincipal UserClaim)
        {
            var userIdToken = UserClaim.FindFirst(ClaimTypes.Uri)?.Value;

            return UserId != Convert.ToInt32(userIdToken);
        }

        public bool IsPatientToken(int PatientId, ClaimsPrincipal PatientClaim)
        {
            var userIdToken = PatientClaim.FindFirst(ClaimTypes.Uri)?.Value;
            return PatientId != Convert.ToInt32(userIdToken);
        }

        private string CreateToken(List<Claim> claims)
        {
            var Key = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(_configuration.GetSection("Settings:Token").Value!));

            var cred = new SigningCredentials(Key, SecurityAlgorithms.HmacSha256Signature);

            var token = new JwtSecurityToken(
                claims: claims,
                expires: DateTime.Now.AddDays(30),
                signingCredentials: cred
                );

            var jwt = new JwtSecurityTokenHandler().WriteToken(token);

            return jwt;
        }
    }
}
