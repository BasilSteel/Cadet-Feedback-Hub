using System.ComponentModel.DataAnnotations;

namespace CFN_Server.Models
{
     public class Question
    {
        [Key]
        public int Id { get; set; }

        public string QuestionText { get; set; }

        public string? AnswerText { get; set; }

        public bool ResponseStatus => AnswerText != null;
        public DateTime QuestionDateTime { get; set; }
        public Question()
        {
            AnswerText = null;
            QuestionDateTime = DateTime.Now.ToUniversalTime();
        }
    }
}