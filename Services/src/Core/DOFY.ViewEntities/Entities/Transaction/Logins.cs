using DOFY.Helper.Attributes;

namespace DOFY.ViewEntities;

public class Logins : EntityBase
{
    public long CompanyId { get; set; }

    public string UserName { get; set; }

    public string PassWord { get; set; }

    public string Salt { get; set; }

    public string IVKey { get; set; }

    public long? RowOrder { get; set; }

    [DBIgnore]
    public string ConfirmPassword { get; set; }

    public long? PersonId { get; set; }

    public long? RoleId { get; set; }
}