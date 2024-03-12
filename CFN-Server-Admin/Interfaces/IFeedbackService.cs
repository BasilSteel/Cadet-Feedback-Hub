using CFN_ServerAdmin.Models;

namespace CFN_ServerAdmin.Services
{
    public interface IFeedbackService
    {
        IEnumerable<Feedback> GetAllFeedback();
        Feedback GetFeedbackById(int id);
        Feedback CreateFeedback(Feedback feedback);
        void UpdateFeedback(int id, Feedback feedback);
        void DeleteFeedback(int id);
    }
}