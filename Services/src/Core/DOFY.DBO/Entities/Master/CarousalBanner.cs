namespace DOFY.DBO;

public class CarousalBanner : EntityBase
{
    public string? Title { get; set; }

    public string? Content { get; set; }

    public bool? DisplayInList { get; set; }

    public string? SecondLanguage { get; set; }

    public bool? Enabled { get; set; }

    public string? ThumbnailPath { get; set; }

    public long? RowOrder { get; set; }
}