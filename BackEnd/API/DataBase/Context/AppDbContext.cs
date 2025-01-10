using API.DataBase.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.DataBase.Context
{
    public class AppDbContext : DbContext
    {

        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Admin>()
            .HasIndex(x => x.Email)
            .IsUnique();

            modelBuilder.Entity<Patient>()
            .HasIndex(x => x.PersonalID)
            .IsUnique();

            modelBuilder.Entity<ParameterBase>()
            .HasDiscriminator<string>("Type")
            .HasValue<QualitativeParameter>("qualitative")
            .HasValue<QuantitativeParameter>("quantitative");

            modelBuilder.Entity<Result>()
            .HasDiscriminator<string>("Type")
            .HasValue<QualitativeResult>("qualitative")
            .HasValue<QuantitativeResult>("quantitative");

            modelBuilder.Entity<Admin>()
            .HasData(
                new Admin()
                {
                    Email = "admin@gmail.com",
                    Id = 1,
                    Name = "admin1",
                    LastName = "admin1",
                    Password = BCrypt.Net.BCrypt.HashPassword("12345678")
                },
                new Admin()
                {
                    Email = "admin2@gmail.com",
                    Id = 2,
                    Name = "admin2",
                    LastName = "admin2",
                    Password = BCrypt.Net.BCrypt.HashPassword("12345678")
                }
            );

            modelBuilder.Entity<Patient>()
            .HasData(
                new Patient()
                {
                    Id = 1,
                    FirstName = "Marcos",
                    LastName = "Rodriguez",
                    PersonalID = "34098349",
                    Password = BCrypt.Net.BCrypt.HashPassword("12345678"),
                    Birth = new DateTime(),
                    PersonalIDType = PersonalIDType.DNI,
                    Email = "Marcos@gmail.com",
                    Phone = "+54934245673748"
                },
                new Patient()
                {
                    Id = 2,
                    FirstName = "Marcos",
                    LastName = "Rodriguez",
                    PersonalID = "49298349",
                    Password = BCrypt.Net.BCrypt.HashPassword("87654321"),
                    Birth = new DateTime(),
                    PersonalIDType = PersonalIDType.DNI,
                    Email = "Marcos@gmail.com",
                    Phone = "+54934245673748"
                },
                new Patient()
                {
                    Id = 3,
                    FirstName = "Marcos",
                    LastName = "Rodriguez",
                    PersonalID = "AA34098349",
                    Password = BCrypt.Net.BCrypt.HashPassword("abcdefg"),
                    Birth = new DateTime(),
                    PersonalIDType = PersonalIDType.Passport,
                    Email = "Marcos@gmail.com",
                    Phone = "+54934245673748"
                }
            );
        }

        public DbSet<Admin> Admins => Set<Admin>();
        public DbSet<Patient> Patients => Set<Patient>();

        public DbSet<Exam> Exams => Set<Exam>();
        public DbSet<ParameterBase> Parameters => Set<ParameterBase>();

        public DbSet<Result> Results => Set<Result>();

    }
}
