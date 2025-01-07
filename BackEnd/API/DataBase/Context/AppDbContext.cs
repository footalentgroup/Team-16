using API.DataBase.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.DataBase.Context
{
    public class AppDbContext : DbContext
    {

        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }


        public DbSet<Admin> Admins => Set<Admin>();
        public DbSet<Patient> Patients => Set<Patient>();

        public DbSet<Exam> Exams => Set<Exam>();
        public DbSet<ParameterBase> Parameters => Set<ParameterBase>();
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
        modelBuilder.Entity<ParameterBase>()
            .HasDiscriminator<string>("Type")
            .HasValue<QualitativeParameter>("qualitative")
            .HasValue<QuantitativeParameter>("quantitative");
        }
    }
}
