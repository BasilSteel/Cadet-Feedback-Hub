using CFN_Server.Models;
using Microsoft.EntityFrameworkCore;


namespace CFN_Server.Data
{
    public class DbContextCFN : DbContext
    {
        public DbContextCFN(DbContextOptions<DbContextCFN> options) : base(options)
        {
        }

        public DbSet<Feedback> Feedback { get; set; }
        public DbSet<Question> Questions { get; set; }
        public DbSet<Discussion> Discussions { get; set; }
        public DbSet<Comment> Comments { get; set; }
        public DbSet<Suggestion> Suggestion { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // modelBuilder.Entity<Comment>()
            //     .HasOne(c => c.Discussion)
            //     .WithMany(d => d.Comments)
            //     .HasForeignKey(c => c.DiscussionId)
            //     .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
