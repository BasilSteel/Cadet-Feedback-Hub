using CFN_Server.Models;
using CFN_Server.Data;

namespace CFN_Server.Services
{

    public class QAService : IQAService
    {
        private readonly DbContextCFN _context;

        public QAService(DbContextCFN context)
        {
            _context = context;
        }

        public IEnumerable<Question> GetAllQuestions()
        {
            return _context.Questions.ToList();
        }

        public Question GetQuestionById(int id)
        {
            return _context.Questions.FirstOrDefault(q => q.Id == id);
        }

        public Question CreateQuestion(Question question)
        {
            _context.Questions.Add(question);
            _context.SaveChanges();
            return question;
        }


    }
}