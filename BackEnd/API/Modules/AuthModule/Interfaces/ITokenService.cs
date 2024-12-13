using System.Security.Claims;

namespace API.Modules.AuthModule.Interfaces
{
    public interface ITokenService
    {
         string CreateAdminToken(string userId, string userEmail);
         bool IsAdminToken(int numUser, ClaimsPrincipal UserClaim);

        string CreatePatientToken(string patientId);
    }
}
