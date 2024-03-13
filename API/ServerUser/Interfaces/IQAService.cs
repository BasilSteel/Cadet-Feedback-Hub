using CFN_Server.Models;

namespace CFN_Server.Services
{
    public interface IQAService
    {
        IEnumerable<Question> GetAllQuestions();
        Question GetQuestionById(int id);
        Question CreateQuestion(Question question);

    }
}