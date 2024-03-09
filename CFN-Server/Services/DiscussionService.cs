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

        public Discussion CreateDiscussion(Discussion discussion)
        {
            _context.Discussions.Add(discussion);
            _context.SaveChanges();
            return discussion;
        }

        public void UpdateDiscussion(int id, Discussion discussion)
        {
            var existingDiscussion = _context.Discussions.FirstOrDefault(d => d.Id == id);
            if (existingDiscussion != null)
            {
                existingDiscussion.Title = discussion.Title;
                // Предположим, что обновление комментариев не поддерживается в данной реализации
                _context.SaveChanges();
            }
        }

        public void DeleteDiscussion(int id)
        {
            var discussion = _context.Discussions.FirstOrDefault(d => d.Id == id);
            if (discussion != null)
            {
                _context.Discussions.Remove(discussion);
                _context.SaveChanges();
            }
        }
    }
}