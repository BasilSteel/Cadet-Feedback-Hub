using System.ComponentModel.DataAnnotations;

namespace CFN_Server.Models
{
    public class Feedback
    {
        [Key]
        public int Id { get; set; }

        public string Message { get; set; }
    }
}