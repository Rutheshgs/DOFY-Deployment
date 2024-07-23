namespace DOFY.ViewEntities;

public class OrderSpecifications : EntityBase
{
    public long OrderId { get; set; }

    public string IMEINumber { get; set; }

    public long IEMIVerified { get; set; }

    public long? RowOrder { get; set; }
}
