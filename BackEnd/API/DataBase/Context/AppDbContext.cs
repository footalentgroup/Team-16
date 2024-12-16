using API.DataBase.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.DataBase.Context
{
    public class AppDbContext : DbContext
    {

        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }


        public DbSet<Admin> Users  => Set<Admin>();
        public DbSet<Patient> Patients => Set<Patient>();
    }
}
