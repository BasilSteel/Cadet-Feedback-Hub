using System.Collections.Generic;
using System.Linq;
using CFN_Server.Models;
using CFN_Server.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;





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

    public class DiscussionService : IDiscussionService
    {
        private readonly DbContextCFN _context;

        public DiscussionService(DbContextCFN context)
        {
            _context = context;
        }

        public IEnumerable<Discussion> GetAllDiscussions()
        {
            return _context.Discussions.ToList();
        }

        public Discussion GetDiscussionById(int id)
        {
            return _context.Discussions.FirstOrDefault(d => d.Id == id);
        }

        public Discussion CreateDiscussion(Discussion discussion)
        {
            _context.Discussions.Add(discussion);
            _context.SaveChanges();
            return discussion;
        }

        public void UpdateDiscussion(int id, Discussion discussion)
        {
            var existingDiscussion = _context.Discussions.FirstOrDefault(d => d.Id == id);
            if (existingDiscussion != null)
            {
                existingDiscussion.Title = discussion.Title;
                // Предположим, что обновление комментариев не поддерживается в данной реализации
                _context.SaveChanges();
            }
        }

        public void DeleteDiscussion(int id)
        {
            var discussion = _context.Discussions.FirstOrDefault(d => d.Id == id);
            if (discussion != null)
            {
                _context.Discussions.Remove(discussion);
                _context.SaveChanges();
            }
        }
    }
    public class SuggestionService : ISuggestionService
    {
        private readonly DbContextCFN _context;

        public SuggestionService(DbContextCFN context)
        {
            _context = context;
        }

        public IEnumerable<Suggestion> GetAllSuggestions()
        {
            return _context.Suggestion.ToList();
        }

        public Suggestion GetSuggestionById(int id)
        {
            return _context.Suggestion.Find(id);
        }

        public Suggestion CreateSuggestion(Suggestion suggestion)
        {
            _context.Suggestion.Add(suggestion);
            _context.SaveChanges();
            return suggestion;
        }

        public void UpdateSuggestion(int id, Suggestion suggestion)
        {
            _context.Entry(suggestion).State = EntityState.Modified;
            _context.SaveChanges();
        }

        public void DeleteSuggestion(int id)
        {
            var suggestion = _context.Suggestion.Find(id);
            _context.Suggestion.Remove(suggestion);
            _context.SaveChanges();
        }
    }
}



