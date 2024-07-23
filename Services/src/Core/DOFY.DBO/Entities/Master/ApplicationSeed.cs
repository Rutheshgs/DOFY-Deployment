namespace DOFY.DBO;

public class ApplicationSeed : EntityBase
{
    public long ServiceTypeId { get; set; }

    public long CurrentSeed { get; set; }

    public string SeedAbbreviation { get; set; }

    public long YearDigits { get; set; }

    public long NumberOfDigits { get; set; }

    public int? RowOrder { get; set; }

}
