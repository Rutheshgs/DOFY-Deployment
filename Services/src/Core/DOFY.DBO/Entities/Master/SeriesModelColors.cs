namespace DOFY.DBO;

public class SeriesModelColors : EntityBase
{
    public long SeriesModelId { get; set; }

    public string Name { get; set; }

    public string DisplayName { get; set; }

    public string EnumName { get; set; }

    public string Specification { get; set; }

    public long? RowOrder { get; set; }

        public bool DisplayInList { get; set; }

        public string ColorCode { get; set; }

        public string ThumbnailPath { get; set; }

    }

