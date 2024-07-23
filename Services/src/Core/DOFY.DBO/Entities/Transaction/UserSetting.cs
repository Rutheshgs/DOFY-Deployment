namespace DOFY.DBO;

public class UserSetting : EntityBase
{
    public long PersonId { get; set; }

    public long? TimeZoneId { get; set; }

    public bool? DisplayInList { get; set; }

    public int? RowOrder { get; set; }
}
