using System.Collections.Generic;
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

    public interface IQAService
    {
        IEnumerable<Question> GetAllQuestions();
        Question GetQuestionById(int id);
        Question CreateQuestion(Question question);
        void UpdateQuestion(int id, Question question);
        void DeleteQuestion(int id);
    }


    public interface IDiscussionService
    {
        IEnumerable<Discussion> GetAllDiscussions();
        Discussion GetDiscussionById(int id);
        Discussion CreateDiscussion(Discussion discussion);
        void UpdateDiscussion(int id, Discussion discussion);
        void DeleteDiscussion(int id);
    }
    public interface ISuggestionService
    {
        IEnumerable<Suggestion> GetAllSuggestions();
        Suggestion GetSuggestionById(int id);
        Suggestion CreateSuggestion(Suggestion suggestion);
        void UpdateSuggestion(int id, Suggestion suggestion);
        void DeleteSuggestion(int id);
    }
}
