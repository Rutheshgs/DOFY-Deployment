namespace DOFY.DBO;

public class UserRoles : EntityBase
{
    public long LoginId { get; set; }

    public long RoleId { get; set; }

    public long? RowOrder { get; set; }

}
