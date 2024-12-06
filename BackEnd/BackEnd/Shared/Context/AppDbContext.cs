using Microsoft.EntityFrameworkCore;

namespace BackEnd.Shared.Context
{
    public class AppDbContext:DbContext
    {

        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
    }
}
