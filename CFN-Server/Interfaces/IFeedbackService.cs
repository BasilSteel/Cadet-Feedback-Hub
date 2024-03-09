using CFN_Server.Models;

namespace CFN_Server.Services
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