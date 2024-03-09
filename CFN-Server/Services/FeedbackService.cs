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

        public IEnumerable<Feedback> GetAllFeedback()
        {
            return _context.Feedback.ToList();
        }

        public Feedback GetFeedbackById(int id)
        {
            return _context.Feedback.FirstOrDefault(f => f.Id == id);
        }

        public Feedback CreateFeedback(Feedback feedback)
        {
            _context.Feedback.Add(feedback);
            _context.SaveChanges();
            return feedback;
        }

        public void UpdateFeedback(int id, Feedback feedback)
        {
            var existingFeedback = _context.Feedback.FirstOrDefault(f => f.Id == id);
            if (existingFeedback != null)
            {
                existingFeedback.Message = feedback.Message;
                _context.SaveChanges();
            }
        }

        public void DeleteFeedback(int id)
        {
            var feedback = _context.Feedback.FirstOrDefault(f => f.Id == id);
            if (feedback != null)
            {
                _context.Feedback.Remove(feedback);
                _context.SaveChanges();
            }
        }
    }
}