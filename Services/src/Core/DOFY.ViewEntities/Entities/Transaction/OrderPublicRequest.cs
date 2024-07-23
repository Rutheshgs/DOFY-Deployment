namespace DOFY.ViewEntities;

public class OrderPublicRequest : EntityBase
{
    public long OrderId { get; set; }

    public string Name { get; set; }

    public string MobileNumber { get; set; }

    public string Email { get; set; }

    public long? CityId { get; set; }

    public string? Area { get; set; }

    public long? ProductTypeId { get; set; }

    public string BrandName { get; set; }

    public string BrandModelName { get; set; }

    public string ModelVariant { get; set; }

    public long ModelVariantId { get; set; }
}
