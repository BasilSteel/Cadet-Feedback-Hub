using CFN_Server.Models;

namespace CFN_Server.Services
{
    public interface IFeedbackService
    {
        Feedback CreateFeedback(Feedback feedback);

    }
}