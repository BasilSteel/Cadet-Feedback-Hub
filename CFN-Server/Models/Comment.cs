using System.ComponentModel.DataAnnotations;

namespace CFN_Server.Models
{
    public class Comment
    {
        [Key]
        public int Id { get; set; }

        public string Text { get; set; }

        // [ForeignKey("Discussion")]
        public int? DiscussionId { get; set; }

        // public Discussion? Discussion { get; set; }
    }
}