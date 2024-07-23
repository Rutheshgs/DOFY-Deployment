namespace DOFY.ViewEntities;

public class OrderStatsViewModel
{
    public long? All { get; set; }

    public long? Open { get; set; }

    public long? Inprogress { get; set; }

    public long? Completed { get; set; }

    public long? Failed { get; set; }

    public long? CancelRequest { get; set; }

    public long? Cancelled { get; set; }

    public long? Pending { get; set; }
}
