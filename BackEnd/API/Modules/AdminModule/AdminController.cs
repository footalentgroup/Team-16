using API.DataBase.Context;
using API.DataBase.Entities;
using API.Migrations;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Npgsql.EntityFrameworkCore.PostgreSQL.Storage.Internal.Mapping;
using System.Reflection.Metadata.Ecma335;

namespace API.Modules.AdminModule
{
    [Route("admin")]
    [ApiController]
    public class AdminController:ControllerBase
    {
        private readonly AppDbContext _context;

        public AdminController(AppDbContext context) {
            _context = context;
        }


        [HttpPut]
        public async Task<IActionResult> UpdateAdmin(UpdateAdminDto updateAdminDto){

            Admin? admin = await _context.Admins.FirstOrDefaultAsync(x => x.Id == updateAdminDto.Id);


            if (admin == null) {
                return new NotFoundObjectResult("Paciente no encontrado");

            }

            admin.Email = string.IsNullOrEmpty(updateAdminDto?.Email) ? admin.Email : updateAdminDto.Email;
            admin.Name = string.IsNullOrEmpty(updateAdminDto?.Name) ? admin.Name: updateAdminDto.Name;
            admin.Password = string.IsNullOrEmpty(updateAdminDto?.Password) ? admin.Password : BCrypt.Net.BCrypt.HashPassword(updateAdminDto.Password) ;
            admin.LastName = string.IsNullOrEmpty(updateAdminDto?.LastName) ? admin.LastName :  updateAdminDto.LastName;

             _context.Entry(admin).CurrentValues.SetValues(admin);

            await _context.SaveChangesAsync();
            return new OkObjectResult(admin);
        }
    }
}
