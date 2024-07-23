namespace DOFY.DBO;

public class UserRoleScreenActivity : EntityBase
{
    public long UserRoleId { get; set; }

    public long ScreenActivityMasterId { get; set; }

    public long? RowOrder { get; set; }

    public bool? IsSelected { get; set; }

}
