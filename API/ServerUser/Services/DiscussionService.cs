using CFN_Server.Models;
using CFN_Server.Data;

namespace CFN_Server.Services
{
    public class DiscussionService : IDiscussionService
    {
        private readonly DbContextCFN _context;

        public DiscussionService(DbContextCFN context)
        {
            _context = context;
        }

        public IEnumerable<Discussion> GetAllDiscussions()
        {
            return _context.Discussions.ToList();
        }

        public Discussion GetDiscussionById(int id)
        {
            return _context.Discussions.FirstOrDefault(d => d.Id == id);
        }

    }
}