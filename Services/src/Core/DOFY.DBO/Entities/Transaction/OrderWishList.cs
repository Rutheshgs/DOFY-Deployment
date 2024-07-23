namespace DOFY.DBO;

public class OrderWishList : EntityBase
{
    public long PersonId { get; set; }

    public long ModelVariantId { get; set; }

    public long? ServiceTypeId { get; set; }

    public long? RowOrder { get; set; }

    public long MaximumValue { get; set; }

}
