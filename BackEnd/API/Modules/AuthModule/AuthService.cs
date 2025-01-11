using API.DataBase.Context;
using API.DataBase.Entities;
using API.Modules.AuthModule.Dtos;
using API.Modules.AuthModule.Interfaces;
using API.Shared.Utils;
using Microsoft.EntityFrameworkCore;

namespace API.Modules.AuthModule
{
    public class AuthService
    {
        private readonly ITokenService _tokenService;
        private readonly AppDbContext _context;

        public AuthService(ITokenService tokenService, AppDbContext context)
        {
            _tokenService = tokenService;
            _context = context;
        }

        public async Task<ServiceResult<AuthAdminResponseDto>> LoginAdmin(AuthAdminRequestDto authAdminRequestDto)
        {

            var admin = await _context.Admins.FirstOrDefaultAsync(adm => adm.Email == authAdminRequestDto.Email);

            if (admin == null || !ValidatePassword(authAdminRequestDto.Password, admin.Password))
            {
                return ServiceResult<AuthAdminResponseDto>.FailedResult(StatusCodes.Status401Unauthorized, "Email o Contraseña incorrectos");
            }

            return ServiceResult<AuthAdminResponseDto>.SuccessResult(new AuthAdminResponseDto()
            {
                Email = admin.Email,
                LastName = admin.LastName,
                FirstName = admin.Name,
                Token = _tokenService.CreateAdminToken(admin.Id.ToString(), admin.Email)
            });

        }


        public async Task<bool> CreateAdmin(Admin admin)
        {


            admin.Password = BCrypt.Net.BCrypt.HashPassword(admin.Password);

            var response = await _context.Admins.AddAsync(admin);

            await _context.SaveChangesAsync();

            return true;

        }

        public async Task<ServiceResult<AuthPatientResponseDto>> LoginPatient(AuthPatientRequestDto authPatientRequestDto)
        {
            try
            {

                var patient = await _context.Patients.FirstOrDefaultAsync(patient => patient.PersonalID == authPatientRequestDto.PersonalID);

                if (patient == null || !ValidatePassword(authPatientRequestDto.Password, patient.Password))
                {
                    return ServiceResult<AuthPatientResponseDto>.FailedResult(StatusCodes.Status401Unauthorized, "Email o Contraseña incorrectos");
                }

                return ServiceResult<AuthPatientResponseDto>.SuccessResult(new AuthPatientResponseDto()
                {
                    LastName = patient.LastName,
                    FirstName = patient.FirstName,
                    Token = _tokenService.CreatePatientToken(patient.Id.ToString()),
                    Id = patient.Id,
                    Email = patient.Email,
                    Birth = patient.Birth,
                    Phone = patient.Phone
                });
            }
            catch (Exception ex)
            {

                Console.WriteLine(ex.Message + ex.InnerException);
                throw new Exception(ex.Message);
            }
        }


        private bool ValidatePassword(string plainPassword, string hashPassword)
        {
            return BCrypt.Net.BCrypt.Verify(plainPassword, hashPassword);
        }

    }
}
