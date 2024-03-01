using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CFN_Server.Models
{
    public class Feedback
    {
        [Key]
        public int Id { get; set; }

        public string Message { get; set; }
    }

    public class Question
    {
        [Key]
        public int Id { get; set; }

        public string QuestionText { get; set; }

        public string AnswerText { get; set; }
    }

    public class Discussion
    {
        [Key]
        public int Id { get; set; }

        public string Title { get; set; }

        public ICollection<Comment>? Comments { get; set; }
    }

    public class Comment
    {
        [Key]
        public int Id { get; set; }

        public string Text { get; set; }

        [ForeignKey("Discussion")]
        public int? DiscussionId { get; set; }

        public Discussion? Discussion { get; set; }
    }
}
