namespace DOFY.ViewEntities;

public class UserAddress : EntityBase
{
    public long PersonId { get; set; }

    public long? CountryId { get; set; }

    public long? StateId { get; set; }

    public long? CityId { get; set; }

    public string? PinCode { get; set; }

    public string Address { get; set; }

    public string MobilePhone { get; set; }

    public string? WorkPhone { get; set; }

    public string? HomePhone { get; set; }

    public string? EmailId { get; set; }

    public long? AddressTypeId { get; set; }

    public bool IsDefault { get; set; }

    public string LocationPin { get; set; }

    public int? RowOrder { get; set; }

    public int? TotalRowsCount { get; set; }

    public int? LocationId { get; set; }

    public string Name { get; set; }

    public string? Address1 { get; set; }

    public string? LandMark { get; set; }

    public string? ApartmentNumber { get; set; }
}
