namespace DOFY.ViewEntities
{
    public class RejectOrderViewModel : EntityBase
    {
        public long OrderId { get; set; }

        public decimal? CustomerExpectation { get; set; }

        public string? Remarks { get; set; }

        public long Reason { get; set; }
    }
}
