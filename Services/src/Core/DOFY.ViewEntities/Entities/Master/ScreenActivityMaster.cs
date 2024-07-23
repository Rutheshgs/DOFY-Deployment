namespace DOFY.ViewEntities;

public class ScreenActivityMaster : EntityBase
{
    public long ScreenMasterId { get; set; }

    public long ActivityMasterId { get; set; }

    public string ScreenURL { get; set; }

    public bool? HasAccess { get; set; }

    public bool? IsMenuLink { get; set; }

    public bool? IsSelected { get; set; }

    public long? RowOrder { get; set; }

}
