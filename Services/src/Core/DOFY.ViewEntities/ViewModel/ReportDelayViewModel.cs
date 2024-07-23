namespace DOFY.ViewEntities
{
    public class ReportDelayViewModel
    {
        public long OrderId { get; set; }

        public decimal DelayHours { get; set; }

        public string DelayComments { get; set; }
    }
}