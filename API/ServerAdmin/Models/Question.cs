using System.ComponentModel.DataAnnotations;

namespace CFN_ServerAdmin.Models
{
    public class Question
    {
        [Key]
        public int Id { get; set; }

        public string QuestionText { get; set; }

        public string? AnswerText { get; set; }

        public Question()
        {
            AnswerText = null;
        }
    }
}