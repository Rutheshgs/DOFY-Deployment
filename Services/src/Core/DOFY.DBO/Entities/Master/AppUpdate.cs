namespace DOFY.DBO;

public class AppUpdate : EntityBase
{
    public string Android_Version { get; set; }

    public string IOS_Version { get; set; }

    public bool Android_Forced_Update { get; set; }

    public bool IOS_Forced_Update { get; set; }
}