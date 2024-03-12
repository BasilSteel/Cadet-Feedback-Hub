namespace CFN_ServerAdmin.Models
{
    public class Suggestion
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Status { get; set; }

        public Suggestion()
        {
            Status = "under consideration";
        }

        public void SetStatus(string status)
        {
            if (status == "under consideration" || status == "adopted" || status == "rejected")
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
