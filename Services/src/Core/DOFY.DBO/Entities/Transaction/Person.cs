using DOFY.Helper.Attributes;

namespace DOFY.DBO;

public class Person : EntityBase
{
    public long LoginId { get; set; }

    public long UserRoleId { get; set; }

    public string FirstName { get; set; }

    public string? MiddleName { get; set; }

    public string LastName { get; set; }

    public string Email { get; set; }

    public string Prefix { get; set; }

    public string Suffix { get; set; }

    public DateTime? DateOfBirth { get; set; }

    public string UploadImagePath { get; set; }

    public string UploadImageName { get; set; }

    public int? RowOrder { get; set; }

    public string Mobile { get; set; }

    public string SecondaryMobile { get; set; }

    [DBIgnore]
    public Logins? UserLogin { get; set; }
}
