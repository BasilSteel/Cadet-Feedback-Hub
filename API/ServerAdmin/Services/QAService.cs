using CFN_ServerAdmin.Models;
using CFN_ServerAdmin.Data;

namespace CFN_ServerAdmin.Services
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

        public void UpdateQuestion(int id, Question question)
        {
            var existingQuestion = _context.Questions.FirstOrDefault(q => q.Id == id);
            if (existingQuestion != null)
            {
                existingQuestion.QuestionText = question.QuestionText;
                existingQuestion.AnswerText = question.AnswerText;
                _context.SaveChanges();
            }
        }

        public void DeleteQuestion(int id)
        {
            var question = _context.Questions.FirstOrDefault(q => q.Id == id);
            if (question != null)
            {
                _context.Questions.Remove(question);
                _context.SaveChanges();
            }
        }

    }
}