using API.DataBase.Context;
using API.DataBase.Entities;
using API.Modules.AuthModule.Dtos;
using API.Modules.AuthModule.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace API.Modules.AuthModule
{
    public class AuthService
    {
        private readonly ITokenService _tokenService;
        private readonly AppDbContext _context;

        public AuthService(ITokenService tokenService,AppDbContext context) {
            _tokenService = tokenService;
            _context = context;
        }

        public async Task<AuthAdminResponseDto> LoginAdmin(AuthAdminRequestDto authAdminRequestDto)
        {

            var admin = await _context.Admins.FirstOrDefaultAsync(adm => adm.Email == authAdminRequestDto.Email);

            if (admin == null)
            {
                throw new UnauthorizedAccessException("Email o contraseña incorrectos");
            }

            if(!BCrypt.Net.BCrypt.Verify(authAdminRequestDto.Password, admin.Password))
            {
                throw new UnauthorizedAccessException("Email o contraseña incorrectos");
            }
            
            return  new AuthAdminResponseDto()
            {
                Email= admin.Email,
                LastName= admin.LastName,
                Name = admin.Name,
                Token = _tokenService.CreateAdminToken(admin.Id.ToString(), admin.Email)
            };
        }


        public async Task<bool> CreateAdmin(Admin admin)
        {

            try
            {
                admin.Password = BCrypt.Net.BCrypt.HashPassword(admin.Password);

            var response = await _context.Admins.AddAsync(admin);

            await _context.SaveChangesAsync();

            return true;
            }catch{
                return false;
            }
        }
    }
}
