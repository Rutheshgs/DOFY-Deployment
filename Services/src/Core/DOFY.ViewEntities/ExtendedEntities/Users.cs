namespace DOFY.ViewEntities;

using Microsoft.AspNetCore.Http;

public class Users : Person
{
    public string Address { get; set; }

    public long? CityId { get; set; }

    public long? RoleId { get; set; }

    public string? PinCode { get; set; }

    public long? StateId { get; set; }

    public int? LocationId { get; set; }

    public string? LocationPin { get; set; }

    public IFormFileCollection? UploadFiles { get; set; }
}
