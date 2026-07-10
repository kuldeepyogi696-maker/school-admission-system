using Microsoft.EntityFrameworkCore;
using SchoolAPI.Models;

namespace SchoolAPI.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {
        }

        public DbSet<Admission> Fullfrom { get; set; }

        public DbSet<Inquiry> Inquiryfrom { get; set; }
    }
}