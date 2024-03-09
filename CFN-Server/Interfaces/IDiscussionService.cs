using CFN_Server.Models;

namespace CFN_Server.Services
{
    public interface IDiscussionService
    {
        IEnumerable<Discussion> GetAllDiscussions();
        Discussion GetDiscussionById(int id);
        Discussion CreateDiscussion(Discussion discussion);
        void UpdateDiscussion(int id, Discussion discussion);
        void DeleteDiscussion(int id);
    }
}