namespace DOFY.ViewEntities;

public class ReportParameter : EntityBase
{
    public string Name { get; set; }

    public string Address { get; set; }

    public long CurrencyName { get; set; }

    public long CurrencyCode { get; set; }

    public long RowOrder { get; set; }

    public long Active { get; set; }
}
