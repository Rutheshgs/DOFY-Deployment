namespace DOFY.DBO;

public class ServiceType : EntityBase
{
    public string Name { get; set; }

    public string DisplayName { get; set; }

    public string EnumName { get; set; }

    public string Code { get; set; }

    public long? RowOrder { get; set; }

    public string ThumbnailPath { get; set; }

}
