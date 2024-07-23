namespace DOFY.DBO;

public class PersonReview : EntityBase
{
    public long PersonId { get; set; }

    public string ReviewComments { get; set; }

    public long OrderId { get; set; }

    public bool DisplayInList { get; set; }

    public long? RowOrder { get; set; }

}

