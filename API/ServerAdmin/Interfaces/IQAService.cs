using CFN_ServerAdmin.Models;

namespace CFN_ServerAdmin.Services
{
    public interface IQAService
    {
        IEnumerable<Question> GetAllQuestions();
        Question GetQuestionById(int id);
        Question CreateQuestion(Question question);
        void UpdateQuestion(int id, Question question);
        void DeleteQuestion(int id);
    }
}