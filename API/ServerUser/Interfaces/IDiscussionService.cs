using CFN_Server.Models;

namespace CFN_Server.Services
{
    public interface IDiscussionService
    {
        IEnumerable<Discussion> GetAllDiscussions();
        Discussion GetDiscussionById(int id);

    }
}