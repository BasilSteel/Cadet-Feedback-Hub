using CFN_Server.Models;
using CFN_Server.Data;

namespace CFN_Server.Services
{
    public class FeedbackService : IFeedbackService
    {
        private readonly DbContextCFN _context;

        public FeedbackService(DbContextCFN context)
        {
            _context = context;
        }

        public Feedback CreateFeedback(Feedback feedback)
        {
            _context.Feedback.Add(feedback);
            _context.SaveChanges();
            return feedback;
        }


    }
}