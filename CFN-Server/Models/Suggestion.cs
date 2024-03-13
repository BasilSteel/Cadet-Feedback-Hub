namespace CFN_Server.Models
{
    public class Suggestion
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Status { get; set; }

        public Suggestion()
        {
            Status = "на рассмотрении";
        }

        public void SetStatus(string status)
        {
            if (status == "на рассмотрении" || status == "принято" || status == "отклонено")
            {
                Status = status;
            }
            else
            {
                throw new ArgumentException("Invalid status value.");
            }
        }
    }
}
