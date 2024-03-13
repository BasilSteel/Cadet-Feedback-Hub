using CFN_ServerAdmin.Models;

namespace CFN_ServerAdmin.Services
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