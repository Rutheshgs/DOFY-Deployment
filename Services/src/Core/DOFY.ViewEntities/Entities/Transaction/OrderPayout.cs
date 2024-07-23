namespace DOFY.ViewEntities;

public class OrderPayout : EntityBase
{
    public long? OrderId { get; set; }

    public decimal? SuggestedCost { get; set; }

    public decimal? RequoteAmount { get; set; }

    public decimal? ReferralAmount { get; set; }

    public decimal? Adjustment { get; set; }

    public decimal? FinalPaid { get; set; }

    public decimal? TotalAmount { get; set; }

    public decimal? CustomerExpectation { get; set; }
}