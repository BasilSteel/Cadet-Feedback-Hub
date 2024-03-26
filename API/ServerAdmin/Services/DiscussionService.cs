using CFN_ServerAdmin.Models;
using CFN_ServerAdmin.Data;
using Microsoft.EntityFrameworkCore;

namespace CFN_ServerAdmin.Services
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
        public void DeleteDiscussionAndComments(int discussionId)
        {
            var discussion = _context.Discussions.Include(d => d.Comments).FirstOrDefault(d => d.Id == discussionId);

            if (discussion != null)
            {
                _context.Comments.RemoveRange(discussion.Comments);
                _context.Discussions.Remove(discussion);
                _context.SaveChanges();
            }
        }

    }
}
